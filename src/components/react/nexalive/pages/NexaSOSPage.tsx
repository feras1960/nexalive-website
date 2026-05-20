import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Siren, MapPin, Activity, HardHat, ShieldAlert, 
  EyeOff, Map, FileWarning, Clock, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaSection, NexaCTABanner } from "../NexaPageTemplate";
import NexaHeader from "../NexaHeader";
import NexaFooter from "../NexaFooter";

// ═══ SOS Hero — Full-screen rotating showcase like NexaCinematicShowcase ═══
const heroSlides = [
  {
    id: "alert",
    icon: Siren,
    video: "/videos/features/sos-phone-ground.mp4",
    titleKey: "nexa.sos.hero.alert.title",
    subtitleKey: "nexa.sos.hero.alert.subtitle",
    stats: [
      { value: "GPS", labelKey: "nexa.sos.hero.stat.gps" },
      { value: "<3s", labelKey: "nexa.sos.hero.stat.response" },
      { value: "24/7", labelKey: "nexa.sos.hero.stat.monitoring" },
    ],
  },
  {
    id: "quick",
    icon: Activity,
    video: "/videos/features/sos-pocket-grab.mp4",
    titleKey: "nexa.sos.hero.quick.title",
    subtitleKey: "nexa.sos.hero.quick.subtitle",
    stats: [
      { value: "1-Touch", labelKey: "nexa.sos.hero.stat.activation" },
      { value: "Lock", labelKey: "nexa.sos.hero.stat.lockscreen" },
      { value: "PTT", labelKey: "nexa.sos.hero.stat.ptt" },
    ],
  },
  {
    id: "activate",
    icon: ShieldAlert,
    video: "/videos/features/sos-swipe-activate.mp4",
    titleKey: "nexa.sos.hero.activate.title",
    subtitleKey: "nexa.sos.hero.activate.subtitle",
    stats: [
      { value: "E2E", labelKey: "nexa.sos.hero.stat.encryption" },
      { value: "Swipe", labelKey: "nexa.sos.hero.stat.gesture" },
      { value: "Auto", labelKey: "nexa.sos.hero.stat.audio" },
    ],
  },
  {
    id: "command",
    icon: Map,
    video: "/videos/features/sos-command-center.mp4",
    titleKey: "nexa.sos.hero.command.title",
    subtitleKey: "nexa.sos.hero.command.subtitle",
    stats: [
      { value: "Live", labelKey: "nexa.sos.hero.stat.tracking" },
      { value: "3-Tier", labelKey: "nexa.sos.hero.stat.escalation" },
      { value: "Log", labelKey: "nexa.sos.hero.stat.audit" },
    ],
  },
];

const SLIDE_DURATION = 7000;

function SOSHeroShowcase() {
  const { isRTL, t } = useNexaLanguage();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => goTo((active + 1) % heroSlides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + heroSlides.length) % heroSlides.length), [active, goTo]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        setActive(prev => (prev + 1) % heroSlides.length);
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  const slide = heroSlides[active];
  const SlideIcon = slide.icon;

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden"
      style={{ background: '#0A0A0A' }}>

      {/* Background Video */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
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
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className={`absolute inset-0 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/70 via-transparent to-transparent`} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center pb-24">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 mb-5">
                <SlideIcon className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  {t("nexa.sos.badge")}
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
            <a href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 w-fit"
              style={{ background: '#EF4444', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)' }}>
              {t("nexa.global.learnMore")}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronLeft className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="relative h-[4px] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === active ? 40 : 12, background: 'rgba(255,255,255,0.15)' }}
              >
                {i === active && (
                  <motion.div
                    className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} rounded-full bg-red-500`}
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
                {i < active && (
                  <div className="absolute inset-0 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>

          <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronRight className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Counter */}
        <div className={`absolute top-8 z-20 font-mono text-xs text-white/30 ${isRTL ? "left-8" : "right-8"}`}>
          {String(active + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}

// ═══ Solutions Integrated Showcase ═══
function SOSSolutionsShowcase() {
  const { t, isRTL } = useNexaLanguage();
  const [active, setActive] = useState(0);

  const slides = [
    {
      icon: Siren,
      video: "/videos/features/sos-phone-ground.mp4",
      titleKey: "nexa.sos.scenario.alert.title",
      descKey: "nexa.sos.scenario.alert.desc",
      color: "#EF4444",
      pills: ["SOS", "GPS", "Alert"],
    },
    {
      icon: Activity,
      video: "/videos/features/sos-pocket-grab.mp4",
      titleKey: "nexa.sos.scenario.quick.title",
      descKey: "nexa.sos.scenario.quick.desc",
      color: "#F59E0B",
      pills: ["Quick", "Lock", "PTT"],
    },
    {
      icon: ShieldAlert,
      video: "/videos/features/sos-swipe-activate.mp4",
      titleKey: "nexa.sos.scenario.activate.title",
      descKey: "nexa.sos.scenario.activate.desc",
      color: "#10B981",
      pills: ["Swipe", "Family", "E2E"],
    },
    {
      icon: Map,
      video: "/videos/features/sos-command-center.mp4",
      titleKey: "nexa.sos.scenario.response.title",
      descKey: "nexa.sos.scenario.response.desc",
      color: "#3B82F6",
      pills: ["Dispatch", "Radar", "Live"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const SlideIcon = slide.icon;

  return (
    <section className="py-20 dark:bg-nexa-deep-dark/50 bg-white/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            {t("nexa.sos.scenarios.title")}
          </h2>
          <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary max-w-3xl mx-auto">
            {t("nexa.sos.scenarios.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[450px]">
          {/* Video side */}
          <motion.div className={`relative ${isRTL ? "lg:order-2" : "lg:order-1"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video rounded-3xl overflow-hidden border dark:border-white/10 border-gray-200"
              >
                <video key={slide.video} src={slide.video} autoPlay muted loop playsInline
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <motion.div key={`p-${active}`} className="h-full" style={{ background: slide.color }}
                    initial={{ width: "0%" }} animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Text side */}
          <div className={`${isRTL ? "lg:order-1" : "lg:order-2"}`}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.4 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{ background: `${slide.color}15`, border: `1px solid ${slide.color}30` }}>
                  <SlideIcon className="w-4 h-4" style={{ color: slide.color }} />
                  <span className="text-xs font-semibold" style={{ color: slide.color }}>
                    {active + 1}/{slides.length}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold dark:text-white text-gray-900 mb-4">
                  {t(slide.titleKey)}
                </h3>
                <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed mb-6">
                  {t(slide.descKey)}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {slide.pills.map((pill) => (
                    <span key={pill} className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                      style={{ background: `${slide.color}15`, color: slide.color, border: `1px solid ${slide.color}30` }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-3 flex-wrap">
              {slides.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <button key={i} onClick={() => setActive(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border
                      ${i === active
                        ? 'dark:bg-white/10 bg-gray-100 border-white/20 scale-105'
                        : 'dark:bg-white/5 bg-gray-50 border-transparent hover:border-white/10 opacity-50 hover:opacity-80'
                      }`}>
                    <SIcon className="w-4 h-4" style={{ color: s.color }} />
                    <span className="text-xs font-medium dark:text-white/70 text-gray-600 hidden sm:inline">
                      {t(`nexa.sos.scenario.${i === 0 ? 'alert' : i === 1 ? 'quick' : i === 2 ? 'activate' : 'response'}.label`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailedFeatureBlock({ icon, titleKey, descKey, points }: { 
  icon: React.ReactNode; titleKey: string; descKey: string; points: string[] 
}) {
  const { t } = useNexaLanguage();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl dark:bg-red-500/10 bg-red-500/5 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{t(titleKey)}</h3>
          <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(descKey)}</p>
        </div>
      </div>
      <div className="space-y-3 ltr:ml-16 rtl:mr-16">
        {points.map((key, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
            <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(key)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function NexaSOSContent() {
  const { t } = useNexaLanguage();

  const sosFeatures = [
    { icon: <Siren className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.instant.title", descKey: "nexa.sos.feat.instant.desc" },
    { icon: <MapPin className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.gps.title", descKey: "nexa.sos.feat.gps.desc" },
    { icon: <Activity className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.audio.title", descKey: "nexa.sos.feat.audio.desc" },
    { icon: <HardHat className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.lone.title", descKey: "nexa.sos.feat.lone.desc" },
    { icon: <ShieldAlert className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.escalate.title", descKey: "nexa.sos.feat.escalate.desc" },
    { icon: <EyeOff className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.stealth.title", descKey: "nexa.sos.feat.stealth.desc" },
  ];

  return (
    <div className="dark:bg-nexa-deep-dark bg-nexa-light-bg min-h-screen transition-colors">
      <NexaHeader />

      {/* Full-screen cinematic hero with rotating slides */}
      <SOSHeroShowcase />

      <NexaPageWrapper>
        {/* Solutions Showcase */}
        <SOSSolutionsShowcase />

        {/* Features Grid */}
        <NexaSection titleKey="nexa.sos.features.title" subtitleKey="nexa.sos.features.subtitle" id="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sosFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative p-6 rounded-2xl dark:bg-nexa-surface-elevated/50 bg-white 
                  border dark:border-white/5 border-gray-100 
                  dark:hover:border-red-500/30 hover:border-red-500/20
                  hover:shadow-nexa transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl dark:bg-red-500/10 bg-red-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </NexaSection>

        {/* Lone Worker */}
        <NexaSection titleKey="nexa.sos.detail.loneworker.title" subtitleKey="nexa.sos.detail.loneworker.subtitle" dark>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DetailedFeatureBlock icon={<Activity className="w-6 h-6 text-red-500" />}
              titleKey="nexa.sos.detail.mandown.title" descKey="nexa.sos.detail.mandown.desc"
              points={["nexa.sos.detail.mandown.p1", "nexa.sos.detail.mandown.p2", "nexa.sos.detail.mandown.p3"]} />
            <DetailedFeatureBlock icon={<Clock className="w-6 h-6 text-red-500" />}
              titleKey="nexa.sos.detail.checkin.title" descKey="nexa.sos.detail.checkin.desc"
              points={["nexa.sos.detail.checkin.p1", "nexa.sos.detail.checkin.p2", "nexa.sos.detail.checkin.p3"]} />
            <DetailedFeatureBlock icon={<HardHat className="w-6 h-6 text-red-500" />}
              titleKey="nexa.sos.detail.nomovement.title" descKey="nexa.sos.detail.nomovement.desc" points={[]} />
          </div>
        </NexaSection>

        {/* Dispatcher */}
        <NexaSection titleKey="nexa.sos.dispatch.title" subtitleKey="nexa.sos.dispatch.subtitle">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DetailedFeatureBlock icon={<Map className="w-6 h-6 text-red-500" />}
              titleKey="nexa.sos.dispatch.map.title" descKey="nexa.sos.dispatch.map.desc" points={[]} />
            <DetailedFeatureBlock icon={<FileWarning className="w-6 h-6 text-red-500" />}
              titleKey="nexa.sos.dispatch.log.title" descKey="nexa.sos.dispatch.log.desc" points={[]} />
          </div>
        </NexaSection>

        <NexaCTABanner titleKey="nexa.sos.cta.title" descKey="nexa.sos.cta.desc" />
      </NexaPageWrapper>
    </div>
  );
}

export default function NexaSOSPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaSOSContent />
    </NexaLiveLanguageProvider>
  );
}
