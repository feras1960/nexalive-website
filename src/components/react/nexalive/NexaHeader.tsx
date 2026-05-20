import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Radio, Sun, Moon, Monitor, ChevronDown,
  Phone, Mic, MessageSquare, Shield, Bluetooth, Video, ShieldAlert, Network, BrainCircuit,
  Factory, Hotel, Heart, Truck, ShieldCheck, HardHat, Siren, Building2, Store, ShoppingCart, Headset, Building, Landmark, Hammer, ArrowRight } from "lucide-react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { languageNames } from "../LanguageContext";
import type { Language } from "../LanguageContext";
import { useNexaTheme } from "./NexaThemeContext";

// Feature links for Mega Menu
const featureLinks = [
  { icon: Phone, key: "nav.mega.pbx", href: "/features/pbx", color: "text-nexa-primary" },
  { icon: Mic, key: "nav.mega.ptt", href: "/features/ptt", color: "text-emerald-400" },
  { icon: Video, key: "nav.mega.video", href: "/features/ptt", color: "text-cyan-400" },
  { icon: MessageSquare, key: "nav.mega.messaging", href: "/features/messaging", color: "text-blue-400" },
  { icon: Shield, key: "nav.mega.security", href: "/features/security", color: "text-purple-400" },
  { icon: Network, key: "nav.mega.mesh", href: "/features/mesh", color: "text-teal-400" },
  { icon: ShieldAlert, key: "nav.mega.sos", href: "/features/sos", color: "text-red-400" },
  { icon: BrainCircuit, key: "nav.mega.ai", href: "/features/ptt", color: "text-amber-400" },
];

const solutionLinks = [
  { icon: Factory, key: "nexa.solutions.factories.title", href: "/solutions/factories" },
  { icon: Hotel, key: "nexa.solutions.hotels.title", href: "/solutions/hotels" },
  { icon: Heart, key: "nexa.solutions.hospitals.title", href: "/solutions/hospitals" },
  { icon: Truck, key: "nexa.solutions.logistics.title", href: "/solutions/logistics" },
  { icon: ShieldCheck, key: "nexa.solutions.security.title", href: "/solutions/security" },
  { icon: HardHat, key: "nexa.solutions.construction.title", href: "/solutions/construction" },
  { icon: Siren, key: "nexa.solutions.emergency.title", href: "/solutions/emergency" },
  { icon: Building2, key: "nexa.solutions.offices.title", href: "/solutions/offices" },
  { icon: Store, key: "nexa.solutions.business.title", href: "/solutions/business" },
  { icon: ShoppingCart, key: "nexa.solutions.ecommerce.title", href: "/solutions/ecommerce" },
  { icon: Headset, key: "nexa.solutions.callcenters.title", href: "/solutions/callcenters" },
  { icon: Building, key: "nexa.solutions.government.title", href: "/solutions/government" },
  { icon: Landmark, key: "nexa.solutions.banks.title", href: "/solutions/banks" },
  { icon: ShieldAlert, key: "nexa.solutions.police.title", href: "/solutions/police" },
  { icon: Hammer, key: "nexa.solutions.fieldteams.title", href: "/solutions/fieldteams" },
];

const NexaHeader: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useNexaLanguage();
  const { theme, toggleTheme } = useNexaTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<"features" | "solutions" | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openMega = (menu: "features" | "solutions") => {
    clearTimeout(megaTimeoutRef.current);
    setMegaMenu(menu);
  };
  const closeMegaDelayed = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaMenu(null), 200);
  };
  const cancelClose = () => clearTimeout(megaTimeoutRef.current);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center ${
        isScrolled || megaMenu !== null || isLangMenuOpen || isMobileMenuOpen
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl shadow-lg border-b border-[var(--border-light)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ─── Logo ─── */}
          <a href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)]">
              <Radio className="w-4 h-4" />
              {/* Green pulse dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] border-2 border-[var(--bg-primary)]">
                <span className="absolute inset-0 rounded-full bg-[var(--accent-primary)] animate-ping opacity-75" />
              </span>
            </div>
            <span className="text-lg font-bold tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
              Nexa<span style={{ color: 'var(--accent-primary)' }}>Live</span>
            </span>
          </a>

          {/* ─── Desktop Navigation ─── */}
          <nav ref={megaRef} className="hidden lg:flex items-center gap-0.5">
            {/* Features */}
            <div className="relative"
              onMouseEnter={() => openMega("features")}
              onMouseLeave={closeMegaDelayed}
            >
              <a
                href="/features"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                  megaMenu === "features" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t("nexa.nav.features")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenu === "features" ? "rotate-180" : ""}`} />
              </a>
            </div>

            {/* Solutions */}
            <div className="relative"
              onMouseEnter={() => openMega("solutions")}
              onMouseLeave={closeMegaDelayed}
            >
              <a
                href="/solutions"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                  megaMenu === "solutions" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t("nexa.nav.solutions")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenu === "solutions" ? "rotate-180" : ""}`} />
              </a>
            </div>

            <a href="/hardware" className="px-3 py-2 rounded-lg text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              {t("nexa.ui.hardware")}
            </a>
            <a href="/for-business" className="px-3 py-2 rounded-lg text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              {t("nexa.nav.forBusiness")}
            </a>
            <a href="/web" className="px-3 py-2 rounded-lg text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              {t("nexa.ui.web")}
            </a>

            <div className="w-px h-5 bg-[var(--border-medium)] mx-2" />

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setMegaMenu(null); }}
                className="flex items-center gap-1.5 px-2 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{language.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12 }}
                    className={`absolute top-full mt-2 w-44 bg-[var(--bg-dark-section)] rounded-xl shadow-2xl overflow-hidden py-1 border border-[var(--border-light)] ${isRTL ? "left-0" : "right-0"}`}
                  >
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => { setLanguage(code as Language); setIsLangMenuOpen(false); }}
                        className={`w-full text-${isRTL ? "right" : "left"} px-4 py-2 text-sm transition-colors ${
                          language === code ? "text-[var(--accent-primary)] font-bold bg-[var(--bg-secondary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] transition-all"
              title={`Theme: ${theme}`}
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
               : theme === 'light' ? <Sun className="w-3.5 h-3.5 text-amber-500" />
               : <Monitor className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
            </button>

            {/* CTA */}
            <a
              href="#download"
              className={`${t("nexa.ui.ml_2")} px-5 py-2 rounded-xl bg-[var(--bg-dark-section)] dark:bg-[var(--accent-primary)] text-white text-sm font-medium transition-all hover:opacity-90 flex items-center gap-1.5`}
            >
              {t("nexa.nav.download")}
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
            </a>
          </nav>

          {/* ─── Mobile Controls ─── */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggleTheme} className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-secondary)]">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-[var(--text-secondary)]" />
               : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
            <button
              onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsMobileMenuOpen(false); }}
              className="text-[var(--text-secondary)]"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsLangMenuOpen(false); }}
              className="text-[var(--text-secondary)] p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Mega Menu — Features (Dark dropdown, Ajax style) ═══ */}
      <AnimatePresence>
        {megaMenu === "features" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-16 left-0 right-0 bg-[#0A0A0A] border-t border-[var(--border-light)] shadow-2xl"
            onMouseEnter={cancelClose}
            onMouseLeave={closeMegaDelayed}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="max-w-[1280px] mx-auto px-8 py-10">
              <div className="grid grid-cols-4 gap-8">
                {/* Col 1: Core Communication */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">
                    {t("nexa.ui.core_communication")}
                  </h4>
                  {featureLinks.slice(0, 4).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.href + link.key} href={link.href} onClick={() => setMegaMenu(null)}
                        className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors group">
                        <Icon className={`w-4 h-4 ${link.color} opacity-70 group-hover:opacity-100`} />
                        <span className="text-[14px]">{t(link.key)}</span>
                      </a>
                    );
                  })}
                </div>
                {/* Col 2: Advanced */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">
                    {t("nexa.ui.advanced_features")}
                  </h4>
                  {featureLinks.slice(4).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.href + link.key} href={link.href} onClick={() => setMegaMenu(null)}
                        className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors group">
                        <Icon className={`w-4 h-4 ${link.color} opacity-70 group-hover:opacity-100`} />
                        <span className="text-[14px]">{t(link.key)}</span>
                      </a>
                    );
                  })}
                </div>
                {/* Col 3: Platform */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">
                    {t("nexa.ui.platform")}
                  </h4>
                  <a href="/features" onClick={() => setMegaMenu(null)} className="block py-2.5 text-[14px] text-[#00C47A] hover:text-white font-medium transition-colors">
                    {t("nexa.ui.browse_all_features")} &rarr;
                  </a>
                  <a href="/#download" onClick={() => setMegaMenu(null)} className="block py-2.5 text-[14px] text-white/60 hover:text-white transition-colors">
                    {t("nexa.ui.download_app")}
                  </a>
                  <a href="/for-business" onClick={() => setMegaMenu(null)} className="block py-2.5 text-[14px] text-white/60 hover:text-white transition-colors">
                    {t("nexa.ui.for_business")}
                  </a>
                </div>
                {/* Col 4: Highlight */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-[#00C47A] text-xs font-semibold uppercase tracking-wider mb-2">
                    {t("nexa.ui.new")}
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">
                    {t("nexa.ui.nexamesh")}
                  </h4>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">
                    {t("nexa.ui.communication_without_internet")}
                  </p>
                  <a href="/features/mesh" onClick={() => setMegaMenu(null)}
                    className="inline-flex items-center gap-1.5 text-[#00C47A] text-sm font-medium hover:underline">
                    {t("nexa.ui.learn_more_1")}
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Mega Menu — Solutions ═══ */}
      <AnimatePresence>
        {megaMenu === "solutions" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-16 left-0 right-0 bg-[#0A0A0A] border-t border-[var(--border-light)] shadow-2xl"
            onMouseEnter={cancelClose}
            onMouseLeave={closeMegaDelayed}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="max-w-[1280px] mx-auto px-8 py-10">
              <div className="grid grid-cols-4 gap-8">
                
                {/* Col 1 */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">
                    {t("nexa.ui.by_industry")}
                  </h4>
                  {solutionLinks.slice(0, 5).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.href} href={link.href} onClick={() => setMegaMenu(null)}
                        className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors group">
                        <Icon className="w-4 h-4 text-[#00C47A] opacity-60 group-hover:opacity-100" />
                        <span className="text-[14px]">{t(link.key)}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Col 2 */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">&nbsp;</h4>
                  {solutionLinks.slice(5, 10).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.href} href={link.href} onClick={() => setMegaMenu(null)}
                        className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors group">
                        <Icon className="w-4 h-4 text-[#00C47A] opacity-60 group-hover:opacity-100" />
                        <span className="text-[14px]">{t(link.key)}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Col 3 */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-4">&nbsp;</h4>
                  {solutionLinks.slice(10, 15).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a key={link.href} href={link.href} onClick={() => setMegaMenu(null)}
                        className="flex items-center gap-3 py-2.5 text-white/60 hover:text-white transition-colors group">
                        <Icon className="w-4 h-4 text-[#00C47A] opacity-60 group-hover:opacity-100" />
                        <span className="text-[14px]">{t(link.key)}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Col 4: Highlight / Resources */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col">
                  <h4 className="text-[13px] uppercase tracking-[0.08em] text-white/40 font-semibold mb-6">
                    {t("nexa.ui.enterprise_resources")}
                  </h4>
                  
                  <div className="flex-1 space-y-4">
                    <a href="/solutions/" onClick={() => setMegaMenu(null)} 
                       className="group flex flex-col p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                      <span className="text-[#00C47A] font-semibold text-[15px] mb-1 flex items-center gap-2">
                        {t("nexa.ui.all_solutions")}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </span>
                      <span className="text-white/50 text-xs leading-relaxed">
                        {t("nexa.ui.browse_the_complete_catalog_of")}
                      </span>
                    </a>

                    <a href="/for-business" onClick={() => setMegaMenu(null)} 
                       className="group flex flex-col p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                      <span className="text-white font-semibold text-[15px] mb-1 flex items-center gap-2">
                        {t("nexa.ui.for_enterprises")}
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </span>
                      <span className="text-white/50 text-xs leading-relaxed">
                        {t("nexa.ui.custom_enterprise_solutions_th")}
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Mobile Menu ═══ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-light)] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <a href="/features" onClick={() => setIsMobileMenuOpen(false)} className="block text-[10px] uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium px-3 pt-2 pb-1 transition-colors">
                {t("nexa.nav.features")}
              </a>
              {featureLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.href + link.key} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors">
                    <Icon className={`w-4 h-4 ${link.color}`} />
                    <span className="text-[var(--text-primary)] text-sm font-medium">{t(link.key)}</span>
                  </a>
                );
              })}
              <hr className="border-[var(--border-light)] my-2" />
              <a href="/solutions" onClick={() => setIsMobileMenuOpen(false)} className="block text-[10px] uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium px-3 pt-2 pb-1 transition-colors">
                {t("nexa.nav.solutions")}
              </a>
              {solutionLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors">
                    <Icon className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span className="text-[var(--text-primary)] text-sm font-medium">{t(link.key)}</span>
                  </a>
                );
              })}
              <hr className="border-[var(--border-light)] my-2" />
              <a href="/hardware" onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-secondary)]">
                {t("nexa.ui.hardware")}
              </a>
              <a href="/for-business" onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-secondary)]">
                {t("nexa.nav.forBusiness")}
              </a>
              <a href="/web" onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-secondary)]">
                <Monitor className="w-4 h-4 text-teal-400" />
                {t("nexa.ui.nexalive_web")}
              </a>
              <hr className="border-[var(--border-light)] my-2" />
              <a href="#download" onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-5 py-3 rounded-xl bg-[var(--bg-dark-section)] dark:bg-[var(--accent-primary)] text-white text-sm font-bold">
                {t("nexa.nav.download")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Mobile Language Overlay ═══ */}
      <AnimatePresence>
        {isLangMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center lg:hidden"
            onClick={(e) => { if (e.target === e.currentTarget) setIsLangMenuOpen(false); }}
          >
            <div className="w-full max-w-sm mx-4 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-medium)] shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{t("nav.selectLanguage")}</h3>
                <button onClick={() => setIsLangMenuOpen(false)} className="text-[var(--text-muted)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => { setLanguage(code as Language); setIsLangMenuOpen(false); }}
                    className={`px-3 py-2.5 rounded-xl border text-sm transition-all ${
                      language === code
                        ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold"
                        : "border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NexaHeader;
