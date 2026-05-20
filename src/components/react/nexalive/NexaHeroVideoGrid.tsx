import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_LIST = [
  "/videos/solutions/solution-pbx.mp4",
  "/videos/solutions/solution-emergency.mp4",
  "/videos/solutions/solution-factories.mp4",
  "/videos/solutions/solution-ecommerce.mp4",
  "/videos/solutions/solution-construction.mp4",
  "/videos/solutions/solution-logistics.mp4",
  "/videos/solutions/solution-callcenter-team.mp4",
  "/videos/solutions/hero-livestream.mp4",
  "/videos/solutions/bg-digital-network.mp4",
  "/videos/solutions/solution-fieldteams.mp4"
];

// Layouts optimized for the vertical phone frame (aspect ratio 9:16)
// Using top, left, width, height percentages so they perfectly tile the frame.
const EMBEDDED_LAYOUTS = [
  // Layout 1: Top half full, bottom split
  [
    { top: "0%", left: "0%", width: "100%", height: "50%", zIndex: 1 },
    { top: "50%", left: "0%", width: "50%", height: "50%", zIndex: 1 },
    { top: "50%", left: "50%", width: "50%", height: "50%", zIndex: 1 },
  ],
  // Layout 2: Top split, bottom half full
  [
    { top: "0%", left: "0%", width: "50%", height: "50%", zIndex: 1 },
    { top: "0%", left: "50%", width: "50%", height: "50%", zIndex: 1 },
    { top: "50%", left: "0%", width: "100%", height: "50%", zIndex: 1 },
  ],
  // Layout 3: Three horizontal strips
  [
    { top: "0%", left: "0%", width: "100%", height: "33.33%", zIndex: 1 },
    { top: "33.33%", left: "0%", width: "100%", height: "33.33%", zIndex: 1 },
    { top: "66.66%", left: "0%", width: "100%", height: "33.34%", zIndex: 1 },
  ],
  // Layout 4: One large video focusing, others hidden or very small
  [
    { top: "0%", left: "0%", width: "100%", height: "100%", zIndex: 2 },
    { top: "80%", left: "10%", width: "0%", height: "0%", zIndex: 1 },
    { top: "80%", left: "80%", width: "0%", height: "0%", zIndex: 1 },
  ]
];

export const NexaHeroVideoGrid: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 1, 2]);
  const [layoutIndex, setLayoutIndex] = useState(0);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setLayoutIndex((prev) => (prev + 1) % EMBEDDED_LAYOUTS.length);
      setActiveIndices((prev) => {
        const next = (prev[0] + 3) % VIDEO_LIST.length;
        return [
          next,
          (next + 1) % VIDEO_LIST.length,
          (next + 2) % VIDEO_LIST.length
        ];
      });
    }, 2500); // Fast pulse every 2.5 seconds (4 pulses total within the 10-second slide limit)

    return () => clearInterval(pulseInterval);
  }, []);

  const currentLayout = EMBEDDED_LAYOUTS[layoutIndex];

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <AnimatePresence>
        {activeIndices.map((videoIdx, index) => {
          const layout = currentLayout[index];
          const videoSrc = VIDEO_LIST[videoIdx];
          
          if (layout.width === "0%") return null; // Don't render if hidden
          
          return (
            <motion.div
              key={`${videoIdx}-${index}`} 
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                top: layout.top,
                left: layout.left,
                width: layout.width,
                height: layout.height,
                zIndex: layout.zIndex,
              }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="absolute overflow-hidden border border-black/50"
            >
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Red LIVE badge for the largest/primary video in the layout */}
              {(layout.width === "100%" || layoutIndex === 3) && (
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Mix</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NexaHeroVideoGrid;
