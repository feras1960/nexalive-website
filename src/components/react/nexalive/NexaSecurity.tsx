import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { ShieldCheck, Globe2, FileKey2 } from "lucide-react";

const NexaSecurity: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: t("nexa.security.1.title"),
      desc: t("nexa.security.1.desc"),
    },
    {
      icon: Globe2,
      title: t("nexa.security.2.title"),
      desc: t("nexa.security.2.desc"),
    },
    {
      icon: FileKey2,
      title: t("nexa.security.3.title"),
      desc: t("nexa.security.3.desc"),
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden dark:bg-black/60 bg-gray-50 border-y dark:border-white/5 border-gray-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold mb-6">
            <ShieldCheck className="w-4 h-4" />
            {t("nexa.security.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 mb-6">
            {t("nexa.security.title")}
          </h2>
          <p className="text-xl dark:text-gray-400 text-gray-600">
            {t("nexa.security.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {securityFeatures.map((feat, idx) => (
            <div key={idx} className="dark:bg-white/5 bg-white dark:border-white/10 border-gray-200 border rounded-3xl p-8 backdrop-blur-sm dark:hover:bg-white/10 hover:bg-gray-50 transition-colors shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-nexa-primary/10 border border-nexa-primary/20 flex items-center justify-center mb-6">
                <feat.icon className="w-7 h-7 text-nexa-primary" />
              </div>
              <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">{feat.title}</h3>
              <p className="dark:text-gray-400 text-gray-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Global Infrastructure Map Mockup */}
        <div className="mt-16 relative dark:bg-nexa-surface bg-white dark:border-white/10 border-gray-200 border rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden max-w-5xl mx-auto flex items-center justify-center min-h-[300px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-gradient-to-r from-nexa-primary/20 to-blue-500/20 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 text-center">
            <Globe2 className="w-20 h-20 dark:text-white/20 text-gray-300 mx-auto mb-6 animate-pulse-slow" />
            <h4 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{t("nexa.security.network.title")}</h4>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Frankfurt', 'Virginia', 'Singapore', 'Tokyo', 'Sydney', 'São Paulo', 'Riyadh 🇸🇦'].map((region, i) => (
                <span key={i} className="px-3 py-1 rounded-full dark:bg-white/5 bg-gray-100 dark:border-white/10 border-gray-200 border text-sm dark:text-gray-300 text-gray-600">
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NexaSecurity;
