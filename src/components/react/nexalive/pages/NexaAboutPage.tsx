import React from "react";
import { motion } from "framer-motion";
import {
  Globe2, Shield, Radio, Users, Building2, Target, Eye, Zap,
  Phone, MessageSquare, Wifi, BrainCircuit, Award, TrendingUp,
  MapPin, Clock, ChevronRight, ArrowRight, CheckCircle, Rocket,
  Lock, Network, Headphones, BarChart3, Crown, Star, Heart
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper } from "../NexaPageTemplate";

/* ═══════════════════════════════════════════════════════
   Stats Counter Animation
   ═══════════════════════════════════════════════════════ */
function AnimatedStat({ value, suffix = "", label, icon: Icon, color }: {
  value: string; suffix?: string; label: string; icon: React.ElementType; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="text-center group"
    >
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 mb-4 group-hover:border-${color.replace('text-', '')}/30 transition-colors`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="text-[clamp(28px,4vw,42px)] font-extrabold text-white mb-1" style={{ letterSpacing: '-0.03em' }}>
        {value}<span className={color}>{suffix}</span>
      </div>
      <p className="text-white/40 text-sm font-medium">{label}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Timeline Item
   ═══════════════════════════════════════════════════════ */
function TimelineItem({ year, titleKey, descKey, icon: Icon, idx }: {
  year: string; titleKey: string; descKey: string;
  icon: React.ElementType; idx: number;
}) {
  const { t, isRTL } = useNexaLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="flex gap-4 items-start group"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
          <Icon className="w-4 h-4 text-teal-400" />
        </div>
        {idx < 5 && <div className="w-[1px] h-10 bg-gradient-to-b from-teal-500/20 to-transparent mt-2" />}
      </div>
      <div className="pb-6">
        <span className="text-teal-400 font-mono text-xs font-semibold">{year}</span>
        <h4 className="text-white font-bold text-[15px] mt-1">{t(titleKey)}</h4>
        <p className="text-white/40 text-sm mt-1 leading-relaxed">{t(descKey)}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Product Card
   ═══════════════════════════════════════════════════════ */
function ProductCard({ icon: Icon, titleKey, descKey, color, idx }: {
  icon: React.ElementType; titleKey: string; descKey: string;
  color: string; idx: number;
}) {
  const { t, isRTL } = useNexaLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 group-hover:border-${color.replace('text-', '')}/30 transition-colors`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{t(titleKey)}</h4>
      <p className="text-white/40 text-xs leading-relaxed">{t(descKey)}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Value Card
   ═══════════════════════════════════════════════════════ */
function ValueCard({ icon: Icon, titleKey, descKey, color, idx }: {
  icon: React.ElementType; titleKey: string; descKey: string;
  color: string; idx: number;
}) {
  const { t, isRTL } = useNexaLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.04]`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div>
        <h4 className="text-white font-semibold text-[13px] mb-0.5">{t(titleKey)}</h4>
        <p className="text-white/35 text-[11px] leading-relaxed">{t(descKey)}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main About Content
   ═══════════════════════════════════════════════════════ */
function NexaAboutContent() {
  const { isRTL, t } = useNexaLanguage();

  const timeline = [
    { year: "2018", icon: Rocket,
      titleKey: "nexa.about.timeline_1.title", descKey: "nexa.about.timeline_1.desc" },
    { year: "2019", icon: Phone,
      titleKey: "nexa.about.timeline_2.title", descKey: "nexa.about.timeline_2.desc" },
    { year: "2020", icon: Radio,
      titleKey: "nexa.about.timeline_3.title", descKey: "nexa.about.timeline_3.desc" },
    { year: "2022", icon: Globe2,
      titleKey: "nexa.about.timeline_4.title", descKey: "nexa.about.timeline_4.desc" },
    { year: "2024", icon: BrainCircuit,
      titleKey: "nexa.about.timeline_5.title", descKey: "nexa.about.timeline_5.desc" },
    { year: "2026", icon: Network,
      titleKey: "nexa.about.timeline_6.title", descKey: "nexa.about.timeline_6.desc" },
  ];

  const products = [
    { icon: Phone, color: "text-blue-400", titleKey: "nexa.about.timeline_7.title", descKey: "nexa.about.timeline_7.desc" },
    { icon: Radio, color: "text-teal-400", titleKey: "nexa.about.timeline_8.title", descKey: "nexa.about.timeline_8.desc" },
    { icon: MessageSquare, color: "text-emerald-400", titleKey: "nexa.about.timeline_9.title", descKey: "nexa.about.timeline_9.desc" },
    { icon: Wifi, color: "text-purple-400", titleKey: "nexa.about.timeline_10.title", descKey: "nexa.about.timeline_10.desc" },
    { icon: BrainCircuit, color: "text-amber-400", titleKey: "nexa.about.timeline_11.title", descKey: "nexa.about.timeline_11.desc" },
    { icon: Shield, color: "text-rose-400", titleKey: "nexa.about.timeline_12.title", descKey: "nexa.about.timeline_12.desc" },
  ];

  const values = [
    { icon: Shield, color: "text-emerald-400", titleKey: "nexa.about.timeline_13.title", descKey: "nexa.about.timeline_13.desc" },
    { icon: Heart, color: "text-rose-400", titleKey: "nexa.about.timeline_14.title", descKey: "nexa.about.timeline_14.desc" },
    { icon: Zap, color: "text-amber-400", titleKey: "nexa.about.timeline_15.title", descKey: "nexa.about.timeline_15.desc" },
    { icon: Globe2, color: "text-blue-400", titleKey: "nexa.about.timeline_16.title", descKey: "nexa.about.timeline_16.desc" },
    { icon: Users, color: "text-teal-400", titleKey: "nexa.about.timeline_17.title", descKey: "nexa.about.timeline_17.desc" },
    { icon: Star, color: "text-purple-400", titleKey: "nexa.about.timeline_18.title", descKey: "nexa.about.timeline_18.desc" },
  ];

  const globalRegions = [
    { nameKey: "nexa.about.region_1.name", countries: "15+", color: "text-teal-400" },
    { nameKey: "nexa.about.region_2.name", countries: "12+", color: "text-blue-400" },
    { nameKey: "nexa.about.region_3.name", countries: "8+", color: "text-purple-400" },
    { nameKey: "nexa.about.region_4.name", countries: "7+", color: "text-amber-400" },
    { nameKey: "nexa.about.region_5.name", countries: "5+", color: "text-rose-400" },
  ];

  return (
    <div className="min-h-screen transition-colors" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050810' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-teal-300">{t("nexa.ui.about_us")}</span>
            </div>
            <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold text-white mb-5" style={{ lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              {t("nexa.about.hero_title_1")} <span className="text-teal-400">{t("nexa.about.hero_title_highlight")}</span> {t("nexa.about.hero_title_2")}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
              {t("nexa.ui.texacore_solutions_is_a_global")
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section style={{ background: '#050810' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat icon={Globe2} value="45" suffix="+" label={t("nexa.ui.countries_worldwide")} color="text-teal-400" />
            <AnimatedStat icon={Users} value="500K" suffix="+" label={t("nexa.ui.active_users")} color="text-blue-400" />
            <AnimatedStat icon={Building2} value="2,000" suffix="+" label={t("nexa.ui.businesses_enterprises")} color="text-emerald-400" />
            <AnimatedStat icon={Clock} value="99.9" suffix="%" label={t("nexa.ui.uptime_sla")} color="text-amber-400" />
          </div>
        </div>
      </section>

      {/* ═══ Mission & Vision ═══ */}
      <section style={{ background: '#070b14' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-teal-500/5 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("nexa.ui.our_mission")}</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {t("nexa.ui.empower_organizations_worldwid")
                  }
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t("nexa.ui.our_vision")}</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {t("nexa.ui.to_become_the_world_s_leading")
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Our Products ═══ */}
      <section style={{ background: '#050810' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <Crown className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-white/60">{t("nexa.ui.our_products")}</span>
            </div>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.complete_communication_ecosyst")}
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              {t("nexa.ui.nexalive_platform_delivers_eve")
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section style={{ background: '#070b14' }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.our_journey")}
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              {t("nexa.ui.from_an_idea_to_a_global_commu")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {timeline.map((item, i) => (
              <TimelineItem key={i} {...item} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Our Values ═══ */}
      <section style={{ background: '#050810' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.our_values")}
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              {t("nexa.ui.the_principles_that_guide_ever")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {values.map((v, i) => (
              <ValueCard key={i} {...v} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Global Reach ═══ */}
      <section style={{ background: '#070b14' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-white/60">{t("nexa.ui.global_presence")}</span>
            </div>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.serving_the_world")}
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              {t("nexa.ui.globally_distributed_infrastru")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {globalRegions.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <Globe2 className={`w-6 h-6 ${r.color} mx-auto mb-2`} />
                <h4 className="text-white font-bold text-sm mb-1">{t(r.nameKey)}</h4>
                <p className={`${r.color} font-mono text-lg font-bold`}>{r.countries}</p>
                <p className="text-white/30 text-[10px]">{t("nexa.ui.countries")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Headquarters ═══ */}
      <section style={{ background: '#050810' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-white/60">{t("nexa.ui.headquarters")}</span>
            </div>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.our_global_headquarters")}
            </h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">
              {t("nexa.ui.operating_from_the_heart_of_eu")}
            </p>
          </motion.div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
            >
              <img src="/images/about/hq-building.png" alt="TexaCore HQ Building" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-bold text-sm">{t("nexa.ui.dublin_ireland")}</span>
                </div>
                <p className="text-white/50 text-xs">{t("nexa.ui.global_headquarters")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
            >
              <img src="/images/about/office-interior.png" alt="TexaCore Office Interior" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-bold text-sm">{t("nexa.ui.modern_workspace")}</span>
                </div>
                <p className="text-white/50 text-xs">{t("nexa.ui.designed_for_creativity_and_in")}</p>
              </div>
            </motion.div>
          </div>

          {/* Office Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: MapPin, labelKey: "nexa.about.office_1.label", valueKey: "nexa.about.office_1.value", color: "text-teal-400" },
              { icon: Users, labelKey: "nexa.about.office_2.label", valueKey: "nexa.about.office_2.value", color: "text-blue-400" },
              { icon: Globe2, labelKey: "nexa.about.office_3.label", valueKey: "nexa.about.office_3.value", color: "text-purple-400" },
              { icon: Clock, labelKey: "nexa.about.office_4.label", valueKey: "nexa.about.office_4.value", color: "text-amber-400" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center"
              >
                <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-2`} />
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{t(item.labelKey)}</p>
                <p className="text-white font-semibold text-xs">{t(item.valueKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Trusted By Industries ═══ */}
      <section style={{ background: '#070b14' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.trusted_across_industries")}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => t(`nexa.about.industry_${i}`)).map((industry, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-xs font-medium hover:border-teal-500/30 hover:text-teal-300 transition-colors cursor-default"
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="relative overflow-hidden" style={{ background: '#050810' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent" />
        </div>
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-extrabold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              {t("nexa.ui.ready_to_transform_your_commun")}
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto">
              {t("nexa.ui.join_thousands_of_enterprises_1")
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--gradient-cta)' }}>
                {t("nexa.ui.explore_nexalive")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </a>
              <a href="/for-business" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white/70 text-sm border border-white/10 hover:border-white/20 transition-colors">
                {t("nexa.ui.for_enterprise")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ═══ Exported Component with Providers ═══ */
export default function NexaAboutPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaPageWrapper>
        <NexaAboutContent />
      </NexaPageWrapper>
    </NexaLiveLanguageProvider>
  );
}
