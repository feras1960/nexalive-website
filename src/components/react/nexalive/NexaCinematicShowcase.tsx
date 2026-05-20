import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Phone, Mic, Lock, Video, WifiOff, ShieldAlert, ArrowRight, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import NexaHeroVideoGrid from "./NexaHeroVideoGrid";

interface FeatureSlide {
  id: string;
  icon: React.ElementType;
  image?: string;
  video?: string;
  isGrid?: boolean;
  isDiagonal?: boolean;
  gradient: string;
  titleKey: string;
  subtitleKey: string;
  stats: { value: string; labelKey: string }[];
}

const slides: FeatureSlide[] = [
  {
    id: "mashup",
    icon: Activity,
    video: "/videos/hero-business-comms.mp4",
    gradient: "from-blue-900 via-indigo-900 to-slate-900",
    titleKey: "nexa.showcase.item_1.title",
    subtitleKey: "nexa.showcase.item_1.subtitle",
    stats: [
      { value: "+50,000", labelKey: "nexa.showcase.stat_1.label" },
      { value: "256-bit", labelKey: "nexa.showcase.stat_2.label" },
      { value: "<100ms", labelKey: "nexa.showcase.stat_3.label" },
    ],
  },
  {
    id: "mesh",
    icon: WifiOff,
    image: "/images/showcase-ptt.png",
    video: "/videos/feature-mesh.mp4",
    gradient: "from-amber-900 via-orange-900 to-slate-900",
    titleKey: "nexa.showcase.item_2.title",
    subtitleKey: "nexa.showcase.item_2.subtitle",
    stats: [
      { value: "Mesh", labelKey: "nexa.showcase.stat_4.label" },
      { value: "BLE", labelKey: "nexa.showcase.stat_5.label" },
      { value: "0", labelKey: "nexa.showcase.stat_6.label" },
    ],
  },
  {
    id: "military-security",
    icon: ShieldAlert,
    video: "/videos/solutions/military-security-alt.mp4",
    gradient: "from-slate-900 via-gray-900 to-black",
    titleKey: "nexa.showcase.item_3.title",
    subtitleKey: "nexa.showcase.item_3.subtitle",
    stats: [
      { value: "3", labelKey: "nexa.showcase.stat_7.label" },
      { value: "100%", labelKey: "nexa.showcase.stat_8.label" },
      { value: "0-Trust", labelKey: "nexa.showcase.stat_9.label" },
    ],
  },
  {
    id: "pbx",
    icon: Phone,
    image: "/images/showcase-pbx.png",
    video: "/videos/feature-pbx.mp4",
    gradient: "from-blue-900 via-indigo-900 to-slate-900",
    titleKey: "nexa.showcase.item_4.title",
    subtitleKey: "nexa.showcase.item_4.subtitle",
    stats: [
      { value: "7+", labelKey: "nexa.showcase.stat_10.label" },
      { value: "IVR", labelKey: "nexa.showcase.stat_11.label" },
      { value: "ACD", labelKey: "nexa.showcase.stat_12.label" },
    ],
  },
  {
    id: "ptt",
    icon: Mic,
    image: "/images/showcase-ptt.png",
    video: "/videos/feature-ptt.mp4",
    gradient: "from-emerald-900 via-teal-900 to-slate-900",
    titleKey: "nexa.showcase.item_5.title",
    subtitleKey: "nexa.showcase.item_5.subtitle",
    stats: [
      { value: "<300ms", labelKey: "nexa.showcase.stat_13.label" },
      { value: "500", labelKey: "nexa.showcase.stat_14.label" },
      { value: "HD", labelKey: "nexa.showcase.stat_15.label" },
    ],
  },
  {
    id: "encryption",
    icon: Lock,
    image: "/images/showcase-encryption.png",
    video: "/videos/solutions/solution-encryption-new.mp4",
    gradient: "from-violet-900 via-purple-900 to-slate-900",
    titleKey: "nexa.showcase.item_6.title",
    subtitleKey: "nexa.showcase.item_6.subtitle",
    stats: [
      { value: "256-bit", labelKey: "nexa.showcase.stat_16.label" },
      { value: "E2E", labelKey: "nexa.showcase.stat_17.label" },
      { value: "0", labelKey: "nexa.showcase.stat_18.label" },
    ],
  },
  {
    id: "video",
    icon: Video,
    image: "/images/showcase-encryption.png",
    video: "/videos/solutions/solution-live-video.mp4",
    gradient: "from-cyan-900 via-blue-900 to-slate-900",
    titleKey: "nexa.showcase.item_7.title",
    subtitleKey: "nexa.showcase.item_7.subtitle",
    stats: [
      { value: "1080p", labelKey: "nexa.showcase.stat_19.label" },
      { value: "Live", labelKey: "nexa.showcase.stat_20.label" },
      { value: "∞", labelKey: "nexa.showcase.stat_21.label" },
    ],
  },

  {
    id: "sos",
    icon: ShieldAlert,
    image: "/images/showcase-pbx.png",
    video: "/videos/feature-sos.mp4",
    gradient: "from-red-900 via-rose-900 to-slate-900",
    titleKey: "nexa.showcase.item_8.title",
    subtitleKey: "nexa.showcase.item_8.subtitle",
    stats: [
      { value: "GPS", labelKey: "nexa.showcase.stat_22.label" },
      { value: "3", labelKey: "nexa.showcase.stat_23.label" },
      { value: "24/7", labelKey: "nexa.showcase.stat_24.label" },
    ],
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

const floatingIconsConfig = [
  { Icon: WifiOff, color: 'text-amber-400', top: '15%', rtlLeft: '10%', ltrLeft: '80%', delay: 0.5, duration: 4 },
  { Icon: Lock, color: 'text-violet-400', top: '55%', rtlLeft: '5%', ltrLeft: '85%', delay: 1.2, duration: 5 },
  { Icon: Mic, color: 'text-emerald-400', top: '25%', rtlLeft: '35%', ltrLeft: '60%', delay: 2.1, duration: 4.5 },
  { Icon: Phone, color: 'text-blue-400', top: '45%', rtlLeft: '25%', ltrLeft: '70%', delay: 0.2, duration: 5.5 },
  { Icon: Video, color: 'text-cyan-400', top: '75%', rtlLeft: '20%', ltrLeft: '75%', delay: 3.0, duration: 4 },
  { Icon: ShieldAlert, color: 'text-red-400', top: '80%', rtlLeft: '5%', ltrLeft: '85%', delay: 1.5, duration: 6 },
  { Icon: Activity, color: 'text-indigo-400', top: '10%', rtlLeft: '25%', ltrLeft: '70%', delay: 4.5, duration: 5 },
];

const NexaCinematicShowcase: React.FC = () => {
  const { isRTL, t } = useNexaLanguage();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo]);

  const currentSlideDuration = slides[active].isGrid ? 10000 : 6000;

  // Auto-advance timer
  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / currentSlideDuration, 1);
      setProgress(p);
      if (p >= 1) {
        setActive(prev => (prev + 1) % slides.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [active, currentSlideDuration]);

  const slide = slides[active];
  const SlideIcon = slide.icon;

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden"
      style={{ background: '#0A0A0A' }}>

      {/* ═══ Background: Video > Image > Gradient ═══ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {slide.isDiagonal ? (
            <div 
              className="absolute inset-0 w-full h-full opacity-90"
              style={{ clipPath: t("nexa.ui.polygon_40_0_100_0_100_100_60") }}
            >
               <video
                 src={slide.video}
                 autoPlay
                 muted
                 loop
                 playsInline
                 preload="auto"
                 className="absolute inset-0 w-full h-full object-cover"
               />
               
               {/* Random Floating Icons for Mashup Slide */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                 {floatingIconsConfig.map((config, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, scale: 0.5, y: 20 }}
                     animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.8], y: [20, -10, -20] }}
                     transition={{ 
                       duration: config.duration, 
                       delay: config.delay, 
                       repeat: Infinity,
                       ease: "easeInOut"
                     }}
                     className={`absolute ${config.color} drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
                     style={{ top: config.top, left: isRTL ? config.rtlLeft : config.ltrLeft }}
                   >
                     <div className="bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-3xl border border-white/20 shadow-2xl">
                       <config.Icon className="w-8 h-8 md:w-12 md:h-12 opacity-100" />
                     </div>
                   </motion.div>
                 ))}
               </div>

               {/* Subtle gradient to blend the diagonal edge */}
               <div className={`absolute inset-0 bg-gradient-to-${t("nexa.ui.r")} from-[#0A0A0A]/80 to-transparent w-full pointer-events-none`} />
            </div>
          ) : slide.isGrid ? (
            <div className="absolute inset-0 w-full h-full opacity-60">
               <NexaHeroVideoGrid isEmbedded={false} />
            </div>
          ) : slide.video ? (
            <video
              key={slide.video}
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : slide.image ? (
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
          )}

          {/* Special Animated Shield Overlay for Encryption Slide */}
          {(slide.id === "encryption" || slide.id === "military-security") && (
            <div className="absolute inset-0 max-w-[1280px] mx-auto flex items-center justify-end z-0 pointer-events-none px-10 lg:px-20">
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -15, x: isRTL ? -50 : 50 }}
                animate={{ scale: 1, opacity: 0.9, rotate: 0, x: 0 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                className="relative"
              >
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-[var(--accent-primary)] blur-[100px] rounded-full opacity-60" />
                {/* Shield Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
                >
                  <motion.path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Lock Keyhole animation inside the shield */}
                  <motion.circle 
                    cx="12" cy="11" r="2" 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: 0.8, type: "spring" }} 
                  />
                  <motion.path 
                    d="M12 13v3" 
                    initial={{ pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ delay: 1.0 }} 
                  />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Dark overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className={`absolute inset-0 ${t("nexa.ui.bg_gradient_to_r")} from-black/70 via-transparent to-transparent`} />
        </motion.div>
      </AnimatePresence>

      {/* ═══ Content ═══ */}
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center pb-24 lg:pr-4 lg:pl-12" style={{ marginTop: '-10px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-content"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`w-full sm:w-[520px] lg:w-[620px] min-h-[320px] sm:min-h-[380px] p-5 sm:p-8 lg:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between ${isRTL ? "mr-0 ml-auto text-right" : ""}`}
          >
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-5">
                <SlideIcon className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                  NexaLive {slide.id.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold text-white mb-3"
                style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {t(slide.titleKey)}
              </h2>

              {/* Subtitle */}
              <p className="text-[clamp(13px,1.4vw,15px)] text-white/70 leading-relaxed mb-6 line-clamp-3">
                {t(slide.subtitleKey)}
              </p>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-6 mb-6 ${isRTL ? "text-right" : ""}`}>
              {slide.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}
                >
                  <span className="text-xl md:text-2xl font-extrabold text-white font-mono"
                    style={{ letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/50 uppercase tracking-wider mt-1">
                    {t(stat.labelKey)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 w-fit"
              style={{ background: 'var(--accent-primary)', boxShadow: '0 4px 20px rgba(0, 196, 122, 0.3)' }}>
              {t("nexa.hero.cta.start")}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* ═══ Navigation ═══ */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {/* Prev/Next */}
          <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronLeft className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="relative h-[4px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? 40 : 12, background: 'rgba(255,255,255,0.15)' }}
              >
                {i === active && (
                  <motion.div
                    className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} rounded-full`}
                    style={{ background: 'var(--accent-primary)', width: `${progress * 100}%` }}
                  />
                )}
                {i < active && (
                  <div className="absolute inset-0 rounded-full" style={{ background: 'var(--accent-primary)' }} />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronRight className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Slide counter */}
        <div className={`absolute top-8 z-20 font-mono text-xs text-white/30 ${isRTL ? "left-8" : "right-8"}`}>
          {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default NexaCinematicShowcase;
