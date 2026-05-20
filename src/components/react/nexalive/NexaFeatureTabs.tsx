import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Database, MonitorDot, Network, Check, Mic, Video, ShieldAlert, Lock, BrainCircuit, Phone } from "lucide-react";

const NexaFeatureTabs: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "voice",
      icon: Mic,
      title: t("nexa.ui.hd_voice_channels"),
      features: [
        t("nexa.ui.hd_voice_channels_up_to_500_me"),
        t("nexa.ui.walkie_talkie_push_to_talk"),
        t("nexa.ui.encrypted_messaging"),
        t("nexa.ui.live_video_streaming"),
        t("nexa.ui.offline_mode_local_network_com"),
        t("nexa.ui.admin_dashboard_with_real_time"),
      ]
    },
    {
      id: "admin",
      icon: MonitorDot,
      title: t("nexa.ui.smart_admin_console"),
      features: [
        t("nexa.ui.live_gps_map_tracking"),
        t("nexa.ui.fleet_wide_broadcasting"),
        t("nexa.ui.incident_management"),
        t("nexa.ui.advanced_reporting_analytics"),
        t("nexa.ui.user_permission_management"),
        t("nexa.ui.call_message_recording"),
      ]
    },
    {
      id: "integration",
      icon: Network,
      title: t("nexa.ui.system_integration"),
      features: [
        t("nexa.ui.legacy_pbx_integration"),
        t("nexa.ui.analog_radio_bridging"),
        t("nexa.ui.did_number_support"),
        t("nexa.ui.open_rest_api"),
        t("nexa.ui.event_webhooks"),
        t("nexa.ui.sso_ldap_active_directory"),
      ]
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--gradient-dark)' }}>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ═══ Left: Visual / Screenshot Mock ═══ */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            {/* Mock screenshot */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
              <div className="bg-[#1C1C1E] p-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-white/30 text-xs font-mono mx-auto">admin.nexalive.ai</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0A0A0A] p-6"
                >
                  {activeTab === 0 && (
                    <div className="space-y-3">
                      {[t("nexa.tabs.alpha_team"), t("nexa.tabs.maintenance"), t("nexa.tabs.management"), t("nexa.tabs.security"), t("nexa.tabs.emergency")].map((ch, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                          <div className={`w-3 h-3 rounded-full ${i < 3 ? "bg-[var(--accent-primary)]" : "bg-white/20"}`} />
                          <span className="text-white/80 text-sm font-medium">{ch}</span>
                          <span className="text-white/30 text-xs mr-auto">{Math.floor(Math.random() * 20 + 3)} {t("nexa.ui.members")}</span>
                          {i < 2 && <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />}
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: t("nexa.ui.active_users"), val: "148", color: "var(--accent-primary)" },
                        { label: t("nexa.ui.today_s_calls"), val: "2,847", color: "#00E5FF" },
                        { label: t("nexa.ui.messages"), val: "12.4K", color: "#A78BFA" },
                        { label: t("nexa.ui.alerts"), val: "3", color: "#F87171" },
                      ].map((s, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                          <span className="text-white/40 text-xs">{s.label}</span>
                          <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.val}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="space-y-3">
                      {["Asterisk PBX", "Motorola DMR", "REST API", "Webhooks"].map((sys, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                            <Network className="w-4 h-4 text-[var(--accent-primary)]" />
                          </div>
                          <span className="text-white/80 text-sm font-medium">{sys}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full mr-auto ${i < 3 ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]" : "bg-amber-500/20 text-amber-400"}`}>
                            {i < 3 ? (t("nexa.ui.connected")) : (t("nexa.ui.coming"))}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ═══ Right: Content + Pill Tabs ═══ */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-white mb-4"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {t("nexa.tabs.title")}
            </h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              {t("nexa.tabs.subtitle")}
            </p>

            {/* Pill Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeTab === i
                      ? "bg-[var(--accent-primary)] text-white border-transparent"
                      : "bg-transparent text-white/60 border-white/15 hover:text-white hover:border-white/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Feature list with checkmarks */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {tabs[activeTab].features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,196,122,0.15)' }}>
                      <Check className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <span className="text-white/75 text-[15px]">{feat}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NexaFeatureTabs;
