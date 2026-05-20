import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Check, X, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface CompareRow {
  key: string;
  nexa: boolean | string;
  telegram: boolean | string;
  whatsapp: boolean | string;
  zello: boolean | string;
  isHighlight?: boolean;
}

const NexaComparison: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  const features: CompareRow[] = [
    // === Core PTT ===
    { key: "nexa.compare.feat.audio", nexa: true, telegram: false, whatsapp: false, zello: true },
    { key: "nexa.compare.feat.video", nexa: true, telegram: false, whatsapp: false, zello: false },
    { key: "nexa.compare.feat.channels", nexa: true, telegram: true, whatsapp: false, zello: true },
    { key: "nexa.compare.feat.calls", nexa: true, telegram: true, whatsapp: true, zello: false },
    // === Safety ===
    { key: "nexa.compare.feat.sos", nexa: true, telegram: false, whatsapp: false, zello: "paid" },
    { key: "nexa.compare.feat.lone", nexa: true, telegram: false, whatsapp: false, zello: "paid" },
    // === Enterprise ===
    { key: "nexa.compare.feat.pbx", nexa: true, telegram: false, whatsapp: false, zello: false, isHighlight: true },
    { key: "nexa.compare.feat.ai", nexa: true, telegram: false, whatsapp: false, zello: false },
    { key: "nexa.compare.feat.erp", nexa: true, telegram: false, whatsapp: false, zello: false },
    { key: "nexa.compare.feat.dispatcher", nexa: true, telegram: false, whatsapp: false, zello: "paid" },
    { key: "nexa.compare.feat.recording", nexa: true, telegram: false, whatsapp: false, zello: "paid" },
    // === Security ===
    { key: "nexa.compare.feat.e2e", nexa: "aes256", telegram: "mtproto", whatsapp: "signal-proto", zello: false },
    { key: "nexa.compare.feat.mesh", nexa: true, telegram: false, whatsapp: false, zello: false, isHighlight: true },
    { key: "nexa.compare.feat.nophone", nexa: true, telegram: false, whatsapp: false, zello: true },
    { key: "nexa.compare.feat.enterprise", nexa: true, telegram: false, whatsapp: "business-api", zello: "paid" },
    { key: "nexa.compare.feat.free", nexa: true, telegram: true, whatsapp: true, zello: true },
  ];

  const renderValue = (val: boolean | string) => {
    if (val === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (val === false) return <X className="w-5 h-5 text-red-500/40 mx-auto" />;
    if (val === "paid") return <span className="text-xs font-medium text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10">مدفوع</span>;
    if (val === "aes256") return <span className="text-xs font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10">AES-256</span>;
    if (val === "signal-proto") return <span className="text-[10px] text-gray-400">Signal</span>;
    if (val === "mtproto") return <span className="text-[10px] text-gray-400">MTProto</span>;
    if (val === "business-api") return <span className="text-[10px] text-gray-400">Business API</span>;
    return <span className="text-gray-500">—</span>;
  };

  // Count NexaLive advantages
  const nexaAdvantages = features.filter(f => f.nexa === true || f.nexa === "aes256").length;

  return (
    <section className="py-24 relative overflow-hidden dark:bg-nexa-deep-dark bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold dark:text-white text-gray-900 mb-6"
          >
            {t("nexa.compare.title")}
          </motion.h2>
          <p className="text-xl dark:text-gray-400 text-gray-600">
            {t("nexa.compare.subtitle")}
          </p>
        </div>

        {/* Unified Table */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-nexa-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative dark:bg-nexa-surface bg-white dark:border-white/10 border-gray-200 border rounded-3xl overflow-hidden shadow-2xl">
            {/* Score bar */}
            <div className="flex items-center justify-center gap-3 py-4 px-6 dark:bg-emerald-500/5 bg-emerald-50 dark:border-white/5 border-gray-100 border-b">
              <Crown className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold dark:text-emerald-400 text-emerald-600">
                {isRTL
                  ? `NexaLive يتفوق في ${nexaAdvantages} من ${features.length} ميزة`
                  : `NexaLive leads in ${nexaAdvantages} of ${features.length} features`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="dark:border-white/10 border-gray-200 border-b dark:bg-white/5 bg-gray-50">
                    <th className={`p-5 font-semibold dark:text-gray-300 text-gray-600 w-[30%] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("nexa.ui.feature")}
                    </th>
                    <th className="p-5 text-center w-[17.5%]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-nexa-primary font-bold text-sm">NexaLive</span>
                        <span className="text-[10px] dark:text-emerald-400/60 text-emerald-600/60">★ {t("nexa.ui.best")}</span>
                      </div>
                    </th>
                    <th className="p-5 text-center w-[17.5%]">
                      <span className="dark:text-gray-400 text-gray-500 font-semibold text-sm">Telegram</span>
                    </th>
                    <th className="p-5 text-center w-[17.5%]">
                      <span className="dark:text-gray-400 text-gray-500 font-semibold text-sm">WhatsApp</span>
                    </th>
                    <th className="p-5 text-center w-[17.5%]">
                      <span className="dark:text-gray-400 text-gray-500 font-semibold text-sm">Zello</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`dark:border-white/5 border-gray-100 border-b dark:hover:bg-white/5 hover:bg-gray-50 transition-colors ${
                        row.isHighlight ? 'dark:bg-emerald-500/5 bg-emerald-50/50' : ''
                      }`}
                    >
                      <td className={`p-4 ${t("nexa.ui.pl_6_text_left")}`}>
                        <span className={`text-sm font-medium dark:text-gray-300 text-gray-700 ${row.isHighlight ? 'dark:text-emerald-300 text-emerald-700' : ''}`}>
                          {row.isHighlight && <Crown className="w-3.5 h-3.5 inline-block text-emerald-500 mr-1.5 mb-0.5" />}
                          {t(row.key)}
                        </span>
                      </td>
                      <td className="p-4 text-center dark:bg-nexa-primary/5 bg-nexa-primary/5 dark:border-white/5 border-gray-100 border-x">
                        {renderValue(row.nexa)}
                      </td>
                      <td className="p-4 text-center">{renderValue(row.telegram)}</td>
                      <td className="p-4 text-center">{renderValue(row.whatsapp)}</td>
                      <td className="p-4 text-center">{renderValue(row.zello)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-center py-6 px-6 dark:bg-white/5 bg-gray-50 dark:border-white/5 border-gray-100 border-t">
              <a
                href="#download"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: 'var(--accent-primary, #00C47A)', boxShadow: '0 4px 20px rgba(0, 196, 122, 0.3)' }}
              >
                {t("nexa.ui.try_nexalive_free")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NexaComparison;
