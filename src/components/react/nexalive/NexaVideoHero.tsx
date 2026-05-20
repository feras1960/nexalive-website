import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { ArrowRight, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NexaVideoHeroProps {
  /** Path to video in /videos/ */
  videoSrc: string;
  /** Optional poster image for pre-load */
  posterSrc?: string;
  /** Translation key for the badge text */
  badgeKey: string;
  /** Badge icon */
  badgeIcon?: LucideIcon;
  /** Translation key for the hero title */
  titleKey: string;
  /** Translation key for the hero subtitle */
  subtitleKey: string;
  /** Optional description key */
  descriptionKey?: string;
  /** Gradient overlay color classes */
  gradient?: string;
  /** Hero visual component (right side) */
  heroVisual?: React.ReactNode;
  /** Custom CTA button text key (defaults to "Learn More") */
  ctaKey?: string;
  /** CTA link */
  ctaHref?: string;
  /** Glass panel opacity (0-1, default 0.55) */
  glassOpacity?: number;
  /** Glass blur amount in px (default 16) */
  glassBlur?: number;
}

const NexaVideoHero: React.FC<NexaVideoHeroProps> = ({
  videoSrc,
  posterSrc,
  badgeKey,
  badgeIcon: BadgeIcon,
  titleKey,
  subtitleKey,
  descriptionKey,
  gradient = "from-nexa-primary/20 via-blue-500/10 to-transparent",
  heroVisual,
  ctaKey,
  ctaHref = "#features",
  glassOpacity = 0.55,
  glassBlur = 16,
}) => {
  const { t, isRTL } = useNexaLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slower playback for background ambiance
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden min-h-[70vh] flex items-center">
      {/* ═══ Video Background ═══ */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
      </div>

      {/* ═══ Content ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${isRTL ? "lg:text-right" : "lg:text-left"} text-center`}
          >
            {/* Glass Container */}
            <div
              className="inline-block rounded-3xl p-8 md:p-10 border border-white/15 max-w-xl"
              style={{
                background: `rgba(10, 15, 28, ${glassOpacity})`,
                backdropFilter: `blur(${glassBlur}px)`,
                WebkitBackdropFilter: `blur(${glassBlur}px)`,
              }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                {BadgeIcon && <BadgeIcon className="w-4 h-4 text-[var(--accent-primary)]" />}
                <span className="text-sm font-semibold text-[var(--accent-primary)]">
                  {t(badgeKey)}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
              >
                {t(titleKey)}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-white/80 max-w-xl mb-4 leading-relaxed"
              >
                {t(subtitleKey)}
              </motion.p>

              {/* Description */}
              {descriptionKey && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-sm text-white/60 max-w-xl mb-6 leading-relaxed"
                >
                  {t(descriptionKey)}
                </motion.p>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`flex flex-col sm:flex-row gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}
              >
                <a
                  href={ctaHref}
                  className={`group flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${isRTL ? "flex-row-reverse" : ""}`}
                  style={{ background: "var(--accent-primary)" }}
                >
                  <span>{ctaKey ? t(ctaKey) : (t("nexa.ui.learn_more"))}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>
                <a
                  href="#download"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>{t("nexa.ui.download_free")}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Visual (right side) */}
          {heroVisual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              {heroVisual}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-[5]" />
    </section>
  );
};

export default NexaVideoHero;
