import React from "react";
import { motion } from "framer-motion";
import { Phone, PhoneForwarded, PhoneIncoming, Headphones, Users, 
  Globe, Shield, Mic, Volume2, ArrowLeftRight, Clock, BarChart3, Voicemail,
  WifiOff, Settings, Layers, Workflow, Building2, Server, Zap, CheckCircle } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, PageHero, NexaSection, FeatureCard, NexaCTABanner } from "../NexaPageTemplate";
import { useScrollStagger } from "../useAnimations";
import NexaIVRPlayer from "../NexaIVRPlayer";

// Detailed feature block with sub-points
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

// PBX Phone Visual
function PBXHeroVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-nexa-primary to-blue-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30" />
      <div className="relative dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-nexa-primary/20 flex items-center justify-center">
            <Phone className="w-5 h-5 text-nexa-primary" />
          </div>
          <div>
            <div className="dark:text-white text-gray-900 font-semibold text-sm">NexaPBX Cloud</div>
            <div className="text-xs dark:text-nexa-text-muted text-nexa-light-text-muted">Extension 1001</div>
          </div>
          <div className="ml-auto px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Online</div>
        </div>
        
        {/* Active call simulation */}
        <div className="space-y-2 mb-4">
          {[
            { ext: "1002", name: "Ahmad K.", status: "active", duration: "02:34" },
            { ext: "1005", name: "Sara M.", status: "hold", duration: "00:45" },
            { ext: "1008", name: "IVR Queue", status: "ringing", duration: "" },
          ].map((call, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                call.status === "active" ? "dark:bg-nexa-primary/10 bg-nexa-primary/5 border dark:border-nexa-primary/20 border-nexa-primary/10" :
                call.status === "hold" ? "dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/20 border-amber-200" :
                "dark:bg-blue-500/10 bg-blue-50 border dark:border-blue-500/20 border-blue-200"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                call.status === "active" ? "bg-nexa-primary text-white" :
                call.status === "hold" ? "bg-amber-500 text-white" : "bg-blue-500 text-white animate-pulse"
              }`}>
                {call.ext.slice(-2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="dark:text-white text-gray-900 font-medium truncate">{call.name}</div>
                <div className="dark:text-nexa-text-muted text-nexa-light-text-muted text-xs">Ext {call.ext}</div>
              </div>
              {call.duration && <span className="dark:text-nexa-text-secondary text-nexa-light-text-secondary text-xs font-mono">{call.duration}</span>}
            </motion.div>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: PhoneForwarded, label: "Transfer", color: "text-nexa-primary" },
            { icon: Users, label: "Conference", color: "text-blue-400" },
            { icon: Voicemail, label: "Voicemail", color: "text-purple-400" },
            { icon: BarChart3, label: "Analytics", color: "text-amber-400" },
          ].map((btn, i) => (
            <button key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl dark:hover:bg-white/5 hover:bg-gray-100 transition-colors">
              <btn.icon className={`w-5 h-5 ${btn.color}`} />
              <span className="text-[10px] dark:text-nexa-text-muted text-nexa-light-text-muted">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NexaPBXContent() {
  const { t } = useNexaLanguage();
  const gridRef = useScrollStagger();
  
  const pbxFeatures = [
    { icon: <Phone className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.extensions.title", descKey: "nexa.pbx.feat.extensions.desc" },
    { icon: <Voicemail className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.ivr.title", descKey: "nexa.pbx.feat.ivr.desc" },
    { icon: <Users className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.ringgroups.title", descKey: "nexa.pbx.feat.ringgroups.desc" },
    { icon: <PhoneForwarded className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.transfer.title", descKey: "nexa.pbx.feat.transfer.desc" },
    { icon: <Globe className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.trunks.title", descKey: "nexa.pbx.feat.trunks.desc" },
    { icon: <PhoneIncoming className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.callback.title", descKey: "nexa.pbx.feat.callback.desc" },
    { icon: <Headphones className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.softphone.title", descKey: "nexa.pbx.feat.softphone.desc" },
    { icon: <Shield className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.bypass.title", descKey: "nexa.pbx.feat.bypass.desc" },
    { icon: <ArrowLeftRight className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.routing.title", descKey: "nexa.pbx.feat.routing.desc" },
    { icon: <Clock className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.timeconditions.title", descKey: "nexa.pbx.feat.timeconditions.desc" },
    { icon: <Mic className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.recording.title", descKey: "nexa.pbx.feat.recording.desc" },
    { icon: <BarChart3 className="w-6 h-6 text-nexa-primary" />, titleKey: "nexa.pbx.feat.cdr.title", descKey: "nexa.pbx.feat.cdr.desc" },
  ];

  return (
    <NexaPageWrapper>
      <PageHero
        badgeKey="nexa.pbx.badge"
        titleKey="nexa.pbx.title"
        subtitleKey="nexa.pbx.subtitle"
        gradient="from-nexa-primary/15 via-blue-500/10 to-transparent"
        heroVisual={<PBXHeroVisual />}
        videoSrc="/videos/solutions/solution-pbx.mp4"
      />

      {/* Quick Feature Cards */}
      <NexaSection titleKey="nexa.pbx.features.title" subtitleKey="nexa.pbx.features.subtitle" id="features">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pbxFeatures.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </NexaSection>

      {/* How NexaPBX Works */}
      <NexaSection titleKey="nexa.pbx.how.title" subtitleKey="nexa.pbx.how.subtitle" dark>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((step) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nexa-primary/20 to-nexa-primary/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-nexa-primary">{step}</span>
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{t(`nexa.pbx.how.step${step}.title`)}</h3>
              <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{t(`nexa.pbx.how.step${step}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </NexaSection>

      {/* Detailed: IVR & Call Routing */}
      <NexaSection titleKey="nexa.pbx.detail.ivr.title" subtitleKey="nexa.pbx.detail.ivr.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Workflow className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.ivrbuilder.title"
            descKey="nexa.pbx.detail.ivrbuilder.desc"
            points={[
              "nexa.pbx.detail.ivrbuilder.p1",
              "nexa.pbx.detail.ivrbuilder.p2",
              "nexa.pbx.detail.ivrbuilder.p3",
              "nexa.pbx.detail.ivrbuilder.p4",
            ]}
          />
          <DetailedFeatureBlock
            icon={<ArrowLeftRight className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.routing.title"
            descKey="nexa.pbx.detail.routing.desc"
            points={[
              "nexa.pbx.detail.routing.p1",
              "nexa.pbx.detail.routing.p2",
              "nexa.pbx.detail.routing.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* 🎙️ Interactive IVR Demo */}
      <NexaSection titleKey="nexa.pbx.ivrdemo.title" subtitleKey="nexa.pbx.ivrdemo.subtitle" dark>
        <NexaIVRPlayer />
      </NexaSection>

      {/* Detailed: VoIP Bypass */}
      <NexaSection titleKey="nexa.pbx.bypass.title" subtitleKey="nexa.pbx.bypass.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <DetailedFeatureBlock
            icon={<WifiOff className="w-6 h-6 text-red-400" />}
            titleKey="nexa.pbx.detail.bypass.title"
            descKey="nexa.pbx.detail.bypass.desc"
            points={[
              "nexa.pbx.detail.bypass.p1",
              "nexa.pbx.detail.bypass.p2",
              "nexa.pbx.detail.bypass.p3",
              "nexa.pbx.detail.bypass.p4",
            ]}
          />
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-2 border-dashed dark:border-white/10 border-gray-200 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border-2 border-dashed dark:border-nexa-primary/30 border-nexa-primary/20" style={{animation: "spin 20s linear infinite reverse"}} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nexa-primary to-blue-500 flex items-center justify-center shadow-nexa-lg">
                  <WifiOff className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 text-xs dark:text-white text-gray-900 font-medium shadow-lg">
                VoIP Blocked?
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-nexa-primary text-white text-xs font-bold shadow-nexa">
                ✓ NexaBridge Active
              </div>
            </div>
          </motion.div>
        </div>
      </NexaSection>

      {/* Detailed: Recording & Analytics */}
      <NexaSection titleKey="nexa.pbx.detail.analytics.title" subtitleKey="nexa.pbx.detail.analytics.subtitle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Mic className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.recording.title"
            descKey="nexa.pbx.detail.recording.desc"
            points={[
              "nexa.pbx.detail.recording.p1",
              "nexa.pbx.detail.recording.p2",
              "nexa.pbx.detail.recording.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<BarChart3 className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.cdr.title"
            descKey="nexa.pbx.detail.cdr.desc"
            points={[
              "nexa.pbx.detail.cdr.p1",
              "nexa.pbx.detail.cdr.p2",
              "nexa.pbx.detail.cdr.p3",
            ]}
          />
        </div>
      </NexaSection>

      {/* Detailed: ERP Integration */}
      <NexaSection titleKey="nexa.pbx.detail.erp.title" subtitleKey="nexa.pbx.detail.erp.subtitle" dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DetailedFeatureBlock
            icon={<Building2 className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.erpint.title"
            descKey="nexa.pbx.detail.erpint.desc"
            points={[
              "nexa.pbx.detail.erpint.p1",
              "nexa.pbx.detail.erpint.p2",
              "nexa.pbx.detail.erpint.p3",
            ]}
          />
          <DetailedFeatureBlock
            icon={<Server className="w-6 h-6 text-nexa-primary" />}
            titleKey="nexa.pbx.detail.deploy.title"
            descKey="nexa.pbx.detail.deploy.desc"
            points={[
              "nexa.pbx.detail.deploy.p1",
              "nexa.pbx.detail.deploy.p2",
              "nexa.pbx.detail.deploy.p3",
            ]}
          />
        </div>
      </NexaSection>

      <NexaCTABanner titleKey="nexa.pbx.cta.title" descKey="nexa.pbx.cta.desc" />
    </NexaPageWrapper>
  );
}

export default function NexaPBXPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaPBXContent />
    </NexaLiveLanguageProvider>
  );
}
