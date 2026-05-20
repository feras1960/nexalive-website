import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Lock, Shield, FileText, Image, Users, Search, 
  Bell, Trash2, Clock, CheckCheck, Paperclip, Globe, Smartphone, 
  Key, Database, RefreshCw, Layers, UserCheck, Settings } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, FeatureCard, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollStagger, useScrollFadeUp } from "../useAnimations";

// Detailed feature block
function DetailedFeatureBlock({ icon, titleKey, descKey, points }: { 
  icon: React.ReactNode; titleKey: string; descKey: string; points: string[] 
}) {
  const { t } = useNexaLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl dark:bg-nexa-primary/10 bg-nexa-primary/5 flex items-center justify-center shrink-0">
          {icon}
        </div>
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

// Chat Visual with animated messages
function MessagingHeroVisual() {
  const { t } = useNexaLanguage();
  const messages = [
    { from: "Ahmad", text: "Meeting at 3 PM confirmed ✓", time: "2:41 PM", sent: false },
    { from: "You", text: "I'll prepare the quarterly report", time: "2:42 PM", sent: true },
    { from: "Sara", text: "📎 Q3_Report_Final.pdf", time: "2:43 PM", sent: false },
    { from: "You", text: "Perfect, thanks Sara!", time: "2:44 PM", sent: true },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-20 dark:opacity-30" />
      <div className="relative dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 dark:bg-nexa-surface-elevated/80 bg-gray-50 border-b dark:border-white/5 border-gray-100 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["bg-nexa-primary", "bg-blue-500", "bg-purple-500"].map((bg, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 dark:border-nexa-surface border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                {["A", "S", "K"][i]}
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="dark:text-white text-gray-900 font-semibold text-sm">{t("nexa.msg.mock.group")}</div>
            <div className="text-[10px] dark:text-nexa-text-muted text-nexa-light-text-muted flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-nexa-primary" />
              {t("nexa.msg.mock.encrypted")}
            </div>
          </div>
          <Shield className="w-4 h-4 text-nexa-primary" />
        </div>
        <div className="px-4 py-4 space-y-3 min-h-[260px]">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.3 }}
              className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl ${
                msg.sent ? "bg-nexa-primary text-white rounded-br-md" : "dark:bg-nexa-surface-elevated bg-gray-100 dark:text-white text-gray-900 rounded-bl-md"
              }`}>
                {!msg.sent && <div className="text-[10px] font-bold mb-0.5 text-nexa-primary">{msg.from}</div>}
                <div className="text-sm">{msg.text}</div>
                <div className={`text-[9px] mt-1 flex items-center gap-1 ${msg.sent ? "text-white/60 justify-end" : "dark:text-nexa-text-muted text-gray-400"}`}>
                  {msg.time}
                  {msg.sent && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="px-4 py-3 dark:bg-nexa-surface-elevated/50 bg-gray-50 border-t dark:border-white/5 border-gray-100 flex items-center gap-2">
          <Paperclip className="w-5 h-5 dark:text-nexa-text-muted text-gray-400" />
          <div className="flex-1 px-3 py-2 rounded-full dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 text-xs dark:text-nexa-text-muted text-gray-400">
            {t("nexa.msg.mock.typeMessage")}
          </div>
        </div>
      </div>
    </div>
  );
}

// Encryption layers visualization
function EncryptionVisual() {
  const { t } = useNexaLanguage();
  const layers = [
    { label: t("nexa.msg.enc.layer1"), color: "border-red-500/30 dark:bg-red-500/5 bg-red-50", icon: "🔐" },
    { label: t("nexa.msg.enc.layer2"), color: "border-blue-500/30 dark:bg-blue-500/5 bg-blue-50", icon: "🛡️" },
    { label: t("nexa.msg.enc.layer3"), color: "border-nexa-primary/30 dark:bg-nexa-primary/5 bg-emerald-50", icon: "✅" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {layers.map((layer, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: i * 0.2 }} className={`w-full max-w-md p-5 rounded-2xl border-2 ${layer.color} text-center`}>
          <div className="text-2xl mb-2">{layer.icon}</div>
          <div className="dark:text-white text-gray-900 font-bold text-sm">{layer.label}</div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-nexa-primary to-blue-500 text-white font-bold text-sm text-center">
        {t("nexa.msg.enc.result")}
      </motion.div>
    </div>
  );
}

function NexaMessagingContent() {
  const { t } = useNexaLanguage();
  const gridRef = useScrollStagger();

  const msgFeatures = [
    { icon: <Lock className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.e2e.title", descKey: "nexa.msg.feat.e2e.desc" },
    { icon: <Users className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.groups.title", descKey: "nexa.msg.feat.groups.desc" },
    { icon: <FileText className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.files.title", descKey: "nexa.msg.feat.files.desc" },
    { icon: <Image className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.media.title", descKey: "nexa.msg.feat.media.desc" },
    { icon: <Search className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.search.title", descKey: "nexa.msg.feat.search.desc" },
    { icon: <Trash2 className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.disappearing.title", descKey: "nexa.msg.feat.disappearing.desc" },
    { icon: <Bell className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.notifications.title", descKey: "nexa.msg.feat.notifications.desc" },
    { icon: <Globe className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.crossplatform.title", descKey: "nexa.msg.feat.crossplatform.desc" },
    { icon: <Clock className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.msg.feat.sync.title", descKey: "nexa.msg.feat.sync.desc" },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.msg.badge"
        titleKey="nexa.msg.title"
        subtitleKey="nexa.msg.subtitle"
        gradient="from-purple-500/15 via-blue-500/10 to-transparent"
        videoSrc="/videos/features/messaging-hero.mp4"
      />

      <NexaSection titleKey="nexa.msg.features.title" subtitleKey="nexa.msg.features.subtitle" id="features">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {msgFeatures.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </NexaSection>

      {/* Encryption Layers Section */}
      <NexaSection titleKey="nexa.msg.enc.title" subtitleKey="nexa.msg.enc.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div><EncryptionVisual /></div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {["nexa.msg.enc.point1", "nexa.msg.enc.point2", "nexa.msg.enc.point3", "nexa.msg.enc.point4"].map((key, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-nexa-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-nexa-primary" />
                </div>
                <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(key)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </NexaSection>

      {/* Detailed: Protocol & Architecture */}
      <NexaSection titleKey="nexa.msg.detail.protocol.title" subtitleKey="nexa.msg.detail.protocol.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Key className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.msg.detail.signal.title"
            descKey="nexa.msg.detail.signal.desc"
            points={[
              "nexa.msg.detail.signal.p1",
              "nexa.msg.detail.signal.p2",
              "nexa.msg.detail.signal.p3",
              "nexa.msg.detail.signal.p4",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Database className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.msg.detail.storage.title"
            descKey="nexa.msg.detail.storage.desc"
            points={[
              "nexa.msg.detail.storage.p1",
              "nexa.msg.detail.storage.p2",
              "nexa.msg.detail.storage.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Team & Collaboration */}
      <NexaSection titleKey="nexa.msg.detail.team.title" subtitleKey="nexa.msg.detail.team.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<UserCheck className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.msg.detail.admin.title"
            descKey="nexa.msg.detail.admin.desc"
            points={[
              "nexa.msg.detail.admin.p1",
              "nexa.msg.detail.admin.p2",
              "nexa.msg.detail.admin.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<RefreshCw className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.msg.detail.sync.title"
            descKey="nexa.msg.detail.sync.desc"
            points={[
              "nexa.msg.detail.sync.p1",
              "nexa.msg.detail.sync.p2",
              "nexa.msg.detail.sync.p3",
            ]}
          />
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.msg.cta.title" descKey="nexa.msg.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaMessagingPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaMessagingContent />
    </NexaLiveLanguageProvider>
  );
}
