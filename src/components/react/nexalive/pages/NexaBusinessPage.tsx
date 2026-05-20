import React from "react";
import { motion } from "framer-motion";
import { 
  Globe2, Route, Database, BrainCircuit, PhoneCall, Pointer, ShieldCheck, Video, 
  Contact, Phone, MapPin, Users, Headphones, Building2, Wifi, Radio, 
  BarChart3, Clock, ArrowRight, CheckCircle, Crown, Mic, Shield
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaSection, NexaCTABanner } from "../NexaPageTemplate";
import NexaBusinessHero from "../NexaBusinessHero";

// ═══ Animated ERP Dashboard ═══
function ERPDashboardAnimation({ isRTL, lang, t }: { isRTL: boolean; lang: string; t: (key: string) => string }) {
  const callerNames: Record<string, string> = {
    ar: "أحمد الراشد • VIP", en: "James Wilson • VIP",
    de: "Hans Müller • VIP", fr: "Pierre Dupont • VIP",
    ru: "Иван Петров • VIP", uk: "Іван Петренко • VIP",
    tr: "Ahmet Yılmaz • VIP", it: "Marco Rossi • VIP",
    pl: "Jan Kowalski • VIP", ro: "Ion Popescu • VIP",
    nl: "Jan de Vries • VIP",
  };
  const callerName = callerNames[lang] || callerNames.en;
  const stats = isRTL
    ? [{ label: "الرصيد", value: "12,500" }, { label: "الطلبات", value: "47" }, { label: "آخر اتصال", value: "يومين" }]
    : [{ label: "Balance", value: "12,500" }, { label: "Orders", value: "47" }, { label: "Last Call", value: "2d ago" }];
  const callLogs = isRTL
    ? ["وارد • 3:45", "صادر • 1:22", "فائت • 0:00"]
    : ["Incoming • 3:45", "Outgoing • 1:22", "Missed • 0:00"];
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1d32 100%)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" style={{ animation: 'sos-blink 2s infinite' }} />
          <span className="text-[10px] text-white/60 font-mono">{t("nexa.ui.crm_live")}</span>
        </div>
        <span className="text-[9px] text-white/30 font-mono">TexaCore ERP</span>
      </div>
      {/* Caller popup */}
      <div className="mx-4 mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5" style={{ animation: 'ai-text 4s ease-in-out infinite' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Phone className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white text-xs font-bold">+966 55 xxx xxxx</div>
            <div className="text-emerald-400 text-[10px]">{callerName}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
              <div className="text-white text-[10px] font-bold">{s.value}</div>
              <div className="text-white/40 text-[8px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Call logs */}
      <div className="mx-4 mt-3 space-y-1.5">
        {callLogs.map((log, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] text-[9px]">
            <span className="text-white/50">{log}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-red-400' : 'bg-emerald-400'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ Real Map with Driver Overlays ═══
function MapAnimation({ isRTL, lang, t }: { isRTL: boolean; lang: string; t: (key: string) => string }) {
  const namesByLang: Record<string, string[]> = {
    ar: ["أحمد", "سعيد", "محمد", "خالد", "عمر"],
    en: ["James", "David", "Mark", "Chris", "Alex"],
    de: ["Hans", "Klaus", "Stefan", "Michael", "Thomas"],
    fr: ["Pierre", "Jean", "Marc", "Luc", "Paul"],
    ru: ["Иван", "Дмитрий", "Алексей", "Сергей", "Олег"],
    uk: ["Іван", "Дмитро", "Олексій", "Сергій", "Олег"],
    tr: ["Ahmet", "Mehmet", "Ali", "Murat", "Kemal"],
    it: ["Marco", "Luca", "Paolo", "Andrea", "Fabio"],
    pl: ["Jan", "Piotr", "Marek", "Tomek", "Adam"],
    ro: ["Ion", "Andrei", "Mihai", "Stefan", "Vlad"],
    nl: ["Jan", "Pieter", "Joost", "Daan", "Lars"],
  };
  // City bbox per language (west,south,east,north)
  const cityByLang: Record<string, string> = {
    ar: "46.55%2C24.60%2C46.85%2C24.80",   // Riyadh
    en: "-0.20%2C51.45%2C0.05%2C51.58",     // London
    de: "13.30%2C52.45%2C13.50%2C52.58",    // Berlin
    fr: "2.25%2C48.82%2C2.45%2C48.92",      // Paris
    ru: "37.50%2C55.70%2C37.75%2C55.82",    // Moscow
    uk: "30.43%2C50.40%2C30.63%2C50.50",    // Kyiv
    tr: "28.90%2C41.00%2C29.10%2C41.10",    // Istanbul
    it: "12.40%2C41.85%2C12.60%2C41.95",    // Rome
    pl: "20.90%2C52.18%2C21.10%2C52.30",    // Warsaw
    ro: "26.00%2C44.38%2C26.20%2C44.48",    // Bucharest
    nl: "4.82%2C52.33%2C4.98%2C52.42",      // Amsterdam
  };
  const bbox = cityByLang[lang] || cityByLang.en;
  const names = namesByLang[lang] || namesByLang.en;
  const drivers = [
    { x: 30, y: 30, name: names[0], status: "moving", color: "#34D399" },
    { x: 62, y: 22, name: names[1], status: "moving", color: "#60A5FA" },
    { x: 48, y: 55, name: names[2], status: "stopped", color: "#FBBF24" },
    { x: 75, y: 50, name: names[3], status: "moving", color: "#A78BFA" },
    { x: 20, y: 70, name: names[4], status: "sos", color: "#EF4444" },
  ];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Real OpenStreetMap — dark theme, city per language */}
      <iframe
        title="NexaLive Fleet Map"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: 'saturate(0.3) brightness(0.35) contrast(1.3) hue-rotate(180deg)', pointerEvents: 'none' }}
        loading="lazy"
      />
      {/* Dark overlay for consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/40 via-transparent to-[#0d1b2a]/60 pointer-events-none" />

      {/* Driver pins overlay */}
      {drivers.map((d, i) => (
        <div key={i} className="absolute flex flex-col items-center z-10" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%, -50%)' }}>
          {(d.status === "moving" || d.status === "sos") && (
            <React.Fragment>
              <div className="absolute w-10 h-10 rounded-full" style={{
                border: `2px solid ${d.color}`,
                opacity: 0.4,
                animation: `map-ring 2s ease-out infinite`,
                animationDelay: `${i * 0.4}s`
              }} />
              <div className="absolute w-6 h-6 rounded-full" style={{
                border: `1.5px solid ${d.color}`,
                opacity: 0.6,
                animation: `map-ring 2s ease-out infinite`,
                animationDelay: `${i * 0.4 + 0.5}s`
              }} />
            </React.Fragment>
          )}
          <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-lg" style={{ background: d.color, boxShadow: `0 0 14px ${d.color}70` }}>
            {d.status === "sos" ? (
              <span className="text-[9px] text-white font-black">SOS</span>
            ) : d.status === "stopped" ? (
              <span className="text-[8px] text-white font-bold">P</span>
            ) : (
              <MapPin className="w-3.5 h-3.5 text-white" />
            )}
          </div>
          <div className="mt-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
            <span className="text-[9px] text-white/90 font-medium whitespace-nowrap">{d.name}</span>
          </div>
        </div>
      ))}

      {/* Connecting dashed lines between some drivers */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
        <line x1="30%" y1="30%" x2="48%" y2="55%" stroke="#34D39940" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="62%" y1="22%" x2="75%" y2="50%" stroke="#60A5FA30" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="48%" y1="55%" x2="75%" y2="50%" stroke="#FBBF2430" strokeWidth="1" strokeDasharray="3 4" />
      </svg>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-2.5 bg-black/60 backdrop-blur-md border-b border-white/10 z-20">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] text-white/90 font-semibold">{t("nexa.ui.live_gps_tracking")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'sos-blink 1s infinite' }} />
          <span className="text-[10px] text-white/60">{drivers.length} {t("nexa.ui.online")}</span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-around py-3 bg-black/70 backdrop-blur-md border-t border-white/10 z-20">
        {[
          { count: 4, label: t("nexa.ui.active"), color: "text-emerald-400" },
          { count: 1, label: t("nexa.ui.stopped"), color: "text-amber-400" },
          { count: 1, label: "SOS", color: "text-red-400" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <span className={`text-sm font-bold ${s.color}`}>{s.count}</span>
            <span className="text-[9px] text-white/50 block mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes map-ring { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes sos-blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}

// ═══ Cloud PBX Visual ═══
function CloudPBXAnimation({ isRTL, lang, t }: { isRTL: boolean; lang: string; t: (key: string) => string }) {
  const deptsByLang: Record<string, string[]> = {
    ar: ["الاستقبال", "المبيعات", "الدعم", "قائمة IVR"],
    en: ["Reception", "Sales", "Support", "IVR Menu"],
    de: ["Empfang", "Vertrieb", "Support", "IVR Menü"],
    fr: ["Accueil", "Ventes", "Support", "Menu IVR"],
    ru: ["Ресепшн", "Продажи", "Поддержка", "Меню IVR"],
    uk: ["Ресепшн", "Продажі", "Підтримка", "Меню IVR"],
    tr: ["Resepsiyon", "Satış", "Destek", "IVR Menü"],
    it: ["Ricezione", "Vendite", "Supporto", "Menu IVR"],
    pl: ["Recepcja", "Sprzedaż", "Wsparcie", "Menu IVR"],
    ro: ["Recepție", "Vânzări", "Suport", "Meniu IVR"],
    nl: ["Receptie", "Verkoop", "Support", "IVR Menu"],
  };
  const statusByLang: Record<string, string[]> = {
    ar: ["متاح", "مشغول", "يرن", "نشط"],
    en: ["Available", "Busy", "Ringing", "Active"],
    de: ["Verfügbar", "Besetzt", "Klingelt", "Aktiv"],
    fr: ["Disponible", "Occupé", "Sonne", "Actif"],
    ru: ["Доступен", "Занят", "Звонит", "Активен"],
    uk: ["Доступний", "Зайнятий", "Дзвонить", "Активний"],
    tr: ["Müsait", "Meşgul", "Çalıyor", "Aktif"],
    it: ["Disponibile", "Occupato", "Squilla", "Attivo"],
    pl: ["Dostępny", "Zajęty", "Dzwoni", "Aktywny"],
    ro: ["Disponibil", "Ocupat", "Sună", "Activ"],
    nl: ["Beschikbaar", "Bezet", "Rinkelt", "Actief"],
  };
  const depts = deptsByLang[lang] || deptsByLang.en;
  const statuses = statusByLang[lang] || statusByLang.en;
  const extensions = [
    { ext: "101", name: depts[0], status: "available", statusLabel: statuses[0], ring: false },
    { ext: "102", name: depts[1], status: "busy", statusLabel: statuses[1], ring: false },
    { ext: "103", name: depts[2], status: "ringing", statusLabel: statuses[2], ring: true },
    { ext: "200", name: depts[3], status: "active", statusLabel: statuses[3], ring: false },
  ];
  const statsData = isRTL
    ? [{ v: "24", l: "نشط" }, { v: "3", l: "انتظار" }, { v: "12ث", l: "متوسط" }]
    : [{ v: "24", l: "Active" }, { v: "3", l: "Queue" }, { v: "12s", l: "Avg Wait" }];
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col" style={{ background: 'linear-gradient(135deg, #0a1020 0%, #151d35 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-white/60 font-mono">{t("nexa.ui.nexapbx_cloud")}</span>
        </div>
        <span className="text-[9px] text-emerald-400 font-mono">● {t("nexa.ui.online_1")}</span>
      </div>
      {/* Extensions */}
      <div className="flex-1 p-4 space-y-2">
        {extensions.map((line, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-400 text-[10px] font-bold font-mono">{line.ext}</span>
              </div>
              <span className="text-white/70 text-xs">{line.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                line.status === "available" ? "bg-emerald-400" :
                line.status === "busy" ? "bg-red-400" :
                line.status === "ringing" ? "bg-amber-400" : "bg-blue-400"
              }`} style={line.ring ? { animation: 'sos-blink 0.5s infinite' } : {}} />
              <span className="text-[9px] text-white/40">{line.statusLabel}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Stats bar */}
      <div className="flex items-center justify-around py-3 border-t border-white/5 bg-white/[0.02]">
        {statsData.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-white text-sm font-bold">{s.v}</div>
            <div className="text-white/30 text-[8px]">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ Main Business Page ═══
function NexaBusinessContent() {
  const { t, isRTL, language } = useNexaLanguage();

  const mainFeatures = [
    { icon: <Globe2 className="w-5 h-5 text-emerald-400" />, titleKey: "nexa.biz.feat.roaming.title", descKey: "nexa.biz.feat.roaming.desc" },
    { icon: <Route className="w-5 h-5 text-cyan-400" />, titleKey: "nexa.biz.feat.dispatch.title", descKey: "nexa.biz.feat.dispatch.desc" },
    { icon: <Database className="w-5 h-5 text-blue-400" />, titleKey: "nexa.biz.feat.erp.title", descKey: "nexa.biz.feat.erp.desc" },
    { icon: <BrainCircuit className="w-5 h-5 text-amber-400" />, titleKey: "nexa.biz.feat.ai.title", descKey: "nexa.biz.feat.ai.desc" },
    { icon: <PhoneCall className="w-5 h-5 text-purple-400" />, titleKey: "nexa.biz.feat.pbx.title", descKey: "nexa.biz.feat.pbx.desc" },
    { icon: <Pointer className="w-5 h-5 text-pink-400" />, titleKey: "nexa.biz.feat.click2call.title", descKey: "nexa.biz.feat.click2call.desc" },
  ];

  return (
    <div className="min-h-screen transition-colors" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* 1. Cinematic Slider Hero */}
      <NexaBusinessHero />

      <NexaPageWrapper>
        
        {/* 2. Core Enterprise Features Grid */}
        <NexaSection titleKey="nexa.biz.title" subtitleKey="nexa.biz.subtitle" id="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative p-6 rounded-2xl 
                  dark:bg-nexa-surface-elevated/50 bg-white 
                  border dark:border-white/5 border-gray-100 
                  dark:hover:border-nexalive-blue/30 hover:border-nexalive-blue/20
                  hover:shadow-nexa transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl dark:bg-white/5 bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </NexaSection>

        {/* 3. Deep Dive: ERP & CRM Integration with Animation */}
        <NexaSection titleKey="nexa.biz.section.erp.title" subtitleKey="nexa.biz.section.erp.subtitle" dark>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">
                {t("nexa.ui.texacore_erp_customer_crm")}
              </h3>
              <p className="dark:text-gray-400 text-gray-600 mb-4 leading-relaxed">{t("nexa.biz.section.erp.p1")}</p>
              <p className="dark:text-gray-400 text-gray-600 mb-8 leading-relaxed">{t("nexa.biz.section.erp.p2")}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm dark:text-gray-300 text-gray-700 dark:bg-white/5 bg-gray-50 p-4 rounded-xl border dark:border-white/5 border-gray-100">
                  <Contact className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{t("nexa.ui.instant_caller_id_pop_ups_from")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm dark:text-gray-300 text-gray-700 dark:bg-white/5 bg-gray-50 p-4 rounded-xl border dark:border-white/5 border-gray-100">
                  <Database className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{t("nexa.ui.call_logs_automatically_attach")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm dark:text-gray-300 text-gray-700 dark:bg-white/5 bg-gray-50 p-4 rounded-xl border dark:border-white/5 border-gray-100">
                  <Video className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{t("nexa.ui.secure_video_meetings_linked_t")}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border dark:border-white/10 border-gray-200 shadow-2xl">
              <ERPDashboardAnimation isRTL={isRTL} lang={language} t={t} />
            </motion.div>
          </div>
        </NexaSection>

        {/* 4. Deep Dive: Fleet & Dispatch with Map Animation */}
        <NexaSection titleKey="nexa.biz.feat.dispatch.title" subtitleKey="nexa.biz.feat.dispatch.desc">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className={`relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border dark:border-white/10 border-gray-200 shadow-2xl ${t("nexa.ui.lg_order_1")}`}>
              <MapAnimation isRTL={isRTL} lang={language} t={t} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className={`space-y-6 ${t("nexa.ui.lg_order_2")}`}>
              <div className="p-6 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-100">
                <Globe2 className="w-8 h-8 text-emerald-400 mb-4" />
                <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{t("nexa.biz.feat.roaming.title")}</h4>
                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">{t("nexa.biz.feat.roaming.desc")}</p>
              </div>
              <div className="p-6 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-100">
                <Route className="w-8 h-8 text-cyan-400 mb-4" />
                <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{t("nexa.biz.feat.dispatch.title")}</h4>
                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">{t("nexa.biz.feat.dispatch.desc")}</p>
              </div>
              <div className="p-6 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-100">
                <Shield className="w-8 h-8 text-red-400 mb-4" />
                <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                  {t("nexa.ui.lone_worker_protection")}
                </h4>
                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">
                  {t("nexa.ui.automated_check_ins_if_a_worke")}
                </p>
              </div>
            </motion.div>
          </div>
        </NexaSection>

        {/* 5. Cloud PBX Section */}
        <NexaSection titleKey="nexa.biz.feat.pbx.title" subtitleKey="nexa.biz.feat.pbx.desc" dark>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="space-y-4">
                {[
                  { icon: <Phone className="w-5 h-5 text-blue-400" />, title: t("nexa.ui.smart_ivr_call_routing"), desc: t("nexa.ui.multi_level_voice_menus_with_t") },
                  { icon: <Headphones className="w-5 h-5 text-blue-400" />, title: t("nexa.ui.call_recording"), desc: t("nexa.ui.auto_record_all_calls_with_sea") },
                  { icon: <Wifi className="w-5 h-5 text-blue-400" />, title: t("nexa.ui.works_where_voip_is_blocked"), desc: t("nexa.ui.nexabridge_ensures_calls_go_th") },
                  { icon: <BarChart3 className="w-5 h-5 text-blue-400" />, title: t("nexa.ui.cdr_analytics_reports"), desc: t("nexa.ui.live_dashboard_with_detailed_c") },
                ].map((feat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-100">
                    <div className="w-10 h-10 rounded-lg dark:bg-blue-500/10 bg-blue-50 flex items-center justify-center flex-shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold dark:text-white text-gray-900 mb-1">{feat.title}</h4>
                      <p className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border dark:border-white/10 border-gray-200 shadow-2xl">
              <CloudPBXAnimation isRTL={isRTL} lang={language} t={t} />
            </motion.div>
          </div>
        </NexaSection>

        {/* 6. Key Stats */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "99.9%", label: t("nexa.ui.uptime"), icon: <Clock className="w-5 h-5 text-emerald-400" /> },
              { value: "7", label: t("nexa.ui.edge_regions"), icon: <Globe2 className="w-5 h-5 text-blue-400" /> },
              { value: "<50ms", label: t("nexa.ui.latency"), icon: <Radio className="w-5 h-5 text-cyan-400" /> },
              { value: "AES-256", label: t("nexa.ui.encryption"), icon: <ShieldCheck className="w-5 h-5 text-purple-400" /> },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-100">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold dark:text-white text-gray-900 font-mono mb-1">{stat.value}</div>
                <div className="text-xs dark:text-gray-400 text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <NexaCTABanner titleKey="nexa.biz.cta.title" descKey="nexa.biz.cta.desc" />
      </NexaPageWrapper>
    </div>
  );
}

export default function NexaBusinessPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaBusinessContent />
    </NexaLiveLanguageProvider>
  );
}
