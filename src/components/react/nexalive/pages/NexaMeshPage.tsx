import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bluetooth, WifiOff, Smartphone, Signal, Users, MapPin, Shield, Zap, Radio } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, NexaCTABanner } from "../NexaPageTemplate";

// Detailed block
function DetailedBlock({ icon, titleKey, descKey, points }: { 
  icon: React.ReactNode; titleKey: string; descKey: string; points: string[] 
}) {
  const { t } = useNexaLanguage();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl dark:bg-nexa-primary/10 bg-nexa-primary/5 flex items-center justify-center shrink-0">{icon}</div>
        <div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{t(titleKey)}</h3>
          <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(descKey)}</p>
        </div>
      </div>
      <div className="space-y-3 ltr:ml-16 rtl:mr-16">
        {points.map((key, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-nexa-primary mt-2 shrink-0" />
            <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(key)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Interactive SVG Mesh Network Visualization
function MeshNetworkVisual() {
  const [activeNode, setActiveNode] = useState(0);
  
  // Cycle through nodes
  useEffect(() => {
    const timer = setInterval(() => setActiveNode(prev => (prev + 1) % 6), 2000);
    return () => clearInterval(timer);
  }, []);

  // Node positions (phone icons in a mesh)
  const nodes = [
    { x: 200, y: 60, label: "User A" },
    { x: 340, y: 120, label: "User B" },
    { x: 100, y: 160, label: "User C" },
    { x: 280, y: 220, label: "User D" },
    { x: 140, y: 280, label: "User E" },
    { x: 320, y: 310, label: "Relay" },
  ];

  // Connections between nodes
  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [1, 5],
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 420 380" className="w-full">
        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const isActive = from === activeNode || to === activeNode;
          return (
            <line
              key={i}
              x1={nodes[from].x} y1={nodes[from].y}
              x2={nodes[to].x} y2={nodes[to].y}
              stroke={isActive ? "#00D4AA" : "currentColor"}
              strokeWidth={isActive ? 2 : 1}
              className={isActive ? "opacity-60" : "dark:text-white/10 text-gray-200 opacity-100"}
              strokeDasharray={isActive ? "none" : "4 4"}
            />
          );
        })}
        
        {/* Data packet traveling (simple dot) */}
        {connections.filter(([from, to]) => from === activeNode || to === activeNode).slice(0, 2).map(([from, to], i) => (
          <motion.circle
            key={`packet-${activeNode}-${i}`}
            r="3"
            fill="#00D4AA"
            initial={{ cx: nodes[from].x, cy: nodes[from].y, opacity: 0.8 }}
            animate={{ cx: nodes[to].x, cy: nodes[to].y, opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.3 }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node, i) => {
          const isActive = i === activeNode;
          return (
            <g key={i}>
              {/* Node circle */}
              <circle
                cx={node.x} cy={node.y} r={isActive ? 22 : 18}
                fill={isActive ? "#00D4AA" : "currentColor"}
                className={isActive ? "" : "dark:text-[#1a1a2e] text-white"}
                stroke={isActive ? "#00D4AA" : "currentColor"}
                strokeWidth="2"
                style={{ transition: "all 0.3s" }}
              />
              <circle
                cx={node.x} cy={node.y} r={isActive ? 22 : 18}
                fill="none"
                stroke={isActive ? "#00D4AA" : "currentColor"}
                strokeWidth="1"
                className={isActive ? "opacity-40" : "dark:text-white/20 text-gray-300"}
              />
              
              {/* Phone icon (simple) */}
              <rect
                x={node.x - 5} y={node.y - 8} width="10" height="16" rx="2"
                fill={isActive ? "white" : "#00D4AA"}
                style={{ transition: "fill 0.3s" }}
              />
              
              {/* Label */}
              <text
                x={node.x} y={node.y + 36}
                textAnchor="middle"
                className="dark:fill-white/50 fill-gray-400"
                fontSize="10"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        
        {/* No Internet badge */}
        <g>
          <rect x="140" y="345" width="140" height="28" rx="14" fill="#00D4AA" fillOpacity="0.15" stroke="#00D4AA" strokeWidth="1" />
          <text x="210" y="364" textAnchor="middle" fill="#00D4AA" fontSize="11" fontWeight="600">
            No Internet Required
          </text>
        </g>
      </svg>
    </div>
  );
}

function NexaMeshContent() {
  const { t } = useNexaLanguage();

  const useCases = [
    { icon: <MapPin className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.mesh.use.underground.title", descKey: "nexa.mesh.use.underground.desc" },
    { icon: <Signal className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.mesh.use.remote.title", descKey: "nexa.mesh.use.remote.desc" },
    { icon: <Shield className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.mesh.use.emergency.title", descKey: "nexa.mesh.use.emergency.desc" },
    { icon: <Users className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.mesh.use.events.title", descKey: "nexa.mesh.use.events.desc" },
  ];

  const specs = [
    { label: t("nexa.mesh.spec.range"), value: "~100m" },
    { label: t("nexa.mesh.spec.hops"), value: "Multi-hop" },
    { label: t("nexa.mesh.spec.protocol"), value: "BLE 5.0" },
    { label: t("nexa.mesh.spec.encryption"), value: "AES-256" },
    { label: t("nexa.mesh.spec.nodes"), value: "∞" },
    { label: t("nexa.mesh.spec.battery"), value: t("nexa.mesh.spec.batteryValue") },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.mesh.badge"
        titleKey="nexa.mesh.title"
        subtitleKey="nexa.mesh.subtitle"
        gradient="from-nexa-primary/10 to-transparent"
        videoSrc="/videos/features/mesh-hero.mp4"
      />

      {/* How it Works - Clean 3-step */}
      <NexaSection titleKey="nexa.mesh.how.title" subtitleKey="nexa.mesh.how.subtitle">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {["nexa.mesh.step1", "nexa.mesh.step2", "nexa.mesh.step3"].map((key, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-nexa-primary/10 border dark:border-nexa-primary/20 border-nexa-primary/10
                flex items-center justify-center mx-auto mb-4">
                <span className="text-nexa-primary font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="font-bold dark:text-white text-gray-900 mb-2">{t(`${key}.title`)}</h3>
              <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(`${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </NexaSection>

      {/* Use Cases */}
      <NexaSection titleKey="nexa.mesh.use.title" subtitleKey="nexa.mesh.use.subtitle" dark>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex items-start gap-4 p-6 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white 
                border dark:border-white/5 border-gray-100"
            >
              <div className="w-10 h-10 rounded-xl dark:bg-nexa-primary/10 bg-nexa-primary/5 flex items-center justify-center shrink-0">
                {uc.icon}
              </div>
              <div>
                <h3 className="font-bold dark:text-white text-gray-900 mb-1">{t(uc.titleKey)}</h3>
                <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(uc.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </NexaSection>

      {/* Detailed: How Mesh Routing Works */}
      <NexaSection titleKey="nexa.mesh.detail.tech.title" subtitleKey="nexa.mesh.detail.tech.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedBlock
            icon={<Radio className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.mesh.detail.multihop.title"
            descKey="nexa.mesh.detail.multihop.desc"
            points={[
              "nexa.mesh.detail.multihop.p1",
              "nexa.mesh.detail.multihop.p2",
              "nexa.mesh.detail.multihop.p3",
            ]}
          />
          <DetailedBlock
            icon={<Zap className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.mesh.detail.healing.title"
            descKey="nexa.mesh.detail.healing.desc"
            points={[
              "nexa.mesh.detail.healing.p1",
              "nexa.mesh.detail.healing.p2",
              "nexa.mesh.detail.healing.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Real Scenarios */}
      <NexaSection titleKey="nexa.mesh.detail.scenarios.title" subtitleKey="nexa.mesh.detail.scenarios.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedBlock
            icon={<MapPin className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.mesh.detail.disaster.title"
            descKey="nexa.mesh.detail.disaster.desc"
            points={[
              "nexa.mesh.detail.disaster.p1",
              "nexa.mesh.detail.disaster.p2",
              "nexa.mesh.detail.disaster.p3",
            ]}
          />
          <DetailedBlock
            icon={<Shield className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.mesh.detail.industrial.title"
            descKey="nexa.mesh.detail.industrial.desc"
            points={[
              "nexa.mesh.detail.industrial.p1",
              "nexa.mesh.detail.industrial.p2",
              "nexa.mesh.detail.industrial.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Technical Specs */}
      <NexaSection titleKey="nexa.mesh.specs.title">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100 overflow-hidden">
            {specs.map((spec, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-4 ${
                i < specs.length - 1 ? "border-b dark:border-white/5 border-gray-100" : ""
              }`}>
                <span className="dark:text-nexa-text-secondary text-nexa-light-text-secondary text-sm">{spec.label}</span>
                <span className="dark:text-white text-gray-900 font-semibold text-sm">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.mesh.cta.title" descKey="nexa.mesh.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaMeshPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaMeshContent />
    </NexaLiveLanguageProvider>
  );
}
