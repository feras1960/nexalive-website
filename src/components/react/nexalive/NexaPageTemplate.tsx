import React from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { useScrollFadeUp, useScrollStagger, useInView } from "./useAnimations";
import { ArrowRight, CheckCircle } from "lucide-react";
import NexaHeader from "./NexaHeader";
import NexaFooter from "./NexaFooter";
import NexaCookieConsent from "./NexaCookieConsent";

interface FeatureItem {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

interface HeroProps {
  badgeKey: string;
  titleKey: string;
  subtitleKey: string;
  features?: FeatureItem[];
  heroVisual?: React.ReactNode;
  gradient?: string;
  /** Optional video background — path to video file in /videos/ */
  videoSrc?: string;
  isDiagonal?: boolean;
}

interface SectionProps {
  titleKey: string;
  subtitleKey?: string;
  children: React.ReactNode;
  dark?: boolean;
  id?: string;
}

// Reusable page section with scroll animation
export function NexaSection({ titleKey, subtitleKey, children, dark, id }: SectionProps) {
  const { t } = useNexaLanguage();
  const titleRef = useScrollFadeUp();
  
  return (
    <section id={id} className={`py-20 md:py-28 ${dark 
      ? "dark:bg-nexa-surface/50 bg-gray-50" 
      : "dark:bg-nexa-deep-dark bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            {t(titleKey)}
          </h2>
          {subtitleKey && (
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary max-w-3xl mx-auto">
              {t(subtitleKey)}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// Feature card used across all feature pages
export function FeatureCard({ icon, titleKey, descKey, index = 0 }: FeatureItem & { index?: number }) {
  const { t } = useNexaLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl dark:bg-nexa-surface-elevated/50 bg-white 
        border dark:border-white/5 border-gray-100 
        dark:hover:border-nexa-primary/30 hover:border-nexa-primary/20
        hover:shadow-nexa transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexa-primary/20 to-nexa-primary/5 
        flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{t(titleKey)}</h3>
      <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(descKey)}</p>
    </motion.div>
  );
}

// Full page hero with gradient or video background
export function PageHero({ badgeKey, titleKey, subtitleKey, heroVisual, gradient = "from-nexa-primary/20 via-blue-500/10 to-purple-500/10", videoSrc, isDiagonal }: HeroProps) {
  const { t, isRTL } = useNexaLanguage();
  
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background: Video or Gradient */}
      {videoSrc ? (
        <>
          {isDiagonal ? (
            <div className="absolute inset-0 z-0 bg-nexa-deep-dark">
              <div 
                className="absolute inset-0 w-full h-full opacity-90"
                style={{ clipPath: t("nexa.ui.polygon_40_0_100_0_100_100_60") }}
              >
                 <video
                   src={videoSrc}
                   autoPlay
                   muted
                   loop
                   playsInline
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className={`absolute inset-0 bg-gradient-to-${t("nexa.ui.r")} from-[#0A0A0A]/80 to-transparent w-full pointer-events-none`} />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 z-0">
              <video
                src={videoSrc}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
                style={{ playbackRate: 0.75 } as any}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
            </div>
          )}
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t dark:from-nexa-deep-dark from-nexa-light-bg to-transparent z-[1]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 dark:bg-nexa-deep-dark bg-nexa-light-bg" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} dark:opacity-100 opacity-50`} />
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${isRTL ? "lg:text-right" : "lg:text-left"} text-center`}
          >
            {/* Glass container when video is active, UNLESS diagonal */}
            <div className={(videoSrc && !isDiagonal) ? "rounded-3xl p-8 border border-white/15" : ""}
              style={(videoSrc && !isDiagonal) ? {
                background: "rgba(10, 15, 28, 0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              } : undefined}
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                ${videoSrc 
                  ? "bg-white/10 border-white/20" 
                  : "dark:bg-nexa-primary/10 bg-nexa-primary/5 dark:border-nexa-primary/30 border-nexa-primary/20"
                } border mb-6`}>
                <span className="w-2 h-2 rounded-full bg-nexa-primary animate-pulse" />
                <span className={`text-sm font-semibold ${videoSrc ? "text-[var(--accent-primary)]" : "dark:text-nexa-primary text-nexa-primary-dark"}`}>
                  {t(badgeKey)}
                </span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 ${(videoSrc && !isDiagonal) ? "text-white" : "dark:text-white text-gray-900"}`}>
                {t(titleKey)}
              </h1>
              
              <p className={`text-lg md:text-xl max-w-xl mb-8 ${(videoSrc && !isDiagonal) ? "text-white/80" : "dark:text-nexa-text-secondary text-nexa-light-text-secondary"}`}>
                {t(subtitleKey)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#download" className={`px-8 py-4 rounded-2xl font-bold text-lg 
                  transition-all flex items-center gap-2 justify-center ${
                    videoSrc 
                      ? "bg-[var(--accent-primary)] text-white hover:opacity-90 shadow-lg" 
                      : "bg-nexa-primary text-white hover:bg-nexa-primary-dark shadow-nexa hover:shadow-nexa-lg"
                  }`}>
                  {t("nexa.hero.cta.download")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </a>
                <a href="#features" className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                  videoSrc
                    ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    : "dark:border-white/15 dark:bg-white/5 dark:text-white border border-gray-300 bg-white text-gray-900 hover:scale-[1.02]"
                }`}>
                  {t("nexa.global.learnMore")}
                </a>
              </div>
            </div>
          </motion.div>
          
          {heroVisual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroVisual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// CTA Banner section
export function NexaCTABanner({ titleKey, descKey }: { titleKey: string; descKey: string }) {
  const { t, isRTL } = useNexaLanguage();
  const ref = useScrollFadeUp();
  
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative p-10 md:p-16 rounded-3xl overflow-hidden
          bg-gradient-to-r from-nexa-primary to-blue-500 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t(titleKey)}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{t(descKey)}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#download" className="px-8 py-4 rounded-2xl bg-white text-nexa-primary-dark font-bold text-lg
              hover:bg-gray-100 transition-all flex items-center gap-2 justify-center">
              {t("nexa.hero.cta.download")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </a>
            <a href="/pricing" className="px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-semibold text-lg
              hover:bg-white/10 transition-all">
              {t("nexa.hero.cta.pricing")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Wrap any feature page in providers + header + footer
export function NexaPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-nexa-deep-dark bg-nexa-light-bg min-h-screen transition-colors">
      <NexaHeader />
      {children}
      <NexaFooter />
      <NexaCookieConsent />
    </div>
  );
}
