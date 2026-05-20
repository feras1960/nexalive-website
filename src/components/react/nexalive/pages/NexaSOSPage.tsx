import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Siren, MapPin, Activity, HardHat, ShieldAlert, 
  EyeOff, Map, FileWarning, Clock
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, FeatureCard, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollFadeUp } from "../useAnimations";

// ═══ SOS Cinematic Showcase — rotating videos with info ═══
function SOSCinematicShowcase() {
  const { t, isRTL } = useNexaLanguage();
  const [active, setActive] = useState(0);

  const slides = [
    {
      icon: Siren,
      video: "/videos/features/sos-phone-ground.mp4",
      titleKey: "nexa.sos.scenario.alert.title",
      descKey: "nexa.sos.scenario.alert.desc",
      color: "#EF4444",
      gradient: "from-red-500/20 to-orange-500/10",
      pills: ["SOS", "GPS", "Alert"],
      label: "nexa.sos.scenario.alert.label",
    },
    {
      icon: Activity,
      video: "/videos/features/sos-pocket-grab.mp4",
      titleKey: "nexa.sos.scenario.quick.title",
      descKey: "nexa.sos.scenario.quick.desc",
      color: "#F59E0B",
      gradient: "from-amber-500/20 to-yellow-500/10",
      pills: ["Quick", "Lock", "PTT"],
      label: "nexa.sos.scenario.quick.label",
    },
    {
      icon: ShieldAlert,
      video: "/videos/features/sos-swipe-activate.mp4",
      titleKey: "nexa.sos.scenario.activate.title",
      descKey: "nexa.sos.scenario.activate.desc",
      color: "#10B981",
      gradient: "from-emerald-500/20 to-teal-500/10",
      pills: ["Swipe", "Family", "E2E"],
      label: "nexa.sos.scenario.activate.label",
    },
    {
      icon: Map,
      video: "/videos/features/sos-command-center.mp4",
      titleKey: "nexa.sos.scenario.response.title",
      descKey: "nexa.sos.scenario.response.desc",
      color: "#3B82F6",
      gradient: "from-blue-500/20 to-indigo-500/10",
      pills: ["Dispatch", "Radar", "Live"],
      label: "nexa.sos.scenario.response.label",
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
        {/* Section header */}
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
                <video
                  key={slide.video}
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <motion.div
                    key={`progress-${active}`}
                    className="h-full"
                    style={{ background: slide.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Text side */}
          <div className={`${isRTL ? "lg:order-1" : "lg:order-2"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{ background: `${slide.color}15`, border: `1px solid ${slide.color}30` }}
                >
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

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {slide.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                      style={{
                        background: `${slide.color}15`,
                        color: slide.color,
                        border: `1px solid ${slide.color}30`,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide selector buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {slides.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border
                      ${i === active
                        ? 'dark:bg-white/10 bg-gray-100 border-white/20 scale-105'
                        : 'dark:bg-white/5 bg-gray-50 border-transparent hover:border-white/10 opacity-50 hover:opacity-80'
                      }`}
                  >
                    <SIcon className="w-4 h-4" style={{ color: s.color }} />
                    <span className="text-xs font-medium dark:text-white/70 text-gray-600 hidden sm:inline">
                      {i === 0 ? t("nexa.sos.scenario.alert.label") :
                       i === 1 ? t("nexa.sos.scenario.quick.label") :
                       i === 2 ? t("nexa.sos.scenario.activate.label") :
                       t("nexa.sos.scenario.response.label")}
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
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.sos.badge"
        titleKey="nexa.sos.title"
        subtitleKey="nexa.sos.subtitle"
        gradient="from-red-500/10 to-transparent"
        videoSrc="/videos/features/sos-command-center.mp4"
      />

      {/* Cinematic Showcase — rotating videos with info */}
      <SOSCinematicShowcase />

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

      {/* Detailed: Lone Worker */}
      <NexaSection titleKey="nexa.sos.detail.loneworker.title" subtitleKey="nexa.sos.detail.loneworker.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DetailedFeatureBlock
            icon={<Activity className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.mandown.title"
            descKey="nexa.sos.detail.mandown.desc"
            points={["nexa.sos.detail.mandown.p1", "nexa.sos.detail.mandown.p2", "nexa.sos.detail.mandown.p3"]}
          />
          <DetailedFeatureBlock
            icon={<Clock className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.checkin.title"
            descKey="nexa.sos.detail.checkin.desc"
            points={["nexa.sos.detail.checkin.p1", "nexa.sos.detail.checkin.p2", "nexa.sos.detail.checkin.p3"]}
          />
          <DetailedFeatureBlock
            icon={<HardHat className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.nomovement.title"
            descKey="nexa.sos.detail.nomovement.desc"
            points={[]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Dispatcher Console */}
      <NexaSection titleKey="nexa.sos.dispatch.title" subtitleKey="nexa.sos.dispatch.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Map className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.dispatch.map.title"
            descKey="nexa.sos.dispatch.map.desc"
            points={[]}
          />
          <DetailedFeatureBlock
            icon={<FileWarning className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.dispatch.log.title"
            descKey="nexa.sos.dispatch.log.desc"
            points={[]}
          />
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.sos.cta.title" descKey="nexa.sos.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaSOSPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaSOSContent />
    </NexaLiveLanguageProvider>
  );
}
