import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import {
  Factory, Hotel, Heart, Truck, ShieldCheck, HardHat,
  Siren, Building2, Headset, ArrowRight, Play, ChevronDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Solution Data ───
interface SolutionSlice {
  key: string;
  icon: LucideIcon;
  video: string;
  gradient: string;
  href: string;
}

const solutionSlices: SolutionSlice[] = [
  {
    key: "factories",
    icon: Factory,
    video: "/videos/solutions/solution-manufacturing-new.mp4",
    gradient: "from-orange-600/60 to-amber-900/60",
    href: "/solutions/factories",
  },
  {
    key: "construction",
    icon: HardHat,
    video: "/videos/solutions/solution-construction.mp4",
    gradient: "from-yellow-600/60 to-orange-900/60",
    href: "/solutions/construction",
  },
  {
    key: "logistics",
    icon: Truck,
    video: "/videos/solutions/solution-logistics-new.mp4",
    gradient: "from-blue-600/60 to-indigo-900/60",
    href: "/solutions/logistics",
  },
  {
    key: "hospitals",
    icon: Heart,
    video: "/videos/solutions/solution-healthcare-new.mp4",
    gradient: "from-rose-600/60 to-red-900/60",
    href: "/solutions/hospitals",
  },
  {
    key: "emergency",
    icon: Siren,
    video: "/videos/solutions/solution-emergency-new.mp4",
    gradient: "from-red-600/60 to-rose-900/60",
    href: "/solutions/emergency",
  },
  {
    key: "security",
    icon: ShieldCheck,
    video: "/videos/solutions/solution-security-new.mp4",
    gradient: "from-emerald-600/60 to-teal-900/60",
    href: "/solutions/security",
  },
  {
    key: "offices",
    icon: Building2,
    video: "/videos/solutions/solution-offices-new.mp4",
    gradient: "from-slate-600/60 to-gray-900/60",
    href: "/solutions/offices",
  },
  {
    key: "callcenters",
    icon: Headset,
    video: "/videos/solutions/solution-callcenter-new.mp4",
    gradient: "from-violet-600/60 to-purple-900/60",
    href: "/solutions/callcenters",
  },
];

// ─── Desktop Diagonal Slice ───
function DiagonalSlice({
  slice,
  index,
  isActive,
  onClick,
  totalSlices,
}: {
  slice: SolutionSlice;
  index: number;
  isActive: boolean;
  onClick: () => void;
  totalSlices: number;
}) {
  const { t, isRTL } = useNexaLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = slice.icon;

  // Control video playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = isActive ? 1.0 : 0.5;
    }
  }, [isActive]);

  // Skew angle for diagonal effect
  const skewAngle = -8;
  // Width distribution
  const activeWidth = 55;
  const inactiveWidth = (100 - activeWidth) / (totalSlices - 1);
  const width = isActive ? activeWidth : inactiveWidth;

  return (
    <motion.div
      layout
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer group"
      style={{
        clipPath: isRTL 
          ? `polygon(
              ${index === totalSlices - 1 ? '0%' : '8%'} 0%,
              100% 0%,
              ${index === 0 ? '100%' : '92%'} 100%,
              0% 100%
            )`
          : `polygon(
              ${index === 0 ? '0%' : '8%'} 0%,
              100% 0%,
              ${index === totalSlices - 1 ? '100%' : '92%'} 100%,
              0% 100%
            )`,
      }}
      animate={{
        width: `${width}%`,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 28,
        mass: 1,
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full"
          animate={{
            scale: isActive ? 1.0 : 1.15,
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={videoRef}
            src={slice.video}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${slice.gradient}`} />

      {/* Collapsed State — Icon + vertical text */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span
              className="text-white/80 text-sm font-semibold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
                letterSpacing: "0.05em",
              }}
            >
              {t(`nexa.solutions.${slice.key}.title`)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded State — Glass panel with content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute inset-0 flex items-end p-8"
          >
            <div
              className="w-full max-w-md rounded-3xl p-6 border border-white/15"
              style={{
                background: "rgba(10, 15, 28, 0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-4"
              >
                <Icon className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white/90">
                  {t(`nexa.solutions.${slice.key}.title`)}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white mb-3 leading-tight"
              >
                {t(`nexa.solutions.${slice.key}.title`)}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-sm text-white/70 mb-5 leading-relaxed line-clamp-3"
              >
                {t(`nexa.solutions.${slice.key}.desc`)}
              </motion.p>

              {/* CTA */}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={slice.href}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm font-semibold hover:bg-white/25 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("nexa.ui.learn_more")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
        style={{ background: "var(--accent-primary)" }}
      />
    </motion.div>
  );
}

// ─── Mobile Accordion Slice ───
function MobileAccordionSlice({
  slice,
  isActive,
  onClick,
}: {
  slice: SolutionSlice;
  isActive: boolean;
  onClick: () => void;
}) {
  const { t, isRTL } = useNexaLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = slice.icon;

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
        videoRef.current.playbackRate = 1.0;
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onClick}
      animate={{ height: isActive ? 320 : 72 }}
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
    >
      {/* Video background (only visible when active) */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={slice.video}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${slice.gradient}`} />
      </div>

      {/* Collapsed header bar */}
      <div
        className={`relative z-10 flex items-center gap-3 px-5 py-4 ${isRTL ? "flex-row-reverse" : ""}`}
        style={{
          background: isActive ? "transparent" : "rgba(10, 15, 28, 0.85)",
          backdropFilter: isActive ? "none" : "blur(12px)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-semibold text-base flex-1">
          {t(`nexa.solutions.${slice.key}.title`)}
        </span>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.15 }}
            className="absolute bottom-0 left-0 right-0 p-5"
          >
            <div
              className="rounded-2xl p-4 border border-white/15"
              style={{
                background: "rgba(10, 15, 28, 0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-2">
                {t(`nexa.solutions.${slice.key}.desc`)}
              </p>
              <a
                href={slice.href}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 border border-white/20 text-white text-sm font-semibold hover:bg-white/25 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("nexa.ui.learn_more")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───
const NexaDiagonalSolutions: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate on desktop (pause on hover)
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isMobile || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionSlices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, isPaused]);

  const handleClick = useCallback((index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  }, [activeIndex]);

  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${isRTL ? "md:flex-row-reverse text-right" : ""}`}
        >
          <div>
            <span
              className="text-[13px] uppercase tracking-[0.08em] font-semibold mb-3 block"
              style={{ color: "var(--accent-primary)" }}
            >
              {t("nexa.ui.industry_solutions")}
            </span>
            <h2
              className="text-[clamp(28px,5vw,48px)] font-bold max-w-[600px]"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              {t("nexa.usecases.title")}
            </h2>
            <p
              className="text-base mt-3 max-w-[500px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("nexa.ui.click_any_industry_to_discover")}
            </p>
          </div>
          <a
            href="/solutions/"
            className={`flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
            style={{ color: "var(--accent-primary)" }}
          >
            {t("nexa.ui.view_all_solutions")}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </a>
        </motion.div>

        {/* ═══ Desktop: Diagonal Slices ═══ */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex h-[520px] gap-1 rounded-3xl overflow-hidden`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {solutionSlices.map((slice, index) => (
              <DiagonalSlice
                key={slice.key}
                slice={slice}
                index={index}
                isActive={index === activeIndex}
                onClick={() => handleClick(index)}
                totalSlices={solutionSlices.length}
              />
            ))}
          </motion.div>
        )}

        {/* ═══ Mobile: Accordion ═══ */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {solutionSlices.map((slice, index) => (
              <MobileAccordionSlice
                key={slice.key}
                slice={slice}
                isActive={index === activeIndex}
                onClick={() => handleClick(index)}
              />
            ))}
          </motion.div>
        )}

        {/* Navigation dots (desktop) */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {solutionSlices.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-[6px] rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-[var(--accent-primary)]"
                    : "w-[6px] bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NexaDiagonalSolutions;
