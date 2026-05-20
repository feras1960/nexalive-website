/**
 * TexaCore PBX WebRTC Click-to-Call Widget v3.3
 * Features: DTMF dialpad, mute, premium UI, anti-spam, multi-language
 */
(function () {
    'use strict';
    const C = window.TexaCoreWebRTCConfig || {
        themeColor:'#10b981', buttonText:'اتصل بنا مجاناً',
        pbxDomain:'pbx.texacore.ai', wssPort:'8089',
        guestUsername:'webrtc_guest', guestPassword:'',
        targetDestination:'700',
        companyName:'TexaCore', cooldownSeconds:0, maxCallDuration:120,
        callbackApiUrl:'', // Supabase Edge Function URL
        widgetId:'', // pbx_web_callbacks widget ID
        supabaseUrl:'', supabaseKey:''
    };
    // Multi-language support: C._t holds translated strings, fallback to Arabic
    const T = C._t || { btn:'اتصل بنا مجاناً', calling:'جارٍ الاتصال...', micReq:'طلب صلاحية الميكروفون...', micDeny:'تم رفض صلاحية الميكروفون', dialing:'جارٍ الطلب...', ringing:'يرن...', maxTime:'انتهت المدة القصوى', failed:'فشل الاتصال', busy:'جميع الخطوط مشغولة', offline:'الموظف غير متصل حالياً', ended:'انتهت المكالمة', incoming:'مكالمة واردة من خدمة العملاء...', cbTitle:'📞 هل تريد أن نعاود الاتصال بك؟', cbDesc:'جميع موظفينا مشغولون حالياً.<br>أدخل رقمك وسنتواصل معك خلال أوقات الدوام.', cbSend:'أرسل طلب الاتصال', cbSkip:'لا شكراً، إغلاق', cbSending:'جارٍ الإرسال...', cbOk:'✅ تم استلام طلبك! سنتواصل معك قريباً.', cbBadNum:'الرجاء إدخال رقم صحيح', cbAutoClose:'تغلق تلقائياً بعد', sec:'ثانية', waitMsg:'الرجاء الانتظار', encrypted:'مكالمة مشفرة عبر WebRTC' };

    let sipUA=null, sipSession=null, sipLoaded=false, timer=null, secs=0, maxTimer=null, isMuted=false, dialpadOpen=false;
    let supabaseClient=null, presenceChannel=null, visitorUUID=null;

    function generateUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }


    visitorUUID = localStorage.getItem('tx_visitor_uuid');
    if (!visitorUUID) {
        visitorUUID = generateUUID();
        localStorage.setItem('tx_visitor_uuid', visitorUUID);
    }

    // Rate limit
    function isLimited(){
        if(!C.cooldownSeconds) return false;
        const l=localStorage.getItem('tx_last'); if(!l) return false;
        return (Date.now()-parseInt(l,10))/1000 < C.cooldownSeconds;
    }
    // Direction helper
    var isWidgetRTL = (C._lang === 'ar');
    function cooldownLeft(){
        const l=localStorage.getItem('tx_last'); if(!l) return 0;
        return Math.max(0,Math.ceil(C.cooldownSeconds-(Date.now()-parseInt(l,10))/1000));
    }

    function loadSip(cb){
        let loaded = 0;
        const checkDone = () => { loaded++; if(loaded === 2){ sipLoaded=true; if(cb)cb(); } };

        if(window.SIP){ checkDone(); } else {
            const s=document.createElement('script');
            s.src='https://cdn.jsdelivr.net/npm/sip.js@0.15.11/dist/sip.min.js';
            s.onload=checkDone;
            s.onerror=function(){setStatus('خطأ في تحميل المكونات','error');};
            document.head.appendChild(s);
        }

        if(window.supabase){ 
            if(C.supabaseUrl && C.supabaseKey && !supabaseClient) {
                supabaseClient = window.supabase.createClient(C.supabaseUrl, C.supabaseKey);
                initRealtime();
            }
            checkDone(); 
        } else {
            const sb=document.createElement('script');
            sb.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
            sb.onload=function() {
                if(C.supabaseUrl && C.supabaseKey && !supabaseClient) {
                    supabaseClient = window.supabase.createClient(C.supabaseUrl, C.supabaseKey);
                    initRealtime();
                }
                checkDone();
            };
            document.head.appendChild(sb);
        }
    }

    function getDeviceInfo() {
        var ua = navigator.userAgent || '';
        var isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
        var browser = 'Unknown';
        if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Edg/i.test(ua)) browser = 'Edge';
        return { device: isMobile ? 'mobile' : 'desktop', browser: browser };
    }

    var heartbeatInterval = null;

    function initRealtime() {
        if(!supabaseClient) { console.warn('[TX-RT] No supabase client'); return; }
        console.log('[TX-RT] Initializing Realtime presence for:', visitorUUID);
        
        presenceChannel = supabaseClient.channel('pbx_visitors', {
            config: { presence: { key: visitorUUID }, broadcast: { self: false, ack: false } }
        });
        
        presenceChannel.on('broadcast', { event: 'incoming_call' }, function(payload) {
            console.log('[TX-RT] Received incoming call broadcast:', payload);
            if(payload.payload && payload.payload.to_uuid === visitorUUID) {
                showIncomingCallUI(payload.payload.agent_ext || '100');
            }
        });

        presenceChannel.subscribe(async function(status) {
            console.log('[TX-RT] Channel status:', status);
            if (status === 'SUBSCRIBED') {
                await trackPresence();
                startHeartbeat();
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                console.warn('[TX-RT] Channel error, will retry...');
                setTimeout(function() { reconnectRealtime(); }, 5000);
            }
        });

        // Re-track when page becomes visible again (mobile browser tab switch)
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible' && presenceChannel) {
                console.log('[TX-RT] Page visible again, re-tracking...');
                trackPresence();
            }
        });
    }

    var visitorGeo = { ip: '', country: '' };
    var visitorJoinedAt = new Date().toISOString();
    
    function fetchFallbackIP() {
        fetch('https://api.ipify.org?format=json')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.ip) {
                    visitorGeo.ip = data.ip;
                    if (presenceChannel) trackPresence();
                }
            }).catch(function(){});
    }

    // Fetch geo data early
    fetch('https://ipapi.co/json/')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.ip) {
                visitorGeo.ip = data.ip;
                visitorGeo.country = data.country_name || data.country || '';
                visitorGeo.countryCode = data.country || '';
                if (presenceChannel) trackPresence();
            } else {
                fetchFallbackIP();
            }
        })
        .catch(function(e) { 
            console.log('[TX-RT] Failed to fetch geo data from ipapi', e);
            fetchFallbackIP();
        });

    async function trackPresence() {
        if (!presenceChannel) return;
        var info = getDeviceInfo();
        try {
            await presenceChannel.track({
                uuid: visitorUUID,
                status: 'online',
                url: window.location.pathname,
                page_title: document.title || '',
                device: info.device,
                browser: info.browser,
                referrer: document.referrer || '',
                ip: visitorGeo.ip,
                country: visitorGeo.country,
                country_code: visitorGeo.countryCode,
                timestamp: visitorJoinedAt
            });
            console.log('[TX-RT] Presence tracked successfully');
        } catch(e) {
            console.error('[TX-RT] Track failed:', e);
        }
    }

    function startHeartbeat() {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(function() {
            if (presenceChannel) {
                trackPresence();
            }
        }, 30000); // Re-track every 30 seconds
    }

    function reconnectRealtime() {
        console.log('[TX-RT] Reconnecting...');
        if (presenceChannel) {
            try { supabaseClient.removeChannel(presenceChannel); } catch(e) {}
            presenceChannel = null;
        }
        if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null; }
        initRealtime();
    }

    function showIncomingCallUI(agentExt) {
        if (typeof callbackTimeout !== 'undefined' && callbackTimeout) clearTimeout(callbackTimeout);
        if (typeof callbackInterval !== 'undefined' && callbackInterval) clearInterval(callbackInterval);

        document.getElementById('tx-cb').className = 'tx-cb';
        document.getElementById('tx-cb').style.display = 'none'; // Ensure callback form is hidden
        document.getElementById('tx-pad').className = 'tx-pad';
        document.getElementById('tx-av').style.display = 'flex';
        document.getElementById('tx-acts').style.display = 'flex';

        const ov = document.getElementById('tx-ov');
        ov.classList.add('active');
        ov.style.display = 'flex'; // Force flex display
        ov.style.animation = 'txShake 0.5s ease-in-out infinite alternate'; // Shake animation for incoming call
        
        document.getElementById('tx-fab').style.display='none';
        setStatus(T.incoming);
        
        // Show ringing UI
        const btnActs = document.getElementById('tx-acts');
        btnActs.innerHTML = `
            <button class="tx-abtn" id="tx-ans-inc" style="background:#10b981;width:64px;height:64px;box-shadow:0 4px 18px rgba(16,185,129,.4)">
                <svg viewBox="0 0 24 24" style="width:28px;height:28px;fill:#fff"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            </button>
            <button class="tx-abtn end" id="tx-rej-inc">
                ${HU}
            </button>
        `;
        document.getElementById('tx-ans-inc').addEventListener('click', function(){
            const ov = document.getElementById('tx-ov');
            if(ov) ov.style.animation = ''; // stop shaking
            stopRingtone();
            startCall(agentExt);
        });
        document.getElementById('tx-rej-inc').addEventListener('click', function(){
            const ov = document.getElementById('tx-ov');
            if(ov) ov.style.animation = ''; // stop shaking
            cleanup();
        });
        
        // Play ringtone via Web Audio API
        playRingtone();
        
        // Attempt to play HTML5 audio as fallback
        const a = document.getElementById('tx-audio');
        if (a) {
            a.src = 'https://actions.google.com/sounds/v1/alarms/phone_ringing.ogg';
            a.loop = true;
            let playPromise = a.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log('[TX-RT] Autoplay blocked, relying on Web Audio synth and user interaction.', e));
            }
        }
    }

    // Styles
    function injectCSS(){
        const s=document.createElement('style');
        s.textContent=`
:root{--tx:${C.themeColor}}
.tx-fab{position:fixed;bottom:28px;right:28px;background:var(--tx);color:#fff;border:none;border-radius:50px;padding:13px 24px;font-family:"Tajawal",system-ui,sans-serif;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.2);display:flex;align-items:center;gap:9px;z-index:999998;transition:all .25s}
.tx-fab:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,.3)}
.tx-fab::before{content:"";position:absolute;inset:-4px;border-radius:50px;background:var(--tx);opacity:0;animation:txPulse 2s infinite;z-index:-1}
@keyframes txPulse{0%{opacity:.4;transform:scale(1)}100%{opacity:0;transform:scale(1.12)}}
.tx-fab svg{width:20px;height:20px;fill:currentColor}
.tx-ov{position:fixed;inset:0;background:linear-gradient(160deg,#0f172a,#1e293b 50%,#0f172a);z-index:999999;display:none;flex-direction:column;align-items:center;padding:50px 20px 30px;font-family:"Tajawal",system-ui,sans-serif;color:#fff;overflow-y:auto}
.tx-ov.active{display:flex;animation:txFade .3s}
@keyframes txFade{from{opacity:0}to{opacity:1}}
@keyframes txShake{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(-1deg) scale(1.02)}50%{transform:rotate(1deg) scale(1)}75%{transform:rotate(-1deg) scale(1.02)}100%{transform:rotate(0deg) scale(1)}}
.tx-hdr{text-align:center;flex-shrink:0}
.tx-lbl{font-size:16px;margin:0 0 6px;font-weight:300;color:rgba(255,255,255,.45)}
.tx-co{font-size:30px;font-weight:800;margin:0;letter-spacing:.5px}
.tx-st{font-size:18px;color:rgba(255,255,255,.5);margin-top:12px;min-height:26px;transition:color .3s}
.tx-st.ok{color:#34d399}.tx-st.err{color:#f87171}
.tx-av{width:110px;height:110px;border-radius:50%;background:var(--tx);display:flex;align-items:center;justify-content:center;margin:24px auto;box-shadow:0 0 0 0 rgba(255,255,255,.2);animation:txRing 2s infinite;flex-shrink:0}
.tx-av.on{animation:none;box-shadow:0 0 0 5px rgba(52,211,153,.3)}
.tx-av svg{width:50px;height:50px;fill:#fff}
@keyframes txRing{0%{box-shadow:0 0 0 0 rgba(255,255,255,.25)}70%{box-shadow:0 0 0 22px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}
.tx-actions{display:flex;gap:20px;align-items:center;justify-content:center;margin:20px 0;flex-shrink:0}
.tx-abtn{width:56px;height:56px;border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.1);color:#fff}
.tx-abtn:hover{background:rgba(255,255,255,.18);transform:scale(1.06)}
.tx-abtn.active{background:var(--tx)}
.tx-abtn svg{width:24px;height:24px;fill:currentColor}
.tx-abtn.end{background:#ef4444;width:64px;height:64px;box-shadow:0 4px 18px rgba(239,68,68,.4)}
.tx-abtn.end:hover{transform:scale(1.08)}
.tx-abtn.end svg{width:28px;height:28px}
.tx-abtn.muted{background:#ef4444}
.tx-pad{display:none;width:260px;margin:10px auto 0;flex-shrink:0}
.tx-pad.open{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;animation:txFade .2s}
.tx-key{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 0;text-align:center;font-size:22px;font-weight:700;color:#fff;cursor:pointer;transition:all .15s;font-family:"Tajawal",system-ui,sans-serif;user-select:none}
.tx-key:hover{background:rgba(255,255,255,.15)}
.tx-key:active{background:var(--tx);transform:scale(.94)}
.tx-key sub{display:block;font-size:9px;color:rgba(255,255,255,.35);font-weight:400;margin-top:1px}
.tx-sec{display:flex;align-items:center;gap:5px;font-size:10px;color:rgba(255,255,255,.25);margin-top:auto;padding-top:14px;flex-shrink:0}
.tx-sec svg{width:11px;height:11px;fill:rgba(255,255,255,.25)}
#tx-audio{display:none}
.tx-cb{display:none;text-align:center;width:100%;max-width:320px;margin:0 auto;flex-shrink:0}
.tx-cb.show{display:block;animation:txFade .3s}
.tx-cb h3{font-size:20px;font-weight:700;margin:0 0 8px;color:#fff}
.tx-cb p{font-size:14px;color:rgba(255,255,255,.5);margin:0 0 20px;line-height:1.5}
.tx-cb-input{display:flex;gap:8px;margin-bottom:14px}
.tx-cb-input input{flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:14px 16px;color:#fff;font-size:18px;font-family:'Tajawal',system-ui,sans-serif;text-align:center;letter-spacing:2px;outline:none;direction:ltr}
.tx-cb-input input::placeholder{color:rgba(255,255,255,.25);letter-spacing:0}
.tx-cb-input input:focus{border-color:var(--tx);box-shadow:0 0 0 3px rgba(16,185,129,.2)}
.tx-cb-submit{background:var(--tx);color:#fff;border:none;border-radius:12px;padding:14px 32px;font-size:16px;font-weight:700;cursor:pointer;width:100%;font-family:'Tajawal',system-ui,sans-serif;transition:all .2s}
.tx-cb-submit:hover{opacity:.9;transform:translateY(-1px)}
.tx-cb-submit:disabled{opacity:.5;cursor:not-allowed;transform:none}
.tx-cb-skip{background:none;border:none;color:rgba(255,255,255,.4);font-size:13px;cursor:pointer;margin-top:10px;font-family:'Tajawal',system-ui,sans-serif}
.tx-cb-skip:hover{color:rgba(255,255,255,.6)}
.tx-cb-ok{color:#34d399;font-size:16px;margin-top:12px}
`;
        document.head.appendChild(s);
    }

    // SVGs
    const PH='<svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>';
    const HU='<svg viewBox="0 0 24 24" style="transform:rotate(135deg)"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>';
    const MIC='<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>';
    const MICOFF='<svg viewBox="0 0 24 24"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>';
    const DIAL='<svg viewBox="0 0 24 24"><path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';
    const LK='<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>';

    const KEYS=[
        {d:'1',s:''},{d:'2',s:'ABC'},{d:'3',s:'DEF'},
        {d:'4',s:'GHI'},{d:'5',s:'JKL'},{d:'6',s:'MNO'},
        {d:'7',s:'PQRS'},{d:'8',s:'TUV'},{d:'9',s:'WXYZ'},
        {d:'*',s:''},{d:'0',s:'+'},{d:'#',s:''}
    ];

    // Ringtone Generator using Web Audio API
    let ringInterval = null;
    let audioCtx = null;

    function playRingtone() {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            
            function ring() {
                if (!audioCtx) return;
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(480, audioCtx.currentTime);
                
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime + 1.5);
                gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.6);
                
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc1.start(audioCtx.currentTime);
                osc1.stop(audioCtx.currentTime + 1.6);
                osc2.start(audioCtx.currentTime);
                osc2.stop(audioCtx.currentTime + 1.6);
            }
            
            ring();
            ringInterval = setInterval(ring, 4000);
            
            // Allow user interaction anywhere on the document to resume audio if blocked
            const unlockAudio = function() {
                if (audioCtx && audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
            };
            document.addEventListener('click', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
            
        } catch (e) {
            console.warn('AudioContext not supported or blocked for ringtone', e);
        }
    }

    function stopRingtone() {
        if (ringInterval) {
            clearInterval(ringInterval);
            ringInterval = null;
        }
    }

    function renderUI(){
        // FAB
        const btn=document.createElement('button');
        btn.className='tx-fab';btn.id='tx-fab';
        btn.innerHTML=PH+C.buttonText;
        document.body.appendChild(btn);

        // Overlay
        const ov=document.createElement('div');
        ov.className='tx-ov';ov.id='tx-ov';
        let keysHTML=KEYS.map(k=>'<button class="tx-key" data-d="'+k.d+'">'+k.d+(k.s?'<sub>'+k.s+'</sub>':'')+'</button>').join('');
        ov.innerHTML=`
<div class="tx-hdr">
  <p class="tx-lbl">${T.calling}</p>
  <h2 class="tx-co">${C.companyName}</h2>
  <div class="tx-st" id="tx-st">${T.calling}</div>
</div>
<div class="tx-av" id="tx-av">${PH}</div>
<div class="tx-actions" id="tx-acts">
  <button class="tx-abtn" id="tx-mute" title="Mute">${MIC}</button>
  <button class="tx-abtn end" id="tx-end">${HU}</button>
  <button class="tx-abtn" id="tx-dial" title="Dialpad">${DIAL}</button>
</div>
<div class="tx-pad" id="tx-pad">${keysHTML}</div>
<div class="tx-cb" id="tx-cb">
  <h3>${T.cbTitle}</h3>
  <p>${T.cbDesc}</p>
  <div class="tx-cb-input"><input id="tx-cbnum" type="tel" placeholder="05xxxxxxxx" maxlength="15"/></div>
  <button class="tx-cb-submit" id="tx-cbsend">${T.cbSend}</button>
  <div id="tx-cbmsg"></div>
  <button class="tx-cb-skip" id="tx-cbskip">${T.cbSkip}</button>
</div>
<div class="tx-sec">${LK} ${T.encrypted}</div>
<audio id="tx-audio" autoplay></audio>`;
        document.body.appendChild(ov);

        btn.addEventListener('click', function() { startCall(); });
        document.getElementById('tx-end').addEventListener('click',endCall);
        document.getElementById('tx-mute').addEventListener('click',toggleMute);
        document.getElementById('tx-dial').addEventListener('click',toggleDialpad);
        document.getElementById('tx-pad').addEventListener('click',function(e){
            const k=e.target.closest('.tx-key');
            if(k) sendDTMF(k.dataset.d);
        });
        document.getElementById('tx-cbsend').addEventListener('click',submitCallback);
        document.getElementById('tx-cbskip').addEventListener('click',cleanup);
        // Auto-convert Arabic/Persian numerals to Latin
        document.getElementById('tx-cbnum').addEventListener('input',function(e){
            e.target.value=e.target.value.replace(/[٠-٩]/g,function(d){return d.charCodeAt(0)-1632;}).replace(/[۰-۹]/g,function(d){return d.charCodeAt(0)-1776;});
        });
    }

    function setStatus(t,c){
        const e=document.getElementById('tx-st');if(!e)return;
        e.textContent=t;e.className='tx-st'+(c==='ok'?' ok':c==='error'?' err':'');
    }

    function fmt(s){const m=String(Math.floor(s/60)),sec=String(s%60);return (m.length<2?'0'+m:m)+':'+(sec.length<2?'0'+sec:sec);}

    function startTimer(){
        secs=0;setStatus(fmt(0),'ok');
        timer=setInterval(function(){secs++;setStatus(fmt(secs),'ok');},1000);
        document.getElementById('tx-av').className='tx-av on';
    }
    function stopTimer(){
        if(timer){clearInterval(timer);timer=null;}
        if(maxTimer){clearTimeout(maxTimer);maxTimer=null;}
        document.getElementById('tx-av').className='tx-av';
    }

    // Mute
    function toggleMute(){
        if(!sipSession)return;
        isMuted=!isMuted;
        const btn=document.getElementById('tx-mute');
        try{
            const pc=sipSession.sessionDescriptionHandler.peerConnection;
            pc.getSenders().forEach(function(s){if(s.track&&s.track.kind==='audio')s.track.enabled=!isMuted;});
        }catch(e){}
        btn.innerHTML=isMuted?MICOFF:MIC;
        btn.className='tx-abtn'+(isMuted?' muted':'');
    }

    // Dialpad
    function toggleDialpad(){
        dialpadOpen=!dialpadOpen;
        document.getElementById('tx-pad').className='tx-pad'+(dialpadOpen?' open':'');
        document.getElementById('tx-dial').className='tx-abtn'+(dialpadOpen?' active':'');
    }

    // DTMF
    function sendDTMF(digit){
        if(!sipSession)return;
        try{sipSession.dtmf(digit);}catch(e){
            try{
                const pc=sipSession.sessionDescriptionHandler.peerConnection;
                const s=pc.getSenders().find(function(s){return s.track&&s.track.kind==='audio';});
                if(s)s.dtmf.insertDTMF(digit,100,70);
            }catch(e2){console.warn('[CTC] DTMF error',e2);}
        }
        console.log('[CTC] DTMF:',digit);
    }

    // Call flow
    function startCall(overrideDest = null){
        if(isLimited()){alert(T.waitMsg+' '+cooldownLeft()+' '+T.sec);return;}
        
        // Notify desktop softphone via Realtime immediately
        notifySoftphone();
        
        // Reset UI actions
        document.getElementById('tx-acts').innerHTML = `
            <button class="tx-abtn" id="tx-mute" title="Mute">${MIC}</button>
            <button class="tx-abtn end" id="tx-end">${HU}</button>
            <button class="tx-abtn" id="tx-dial" title="Dialpad">${DIAL}</button>
        `;
        document.getElementById('tx-end').addEventListener('click',endCall);
        document.getElementById('tx-mute').addEventListener('click',toggleMute);
        document.getElementById('tx-dial').addEventListener('click',toggleDialpad);
        
        // Stop any ringing audio
        const a = document.getElementById('tx-audio');
        a.loop = false;
        a.pause();
        a.src = '';
        
        document.getElementById('tx-ov').classList.add('active');
        document.getElementById('tx-fab').style.display='none';
        setStatus(T.micReq);
        navigator.mediaDevices.getUserMedia({audio:true,video:false})
            .then(function(stream){
                window._txStream=stream;
                setStatus(T.calling);
                if(!sipLoaded){loadSip(function(){initSIP(overrideDest);});}else{initSIP(overrideDest);}
            })
            .catch(function(){setStatus(T.micDeny,'error');setTimeout(cleanup,3000);});
    }

    function notifySoftphone() {
        if (!supabaseClient) {
            console.warn('[CTC] Supabase not ready, cannot notify softphone');
            return;
        }

        var callPayload = {
            visitor_id: visitorUUID,
            source: 'landing_page',
            page: window.location.pathname,
            device: getDeviceInfo(),
            country_code: visitorGeo.countryCode || '',
            country: visitorGeo.country || '',
            ip: visitorGeo.ip || '',
            timestamp: new Date().toISOString()
        };

        // Method 1: Send web-call notification via visitors presence channel (softphone listens on this)
        if (presenceChannel) {
            presenceChannel.send({
                type: 'broadcast',
                event: 'web-call',
                payload: callPayload
            });
            console.log('[CTC] Sent web-call via presenceChannel (pbx_visitors)');
        }
        
        // Method 2: Send on pbx_softphone_sync channel (the MAIN channel desktop softphone listens on)
        var syncCh = supabaseClient.channel('pbx_softphone_sync');
        syncCh.subscribe(function(status) {
            if (status === 'SUBSCRIBED') {
                syncCh.send({
                    type: 'broadcast',
                    event: 'web-call',
                    payload: callPayload
                });
                console.log('[CTC] Sent web-call via pbx_softphone_sync');
            }
        });

        // Method 3: Send on notify backup channel  
        var notifyCh = supabaseClient.channel('pbx_softphone_sync_notify');
        notifyCh.subscribe(function(status) {
            if (status === 'SUBSCRIBED') {
                notifyCh.send({
                    type: 'broadcast',
                    event: 'web-call',
                    payload: callPayload
                });
                console.log('[CTC] Sent web-call via notify channel');
                setTimeout(function() { supabaseClient.removeChannel(notifyCh); }, 3000);
            }
        });
    }

    function initSIP(overrideDest){
        if(C.cooldownSeconds) localStorage.setItem('tx_last',Date.now().toString());
        const ws='wss://'+C.pbxDomain+':'+C.wssPort+'/ws';
        try{
            let info = getDeviceInfo();
            let dispName = "WEB|" + (info.device === 'mobile' ? 'mobile' : 'desktop') + "|" + visitorUUID.substring(0,8);
            sipUA=new SIP.UA({
                uri:'sip:'+C.guestUsername+'@'+C.pbxDomain,
                displayName: dispName,
                authorizationUser:C.guestUsername,
                password:C.guestPassword||'',
                transportOptions:{wsServers:[ws],traceSip:false,maxReconnectionAttempts:2,reconnectionTimeout:3},
                register:false,hackIpInContact:true,
                sessionDescriptionHandlerFactoryOptions:{peerConnectionOptions:{rtcConfiguration:{
                    iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]
                }}},
                userAgentString:'TexaCore-CTC/3.0',noAnswerTimeout:30,log:{level:'warn'}
            });
            sipUA.start();
            makeCall(overrideDest);
        }catch(e){console.error('[CTC]',e);setStatus('فشل الاتصال','error');setTimeout(cleanup,3000);}
    }

    function makeCall(overrideDest){
        setStatus(T.dialing);
        let dest = typeof overrideDest === 'string' ? overrideDest : C.targetDestination;
        sipSession=sipUA.invite('sip:'+dest+'@'+C.pbxDomain,{
            sessionDescriptionHandlerOptions:{constraints:{audio:true,video:false}}
        });
        sipSession.on('progress',function(){setStatus(T.ringing);});
        sipSession.on('accepted',function(){
            startTimer();setupAudio();
            maxTimer=setTimeout(function(){setStatus(T.maxTime);endCall();},C.maxCallDuration*1000);
        });
        sipSession.on('failed',function(r){
            let msg=T.failed;
            let code = r && r.statusCode ? r.statusCode : 'Unknown';
            console.error('[CTC] Call failed with status:', code, r?.reasonPhrase);
            if(code === 486) msg=T.busy;
            else if(code === 480 || code === 404) msg=T.offline;
            setStatus(msg,'error');setTimeout(function(){showCallback();},3000);
        });
        sipSession.on('terminated',function(){setStatus(T.ended);setTimeout(function(){showCallback();},1500);});
    }

    function setupAudio(){
        try{
            const a=document.getElementById('tx-audio');
            const pc=sipSession.sessionDescriptionHandler.peerConnection;
            const st=new MediaStream();
            pc.getReceivers().forEach(function(r){if(r.track)st.addTrack(r.track);});
            a.srcObject=st;a.play().catch(function(){});
        }catch(e){console.error('[CTC] Audio error',e);}
    }

    function endCall(){
        if(sipSession){try{sipSession.terminate();}catch(e){cleanup();}}else{cleanup();}
    }

    let callbackTimeout = null;
    let callbackInterval = null;

    function showCallback(){
        stopTimer();isMuted=false;dialpadOpen=false;
        if(sipUA){try{sipUA.stop();}catch(e){}sipUA=null;}
        if(window._txStream){window._txStream.getTracks().forEach(function(t){t.stop();});window._txStream=null;}
        sipSession=null;
        // Hide call UI, show callback form
        const ov = document.getElementById('tx-ov');
        if(ov){ ov.classList.add('active'); ov.style.display='flex'; }
        document.getElementById('tx-av').style.display='none';
        document.getElementById('tx-acts').style.display='none';
        document.getElementById('tx-pad').className='tx-pad';
        const cb = document.getElementById('tx-cb');
        if(cb){ cb.style.display=''; cb.className='tx-cb show'; }
        setStatus('');

        // Auto close after 15 seconds if no interaction with visual timer
        if (callbackTimeout) clearTimeout(callbackTimeout);
        if (callbackInterval) clearInterval(callbackInterval);
        
        let timeLeft = 15;
        const msgEl = document.getElementById('tx-cbmsg');
        if (msgEl) {
            msgEl.innerHTML = '<div style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:10px;">' + T.cbAutoClose + ' <span id="tx-cb-timer">' + timeLeft + '</span> ' + T.sec + '</div>';
        }
        
        callbackTimeout = setTimeout(cleanup, 15000);
        callbackInterval = setInterval(function() {
            timeLeft--;
            const tEl = document.getElementById('tx-cb-timer');
            if (tEl) tEl.innerText = timeLeft;
            if (timeLeft <= 0) clearInterval(callbackInterval);
        }, 1000);
        
        const cbNum = document.getElementById('tx-cbnum');
        if (cbNum) {
            const clearT = function() { 
                if (callbackTimeout) clearTimeout(callbackTimeout); 
                if (callbackInterval) clearInterval(callbackInterval);
                const tEl = document.getElementById('tx-cb-timer');
                if (tEl && tEl.parentElement) tEl.parentElement.innerHTML = '';
            };
            cbNum.onfocus = clearT;
            cbNum.oninput = clearT;
        }
    }

    function submitCallback(){
        const num=document.getElementById('tx-cbnum').value.trim();
        if(!num||num.length<7){document.getElementById('tx-cbmsg').innerHTML='<span style="color:#f87171">'+T.cbBadNum+'</span>';return;}
        const btn=document.getElementById('tx-cbsend');
        btn.disabled=true;btn.textContent=T.cbSending;
        const url=C.callbackApiUrl||('https://'+C.pbxDomain.replace('pbx.','')+'supabase.co/functions/v1/pbx-web-callback');
        fetch(url,{
            method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({widgetId:C.widgetId||'default',visitorNumber:num})
        }).then(function(r){return r.json();}).then(function(d){
            document.getElementById('tx-cbmsg').innerHTML='<div class="tx-cb-ok">'+T.cbOk+'</div>';
            btn.style.display='none';
            document.getElementById('tx-cbnum').style.display='none';
            setTimeout(cleanup,4000);
        }).catch(function(){
            document.getElementById('tx-cbmsg').innerHTML='<div class="tx-cb-ok">'+T.cbOk+'</div>';
            btn.style.display='none';
            setTimeout(cleanup,4000);
        });
    }

    function cleanup(){
        if (typeof callbackTimeout !== 'undefined' && callbackTimeout) clearTimeout(callbackTimeout);
        if (typeof callbackInterval !== 'undefined' && callbackInterval) clearInterval(callbackInterval);
        if (typeof stopRingtone === 'function') stopRingtone();
        stopTimer();isMuted=false;dialpadOpen=false;
        const ov=document.getElementById('tx-ov');if(ov){ov.classList.remove('active');ov.style.display='';ov.style.animation='';}
        const fab=document.getElementById('tx-fab');if(fab)fab.style.display='flex';
        const pad=document.getElementById('tx-pad');if(pad)pad.className='tx-pad';
        const mb=document.getElementById('tx-mute');if(mb){mb.innerHTML=MIC;mb.className='tx-abtn';}
        const db=document.getElementById('tx-dial');if(db)db.className='tx-abtn';
        const av=document.getElementById('tx-av');if(av)av.style.display='flex';
        const acts=document.getElementById('tx-acts');if(acts)acts.style.display='flex';
        const cb=document.getElementById('tx-cb');if(cb)cb.className='tx-cb';
        const cbn=document.getElementById('tx-cbnum');if(cbn){cbn.value='';cbn.style.display='';}
        const cbs=document.getElementById('tx-cbsend');if(cbs){cbs.disabled=false;cbs.textContent=T.cbSend;cbs.style.display='';}
        const cbm=document.getElementById('tx-cbmsg');if(cbm)cbm.innerHTML='';
        if(window._txStream){window._txStream.getTracks().forEach(function(t){t.stop();});window._txStream=null;}
        if(sipUA){try{sipUA.stop();}catch(e){}sipUA=null;}
        sipSession=null;
    }

    // Bootstrap
    loadSip();injectCSS();
    if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',renderUI);}else{renderUI();}
})();
