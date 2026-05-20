import React from "react";
import { motion } from "framer-motion";
import { 
  Siren, MapPin, Activity, HardHat, ShieldAlert, 
  EyeOff, Map, FileWarning, Clock
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, FeatureCard, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollFadeUp } from "../useAnimations";

function DetailedFeatureBlock({ icon, titleKey, descKey, points }: { 
  icon: React.ReactNode; titleKey: string; descKey: string; points: string[] 
}) {
  const { t } = useNexaLanguage();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl dark:bg-red-500/10 bg-red-500/5 flex items-center justify-center shrink-0">
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
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
            <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(key)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function NexaSOSContent() {
  const { t } = useNexaLanguage();

  const sosFeatures = [
    { icon: <Siren className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.instant.title", descKey: "nexa.sos.feat.instant.desc" },
    { icon: <MapPin className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.gps.title", descKey: "nexa.sos.feat.gps.desc" },
    { icon: <Activity className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.audio.title", descKey: "nexa.sos.feat.audio.desc" },
    { icon: <HardHat className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.lone.title", descKey: "nexa.sos.feat.lone.desc" },
    { icon: <ShieldAlert className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.escalate.title", descKey: "nexa.sos.feat.escalate.desc" },
    { icon: <EyeOff className="w-5 h-5 text-red-500" />, titleKey: "nexa.sos.feat.stealth.title", descKey: "nexa.sos.feat.stealth.desc" },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.sos.badge"
        titleKey="nexa.sos.title"
        subtitleKey="nexa.sos.subtitle"
        gradient="from-red-500/10 to-transparent"
        // videoSrc will be added later by the user
      />

      {/* Features Grid */}
      <NexaSection titleKey="nexa.sos.features.title" subtitleKey="nexa.sos.features.subtitle" id="features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sosFeatures.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative p-6 rounded-2xl dark:bg-nexa-surface-elevated/50 bg-white 
                border dark:border-white/5 border-gray-100 
                dark:hover:border-red-500/30 hover:border-red-500/20
                hover:shadow-nexa transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl dark:bg-red-500/10 bg-red-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{t(f.titleKey)}</h3>
              <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </NexaSection>

      {/* Detailed: Lone Worker */}
      <NexaSection titleKey="nexa.sos.detail.loneworker.title" subtitleKey="nexa.sos.detail.loneworker.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DetailedFeatureBlock
            icon={<Activity className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.mandown.title"
            descKey="nexa.sos.detail.mandown.desc"
            points={[
              "nexa.sos.detail.mandown.p1",
              "nexa.sos.detail.mandown.p2",
              "nexa.sos.detail.mandown.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Clock className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.checkin.title"
            descKey="nexa.sos.detail.checkin.desc"
            points={[
              "nexa.sos.detail.checkin.p1",
              "nexa.sos.detail.checkin.p2",
              "nexa.sos.detail.checkin.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<HardHat className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.detail.nomovement.title"
            descKey="nexa.sos.detail.nomovement.desc"
            points={[]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Dispatcher Console */}
      <NexaSection titleKey="nexa.sos.dispatch.title" subtitleKey="nexa.sos.dispatch.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Map className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.dispatch.map.title"
            descKey="nexa.sos.dispatch.map.desc"
            points={[]}
          />
          <DetailedFeatureBlock
            icon={<FileWarning className="w-6 h-6 text-red-500" />}
            titleKey="nexa.sos.dispatch.log.title"
            descKey="nexa.sos.dispatch.log.desc"
            points={[]}
          />
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.sos.cta.title" descKey="nexa.sos.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaSOSPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaSOSContent />
    </NexaLiveLanguageProvider>
  );
}
