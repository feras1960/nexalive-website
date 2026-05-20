import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Phone, Play, Pause, SkipForward, Volume2, VolumeX, Globe, Mic, Music, PhoneCall, Headphones } from "lucide-react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";

// ═══════════════════════════════════════════
// 🎙️ NexaLive IVR Demo Player v2
// Professional IVR with real ElevenLabs audio
// Background music + product info hold messages
// ═══════════════════════════════════════════

const LANGUAGE_FLAGS: Record<string, string> = {
  en: "🇬🇧", ar: "🇸🇦", fr: "🇫🇷", de: "🇩🇪", nl: "🇳🇱",
  it: "🇮🇹", tr: "🇹🇷", ru: "🇷🇺", uk: "🇺🇦", ro: "🇷🇴", pl: "🇵🇱"
};

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", ar: "العربية", fr: "Français", de: "Deutsch", nl: "Nederlands",
  it: "Italiano", tr: "Türkçe", ru: "Русский", uk: "Українська", ro: "Română", pl: "Polski"
};

// IVR audio files path pattern: /audio/ivr/{type}-{lang}.mp3
// Types: welcome, hold1, hold2
const AUDIO_BASE = "/audio/ivr";

// Languages that have audio files generated
const AUDIO_AVAILABLE = new Set(["ar"]); // Start with Arabic, add more as generated

// IVR subtitle text for each language (shown while playing)
const IVR_SUBTITLES: Record<string, { greeting: string; hold1: string; hold2: string }> = {
  en: {
    greeting: "Welcome to NexaLive, the next generation unified communication platform...",
    hold1: "NexaLive brings all your communication needs into one powerful platform. Cloud PBX, Push-to-Talk, HD Video, and SOS alerts...",
    hold2: "AI-powered analytics, military-grade encryption, 11+ languages, seamless ERP/CRM integration..."
  },
  ar: {
    greeting: "أهلاً وسهلاً بكم في نيكسا لايف، منصة الاتصالات الموحدة من الجيل القادم...",
    hold1: "نيكسا لايف يجمع كل احتياجات اتصالاتكم — المقسم السحابي، الاتصالات اللاسلكية، مؤتمرات الفيديو، وتنبيهات الطوارئ...",
    hold2: "تحليلات ذكية، تشفير عسكري، 11+ لغة، تكامل مع أنظمة ERP و CRM..."
  },
  fr: {
    greeting: "Bienvenue chez NexaLive, la plateforme de communication unifiée de nouvelle génération...",
    hold1: "NexaLive réunit tous vos besoins — PBX Cloud, radio push-to-talk, vidéoconférence HD et alertes SOS...",
    hold2: "Analyses IA, chiffrement militaire, 11+ langues, intégration ERP/CRM transparente..."
  },
  de: {
    greeting: "Willkommen bei NexaLive, der Kommunikationsplattform der nächsten Generation...",
    hold1: "NexaLive vereint alle Ihre Kommunikationsbedürfnisse — Cloud-PBX, Push-to-Talk, HD-Video und SOS-Alarme...",
    hold2: "KI-Analysen, militärische Verschlüsselung, 11+ Sprachen, nahtlose ERP/CRM-Integration..."
  },
  nl: {
    greeting: "Welkom bij NexaLive, het communicatieplatform van de volgende generatie...",
    hold1: "NexaLive brengt al uw communicatiebehoeften samen — Cloud PBX, push-to-talk, HD-video en SOS-meldingen...",
    hold2: "AI-analyses, militaire versleuteling, 11+ talen, naadloze ERP/CRM-integratie..."
  },
  it: {
    greeting: "Benvenuti in NexaLive, la piattaforma di comunicazione di nuova generazione...",
    hold1: "NexaLive riunisce tutte le esigenze comunicative — Cloud PBX, push-to-talk, video HD e avvisi SOS...",
    hold2: "Analisi IA, crittografia militare, 11+ lingue, integrazione ERP/CRM senza soluzione di continuità..."
  },
  tr: {
    greeting: "NexaLive'a hoş geldiniz, yeni nesil birleşik iletişim platformu...",
    hold1: "NexaLive tüm iletişim ihtiyaçlarınızı bir araya getiriyor — Bulut PBX, bas-konuş, HD video ve SOS uyarıları...",
    hold2: "Yapay zeka analizleri, askeri şifreleme, 11+ dil, kesintisiz ERP/CRM entegrasyonu..."
  },
  ru: {
    greeting: "Добро пожаловать в NexaLive, коммуникационную платформу нового поколения...",
    hold1: "NexaLive объединяет все коммуникационные потребности — облачная АТС, рация, HD-видео и SOS-оповещения...",
    hold2: "ИИ-аналитика, шифрование военного уровня, 11+ языков, интеграция с ERP/CRM..."
  },
  uk: {
    greeting: "Ласкаво просимо до NexaLive, комунікаційної платформи нового покоління...",
    hold1: "NexaLive об'єднує всі комунікаційні потреби — хмарна АТС, рація, HD-відео та SOS-сповіщення...",
    hold2: "ШІ-аналітика, шифрування військового рівня, 11+ мов, інтеграція з ERP/CRM..."
  },
  ro: {
    greeting: "Bine ați venit la NexaLive, platforma de comunicații de nouă generație...",
    hold1: "NexaLive reunește toate nevoile de comunicare — Cloud PBX, push-to-talk, video HD și alerte SOS...",
    hold2: "Analize IA, criptare militară, 11+ limbi, integrare ERP/CRM fără cusur..."
  },
  pl: {
    greeting: "Witamy w NexaLive, platformie komunikacyjnej nowej generacji...",
    hold1: "NexaLive łączy wszystkie potrzeby komunikacyjne — Cloud PBX, push-to-talk, HD video i powiadomienia SOS...",
    hold2: "Analizy AI, szyfrowanie wojskowe, 11+ języków, bezproblemowa integracja ERP/CRM..."
  }
};

type IVRState = "idle" | "ringing" | "greeting" | "music1" | "hold1" | "music2" | "hold2" | "music3" | "ended";

const STATE_LABELS: Record<IVRState, { en: string; ar: string }> = {
  idle: { en: "Press Play to hear NexaLive IVR", ar: "اضغط تشغيل لسماع الرد الآلي" },
  ringing: { en: "Calling NexaLive...", ar: "جاري الاتصال بنيكسا لايف..." },
  greeting: { en: "Welcome Message", ar: "رسالة الترحيب" },
  music1: { en: "♪ Hold Music", ar: "♪ موسيقى الانتظار" },
  hold1: { en: "Solutions & Features", ar: "الحلول والمميزات" },
  music2: { en: "♪ Hold Music", ar: "♪ موسيقى الانتظار" },
  hold2: { en: "Platform & Integration", ar: "المنصة والتكامل" },
  music3: { en: "♪ Hold Music", ar: "♪ موسيقى الانتظار" },
  ended: { en: "Demo Complete", ar: "انتهى العرض" },
};

// Background music volume levels
const MUSIC_VOL_FULL = 0.35;    // During music-only segments (louder)
const MUSIC_VOL_DUCKED = 0.08;  // During voice messages (soft background)
const MUSIC_FADE_MS = 1500;     // Fade duration — slow & smooth

export default function NexaIVRPlayer() {
  const { t, language, isRTL } = useNexaLanguage();
  const [state, setState] = useState<IVRState>("idle");
  const [currentLangIdx, setCurrentLangIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelledRef = useRef(false);

  // Ordered languages based on user's browsing language
  const orderedLangs = useMemo(() => {
    const allLangs = Object.keys(LANGUAGE_NAMES);
    const primary = language as string;
    const result: string[] = [];
    
    if (allLangs.includes(primary)) result.push(primary);
    if (primary !== "en") result.push("en");
    allLangs.forEach(l => { if (!result.includes(l)) result.push(l); });
    
    return result;
  }, [language]);

  const currentLang = orderedLangs[currentLangIdx] || "ar";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      voiceAudioRef.current?.pause();
      if (bgMusicRef.current) { bgMusicRef.current.pause(); bgMusicRef.current = null; }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    };
  }, []);

  // Smooth volume fade for background music
  const fadeMusicTo = useCallback((targetVol: number) => {
    const music = bgMusicRef.current;
    if (!music) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    
    const actualTarget = isMuted ? 0 : targetVol;
    const startVol = music.volume;
    const diff = actualTarget - startVol;
    const steps = 30;
    const stepTime = MUSIC_FADE_MS / steps;
    let step = 0;
    
    fadeTimerRef.current = setInterval(() => {
      step++;
      if (step >= steps) {
        music.volume = actualTarget;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
        return;
      }
      // Ease-in-out curve
      const t = step / steps;
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      music.volume = startVol + diff * ease;
    }, stepTime);
  }, [isMuted]);

  // Start background music (real MP3 file, loops continuously)
  const startMusic = useCallback(() => {
    if (bgMusicRef.current) { bgMusicRef.current.pause(); }
    const music = new Audio(`${AUDIO_BASE}/hold-music.mp3`);
    music.loop = true;
    music.volume = 0;
    bgMusicRef.current = music;
    music.play().then(() => {
      fadeMusicTo(MUSIC_VOL_FULL);
    }).catch(err => console.warn("Music autoplay blocked:", err));
  }, [fadeMusicTo]);

  const stopMusic = useCallback(() => {
    const music = bgMusicRef.current;
    if (!music) return;
    fadeMusicTo(0);
    setTimeout(() => {
      music.pause();
      bgMusicRef.current = null;
    }, MUSIC_FADE_MS + 100);
  }, [fadeMusicTo]);

  const duckMusic = useCallback(() => fadeMusicTo(MUSIC_VOL_DUCKED), [fadeMusicTo]);
  const raiseMusic = useCallback(() => fadeMusicTo(MUSIC_VOL_FULL), [fadeMusicTo]);

  // Play an MP3 file — returns a promise that resolves when done
  const playAudioFile = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (cancelledRef.current) { resolve(); return; }
      
      const audio = new Audio(src);
      audio.volume = isMuted ? 0 : 1;
      voiceAudioRef.current = audio;
      
      audio.onended = () => resolve();
      audio.onerror = () => {
        console.warn(`Audio file not available: ${src}, falling back to TTS`);
        resolve();
      };
      audio.play().catch(() => resolve());
    });
  }, [isMuted]);

  // For languages without audio: show subtitle text with timed display (no bad TTS)
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  // Wait for a duration (music-only segment or reading pause)
  const waitDuration = useCallback((durationMs: number): Promise<void> => {
    return new Promise((resolve) => {
      if (cancelledRef.current) { resolve(); return; }
      timerRef.current = setTimeout(resolve, durationMs);
    });
  }, []);

  // Play IVR message — ducks music, plays voice or shows subtitle
  const playIVRMessage = useCallback(async (type: "welcome" | "hold1" | "hold2", lang: string): Promise<void> => {
    duckMusic(); // Lower background music
    const subtitles = IVR_SUBTITLES[lang] || IVR_SUBTITLES.en;
    const textMap = { welcome: subtitles.greeting, hold1: subtitles.hold1, hold2: subtitles.hold2 };
    
    if (AUDIO_AVAILABLE.has(lang)) {
      setCurrentSubtitle(textMap[type]);
      await playAudioFile(`${AUDIO_BASE}/${type}-${lang}.mp3`);
      setCurrentSubtitle("");
    } else {
      // No audio file → show subtitle with music, timed reading pace
      const text = textMap[type];
      setCurrentSubtitle(text);
      // ~80ms per character = natural reading pace
      const readingTime = Math.max(4000, text.length * 80);
      await waitDuration(readingTime);
      setCurrentSubtitle("");
    }
  }, [playAudioFile, duckMusic, waitDuration]);

  const stopAll = useCallback(() => {
    cancelledRef.current = true;
    voiceAudioRef.current?.pause();
    voiceAudioRef.current = null;
    // Kill music immediately (no fade) to prevent overlap
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current = null;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentSubtitle("");
    setState("idle");
    setProgress(0);
    setTimeout(() => { cancelledRef.current = false; }, 100);
  }, []);

  const runSequence = useCallback(async (langIdx: number = 0) => {
    cancelledRef.current = false;
    setCurrentLangIdx(langIdx);
    const lang = orderedLangs[langIdx] || "ar";

    // Start background music immediately — it plays through the ENTIRE call
    startMusic();

    // Ring
    setState("ringing");
    setProgress(5);
    await waitDuration(2000);
    if (cancelledRef.current) return;

    // Greeting (music ducks automatically inside playIVRMessage)
    setState("greeting");
    setProgress(15);
    await playIVRMessage("welcome", lang);
    if (cancelledRef.current) return;

    // Music 1 — raise volume smoothly for music-only segment
    setState("music1");
    setProgress(30);
    raiseMusic();
    await waitDuration(8000);
    if (cancelledRef.current) return;

    // Hold 1 — Solutions & Features (music ducks)
    setState("hold1");
    setProgress(45);
    await playIVRMessage("hold1", lang);
    if (cancelledRef.current) return;

    // Music 2 — longer hold music segment
    setState("music2");
    setProgress(60);
    raiseMusic();
    await waitDuration(8000);
    if (cancelledRef.current) return;

    // Hold 2 — Platform & Integration (music ducks)
    setState("hold2");
    setProgress(75);
    await playIVRMessage("hold2", lang);
    if (cancelledRef.current) return;

    // Music 3 — final music segment
    setState("music3");
    setProgress(90);
    raiseMusic();
    await waitDuration(6000);
    if (cancelledRef.current) return;

    // Done — fade out music
    stopMusic();
    setState("ended");
    setProgress(100);
  }, [orderedLangs, playIVRMessage, startMusic, stopMusic, raiseMusic, waitDuration]);

  const handlePlay = () => {
    if (state === "idle" || state === "ended") {
      runSequence(0);
    }
  };

  const handleSkipLang = () => {
    stopAll();
    const nextIdx = (currentLangIdx + 1) % orderedLangs.length;
    setTimeout(() => runSequence(nextIdx), 150);
  };

  const isPlaying = state !== "idle" && state !== "ended";
  const stateLabel = STATE_LABELS[state];
  const subtitles = IVR_SUBTITLES[currentLang] || IVR_SUBTITLES.en;
  const hasRealAudio = AUDIO_AVAILABLE.has(currentLang);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl dark:bg-nexa-surface-elevated/40 bg-white border dark:border-white/10 border-gray-200 shadow-2xl"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-nexa-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
        
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b dark:border-white/5 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nexa-primary to-blue-500 flex items-center justify-center shadow-nexa">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold dark:text-white text-gray-900 text-lg">
                {t("nexa.ui.interactive_ivr_demo")}
              </h3>
              <p className="text-sm dark:text-nexa-text-muted text-gray-500">
                {t("nexa.ui.hear_how_ivr_works_in_your_lan")}
              </p>
            </div>
            {hasRealAudio && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full dark:bg-green-500/10 bg-green-50 border dark:border-green-500/20 border-green-200">
                <Headphones className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-bold text-green-600 dark:text-green-400">
                  {t("nexa.ui.pro_voice")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Player Body */}
        <div className="relative px-6 py-5">
          {/* Language + status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 dark:text-nexa-primary text-blue-500" />
              <span className="text-sm font-medium dark:text-nexa-text-secondary text-gray-600">
                {t("nexa.ui.language")}
              </span>
              <span className="text-lg font-bold dark:text-white text-gray-900">
                {LANGUAGE_FLAGS[currentLang]} {LANGUAGE_NAMES[currentLang]}
              </span>
            </div>
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              />
            )}
          </div>

          {/* State display */}
          <div className="mb-4 p-3 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-100">
            <div className="flex items-center gap-2">
              {state === "ringing" && (
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                  <Phone className="w-5 h-5 text-green-400" />
                </motion.div>
              )}
              {(state === "greeting" || state === "hold1" || state === "hold2") && (
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                  <Mic className="w-5 h-5 text-nexa-primary" />
                </motion.div>
              )}
              {(state === "music1" || state === "music2" || state === "music3") && (
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>
                  <Music className="w-5 h-5 text-purple-400" />
                </motion.div>
              )}
              {(state === "idle" || state === "ended") && (
                <PhoneCall className="w-5 h-5 dark:text-nexa-text-muted text-gray-400" />
              )}
              <span className="font-medium dark:text-white text-gray-800 text-sm">
                {isRTL ? stateLabel.ar : stateLabel.en}
              </span>
            </div>
            
            {/* Subtitles */}
            {currentSubtitle && (
              <motion.p
                key={currentSubtitle.substring(0, 20)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-2 text-xs dark:text-nexa-text-secondary text-gray-500 leading-relaxed"
                dir={currentLang === "ar" ? "rtl" : "ltr"}
              >
                {currentSubtitle}
              </motion.p>
            )}
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="w-full h-1.5 rounded-full dark:bg-white/10 bg-gray-200 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-nexa-primary to-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              {isMuted
                ? <VolumeX className="w-4 h-4 dark:text-nexa-text-muted text-gray-500" />
                : <Volume2 className="w-4 h-4 dark:text-nexa-text-secondary text-gray-600" />
              }
            </button>

            <button
              onClick={isPlaying ? stopAll : handlePlay}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                isPlaying
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/25"
                  : "bg-gradient-to-br from-nexa-primary to-blue-500 hover:from-nexa-primary/90 hover:to-blue-500/90 shadow-nexa-lg"
              }`}
            >
              {isPlaying
                ? <Pause className="w-6 h-6 text-white" />
                : <Play className="w-6 h-6 text-white ms-0.5" />
              }
            </button>

            <button
              onClick={handleSkipLang}
              disabled={!isPlaying}
              className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-30"
              title={t("nexa.ui.next_language")}
            >
              <SkipForward className="w-4 h-4 dark:text-nexa-text-secondary text-gray-600" />
            </button>
          </div>
        </div>

        {/* Language Queue */}
        <div className="relative px-6 pb-5 pt-2 border-t dark:border-white/5 border-gray-100">
          <p className="text-xs font-medium dark:text-nexa-text-muted text-gray-400 mb-3">
            {t("nexa.ui.language_queue")}
          </p>
          <div className="flex flex-wrap gap-2">
            {orderedLangs.map((lang, idx) => (
              <motion.button
                key={lang}
                onClick={() => { if (isPlaying) { stopAll(); setTimeout(() => runSequence(idx), 200); } }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  idx === currentLangIdx && isPlaying
                    ? "dark:bg-nexa-primary/20 bg-blue-100 dark:text-nexa-primary text-blue-600 border dark:border-nexa-primary/30 border-blue-200 ring-2 ring-nexa-primary/20"
                    : "dark:bg-white/5 bg-gray-50 dark:text-nexa-text-secondary text-gray-600 border dark:border-white/5 border-gray-200 hover:dark:bg-white/10 hover:bg-gray-100"
                }`}
                animate={idx === currentLangIdx && isPlaying ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span>{LANGUAGE_FLAGS[lang]}</span>
                <span>{LANGUAGE_NAMES[lang]}</span>
                {AUDIO_AVAILABLE.has(lang) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" title="Pro Voice" />
                )}
                {idx === 0 && (
                  <span className="px-1 py-0.5 rounded text-[9px] dark:bg-nexa-primary/30 bg-blue-200 dark:text-nexa-primary text-blue-700 font-bold">
                    {t("nexa.ui.you")}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
