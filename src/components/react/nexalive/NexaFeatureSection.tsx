import React from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";

export interface NexaFeatureSectionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  imageSrc?: string;
  videoSrc?: string;
  animationType?: "ptt-button" | "sos-pulse" | "video-live" | "ai-waves" | "cloud-pbx";
  imageAlt: string;
  isReversed?: boolean;
  features: { icon: React.ElementType; title: string; description: string }[];
  badge?: string;
  glowColor?: "blue" | "cyan" | "sos" | "success" | "purple";
}

// ═══ Cloud PBX — Realistic Call Flow ═══
function CloudPBXFeatureAnimation() {
  // Layout: Caller(left) → IVR → PBX(center) → Extensions(right)
  const CX = 175, CY = 150;
  const ivrX = 80, ivrY = 150;
  const exts = [
    { x: 275, y: 70,  label: "101", color: "#34D399", r: 15 },
    { x: 290, y: 150, label: "102", color: "#60A5FA", r: 17 },
    { x: 275, y: 230, label: "103", color: "#FBBF24", r: 14 },
    { x: 220, y: 275, label: "104", color: "#22D3EE", r: 13 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #060e1a 0%, #0e1a2e 50%, #0a1225 100%)' }}>
      <style>{`
        @keyframes pbxGlow3 { 0%,100% { filter: drop-shadow(0 0 6px #7C3AED30); } 50% { filter: drop-shadow(0 0 16px #7C3AED50); } }
        @keyframes ivrGlow { 0%,100% { filter: drop-shadow(0 0 4px #A78BFA20); } 50% { filter: drop-shadow(0 0 10px #A78BFA40); } }
        @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(1px,-2px); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-2px,1px); } }
        @keyframes callerIn {
          0%,2% { opacity: 0; transform: translateX(-8px); }
          8%,85% { opacity: 1; transform: translateX(0); }
          92%,100% { opacity: 0; transform: translateX(4px); }
        }
        @keyframes lineP1 { 0%,6% { opacity: 0; } 10%,30% { opacity: 0.7; } 34%,100% { opacity: 0; } }
        @keyframes lineP2 { 0%,32% { opacity: 0; } 36%,56% { opacity: 0.7; } 60%,100% { opacity: 0; } }
        @keyframes lineP3 { 0%,58% { opacity: 0; } 62%,82% { opacity: 0.5; } 86%,100% { opacity: 0; } }
        @keyframes ivrText { 0%,34% { opacity: 0; } 38%,54% { opacity: 1; } 58%,100% { opacity: 0; } }
        @keyframes extRing { 0%,60% { opacity: 0; } 64%,80% { opacity: 1; } 86%,100% { opacity: 0; } }
        @keyframes sparkle2 { 0%,100% { opacity: 0; } 50% { opacity: 0.5; } }
      `}</style>

      <svg width="340" height="310" viewBox="0 0 340 310" className="overflow-visible">
        {/* Soft background shapes */}
        <ellipse cx={CX} cy={CY} rx="100" ry="90" fill="none" stroke="#A78BFA" strokeWidth="0.3" strokeDasharray="3 8" opacity="0.1" />

        {/* Sparkle particles */}
        {[{x:20,y:30,d:0},{x:320,y:40,d:1},{x:15,y:260,d:2},{x:310,y:270,d:0.5},{x:170,y:15,d:1.5}].map((p,i) => (
          <circle key={`s${i}`} cx={p.x} cy={p.y} r="1.2" fill="#A78BFA" opacity="0" style={{animation:`sparkle2 5s ${p.d}s infinite`}} />
        ))}

        {/* ══ Static connection lines (subtle) ══ */}
        {/* IVR → PBX */}
        <path d={`M${ivrX + 20},${ivrY} Q${(ivrX + CX) / 2},${CY - 15} ${CX - 28},${CY}`}
          fill="none" stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.15" />
        {/* PBX → each extension */}
        {exts.map((e, i) => {
          const mx = (CX + e.x) / 2 + (i % 2 === 0 ? 8 : -12);
          const my = (CY + e.y) / 2 + (i % 2 === 0 ? -10 : 8);
          return <path key={`sl${i}`} d={`M${CX + 28},${CY} Q${mx},${my} ${e.x},${e.y}`}
            fill="none" stroke={e.color} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.12" />;
        })}

        {/* ══ IVR Node ══ */}
        <g style={{ animation: 'ivrGlow 4s ease-in-out infinite' }}>
          <rect x={ivrX - 22} y={ivrY - 22} width="44" height="44" rx="12" fill="#A78BFA10" stroke="#A78BFA50" strokeWidth="1" />
          <text x={ivrX} y={ivrY - 2} textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="800" fontFamily="monospace">IVR</text>
          <text x={ivrX} y={ivrY + 10} textAnchor="middle" fill="#A78BFA" fontSize="5.5" fontFamily="monospace" opacity="0.5">Auto</text>
        </g>
        {/* IVR "Press 1" text — appears during phase 2 */}
        <g style={{ animation: 'ivrText 10s ease-in-out infinite' }}>
          <rect x={ivrX - 28} y={ivrY + 28} width="56" height="14" rx="4" fill="#A78BFA15" stroke="#A78BFA30" strokeWidth="0.5" />
          <text x={ivrX} y={ivrY + 37} textAnchor="middle" fill="#C4B5FD" fontSize="6" fontFamily="monospace">Press 1, 2...</text>
        </g>

        {/* ══ Central PBX ══ */}
        <g style={{ animation: 'pbxGlow3 3.5s ease-in-out infinite' }}>
          <rect x={CX - 28} y={CY - 28} width="56" height="56" rx="16" fill="url(#pbxG3)" stroke="#A78BFA" strokeWidth="1.2" />
          <g transform={`translate(${CX - 11}, ${CY - 11})`}>
            <path d="M20 15.5v2.7a1.8 1.8 0 01-2 1.8 17.9 17.9 0 01-7.8-2.8 17.6 17.6 0 01-5.4-5.4A17.9 17.9 0 012 4 1.8 1.8 0 013.7 2h2.7a1.8 1.8 0 011.8 1.55c.115.87.326 1.72.63 2.53a1.8 1.8 0 01-.41 1.9l-1.14 1.15a14.4 14.4 0 005.4 5.4l1.15-1.14a1.8 1.8 0 011.9-.41c.81.304 1.66.515 2.53.63A1.8 1.8 0 0120 15.5z"
              fill="none" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <text x={CX} y={CY + 40} textAnchor="middle" fill="#C4B5FD" fontSize="7" fontWeight="600" fontFamily="monospace" opacity="0.45">NexaPBX</text>

        {/* ══ Extension Nodes ══ */}
        {exts.map((e, i) => (
          <g key={`e${i}`} style={{ animation: `${i % 2 === 0 ? 'floatA' : 'floatB'} ${4 + i * 0.5}s ease-in-out infinite` }}>
            <circle cx={e.x} cy={e.y} r={e.r} fill={`${e.color}10`} stroke={`${e.color}40`} strokeWidth="1.3" />
            <circle cx={e.x + e.r * 0.55} cy={e.y - e.r * 0.55} r="2.5" fill={e.color} opacity="0.7" />
            <text x={e.x} y={e.y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={e.r > 14 ? "9" : "7.5"} fontWeight="700" fontFamily="monospace" opacity="0.9">{e.label}</text>
          </g>
        ))}

        {/* ═══ CALL FLOW ANIMATION ═══ */}

        {/* Caller Card — left side, properly visible */}
        <g style={{ animation: 'callerIn 10s ease-in-out infinite' }}>
          <rect x="4" y="42" width="56" height="70" rx="10" fill="#0c1626" stroke="#34D399" strokeWidth="0.8" />
          <rect x="4" y="42" width="56" height="70" rx="10" fill="url(#callerG3)" opacity="0.3" />
          {/* Phone icon */}
          <circle cx="32" cy="60" r="9" fill="#34D39912" stroke="#34D39940" strokeWidth="0.8" />
          <g transform="translate(26, 54)">
            <path d="M10 7.66v1.37a.91.91 0 01-1 .91 9 9 0 01-3.93-1.4 8.89 8.89 0 01-2.73-2.73A9 9 0 01.94 1.91 .91.91 0 011.87 1h1.37a.91.91 0 01.91.78c.058.437.164.867.32 1.28a.91.91 0 01-.2.96l-.58.58a7.29 7.29 0 002.73 2.73l.58-.58a.91.91 0 01.96-.2c.413.156.843.262 1.28.32a.91.91 0 01.76.93z"
              fill="none" stroke="#34D399" strokeWidth="1" strokeLinecap="round" />
          </g>
          {/* Number */}
          <text x="32" y="79" textAnchor="middle" fill="#E2E8F0" fontSize="6" fontWeight="700" fontFamily="monospace">+966 55</text>
          <text x="32" y="88" textAnchor="middle" fill="#34D399" fontSize="5.5" fontWeight="600" fontFamily="monospace">Calling...</text>
          {/* Incoming pulse */}
          <circle cx="52" cy="48" r="4" fill="#34D399" opacity="0.8">
            <animate attributeName="r" from="3" to="7" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Phase 1: Caller → IVR — nice curve from card right-center down to IVR */}
        <path id="fp1" d={`M60,80 C65,105 65,130 ${ivrX},${ivrY - 22}`} fill="none" stroke="#34D399" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'lineP1 10s ease-in-out infinite' }} />
        <circle r="3" fill="#34D399" filter="url(#dG3)">
          <animateMotion dur="10s" repeatCount="indefinite" keyTimes="0;0.08;0.30;0.34;1" keyPoints="0;0;1;1;1" calcMode="linear">
            <mpath href="#fp1" />
          </animateMotion>
          <animate attributeName="opacity" dur="10s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.30;0.34;1" />
        </circle>

        {/* Phase 2: IVR → PBX */}
        <path id="fp2" d={`M${ivrX + 22},${ivrY} Q${(ivrX + CX) / 2},${CY - 20} ${CX - 28},${CY}`} fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'lineP2 10s ease-in-out infinite' }} />
        <circle r="3" fill="#A78BFA" filter="url(#dG3)">
          <animateMotion dur="10s" repeatCount="indefinite" keyTimes="0;0.34;0.38;0.58;0.62;1" keyPoints="0;0;0;1;1;1" calcMode="linear">
            <mpath href="#fp2" />
          </animateMotion>
          <animate attributeName="opacity" dur="10s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.34;0.38;0.58;0.62;1" />
        </circle>

        {/* Phase 3: PBX → Extension 102 (target) */}
        <path id="fp3" d={`M${CX + 28},${CY} Q${(CX + 290) / 2 - 12},${(CY + 150) / 2 + 8} 290,150`} fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'lineP3 10s ease-in-out infinite' }} />
        <circle r="3" fill="#60A5FA" filter="url(#dG3)">
          <animateMotion dur="10s" repeatCount="indefinite" keyTimes="0;0.60;0.64;0.82;0.86;1" keyPoints="0;0;0;1;1;1" calcMode="linear">
            <mpath href="#fp3" />
          </animateMotion>
          <animate attributeName="opacity" dur="10s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.60;0.64;0.82;0.86;1" />
        </circle>

        {/* Ringing on ext 102 */}
        <g style={{ animation: 'extRing 10s ease-in-out infinite' }}>
          <circle cx="290" cy="150" r="22" fill="none" stroke="#60A5FA" strokeWidth="0.8">
            <animate attributeName="r" from="17" to="28" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.35" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <rect x="268" y="170" width="44" height="14" rx="4" fill="#60A5FA12" stroke="#60A5FA30" strokeWidth="0.5" />
          <text x="290" y="179" textAnchor="middle" fill="#60A5FA" fontSize="6.5" fontWeight="600" fontFamily="monospace">Ringing…</text>
        </g>

        {/* Defs */}
        <defs>
          <linearGradient id="pbxG3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="callerG3" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </radialGradient>
          <filter id="dG3">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ═══ Animated PTT Button Visual ═══
function PTTButtonAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #111827 100%)' }}>
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map(i => (
          <div key={i} className="absolute rounded-full border-2 border-emerald-500/20"
            style={{
              width: `${120 + i * 60}px`, height: `${120 + i * 60}px`,
              animation: `ptt-pulse ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }} />
        ))}
      </div>
      {/* Center button */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
        style={{ animation: 'ptt-glow 2s ease-in-out infinite' }}>
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </div>
      {/* Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-white/60 text-sm font-medium tracking-wider uppercase">Press & Hold to Talk</span>
      </div>
      <style>{`
        @keyframes ptt-pulse { 0%,100% { transform: scale(0.8); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.1; } }
        @keyframes ptt-glow { 0%,100% { box-shadow: 0 0 20px rgba(16,185,129,0.3); } 50% { box-shadow: 0 0 40px rgba(16,185,129,0.6); } }
      `}</style>
    </div>
  );
}

// ═══ SOS Pulse Animation ═══
function SOSPulseAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a0a 0%, #1f1111 100%)' }}>
      {/* GPS grid lines */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="absolute w-full h-px bg-red-400" style={{ top: `${(i + 1) * 12.5}%` }} />
            <div className="absolute h-full w-px bg-red-400" style={{ left: `${(i + 1) * 12.5}%` }} />
          </React.Fragment>
        ))}
      </div>
      {/* Radar sweep */}
      <div className="absolute w-48 h-48 rounded-full"
        style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(239,68,68,0.15) 60deg, transparent 120deg)', animation: 'radar-sweep 3s linear infinite' }} />
      {/* Pulse rings */}
      {[1, 2, 3].map(i => (
        <div key={i} className="absolute rounded-full border border-red-500/30"
          style={{
            width: `${80 + i * 50}px`, height: `${80 + i * 50}px`,
            animation: `sos-ring ${1.5}s ease-out infinite`,
            animationDelay: `${i * 0.4}s`
          }} />
      ))}
      {/* SOS Button */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/40"
        style={{ animation: 'sos-beat 1s ease-in-out infinite' }}>
        <span className="text-white text-2xl font-black tracking-widest">SOS</span>
      </div>
      {/* GPS pin */}
      <div className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
        <div className="w-2 h-2 rounded-full bg-red-400" style={{ animation: 'sos-blink 1s infinite' }} />
        <span className="text-red-400 text-xs font-mono">GPS Active</span>
      </div>
      <style>{`
        @keyframes radar-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes sos-ring { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
        @keyframes sos-beat { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes sos-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}

// ═══ AI Waves Animation ═══
function AIWavesAnimation() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1a0f 0%, #111f17 100%)' }}>
      {/* Waveform bars */}
      <div className="flex items-end gap-1 h-24">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-emerald-600 to-emerald-300"
            style={{
              height: `${20 + Math.random() * 60}%`,
              animation: `ai-bar ${0.8 + Math.random() * 1.2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.05}s`,
              opacity: 0.4 + Math.random() * 0.6
            }} />
        ))}
      </div>
      {/* AI Label */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'sos-blink 1.5s infinite' }} />
        <span className="text-emerald-400 text-sm font-semibold">AI Transcribing...</span>
      </div>
      {/* Floating transcription text */}
      <div className="absolute bottom-6 left-6 right-6 space-y-2 opacity-40">
        <div className="h-2 bg-emerald-500/20 rounded-full w-3/4" style={{ animation: 'ai-text 3s ease-in-out infinite' }} />
        <div className="h-2 bg-emerald-500/15 rounded-full w-1/2" style={{ animation: 'ai-text 3s ease-in-out infinite', animationDelay: '0.5s' }} />
        <div className="h-2 bg-emerald-500/10 rounded-full w-2/3" style={{ animation: 'ai-text 3s ease-in-out infinite', animationDelay: '1s' }} />
      </div>
      <style>{`
        @keyframes ai-bar { 0% { height: 20%; } 100% { height: 90%; } }
        @keyframes ai-text { 0%,100% { opacity: 0.2; transform: translateX(0); } 50% { opacity: 0.5; transform: translateX(5px); } }
      `}</style>
    </div>
  );
}

// ═══ Video Live Animation ═══
function VideoLiveAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1520 0%, #111d2b 100%)' }}>
      {/* Fake video grid */}
      <div className="grid grid-cols-2 gap-2 p-6 w-full max-w-[300px]">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden border border-cyan-500/20 relative"
            style={{ background: `linear-gradient(${45 + i * 30}deg, rgba(6,182,212,0.05), rgba(6,182,212,0.15))` }}>
            {/* Person silhouette */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <svg className="w-10 h-10 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            {i === 1 && (
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/80">
                <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: 'sos-blink 1s infinite' }} />
                <span className="text-white text-[8px] font-bold">LIVE</span>
              </div>
            )}
            <div className="absolute bottom-1.5 left-1.5">
              <span className="text-cyan-300/50 text-[9px] font-medium">User {i}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom control bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {["🎤", "📹", "🔊"].map((icon, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-sm">
            {icon}
          </div>
        ))}
        <div className="w-10 h-10 rounded-full bg-red-500/80 flex items-center justify-center">
          <span className="text-white text-sm">📞</span>
        </div>
      </div>
    </div>
  );
}

const NexaFeatureSection: React.FC<NexaFeatureSectionProps> = ({
  id,
  title,
  description,
  icon: Icon,
  imageSrc,
  videoSrc,
  animationType,
  imageAlt,
  isReversed = false,
  features,
  badge,
  glowColor = "blue",
}) => {
  const { isRTL } = useNexaLanguage();
  
  const glowColors: Record<string, string> = {
    blue: "from-nexalive-blue",
    cyan: "from-nexalive-cyan",
    sos: "from-nexalive-sos",
    success: "from-nexalive-success",
    purple: "from-purple-500",
  };

  const bgColors: Record<string, string> = {
    blue: "bg-blue-500/10",
    cyan: "bg-cyan-500/10",
    sos: "bg-red-500/10",
    success: "bg-emerald-500/10",
    purple: "bg-purple-500/10",
  };

  const textColors: Record<string, string> = {
    blue: "text-blue-500",
    cyan: "text-cyan-500",
    sos: "text-red-500",
    success: "text-emerald-500",
    purple: "text-purple-500",
  };

  // Render the visual content based on type
  const renderVisual = () => {
    if (videoSrc) {
      return (
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          src={videoSrc}
        />
      );
    }
    if (animationType) {
      switch (animationType) {
        case "ptt-button": return <PTTButtonAnimation />;
        case "sos-pulse": return <SOSPulseAnimation />;
        case "video-live": return <VideoLiveAnimation />;
        case "ai-waves": return <AIWavesAnimation />;
        case "cloud-pbx": return <CloudPBXFeatureAnimation />;
      }
    }
    if (imageSrc) {
      return <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />;
    }
    return (
      <div className="dark:text-gray-500 text-gray-400 flex flex-col items-center gap-2 py-20">
        <Icon className="w-12 h-12 opacity-50" />
        <span>{imageAlt}</span>
      </div>
    );
  };

  return (
    <section id={id} className="py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            {badge && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full dark:border-white/10 border-gray-200 border ${bgColors[glowColor]} backdrop-blur-sm`}>
                <span className={`text-xs font-semibold ${textColors[glowColor]}`}>{badge}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div className={`w-14 h-14 rounded-2xl ${bgColors[glowColor]} dark:border-white/10 border-gray-200 border flex items-center justify-center`}>
                <Icon className={`w-7 h-7 ${textColors[glowColor]}`} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 leading-tight">
                {title}
              </h2>
              <p className="text-xl dark:text-gray-400 text-gray-600">
                {description}
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full dark:bg-white/5 bg-gray-100 dark:border-white/10 border-gray-200 border flex items-center justify-center">
                      <feature.icon className={`w-5 h-5 ${textColors[glowColor]}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white text-gray-900">{feature.title}</h3>
                    <p className="dark:text-gray-400 text-gray-600 mt-1 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual/Image */}
          <div className="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-gradient-to-br ${glowColors[glowColor]} to-transparent rounded-full blur-[100px] opacity-20 pointer-events-none`}></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden dark:border-white/10 border-gray-200 border shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {renderVisual()}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NexaFeatureSection;
