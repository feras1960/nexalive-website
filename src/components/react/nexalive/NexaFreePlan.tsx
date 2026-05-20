import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Check, Download, Zap } from "lucide-react";

const NexaFreePlan: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Ambient Glow Effects */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-nexa-primary/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative dark:bg-white/[0.03] bg-white/60 backdrop-blur-2xl
          border dark:border-white/[0.08] border-gray-200/60
          rounded-[3rem] p-8 md:p-16 overflow-hidden
          shadow-[0_8px_60px_-12px_rgba(0,196,122,0.12)]
          flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Background accents */}
          <div className="absolute -top-20 left-1/4 w-60 h-60 bg-nexa-primary/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className={`flex-1 relative z-10 ${isRTL ? "md:text-right" : "md:text-left"} text-center`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
              dark:bg-nexa-primary/10 bg-nexa-primary/5
              border dark:border-nexa-primary/30 border-nexa-primary/20
              dark:text-nexa-primary text-nexa-primary-dark text-sm font-bold mb-6`}>
              <Zap className="w-4 h-4" />
              100% Free
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-900 mb-6 leading-tight">
              {t("nexa.freeplan.title")}
            </h2>
            
            <p className="text-lg dark:text-white/60 text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              {t("nexa.freeplan.desc")}
            </p>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-6 h-6 rounded-full bg-nexa-primary/15 border border-nexa-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-nexa-primary" />
                  </div>
                  <span className="dark:text-white/80 text-gray-700 font-medium">
                    {t(`nexa.freeplan.feature${num}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-4 relative z-10">
            <a
              href="#download"
              className="group relative flex items-center justify-center gap-3 w-full md:w-64 px-8 py-5 rounded-2xl 
                bg-gradient-to-r from-nexa-primary to-emerald-500 text-white font-bold text-lg 
                shadow-[0_4px_20px_-4px_rgba(0,196,122,0.5)]
                hover:shadow-[0_8px_30px_-4px_rgba(0,196,122,0.6)] hover:-translate-y-0.5
                transition-all duration-300"
            >
              <Download className="w-6 h-6" />
              <span>{t("nexa.freeplan.cta")}</span>
            </a>
            <p className="text-center text-sm dark:text-white/40 text-gray-500">
              {t("nexa.freeplan.available")}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default NexaFreePlan;
