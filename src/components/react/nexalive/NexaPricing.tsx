import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Check, ArrowRight, X, Crown } from "lucide-react";

const NexaPricing: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      id: "basic",
      title: t("nexa.pricing.plan.free.title"),
      desc: t("nexa.pricing.plan.free.desc"),
      priceMonth: "0",
      priceYear: "0",
      users: t("nexa.ui.up_to_5_users"),
      features: [
        { text: t("nexa.ui.voice_video_ptt"), included: true },
        { text: t("nexa.ui.sos_live_tracking"), included: true },
        { text: t("nexa.ui.aes_256_encryption"), included: true },
        { text: t("nexa.ui.offline_bluetooth_mesh"), included: true },
        { text: t("nexa.ui.50_mins_sip_mo"), included: true },
        { text: t("nexa.ui.cloud_pbx_1_extension"), included: true },
        { text: t("nexa.ui.voice_history_7_days"), included: true },
        { text: t("nexa.ui.dispatcher_console"), included: false },
        { text: t("nexa.ui.ai_analytics"), included: false },
        { text: t("nexa.ui.erp_integration"), included: false },
      ],
      style: "light" as const,
    },
    {
      id: "pro",
      title: t("nexa.pricing.plan.pro.title"),
      desc: t("nexa.pricing.plan.pro.desc"),
      priceMonth: "5",
      priceYear: "4",
      users: t("nexa.ui.up_to_50_users"),
      features: [
        { text: t("nexa.ui.everything_in_basic"), included: true, isBold: true },
        { text: t("nexa.ui.cloud_pbx_10_extensions"), included: true },
        { text: t("nexa.ui.multi_level_ivr"), included: true },
        { text: t("nexa.ui.dispatcher_console"), included: true },
        { text: t("nexa.ui.voice_history_30_days"), included: true },
        { text: t("nexa.ui.500_mins_sip_mo"), included: true },
        { text: t("nexa.ui.call_recording"), included: true },
        { text: t("nexa.ui.free_global_roaming"), included: true },
        { text: t("nexa.ui.ai_analytics"), included: false },
        { text: t("nexa.ui.custom_erp_integration"), included: false },
      ],
      isPopular: true,
      style: "dark" as const,
    },
    {
      id: "business",
      title: t("nexa.pricing.plan.biz.title"),
      desc: t("nexa.pricing.plan.biz.desc"),
      priceMonth: "12",
      priceYear: "10",
      users: t("nexa.ui.up_to_200_users"),
      features: [
        { text: t("nexa.ui.everything_in_pro"), included: true, isBold: true },
        { text: t("nexa.ui.cloud_pbx_50_extensions"), included: true },
        { text: t("nexa.ui.ai_call_analytics"), included: true },
        { text: t("nexa.ui.auto_transcription"), included: true },
        { text: t("nexa.ui.texacore_erp_integration"), included: true },
        { text: t("nexa.ui.2_000_mins_sip_mo"), included: true },
        { text: t("nexa.ui.voice_history_90_days"), included: true },
        { text: t("nexa.ui.advanced_cdr_reports"), included: true },
        { text: t("nexa.ui.works_where_voip_blocked"), included: true },
        { text: t("nexa.ui.lone_worker_protection"), included: true },
      ],
      style: "accent" as const,
    },
    {
      id: "enterprise",
      title: t("nexa.pricing.plan.ent.title"),
      desc: t("nexa.pricing.plan.ent.desc"),
      priceMonth: "Custom",
      priceYear: "Custom",
      users: t("nexa.ui.unlimited_users"),
      features: [
        { text: t("nexa.ui.everything_in_business"), included: true, isBold: true },
        { text: t("nexa.ui.unlimited_pbx_extensions"), included: true },
        { text: t("nexa.ui.on_premise_deployment"), included: true },
        { text: t("nexa.ui.custom_erp_crm_integration"), included: true },
        { text: t("nexa.ui.unlimited_sip_gateway"), included: true },
        { text: t("nexa.ui.unlimited_voice_history"), included: true },
        { text: t("nexa.ui.dedicated_account_manager"), included: true },
        { text: t("nexa.ui.custom_sla_99_99"), included: true },
        { text: t("nexa.ui.team_training"), included: true },
        { text: t("nexa.ui.24_7_priority_support"), included: true },
      ],
      style: "light" as const,
    },
  ];

  const getCardStyle = (style: string) => {
    switch (style) {
      case "dark":
        return {
          bg: 'var(--bg-dark-section)',
          text: 'white',
          border: 'transparent',
          featureText: 'rgba(255,255,255,0.7)',
          mutedText: 'rgba(255,255,255,0.4)',
        };
      case "accent":
        return {
          bg: 'linear-gradient(135deg, #0a2e1a 0%, #0f2318 100%)',
          text: 'white',
          border: 'rgba(0,196,122,0.3)',
          featureText: 'rgba(255,255,255,0.7)',
          mutedText: 'rgba(255,255,255,0.4)',
        };
      default:
        return {
          bg: 'var(--bg-card)',
          text: 'var(--text-primary)',
          border: 'var(--border-card)',
          featureText: 'var(--text-secondary)',
          mutedText: 'var(--text-muted)',
        };
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-[clamp(28px,5vw,48px)] font-bold mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {t("nexa.pricing.title")}
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t("nexa.pricing.subtitle")}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
              {t("nexa.pricing.monthly")}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full border transition-all"
              style={{
                background: isYearly ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                borderColor: isYearly ? 'var(--accent-primary)' : 'var(--border-medium)',
              }}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${isYearly ? (isRTL ? "left-0.5" : "left-[30px]") : (isRTL ? "left-[30px]" : "left-0.5")}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 transition-colors ${isYearly ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
              {t("nexa.pricing.yearly")}
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(0,196,122,0.12)', color: 'var(--accent-primary)' }}>
                {t("nexa.pricing.save")}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Plans Grid — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, i) => {
            const cs = getCardStyle(plan.style);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-[24px] p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.style !== "light" ? "shadow-2xl" : "border"
                }`}
                style={{
                  background: cs.bg,
                  borderColor: cs.border,
                }}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold text-white"
                    style={{ background: 'var(--accent-primary)' }}>
                    {t("nexa.ui.most_popular")}
                  </div>
                )}
                {plan.id === "business" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold text-white"
                    style={{ background: 'linear-gradient(90deg, #00C47A, #0EA5E9)' }}>
                    <Crown className="w-3 h-3" />
                    {t("nexa.ui.best_value")}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1.5" style={{ color: cs.text }}>
                    {plan.title}
                  </h3>
                  <p className="text-sm" style={{ color: cs.mutedText }}>
                    {plan.desc}
                  </p>
                </div>

                <div className="mb-6">
                  {plan.priceMonth === "Custom" ? (
                    <div className="text-3xl font-extrabold" style={{ color: cs.text, letterSpacing: '-0.03em' }}>
                      {t("nexa.ui.custom")}
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-[40px] font-extrabold"
                        style={{ color: cs.text, letterSpacing: '-0.04em' }}>
                        ${isYearly ? plan.priceYear : plan.priceMonth}
                      </span>
                      {plan.priceMonth !== "0" && (
                        <span className="text-sm mb-2" style={{ color: cs.mutedText }}>
                          {t("nexa.pricing.peruser")}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-1.5 text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                    {plan.users}
                  </div>
                </div>

                <a
                  href={plan.id === "enterprise" ? "/contact" : "#download"}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 mb-6 ${
                    plan.style !== "light"
                      ? "text-white hover:opacity-90"
                      : "border-2 hover:bg-[var(--bg-secondary)]"
                  }`}
                  style={plan.style !== "light" 
                    ? { background: plan.id === "business" ? 'linear-gradient(90deg, #00C47A, #0EA5E9)' : 'var(--accent-primary)' }
                    : { borderColor: 'var(--border-medium)', color: 'var(--text-primary)' }
                  }
                >
                  {plan.id === "enterprise" ? t("nexa.pricing.contact") : t("nexa.pricing.getstarted")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>

                <div className="space-y-2.5 mt-auto">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      {feat.included ? (
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: plan.style !== "light" ? 'rgba(0,196,122,0.2)' : 'var(--accent-glow)' }}>
                          <Check className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: plan.style !== "light" ? 'rgba(255,255,255,0.05)' : 'var(--bg-secondary, #f3f4f6)' }}>
                          <X className="w-3 h-3" style={{ color: plan.style !== "light" ? 'rgba(255,255,255,0.2)' : 'var(--text-muted)' }} />
                        </div>
                      )}
                      <span className={`text-[13px] leading-snug ${(feat as any).isBold ? 'font-semibold' : ''}`}
                        style={{ 
                          color: feat.included ? cs.featureText : (plan.style !== "light" ? 'rgba(255,255,255,0.25)' : 'var(--text-muted)'),
                          textDecoration: feat.included ? 'none' : 'line-through',
                          textDecorationColor: 'rgba(128,128,128,0.3)'
                        }}>
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NexaPricing;
