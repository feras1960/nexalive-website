import React from "react";
import { motion } from "framer-motion";
import { Phone, Server, Headphones, ArrowRight, ArrowLeft } from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaCTABanner } from "../../NexaPageTemplate";

const devices = [
  {
    titleKey: "nexa.hardware.ip_phones.title",
    descKey: "nexa.hardware.ip_phones.desc",
    icon: Phone,
    href: "/hardware/ip-phones",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500"
  },
  {
    titleKey: "nexa.hardware.gateways.title",
    descKey: "nexa.hardware.gateways.desc",
    icon: Server,
    href: "/hardware/gateways",
    color: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-500"
  },
  {
    titleKey: "nexa.hardware.headsets.title",
    descKey: "nexa.hardware.headsets.desc",
    icon: Headphones,
    href: "/hardware/headsets",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500"
  }
];

function Content() {
  const { isRTL, t } = useNexaLanguage();

  return (
    <NexaPageWrapper>
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 dark:bg-nexa-deep-dark bg-nexa-light-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nexa-primary/10 to-transparent dark:opacity-100 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-nexa-primary/10 bg-nexa-primary/5 dark:border-nexa-primary/30 border-nexa-primary/20 border mb-6">
              <span className="text-sm font-semibold dark:text-nexa-primary text-nexa-primary-dark">
                {t("nexa.ui.nexalive_hardware")}
              </span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold dark:text-white text-gray-900 leading-tight mb-6">
              {t("nexa.ui.advanced_communications_hardwa")}
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl dark:text-nexa-text-secondary text-nexa-light-text-secondary">
              {t("nexa.ui.we_provide_a_complete_range_of")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {devices.map((device, i) => (
              <motion.a
                href={device.href}
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="group relative p-8 rounded-3xl dark:bg-nexa-surface-elevated/50 bg-white/80 backdrop-blur-xl 
                  border dark:border-white/10 border-gray-200 
                  dark:hover:border-nexa-primary/50 hover:border-nexa-primary/40
                  hover:shadow-2xl hover:shadow-nexa-primary/10 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full overflow-hidden"
              >
                {/* Gradient glow behind icon */}
                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-40 h-40 bg-gradient-to-br ${device.color} rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${device.color} flex items-center justify-center mb-6 
                    group-hover:scale-110 transition-all duration-500 border dark:border-white/10 border-gray-200
                    shadow-lg group-hover:shadow-xl`}>
                    <device.icon className={`w-10 h-10 ${device.iconColor} group-hover:text-nexa-primary transition-colors duration-300`} />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-4 group-hover:text-nexa-primary transition-colors">
                    {t(device.titleKey)}
                  </h3>
                  <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary flex-grow mb-8 leading-relaxed text-[15px]">
                    {t(device.descKey)}
                  </p>
                  <div className={`flex items-center text-sm font-bold dark:text-nexa-primary text-nexa-primary-dark gap-2 group-hover:gap-3 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t("nexa.ui.view_devices")}
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <NexaCTABanner 
        titleKey="nexa.hardware.cta.title" 
        descKey="nexa.hardware.cta.desc" 
      />
    </NexaPageWrapper>
  );
}

export default function NexaDevicesPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
