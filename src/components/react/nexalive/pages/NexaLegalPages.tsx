import React from "react";
import { motion } from "framer-motion";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import NexaHeader from "../NexaHeader";
import NexaFooter from "../NexaFooter";
import { Scale, Shield, AlertTriangle, FileText, Cookie, ExternalLink } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// Shared Legal Page Shell
// ═══════════════════════════════════════════════════════════════
function LegalPageShell({ icon: Icon, color, titleKey, lastUpdated, children }: {
  icon: React.ElementType; color: string; titleKey: string; lastUpdated: string; children: React.ReactNode;
}) {
  const { t, isRTL } = useNexaLanguage();
  return (
    <div className="dark:bg-nexa-deep-dark bg-nexa-light-bg min-h-screen transition-colors">
      <NexaHeader />
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, var(--bg-primary) 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,196,122,0.08),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Icon className="w-4 h-4" style={{ color }} />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{t(titleKey)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            {t(titleKey)}
          </h1>
          <p className="text-white/40 text-sm">{t("nexa.legal.lastUpdated")}: {lastUpdated}</p>
        </div>
      </section>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="prose dark:prose-invert prose-lg max-w-none
          dark:text-white/70 text-gray-600
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:dark:text-white [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:dark:text-white/90 [&_h3]:text-gray-800 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:space-y-2 [&_li]:dark:text-white/60 [&_li]:text-gray-600
          [&_strong]:dark:text-white [&_strong]:text-gray-900
          [&_a]:text-[var(--accent-primary)] [&_a]:underline
        ">
          {children}
        </div>
      </div>
      <NexaFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Terms of Service Page
// ═══════════════════════════════════════════════════════════════
function TermsContent() {
  const { t, isRTL } = useNexaLanguage();
  return (
    <LegalPageShell icon={Scale} color="#00C47A" titleKey="nexa.legal.terms.title" lastUpdated="2026-05-20">
      <h2>{t("nexa.legal.terms.s1.title")}</h2>
      <p>{t("nexa.legal.terms.s1.p1")}</p>
      <p>{t("nexa.legal.terms.s1.p2")}</p>

      <h2>{t("nexa.legal.terms.s2.title")}</h2>
      <p>{t("nexa.legal.terms.s2.p1")}</p>
      <ul>
        <li>{t("nexa.legal.terms.s2.li1")}</li>
        <li>{t("nexa.legal.terms.s2.li2")}</li>
        <li>{t("nexa.legal.terms.s2.li3")}</li>
        <li>{t("nexa.legal.terms.s2.li4")}</li>
      </ul>

      <h2>{t("nexa.legal.terms.s3.title")}</h2>
      <p>{t("nexa.legal.terms.s3.p1")}</p>

      <h2>{t("nexa.legal.terms.s4.title")}</h2>
      <p>{t("nexa.legal.terms.s4.p1")}</p>
      <ul>
        <li>{t("nexa.legal.terms.s4.li1")}</li>
        <li>{t("nexa.legal.terms.s4.li2")}</li>
        <li>{t("nexa.legal.terms.s4.li3")}</li>
      </ul>

      <h2>{t("nexa.legal.terms.s5.title")}</h2>
      <p>{t("nexa.legal.terms.s5.p1")}</p>

      <h2>{t("nexa.legal.terms.s6.title")}</h2>
      <p>{t("nexa.legal.terms.s6.p1")}</p>

      <h2>{t("nexa.legal.terms.s7.title")}</h2>
      <p>{t("nexa.legal.terms.s7.p1")}</p>
      <p>{t("nexa.legal.terms.s7.p2")}</p>
    </LegalPageShell>
  );
}

export function NexaTermsPage() {
  return <NexaLiveLanguageProvider><TermsContent /></NexaLiveLanguageProvider>;
}

// ═══════════════════════════════════════════════════════════════
// Disclaimer Page (SOS / Mesh / Emergency)
// ═══════════════════════════════════════════════════════════════
function DisclaimerContent() {
  const { t } = useNexaLanguage();
  return (
    <LegalPageShell icon={AlertTriangle} color="#EF4444" titleKey="nexa.legal.disclaimer.title" lastUpdated="2026-05-20">
      {/* General Disclaimer */}
      <h2>{t("nexa.legal.disclaimer.general.title")}</h2>
      <p>{t("nexa.legal.disclaimer.general.p1")}</p>
      <p>{t("nexa.legal.disclaimer.general.p2")}</p>

      {/* SOS / Emergency Disclaimer */}
      <div className="my-8 p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
        <h2 className="flex items-center gap-3 !text-red-500 !mt-0">
          <AlertTriangle className="w-6 h-6" />
          {t("nexa.legal.disclaimer.sos.title")}
        </h2>
        <p><strong>{t("nexa.legal.disclaimer.sos.warning")}</strong></p>
        <p>{t("nexa.legal.disclaimer.sos.p1")}</p>
        <ul>
          <li>{t("nexa.legal.disclaimer.sos.li1")}</li>
          <li>{t("nexa.legal.disclaimer.sos.li2")}</li>
          <li>{t("nexa.legal.disclaimer.sos.li3")}</li>
          <li>{t("nexa.legal.disclaimer.sos.li4")}</li>
          <li>{t("nexa.legal.disclaimer.sos.li5")}</li>
        </ul>
        <p>{t("nexa.legal.disclaimer.sos.p2")}</p>
      </div>

      {/* Mesh / Bluetooth Disclaimer */}
      <div className="my-8 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <h2 className="flex items-center gap-3 !text-amber-500 !mt-0">
          <Shield className="w-6 h-6" />
          {t("nexa.legal.disclaimer.mesh.title")}
        </h2>
        <p>{t("nexa.legal.disclaimer.mesh.p1")}</p>
        <ul>
          <li>{t("nexa.legal.disclaimer.mesh.li1")}</li>
          <li>{t("nexa.legal.disclaimer.mesh.li2")}</li>
          <li>{t("nexa.legal.disclaimer.mesh.li3")}</li>
          <li>{t("nexa.legal.disclaimer.mesh.li4")}</li>
        </ul>
      </div>

      {/* Lone Worker */}
      <h2>{t("nexa.legal.disclaimer.loneworker.title")}</h2>
      <p>{t("nexa.legal.disclaimer.loneworker.p1")}</p>
      <ul>
        <li>{t("nexa.legal.disclaimer.loneworker.li1")}</li>
        <li>{t("nexa.legal.disclaimer.loneworker.li2")}</li>
        <li>{t("nexa.legal.disclaimer.loneworker.li3")}</li>
      </ul>

      {/* Limitation of Liability */}
      <h2>{t("nexa.legal.disclaimer.liability.title")}</h2>
      <p>{t("nexa.legal.disclaimer.liability.p1")}</p>
      <p>{t("nexa.legal.disclaimer.liability.p2")}</p>

      {/* Contact */}
      <h2>{t("nexa.legal.disclaimer.contact.title")}</h2>
      <p>{t("nexa.legal.disclaimer.contact.p1")}</p>
    </LegalPageShell>
  );
}

export function NexaDisclaimerPage() {
  return <NexaLiveLanguageProvider><DisclaimerContent /></NexaLiveLanguageProvider>;
}

// ═══════════════════════════════════════════════════════════════
// Cookie Policy Page
// ═══════════════════════════════════════════════════════════════
function CookiePolicyContent() {
  const { t } = useNexaLanguage();
  return (
    <LegalPageShell icon={Cookie} color="#F59E0B" titleKey="nexa.legal.cookies.title" lastUpdated="2026-05-20">
      <h2>{t("nexa.legal.cookies.s1.title")}</h2>
      <p>{t("nexa.legal.cookies.s1.p1")}</p>

      <h2>{t("nexa.legal.cookies.s2.title")}</h2>
      <p>{t("nexa.legal.cookies.s2.p1")}</p>

      <h3>{t("nexa.legal.cookies.s2.essential.title")}</h3>
      <p>{t("nexa.legal.cookies.s2.essential.p1")}</p>

      <h3>{t("nexa.legal.cookies.s2.analytics.title")}</h3>
      <p>{t("nexa.legal.cookies.s2.analytics.p1")}</p>

      <h3>{t("nexa.legal.cookies.s2.preferences.title")}</h3>
      <p>{t("nexa.legal.cookies.s2.preferences.p1")}</p>

      <h2>{t("nexa.legal.cookies.s3.title")}</h2>
      <p>{t("nexa.legal.cookies.s3.p1")}</p>

      <h2>{t("nexa.legal.cookies.s4.title")}</h2>
      <p>{t("nexa.legal.cookies.s4.p1")}</p>
    </LegalPageShell>
  );
}

export function NexaCookiePolicyPage() {
  return <NexaLiveLanguageProvider><CookiePolicyContent /></NexaLiveLanguageProvider>;
}
