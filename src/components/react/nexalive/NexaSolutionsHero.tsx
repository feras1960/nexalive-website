import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Phone, Radio, Shield, BarChart3, ArrowRight } from "lucide-react";

interface FeatureSlide {
  id: string;
  icon: React.ElementType;
  video: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  stats: { value: string; labelAr: string; labelEn: string }[];
  colorClass: string;
  hexColor: string;
}

const slides: FeatureSlide[] = [
  {
    id: "manufacturing",
    icon: Phone,
    video: "/videos/solutions/solution-factories.mp4",
    titleKey: "nexa.solutions_hero.item_1.title",
    subtitleKey: "nexa.solutions_hero.item_5.subtitle",
    colorClass: "text-orange-400",
    hexColor: "#FB923C",
    stats: [
      { value: "PTT", labelKey: "nexa.solutions_hero.item_9.label" },
      { value: "GPS", labelKey: "nexa.solutions_hero.item_10.label" },
      { value: "SOS", labelKey: "nexa.solutions_hero.item_11.label" },
    ],
  },
  {
    id: "construction",
    icon: Radio,
    video: "/videos/solutions/solution-construction.mp4",
    titleKey: "nexa.solutions_hero.item_2.title",
    subtitleKey: "nexa.solutions_hero.item_6.subtitle",
    colorClass: "text-amber-400",
    hexColor: "#FBBF24",
    stats: [
      { value: "Mesh", labelKey: "nexa.solutions_hero.item_12.label" },
      { value: "LWP", labelKey: "nexa.solutions_hero.item_13.label" },
      { value: "PTT", labelKey: "nexa.solutions_hero.item_14.label" },
    ],
  },
  {
    id: "logistics",
    icon: Shield,
    video: "/videos/solutions/solution-logistics-new.mp4",
    titleKey: "nexa.solutions_hero.item_3.title",
    subtitleKey: "nexa.solutions_hero.item_7.subtitle",
    colorClass: "text-blue-400",
    hexColor: "#60A5FA",
    stats: [
      { value: "GPS", labelKey: "nexa.solutions_hero.item_15.label" },
      { value: "ACD", labelKey: "nexa.solutions_hero.item_16.label" },
      { value: "E2EE", labelKey: "nexa.solutions_hero.item_17.label" },
    ],
  },
  {
    id: "callcenter",
    icon: BarChart3,
    video: "/videos/solutions/solution-callcenter-new.mp4",
    titleKey: "nexa.solutions_hero.item_4.title",
    subtitleKey: "nexa.solutions_hero.item_8.subtitle",
    colorClass: "text-violet-400",
    hexColor: "#A78BFA",
    stats: [
      { value: "IVR", labelKey: "nexa.solutions_hero.item_18.label" },
      { value: "AI", labelKey: "nexa.solutions_hero.item_19.label" },
      { value: "CDR", labelKey: "nexa.solutions_hero.item_20.label" },
    ],
  },
];

const SLIDE_DURATION = 8000;
const SKEW = 15;

const NexaSolutionsHero: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [active, setActive] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [active]);

  const activeSlide = slides[active];
  const inactiveSlides = slides.filter((_, i) => i !== active);
  
  const slots = isRTL 
    ? [activeSlide, ...inactiveSlides]
    : [...inactiveSlides, activeSlide];

  const getSlotParams = (slotIdx: number) => {
    let start = 0;
    let width = 0;
    const isActiveSlot = isRTL ? slotIdx === 0 : slotIdx === 3;
    
    if (isRTL) {
      if (slotIdx === 0) { start = 0; width = 70; }
      else if (slotIdx === 1) { start = 70; width = 15; }
      else if (slotIdx === 2) { start = 85; width = 15; }
      else if (slotIdx === 3) { start = 100; width = 15; }
    } else {
      if (slotIdx === 0) { start = 0; width = 15; }
      else if (slotIdx === 1) { start = 15; width = 15; }
      else if (slotIdx === 2) { start = 30; width = 15; }
      else if (slotIdx === 3) { start = 45; width = 70; }
    }
    
    const end = start + width;
    const clipPath = `polygon(${start}% 0%, ${end}% 0%, ${end - SKEW}% 100%, ${start - SKEW}% 100%)`;
    
    return { start, width, clipPath, isActiveSlot };
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] bg-black overflow-hidden select-none">
      
      {/* Structural Slots */}
      {slots.map((slide, i) => {
        const { start, width, clipPath, isActiveSlot } = getSlotParams(i);
        const originalIndex = slides.findIndex(s => s.id === slide.id);
        const Icon = slide.icon;

        return (
          <div 
            key={`slot-${i}`} 
            className="absolute inset-0 z-0"
            style={{ clipPath }}
          >
            {/* The Video Layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <video
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={isActiveSlot ? { objectPosition: t("nexa.ui.15_center") } : undefined}
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className={`absolute inset-0 transition-colors duration-500 ${isActiveSlot ? 'bg-black/10' : 'bg-black/70 hover:bg-black/50 cursor-pointer'}`} 
                 onClick={() => !isActiveSlot && setActive(originalIndex)} />

            {/* Inactive Slice Content (Icons & Titles at the bottom) */}
            {!isActiveSlot && (
              <div 
                className="absolute top-0 h-full pointer-events-none"
                style={{ left: `${start}%`, width: `${width}%`, transform: `skewX(-15deg)`, transformOrigin: 'top' }}
              >
                {/* Border separator */}
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-px bg-white/10`} />

                <div 
                  className="absolute bottom-12 inset-x-0 flex flex-col items-center justify-end"
                  style={{ transform: `skewX(15deg)` }} // Unskew content
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id + "-icon"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                        <Icon className={`w-5 h-5 ${slide.colorClass}`} />
                      </div>
                      <span 
                        className="text-white/80 font-bold tracking-[0.2em] uppercase whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: isRTL ? '' : 'rotate(180deg)' }}
                      >
                        {t(slide.titleKey)}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
            
            {/* Active Slice Click Area Overlay to prevent clicks on active video */}
            {isActiveSlot && <div className="absolute inset-0 z-10" />}
          </div>
        );
      })}

      {/* Foreground Text Area (Glass Card floating over the inactive slices) */}
      <div className={`absolute top-0 bottom-0 z-20 ${t("nexa.ui.left_0_w_35")} flex items-center justify-center pointer-events-none px-6 lg:px-10`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id + "-text"}
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -40 : 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`w-full max-w-xl p-10 sm:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
              {React.createElement(activeSlide.icon, { className: `w-5 h-5 ${activeSlide.colorClass}` })}
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {t("nexa.ui.industry_solutions")}
              </span>
            </div>

            <h2 className="text-[clamp(32px,3.5vw,52px)] font-extrabold text-white mb-6 leading-[1.1]">
              {t(activeSlide.titleKey)}
            </h2>

            <p className="text-[clamp(15px,1.2vw,18px)] text-gray-300 leading-relaxed mb-10">
              {t(activeSlide.subtitleKey)}
            </p>

            <div className="flex flex-wrap items-center gap-8 mb-10 border-t border-white/10 pt-8">
              {activeSlide.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-bold text-white font-mono">{stat.value}</span>
                  <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mt-1.5">
                    {t(stat.labelKey)}
                  </span>
                </div>
              ))}
            </div>

            <button 
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white transition-all hover:bg-white/20 border border-white/20 bg-white/10 group"
              style={{ boxShadow: `0 4px 20px ${activeSlide.hexColor}30` }}
            >
              {t("nexa.global.getStarted")}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </section>
  );
};

export default NexaSolutionsHero;
