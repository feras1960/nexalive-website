import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Check, Download, Zap } from "lucide-react";

const NexaFreePlan: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-nexa-primary/20 via-blue-500/20 to-emerald-500/20 rounded-[3rem] blur-xl"></div>
        
        <div className="relative bg-gradient-to-r from-nexa-primary to-emerald-600 border dark:border-white/10 border-nexa-primary/30 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className={`flex-1 ${isRTL ? "md:text-right" : "md:text-left"} text-center`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-sm font-bold mb-6 self-center md:self-${isRTL ? "end" : "start"}`}>
              <Zap className="w-4 h-4" />
              100% Free
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {t("nexa.freeplan.title")}
            </h2>
            
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto md:mx-0">
              {t("nexa.freeplan.desc")}
            </p>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">
                    {t(`nexa.freeplan.feature${num}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4">
            <a
              href="#download"
              className="group relative flex items-center justify-center gap-3 w-full md:w-64 px-8 py-5 rounded-2xl bg-white text-nexa-primary-dark font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              <Download className="w-6 h-6" />
              <span>{t("nexa.freeplan.cta")}</span>
            </a>
            <p className="text-center text-sm text-white/60">
              {t("nexa.freeplan.available")}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default NexaFreePlan;
