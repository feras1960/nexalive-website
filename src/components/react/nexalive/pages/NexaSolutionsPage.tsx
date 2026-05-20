import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Hotel, Heart, Truck, ShieldCheck, HardHat, Siren, Building2, ArrowRight,
  ShoppingCart, Landmark, Shield, Users2, Headphones, MapPinned,
  Phone, Radio, Video, BarChart3 } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaSection, NexaCTABanner } from "../NexaPageTemplate";
import NexaSolutionsHero from "../NexaSolutionsHero";

const industries = [
  { icon: Factory, key: "factories", color: "from-orange-500/10 to-orange-500/5", borderColor: "border-orange-500/20", iconColor: "text-orange-500" },
  { icon: Hotel, key: "hotels", color: "from-purple-500/10 to-purple-500/5", borderColor: "border-purple-500/20", iconColor: "text-purple-500" },
  { icon: Heart, key: "hospitals", color: "from-red-500/10 to-red-500/5", borderColor: "border-red-500/20", iconColor: "text-red-500" },
  { icon: Truck, key: "logistics", color: "from-blue-500/10 to-blue-500/5", borderColor: "border-blue-500/20", iconColor: "text-blue-500" },
  { icon: ShieldCheck, key: "security", color: "from-nexa-primary/10 to-nexa-primary/5", borderColor: "border-nexa-primary/20", iconColor: "text-nexa-primary" },
  { icon: HardHat, key: "construction", color: "from-amber-500/10 to-amber-500/5", borderColor: "border-amber-500/20", iconColor: "text-amber-500" },
  { icon: Siren, key: "emergency", color: "from-red-600/10 to-red-600/5", borderColor: "border-red-600/20", iconColor: "text-red-600" },
  { icon: Building2, key: "offices", color: "from-slate-500/10 to-slate-500/5", borderColor: "border-slate-500/20", iconColor: "text-slate-500" },
  { icon: ShoppingCart, key: "ecommerce", color: "from-emerald-500/10 to-emerald-500/5", borderColor: "border-emerald-500/20", iconColor: "text-emerald-500" },
  { icon: Landmark, key: "banks", color: "from-yellow-600/10 to-yellow-600/5", borderColor: "border-yellow-600/20", iconColor: "text-yellow-600" },
  { icon: Shield, key: "government", color: "from-cyan-600/10 to-cyan-600/5", borderColor: "border-cyan-600/20", iconColor: "text-cyan-600" },
  { icon: Users2, key: "police", color: "from-indigo-500/10 to-indigo-500/5", borderColor: "border-indigo-500/20", iconColor: "text-indigo-500" },
];

// ═══ Solutions Cinematic Showcase ═══
function SolutionsShowcase({ isRTL, t }: { isRTL: boolean; t: (k: string) => string }) {
  const [active, setActive] = useState(0);

  const slides = [
    {
      icon: Phone,
      title: t("nexa.ui.cloud_pbx"),
      desc: t("nexa.ui.full_cloud_pbx_with_smart_ivr"),
      color: "#A78BFA",
      gradient: "from-violet-500/20 to-blue-500/10",
    },
    {
      icon: Radio,
      title: t("nexa.ui.field_teams_ptt"),
      desc: t("nexa.ui.instant_push_to_talk_with_live"),
      color: "#34D399",
      gradient: "from-emerald-500/20 to-cyan-500/10",
    },
    {
      icon: Shield,
      title: t("nexa.ui.security_emergency"),
      desc: t("nexa.ui.end_to_end_encryption_off_grid"),
      color: "#EF4444",
      gradient: "from-red-500/20 to-orange-500/10",
    },
    {
      icon: BarChart3,
      title: t("nexa.ui.ai_powered_analytics"),
      desc: t("nexa.ui.ai_call_analytics_automatic_tr"),
      color: "#60A5FA",
      gradient: "from-blue-500/20 to-indigo-500/10",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const SlideIcon = slide.icon;

  return (
    <section className="py-20 dark:bg-nexa-deep-dark/50 bg-white/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
          
          {/* Visual side */}
          <motion.div className={`relative ${t("nexa.ui.lg_order_1")}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${slide.gradient} 
                  border dark:border-white/10 border-gray-200 overflow-hidden flex items-center justify-center`}
              >
                {/* Background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: slide.color,
                        opacity: 0.2,
                        left: `${15 + i * 14}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Central icon */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center"
                    style={{
                      background: `${slide.color}15`,
                      border: `2px solid ${slide.color}40`,
                      boxShadow: `0 0 40px ${slide.color}20`,
                    }}
                  >
                    <SlideIcon className="w-12 h-12" style={{ color: slide.color }} />
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                    {(active === 0 ? ["IVR", "ACD", "CDR", "DID"] :
                      active === 1 ? ["PTT", "GPS", "Mesh", "SOS"] :
                      active === 2 ? ["E2EE", "Mesh", "SOS", "LWP"] :
                      ["AI", "CDR", "KPI", "NLP"]).map((pill) => (
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
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Text side */}
          <div className={`${t("nexa.ui.lg_order_2")}`}>
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
                  {slide.title}
                </h3>
                <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed mb-8">
                  {slide.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="flex items-center gap-3">
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
                      {i === 0 ? (t("nexa.ui.pbx")) :
                       i === 1 ? (t("nexa.ui.ptt")) :
                       i === 2 ? (t("nexa.ui.safety")) :
                       (t("nexa.ui.ai"))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          50% { transform: translate(5px, -8px); opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}

function NexaSolutionsContent() {
  const { t, isRTL } = useNexaLanguage();

  return (
    <div className="min-h-screen transition-colors" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* 1. Cinematic Slider Hero */}
      <NexaSolutionsHero />

      <NexaPageWrapper>
        {/* Industries Grid */}
        <NexaSection titleKey="nexa.solutions.industries.title" subtitleKey="nexa.solutions.industries.subtitle" id="industries">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.a
                  key={ind.key}
                  href={`/solutions/${ind.key}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="group relative block p-6 rounded-2xl 
                    dark:bg-nexa-surface-elevated/50 bg-white 
                    border dark:border-white/5 border-gray-100 
                    dark:hover:border-nexalive-blue/30 hover:border-nexalive-blue/20
                    hover:shadow-nexa transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl dark:bg-white/5 bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-6 h-6 ${ind.iconColor}`} />
                    </div>
                    <h3 className="font-bold dark:text-white text-gray-900 mb-2 text-lg">
                      {t(`nexa.solutions.${ind.key}.title`)}
                    </h3>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary mb-4 line-clamp-3">
                      {t(`nexa.solutions.${ind.key}.desc`)}
                    </p>
                    <div className={`flex items-center gap-1 text-nexa-primary text-sm font-medium 
                      group-hover:gap-2 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      {t("nexa.global.learnMore")}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </NexaSection>

      {/* Key Stats */}
      <section className="py-16 dark:bg-nexa-surface/50 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: t("nexa.solutions.stats.countries") },
              { value: "10K+", label: t("nexa.solutions.stats.teams") },
              { value: "99.9%", label: t("nexa.solutions.stats.uptime") },
              { value: "24/7", label: t("nexa.solutions.stats.support") },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-nexa-primary mb-1">{stat.value}</div>
                <div className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NexaCTABanner titleKey="nexa.solutions.cta.title" descKey="nexa.solutions.cta.desc" />
      </NexaPageWrapper>
    </div>
  );
}

export default function NexaSolutionsPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaSolutionsContent />
    </NexaLiveLanguageProvider>
  );
}
