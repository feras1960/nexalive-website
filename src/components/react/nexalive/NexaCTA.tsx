import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { ArrowRight, Radio } from "lucide-react";

const NexaCTA: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--bg-dark-section)' }}>

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,122,0.08), transparent 70%)' }} />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Logo icon */}
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mx-auto mb-8">
          <Radio className="w-8 h-8 text-[var(--accent-primary)]" />
        </div>

        <h2 className="text-[clamp(28px,5vw,52px)] font-extrabold text-white mb-6"
          style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {t("nexa.ui.ready_to_transform_your_team_c")}
        </h2>
        <p className="text-lg text-white/45 mb-10 max-w-xl mx-auto leading-relaxed">
          {t("nexa.ui.join_thousands_of_enterprises")
          }
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <a
            href="#download"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-[16px]
              transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--accent-primary)' }}
          >
            <span>{t("nexa.hero.cta.download")}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
          </a>
          <a
            href="/for-business"
            className="px-8 py-4 rounded-xl border-2 border-white/15 text-white font-semibold text-[16px]
              hover:bg-white/5 transition-all active:scale-[0.97]"
          >
            {t("nexa.hero.cta.business")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default NexaCTA;
