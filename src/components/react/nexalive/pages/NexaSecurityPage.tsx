import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, Server, Key, Fingerprint, 
  Globe, WifiOff, CheckCircle, FileCheck, Scale, Building2, Database } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollFadeUp } from "../useAnimations";

// Detailed feature block
function DetailedFeatureBlock({ icon, titleKey, descKey, points }: { 
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

function SecurityHeroVisual() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-gradient-to-br from-nexa-primary/10 to-nexa-primary/5 
          border dark:border-nexa-primary/20 border-nexa-primary/10 flex items-center justify-center">
          <Shield className="w-24 h-24 text-nexa-primary" />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full 
          bg-nexa-primary text-white text-xs font-bold shadow-lg whitespace-nowrap">
          AES-256 + E2EE
        </div>
      </div>
    </div>
  );
}

function NexaSecurityContent() {
  const { t } = useNexaLanguage();

  const comparisonData = [
    { feature: t("nexa.sec.compare.e2e"), nexa: true, signal: true, whatsapp: true, telegram: false },
    { feature: t("nexa.sec.compare.zeroknowledge"), nexa: true, signal: true, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.opensource"), nexa: false, signal: true, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.voip"), nexa: true, signal: false, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.ptt"), nexa: true, signal: false, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.mesh"), nexa: true, signal: false, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.bypass"), nexa: true, signal: false, whatsapp: false, telegram: false },
    { feature: t("nexa.sec.compare.enterprise"), nexa: true, signal: false, whatsapp: false, telegram: false },
  ];

  const secFeatures = [
    { icon: <Lock className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.e2e.title", descKey: "nexa.sec.feat.e2e.desc" },
    { icon: <EyeOff className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.zero.title", descKey: "nexa.sec.feat.zero.desc" },
    { icon: <Key className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.keys.title", descKey: "nexa.sec.feat.keys.desc" },
    { icon: <Server className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.infra.title", descKey: "nexa.sec.feat.infra.desc" },
    { icon: <Fingerprint className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.auth.title", descKey: "nexa.sec.feat.auth.desc" },
    { icon: <WifiOff className="w-5 h-5 text-nexa-primary" />, titleKey: "nexa.sec.feat.bypass.title", descKey: "nexa.sec.feat.bypass.desc" },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.sec.badge"
        titleKey="nexa.sec.title"
        subtitleKey="nexa.sec.subtitle"
        gradient="from-nexa-primary/10 to-transparent"
        videoSrc="/videos/features/security-hero.mp4"
      />

      {/* Features Grid */}
      <NexaSection titleKey="nexa.sec.features.title" subtitleKey="nexa.sec.features.subtitle" id="features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secFeatures.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="p-6 rounded-2xl dark:bg-nexa-surface-elevated/30 bg-white border dark:border-white/5 border-gray-100">
              <div className="w-10 h-10 rounded-xl dark:bg-nexa-primary/10 bg-nexa-primary/5 flex items-center justify-center mb-4">{f.icon}</div>
              <h3 className="text-base font-bold dark:text-white text-gray-900 mb-2">{t(f.titleKey)}</h3>
              <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </NexaSection>

      {/* Detailed: Zero Knowledge Architecture */}
      <NexaSection titleKey="nexa.sec.detail.zk.title" subtitleKey="nexa.sec.detail.zk.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<EyeOff className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.sec.detail.zkarch.title"
            descKey="nexa.sec.detail.zkarch.desc"
            points={[
              "nexa.sec.detail.zkarch.p1",
              "nexa.sec.detail.zkarch.p2",
              "nexa.sec.detail.zkarch.p3",
              "nexa.sec.detail.zkarch.p4",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Key className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.sec.detail.keymanage.title"
            descKey="nexa.sec.detail.keymanage.desc"
            points={[
              "nexa.sec.detail.keymanage.p1",
              "nexa.sec.detail.keymanage.p2",
              "nexa.sec.detail.keymanage.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Detailed: Compliance */}
      <NexaSection titleKey="nexa.sec.detail.compliance.title" subtitleKey="nexa.sec.detail.compliance.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Scale className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.sec.detail.standards.title"
            descKey="nexa.sec.detail.standards.desc"
            points={[
              "nexa.sec.detail.standards.p1",
              "nexa.sec.detail.standards.p2",
              "nexa.sec.detail.standards.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<FileCheck className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.sec.detail.audit.title"
            descKey="nexa.sec.detail.audit.desc"
            points={[
              "nexa.sec.detail.audit.p1",
              "nexa.sec.detail.audit.p2",
              "nexa.sec.detail.audit.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Comparison Table */}
      <NexaSection titleKey="nexa.sec.compare.title" subtitleKey="nexa.sec.compare.subtitle" dark>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-white/10 border-gray-200">
                <th className="text-left py-4 px-4 dark:text-nexa-text-secondary text-gray-500 font-medium">{t("nexa.sec.compare.feature")}</th>
                <th className="text-center py-4 px-4 text-nexa-primary font-bold">NexaLive</th>
                <th className="text-center py-4 px-4 dark:text-nexa-text-secondary text-gray-500 font-medium">Signal</th>
                <th className="text-center py-4 px-4 dark:text-nexa-text-secondary text-gray-500 font-medium">WhatsApp</th>
                <th className="text-center py-4 px-4 dark:text-nexa-text-secondary text-gray-500 font-medium">Telegram</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b dark:border-white/5 border-gray-100">
                  <td className="py-3.5 px-4 dark:text-white text-gray-900 font-medium">{row.feature}</td>
                  <td className="py-3.5 px-4 text-center">{row.nexa ? <CheckCircle className="w-5 h-5 text-nexa-primary mx-auto" /> : <span className="dark:text-nexa-text-muted text-gray-300">—</span>}</td>
                  <td className="py-3.5 px-4 text-center">{row.signal ? <CheckCircle className="w-5 h-5 dark:text-white/30 text-gray-300 mx-auto" /> : <span className="dark:text-nexa-text-muted text-gray-300">—</span>}</td>
                  <td className="py-3.5 px-4 text-center">{row.whatsapp ? <CheckCircle className="w-5 h-5 dark:text-white/30 text-gray-300 mx-auto" /> : <span className="dark:text-nexa-text-muted text-gray-300">—</span>}</td>
                  <td className="py-3.5 px-4 text-center">{row.telegram ? <CheckCircle className="w-5 h-5 dark:text-white/30 text-gray-300 mx-auto" /> : <span className="dark:text-nexa-text-muted text-gray-300">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.sec.cta.title" descKey="nexa.sec.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaSecurityPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaSecurityContent />
    </NexaLiveLanguageProvider>
  );
}
