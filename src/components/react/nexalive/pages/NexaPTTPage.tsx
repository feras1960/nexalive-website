import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Video, Users, Wifi, WifiOff, Bluetooth, Clock, Shield, Volume2, 
  Headphones, Smartphone, Zap, Globe, MapPin, Layers, Signal, AlertTriangle,
  Siren, Navigation, Bell, Phone, Heart } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, FeatureCard, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollStagger, useScrollFadeUp } from "../useAnimations";

// Interactive PTT Button Visual
function PTTHeroVisual() {
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useNexaLanguage();

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 
        rounded-[3rem] shadow-2xl overflow-hidden aspect-[9/19] mx-auto max-w-[280px]">
        
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />
        
        {/* Channel info */}
        <div className="absolute top-14 inset-x-4 dark:bg-white/5 bg-gray-50 backdrop-blur rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nexa-primary to-emerald-500 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="dark:text-white text-gray-900 font-semibold text-xs">{t("nexa.ptt.mock.channel")}</div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] dark:text-nexa-text-muted text-nexa-light-text-muted">{t("nexa.ptt.mock.members")}</span>
              </div>
            </div>
            <Signal className="w-4 h-4 text-nexa-primary" />
          </div>
        </div>

        {/* Live waveform when pressed */}
        <div className="absolute top-1/3 inset-x-6">
          <AnimatePresence>
            {isPressed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1 h-12"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-nexa-primary rounded-full"
                    animate={{ height: [4, Math.random() * 40 + 8, 4] }}
                    transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {isPressed && (
            <div className="text-center mt-2">
              <span className="text-xs font-bold text-nexa-primary animate-pulse">{t("nexa.ptt.mock.speaking")}</span>
            </div>
          )}
        </div>

        {/* Big PTT Button */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <motion.button
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            whileTap={{ scale: 0.9 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 
              border-4 dark:border-nexa-dark border-gray-100 shadow-2xl cursor-pointer select-none
              ${isPressed 
                ? "bg-nexa-primary shadow-[0_0_60px_rgba(0,212,170,0.5)]" 
                : "bg-gradient-to-b from-nexa-primary to-nexa-primary-dark shadow-nexa"}`}
          >
            <Radio className="w-10 h-10 text-white" />
          </motion.button>
          <div className="text-center mt-3">
            <span className="text-[10px] dark:text-nexa-text-muted text-nexa-light-text-muted uppercase tracking-widest font-medium">
              {isPressed ? t("nexa.ptt.mock.release") : t("nexa.ptt.mock.holdToTalk")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Detailed feature block with icon, title, description, and sub-points
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

function NexaPTTContent() {
  const { t } = useNexaLanguage();
  const gridRef = useScrollStagger();

  const pttFeatures = [
    { icon: <Volume2 className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.hd.title", descKey: "nexa.ptt.feat.hd.desc" },
    { icon: <Globe className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.global.title", descKey: "nexa.ptt.feat.global.desc" },
    { icon: <Users className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.channels.title", descKey: "nexa.ptt.feat.channels.desc" },
    { icon: <Zap className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.priority.title", descKey: "nexa.ptt.feat.priority.desc" },
    { icon: <Clock className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.history.title", descKey: "nexa.ptt.feat.history.desc" },
    { icon: <Headphones className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.hardware.title", descKey: "nexa.ptt.feat.hardware.desc" },
    { icon: <Video className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.video.title", descKey: "nexa.ptt.feat.video.desc" },
    { icon: <Bluetooth className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.mesh.title", descKey: "nexa.ptt.feat.mesh.desc" },
    { icon: <Shield className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.ptt.feat.encrypted.title", descKey: "nexa.ptt.feat.encrypted.desc" },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.ptt.badge"
        titleKey="nexa.ptt.title"
        subtitleKey="nexa.ptt.subtitle"
        gradient="from-nexa-primary/10 to-transparent"
        videoSrc="/videos/features/ptt-hero.mp4"
      />

      {/* Quick Feature Cards */}
      <NexaSection titleKey="nexa.ptt.features.title" subtitleKey="nexa.ptt.features.subtitle" id="features">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pttFeatures.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </NexaSection>

      {/* Detailed: NexaVoice Audio Engine */}
      <NexaSection titleKey="nexa.ptt.detail.audio.title" subtitleKey="nexa.ptt.detail.audio.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Volume2 className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.ptt.detail.codec.title"
            descKey="nexa.ptt.detail.codec.desc"
            points={[
              "nexa.ptt.detail.codec.p1",
              "nexa.ptt.detail.codec.p2",
              "nexa.ptt.detail.codec.p3",
              "nexa.ptt.detail.codec.p4",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Video className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.ptt.detail.video.title"
            descKey="nexa.ptt.detail.video.desc"
            points={[
              "nexa.ptt.detail.video.p1",
              "nexa.ptt.detail.video.p2",
              "nexa.ptt.detail.video.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* SOS & Emergency System */}
      <NexaSection titleKey="nexa.ptt.sos.title" subtitleKey="nexa.ptt.sos.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Siren className="w-6 h-6 text-red-500" />}
            titleKey="nexa.ptt.sos.alert.title"
            descKey="nexa.ptt.sos.alert.desc"
            points={[
              "nexa.ptt.sos.alert.p1",
              "nexa.ptt.sos.alert.p2",
              "nexa.ptt.sos.alert.p3",
              "nexa.ptt.sos.alert.p4",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Navigation className="w-6 h-6 text-red-500" />}
            titleKey="nexa.ptt.sos.tracking.title"
            descKey="nexa.ptt.sos.tracking.desc"
            points={[
              "nexa.ptt.sos.tracking.p1",
              "nexa.ptt.sos.tracking.p2",
              "nexa.ptt.sos.tracking.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Heart className="w-6 h-6 text-red-500" />}
            titleKey="nexa.ptt.sos.loneworker.title"
            descKey="nexa.ptt.sos.loneworker.desc"
            points={[
              "nexa.ptt.sos.loneworker.p1",
              "nexa.ptt.sos.loneworker.p2",
              "nexa.ptt.sos.loneworker.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Bell className="w-6 h-6 text-red-500" />}
            titleKey="nexa.ptt.sos.dispatcher.title"
            descKey="nexa.ptt.sos.dispatcher.desc"
            points={[
              "nexa.ptt.sos.dispatcher.p1",
              "nexa.ptt.sos.dispatcher.p2",
              "nexa.ptt.sos.dispatcher.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Channels & Groups */}
      <NexaSection titleKey="nexa.ptt.detail.channels.title" subtitleKey="nexa.ptt.detail.channels.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Users className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.ptt.detail.groups.title"
            descKey="nexa.ptt.detail.groups.desc"
            points={[
              "nexa.ptt.detail.groups.p1",
              "nexa.ptt.detail.groups.p2",
              "nexa.ptt.detail.groups.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Bluetooth className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.ptt.detail.offline.title"
            descKey="nexa.ptt.detail.offline.desc"
            points={[
              "nexa.ptt.detail.offline.p1",
              "nexa.ptt.detail.offline.p2",
              "nexa.ptt.detail.offline.p3",
            ]}
          />
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.ptt.cta.title" descKey="nexa.ptt.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaPTTPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaPTTContent />
    </NexaLiveLanguageProvider>
  );
}
