import React from "react";
import { motion } from "framer-motion";

// ─── 1. Encrypted Communication ───
export const EncryptionAnimation: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Central Shield */}
    <motion.div
      className="relative z-10"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
        <motion.path
          d="M60 10L10 35V75C10 105 35 128 60 135C85 128 110 105 110 75V35L60 10Z"
          fill="url(#shieldGrad)"
          stroke="rgba(0,212,170,0.6)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M45 72L55 82L78 58"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <defs>
          <linearGradient id="shieldGrad" x1="60" y1="10" x2="60" y2="135">
            <stop offset="0%" stopColor="rgba(0,212,170,0.3)" />
            <stop offset="100%" stopColor="rgba(0,212,170,0.05)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
    {/* Floating encryption bits */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-[10px] font-mono text-nexa-primary/60"
        style={{
          top: `${15 + Math.random() * 70}%`,
          left: `${5 + Math.random() * 90}%`,
        }}
        animate={{ opacity: [0, 1, 0], y: [10, -20] }}
        transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
      >
        {["AES", "256", "E2E", "TLS", "SHA", "RSA", "PKI", "KEY"][i]}
      </motion.div>
    ))}
    <motion.div
      className="absolute bottom-4 text-sm font-semibold dark:text-white/80 text-gray-700"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      End-to-End Encrypted
    </motion.div>
  </div>
);

// ─── 2. Mesh Network ───
export const MeshAnimation: React.FC = () => {
  const nodes = [
    { x: 50, y: 20 }, { x: 15, y: 45 }, { x: 85, y: 45 },
    { x: 30, y: 75 }, { x: 70, y: 75 }, { x: 50, y: 50 },
  ];
  const links = [
    [0, 1], [0, 2], [0, 5], [1, 3], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5],
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="260" height="200" viewBox="0 0 100 100" className="overflow-visible">
        {links.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(0,212,170,0.3)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.15 }}
          />
        ))}
        {/* Data pulse along links */}
        {links.slice(0, 4).map(([a, b], i) => (
          <motion.circle
            key={`p${i}`}
            r="1.5"
            fill="#00D4AA"
            filter="url(#glow)"
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
            }}
            transition={{ duration: 2, delay: i * 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={n.x} cy={n.y} r={i === 5 ? 6 : 4}
              fill={i === 5 ? "#00D4AA" : "rgba(0,212,170,0.2)"}
              stroke="#00D4AA"
              strokeWidth="1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
            {i === 5 && (
              <motion.circle
                cx={n.x} cy={n.y} r="10"
                fill="none"
                stroke="rgba(0,212,170,0.3)"
                strokeWidth="0.5"
                animate={{ r: [10, 16, 10], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
          </motion.g>
        ))}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>
      <motion.div
        className="absolute bottom-4 text-sm font-semibold dark:text-white/80 text-gray-700"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Mesh Network — Zero Downtime
      </motion.div>
    </div>
  );
};

// ─── 3. Push-to-Talk ───
export const PTTAnimation: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Mic icon with radio waves */}
    <motion.div className="relative">
      {/* Ripple waves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-nexa-primary/30"
          style={{ margin: `-${(i + 1) * 20}px` }}
          animate={{ scale: [0.8, 1.3], opacity: [0.6, 0] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
      <motion.div
        className="w-28 h-28 rounded-full bg-gradient-to-b from-nexa-primary to-emerald-600 flex items-center justify-center shadow-[0_0_50px_rgba(0,212,170,0.4)]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="1" width="6" height="12" rx="3" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </motion.div>
    </motion.div>
    {/* Waveform below */}
    <div className="absolute bottom-12 flex items-end gap-[3px]">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-nexa-primary/60"
          animate={{ height: [8, 12 + Math.random() * 25, 8] }}
          transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
    <motion.div
      className="absolute bottom-2 text-sm font-semibold dark:text-white/80 text-gray-700"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Press &amp; Hold to Talk
    </motion.div>
  </div>
);

// ─── 4. Video PTT ───
export const VideoAnimation: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="relative w-52 h-36 rounded-2xl dark:bg-white/5 bg-gray-100 border dark:border-white/10 border-gray-200 overflow-hidden"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      {/* Simulated video feed gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* LIVE badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/90">
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] font-bold text-white">LIVE</span>
      </div>
      {/* Participant avatars */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        {["bg-blue-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
          <motion.div
            key={i}
            className={`w-7 h-7 rounded-full ${c} border-2 border-white/20 flex items-center justify-center text-[8px] text-white font-bold`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2 }}
          >
            {["A", "S", "M"][i]}
          </motion.div>
        ))}
      </div>
      {/* Speaker indicator */}
      <motion.div
        className="absolute bottom-3 left-3 right-3 flex items-center gap-2 px-2 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-5 rounded-full bg-nexa-primary flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <rect x="9" y="1" width="6" height="12" rx="3" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-end gap-[2px]">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full bg-nexa-primary"
                animate={{ height: [2, 4 + Math.random() * 8, 2] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
        <span className="text-[9px] text-white/80">Ahmed</span>
      </motion.div>
    </motion.div>
    <motion.div
      className="absolute bottom-4 text-sm font-semibold dark:text-white/80 text-gray-700"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Live Video Broadcasting
    </motion.div>
  </div>
);

// ─── 5. SOS Emergency ───
export const SOSAnimation: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Pulsing alert rings */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-32 h-32 rounded-full border-2 border-red-500/40"
        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity }}
      />
    ))}
    <motion.div
      className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.5)]"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <span className="text-white text-2xl font-black">SOS</span>
    </motion.div>
    {/* Location pin */}
    <motion.div
      className="absolute top-6 right-12"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="28" height="36" viewBox="0 0 24 30" fill="none">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z" fill="rgba(239,68,68,0.3)" />
        <circle cx="12" cy="12" r="4" fill="#EF4444" />
      </svg>
    </motion.div>
    <motion.div
      className="absolute bottom-4 text-sm font-semibold dark:text-white/80 text-gray-700"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      Emergency SOS + Live GPS
    </motion.div>
  </div>
);

// ─── 6. AI Analytics ───
export const AIAnimation: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div className="relative">
      {/* Brain / circuit icon */}
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <motion.circle
          cx="50" cy="50" r="35"
          stroke="rgba(0,212,170,0.3)"
          strokeWidth="1.5"
          fill="rgba(0,212,170,0.05)"
          animate={{ r: [35, 37, 35] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Neural connections */}
        {[[30, 35, 50, 50], [70, 35, 50, 50], [35, 70, 50, 50], [65, 70, 50, 50], [25, 50, 50, 50], [75, 50, 50, 50]].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(0,212,170,0.4)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
        ))}
        {/* Nodes */}
        {[[30, 35], [70, 35], [35, 70], [65, 70], [25, 50], [75, 50], [50, 50]].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy}
            r={i === 6 ? 8 : 4}
            fill={i === 6 ? "#00D4AA" : "rgba(0,212,170,0.3)"}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        {/* AI text in center */}
        <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI</text>
      </svg>
    </motion.div>
    {/* Floating data tags */}
    {["Transcription", "Sentiment", "Keywords"].map((tag, i) => (
      <motion.div
        key={tag}
        className="absolute px-2 py-1 rounded-md dark:bg-white/5 bg-gray-100 dark:border-white/10 border-gray-200 border text-[10px] dark:text-nexa-primary text-nexa-primary-dark font-medium"
        style={{
          top: `${20 + i * 28}%`,
          right: i % 2 === 0 ? "5%" : undefined,
          left: i % 2 !== 0 ? "5%" : undefined,
        }}
        animate={{ opacity: [0, 1, 0], x: i % 2 === 0 ? [10, 0] : [-10, 0] }}
        transition={{ duration: 3, delay: i * 1, repeat: Infinity }}
      >
        {tag}
      </motion.div>
    ))}
    <motion.div
      className="absolute bottom-4 text-sm font-semibold dark:text-white/80 text-gray-700"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      AI Voice Analytics
    </motion.div>
  </div>
);
