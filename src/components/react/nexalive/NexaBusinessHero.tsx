import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Phone, BrainCircuit, Users, Building2, ArrowRight } from "lucide-react";

interface FeatureSlide {
  id: string;
  icon: React.ElementType;
  video: string;
  titleKey: string;
  subtitleKey: string;
  stats: { value: string; labelKey: string }[];
  colorClass: string;
  hexColor: string;
}

const slides: FeatureSlide[] = [
  {
    id: "business-mgmt",
    icon: Building2,
    video: "/videos/business/7791990-hd_1920_1080_25fps.mp4",
    titleKey: "nexa.biz.hero.mgmt.title",
    subtitleKey: "nexa.biz.hero.mgmt.subtitle",
    colorClass: "text-blue-400",
    hexColor: "#60A5FA",
    stats: [
      { value: "100%", labelKey: "nexa.biz.hero.mgmt.stat1" },
      { value: "24/7", labelKey: "nexa.biz.hero.mgmt.stat2" },
      { value: "Global", labelKey: "nexa.biz.hero.mgmt.stat3" },
    ],
  },
  {
    id: "ai-analytics",
    icon: BrainCircuit,
    video: "/videos/business/8348731-uhd_3840_2160_25fps.mp4",
    titleKey: "nexa.biz.hero.ai.title",
    subtitleKey: "nexa.biz.hero.ai.subtitle",
    colorClass: "text-amber-400",
    hexColor: "#FBBF24",
    stats: [
      { value: "AI", labelKey: "nexa.biz.hero.ai.stat1" },
      { value: "NLP", labelKey: "nexa.biz.hero.ai.stat2" },
      { value: "Live", labelKey: "nexa.biz.hero.ai.stat3" },
    ],
  },
  {
    id: "crm-integration",
    icon: Users,
    video: "/videos/business/6952022-uhd_3840_2160_25fps.mp4",
    titleKey: "nexa.biz.hero.crm.title",
    subtitleKey: "nexa.biz.hero.crm.subtitle",
    colorClass: "text-emerald-400",
    hexColor: "#34D399",
    stats: [
      { value: "ERP", labelKey: "nexa.biz.hero.crm.stat1" },
      { value: "0", labelKey: "nexa.biz.hero.crm.stat2" },
      { value: "Sync", labelKey: "nexa.biz.hero.crm.stat3" },
    ],
  },
  {
    id: "click2call",
    icon: Phone,
    video: "/videos/business/7643325-uhd_4096_2160_25fps.mp4",
    titleKey: "nexa.biz.hero.call.title",
    subtitleKey: "nexa.biz.hero.call.subtitle",
    colorClass: "text-purple-400",
    hexColor: "#A78BFA",
    stats: [
      { value: "30s", labelKey: "nexa.biz.hero.call.stat1" },
      { value: "Web", labelKey: "nexa.biz.hero.call.stat2" },
      { value: "Free", labelKey: "nexa.biz.hero.call.stat3" },
    ],
  },
];

const SLIDE_DURATION = 8000;
const SKEW = 15;

const NexaBusinessHero: React.FC = () => {
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
  
  // Create fixed slots. 
  // RTL: Slot 0 is Active (Left), 1-3 are Inactive (Right)
  // LTR: Slot 0-2 are Inactive (Left), Slot 3 is Active (Right)
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
      <div className={`absolute top-0 bottom-0 z-20 ${t("nexa.ui.left_0_w_45")} flex items-center justify-center pointer-events-none px-6 lg:px-10`}>
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
                {t("nexa.biz.badge")}
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
              {t("nexa.ui.explore_features")}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </section>
  );
};

export default NexaBusinessHero;
