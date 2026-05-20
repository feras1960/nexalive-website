import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Network, Mic, Video, ShieldAlert, BrainCircuit, ArrowRight } from "lucide-react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { useCountUp } from "./useAnimations";
import {
  EncryptionAnimation,
  MeshAnimation,
  PTTAnimation,
  VideoAnimation,
  SOSAnimation,
  AIAnimation,
} from "./NexaHeroAnimations";

const featureSlides = [
  { id: "ptt", icon: Mic, label: "Push-to-Talk", Animation: PTTAnimation, color: "from-nexa-primary to-emerald-500" },
  { id: "encryption", icon: Lock, label: "E2E Encryption", Animation: EncryptionAnimation, color: "from-emerald-400 to-teal-600" },
  { id: "mesh", icon: Network, label: "Mesh Network", Animation: MeshAnimation, color: "from-blue-400 to-cyan-500" },
  { id: "video", icon: Video, label: "Video PTT", Animation: VideoAnimation, color: "from-cyan-400 to-blue-600" },
  { id: "sos", icon: ShieldAlert, label: "Emergency SOS", Animation: SOSAnimation, color: "from-red-400 to-red-600" },
  { id: "ai", icon: BrainCircuit, label: "AI Analytics", Animation: AIAnimation, color: "from-purple-400 to-violet-600" },
];

const NexaHero: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const callsRef = useCountUp(50000, { suffix: "+", duration: 2.5 });
  const encRef = useCountUp(256, { suffix: "-bit", duration: 1.8 });
  const regionsRef = useCountUp(7, { duration: 1.2 });
  const latencyRef = useCountUp(100, { prefix: "< ", suffix: "ms", duration: 1.5 });

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(prev => (prev + 1) % featureSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const current = featureSlides[activeSlide];
  const CurrentAnimation = current.Animation;
  const CurrentIcon = current.icon;

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Soft glow spots */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'var(--accent-glow)' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* ═══ Text Content (3/5 = 60%) ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-3 flex flex-col gap-6 ${t("nexa.ui.lg_text_left_items_center_lg_i")} text-center`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                background: 'rgba(0,196,122,0.08)',
                borderColor: 'rgba(0,196,122,0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>
                {t("nexa.hero.badge")}
              </span>
            </motion.div>

            {/* Headline — Ajax style: huge, tight tracking */}
            <h1 style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}
              className="text-[clamp(44px,8vw,88px)] font-extrabold">
              <span style={{ color: 'var(--text-primary)' }}>
                {t("nexa.hero.title.line1")}
              </span>
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>
                {t("nexa.hero.title.line2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.7] max-w-[540px]"
              style={{ color: 'var(--text-secondary)' }}>
              {t("nexa.hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center gap-3 mt-2 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <a
                href="#download"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-[15px]
                  transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ background: 'var(--bg-dark-section)' }}
              >
                <span>{t("nexa.hero.cta.download")}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </a>
              <a
                href="#pricing"
                className="px-7 py-3.5 rounded-xl font-semibold text-[15px] border-2 transition-all duration-200
                  hover:bg-[var(--bg-secondary)] active:scale-[0.97]"
                style={{
                  borderColor: 'var(--border-medium)',
                  color: 'var(--text-primary)',
                }}
              >
                {t("nexa.hero.cta.pricing")}
              </a>
            </div>

            {/* Stats Row */}
            <div className={`flex items-center gap-6 md:gap-10 mt-6 flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"}`}>
              {[
                { ref: callsRef, label: t("nexa.hero.stat.calls") },
                { ref: latencyRef, label: t("nexa.hero.stat.latency") },
                { ref: encRef, label: t("nexa.hero.stat.encryption") },
                { ref: regionsRef, label: t("nexa.hero.stat.regions") },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}
                >
                  <span ref={stat.ref}
                    className="text-[clamp(24px,3vw,36px)] font-extrabold font-mono"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    0
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ═══ Feature Showcase (2/5 = 40%) ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative order-first lg:order-last"
          >
            <div className="relative w-full max-w-[340px] mx-auto">
              {/* Radial glow behind phone */}
              <div className="absolute inset-[-20%] rounded-full blur-[80px] pointer-events-none transition-all duration-700"
                style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)' }} />

              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/16] shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                style={{
                  background: 'var(--bg-dark-section)',
                  border: '8px solid var(--bg-dark-section)',
                }}>
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-30" />

                {/* Active feature label */}
                <div className="absolute top-14 left-0 right-0 z-20 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
                    >
                      <CurrentIcon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span className="text-xs font-semibold text-white">{current.label}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Animated illustration */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pt-16 pb-14"
                  >
                    <CurrentAnimation />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation dots — pill style */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  {featureSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-[6px] rounded-full transition-all duration-300 ${
                        i === activeSlide
                          ? "w-6 bg-[var(--accent-primary)]"
                          : "w-[6px] bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default NexaHero;
