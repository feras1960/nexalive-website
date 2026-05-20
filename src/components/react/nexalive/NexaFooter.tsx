import React, { useState } from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Radio, ArrowRight, Mail } from "lucide-react";

const NexaFooter: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: 'var(--bg-dark-section)', color: 'var(--text-on-dark)' }}>
      {/* ═══ Newsletter CTA strip ═══ */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
                {t("nexa.ui.stay_in_the_loop")}
              </h3>
              <p className="text-white/40 text-sm">
                {t("nexa.ui.product_updates_and_news_strai")}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full max-w-md">
              <div className="flex-1 relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 ${isRTL ? "right-4" : "left-4"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("nexa.ui.enter_your_email")}
                  className={`w-full py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--accent-primary)] transition-colors ${t("nexa.ui.pl_11_pr_4")}`}
                />
              </div>
              <button className="px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shrink-0"
                style={{ background: 'var(--accent-primary)' }}>
                {t("nexa.ui.subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Links Grid ═══ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">
                Nexa<span style={{ color: 'var(--accent-primary)' }}>Live</span>
              </span>
            </a>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              {t("nexa.footer.desc")}
            </p>
            {/* Store buttons */}
            <div className="flex flex-wrap gap-2">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.1] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                iOS
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.1] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/></svg>
                Android
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white/90 font-semibold text-[13px] uppercase tracking-[0.08em] mb-5">{t("nexa.nav.features")}</h4>
            <div className="flex flex-col gap-3">
              <a href="/features/pbx" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.pbx")}</a>
              <a href="/features/ptt" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.ptt")}</a>
              <a href="/features/ptt" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.video")}</a>
              <a href="/features/messaging" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.messaging")}</a>
              <a href="/features/security" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.security")}</a>
              <a href="/features/mesh" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nav.mega.mesh")}</a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white/90 font-semibold text-[13px] uppercase tracking-[0.08em] mb-5">{t("nexa.nav.solutions")}</h4>
            <div className="flex flex-col gap-3">
              <a href="/solutions/callcenters" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.callcenters.title")}</a>
              <a href="/solutions/government" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.government.title")}</a>
              <a href="/solutions/banks" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.banks.title")}</a>
              <a href="/solutions/police" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.police.title")}</a>
              <a href="/solutions/hospitals" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.hospitals.title")}</a>
              <a href="/solutions/factories" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.factories.title")}</a>
              <a href="/solutions/business" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.business.title")}</a>
              <a href="/solutions/ecommerce" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.ecommerce.title")}</a>
              <a href="/solutions/fieldteams" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.fieldteams.title")}</a>
              <a href="/solutions/security" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.solutions.security.title")}</a>
            </div>
          </div>

          {/* Hardware */}
          <div>
            <h4 className="text-white/90 font-semibold text-[13px] uppercase tracking-[0.08em] mb-5">
              {t("nexa.ui.hardware")}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="/hardware" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">
                {t("nexa.ui.all_hardware")}
              </a>
              <a href="/hardware/ip-phones" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">
                {t("nexa.ui.ip_phones")}
              </a>
              <a href="/hardware/gateways" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">
                {t("nexa.ui.gateways")}
              </a>
              <a href="/hardware/headsets" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">
                {t("nexa.ui.headsets")}
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/90 font-semibold text-[13px] uppercase tracking-[0.08em] mb-5">{t("nexa.footer.company")}</h4>
            <div className="flex flex-col gap-3">
              <a href="/about" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.ui.about_us")}</a>
              <a href="/for-business" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.nav.forBusiness")}</a>
              <a href="https://texacore.com" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">TexaCore ERP</a>
              <a href="/contact" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.footer.contact")}</a>
              <a href="/privacy" className="text-white/40 hover:text-[var(--accent-primary)] transition-colors text-sm">{t("nexa.footer.privacy")}</a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Bottom bar ═══ */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            &copy; {year} TexaCore Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-white/30 text-xs">{t("nexa.footer.status")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NexaFooter;
