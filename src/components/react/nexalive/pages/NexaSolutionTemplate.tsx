import React from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaCTABanner } from "../NexaPageTemplate";
import { ArrowRight, CheckCircle, type LucideIcon } from "lucide-react";

// ─── Types ───
interface Scenario {
  title: string;
  problem: string;
  solution: string;
  result: string;
}
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}
interface Stat { value: string; label: string; }

interface SolutionPageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  heroIcon: LucideIcon;
  features: Feature[];
  scenarios: Scenario[];
  usedSystems: { name: string; desc: string; icon: LucideIcon }[];
  stats: Stat[];
  workflow?: { step: string; desc: string }[];
  /** Optional video background for hero section */
  videoSrc?: string;
}

// ─── Reusable Solution Detail Page ───
export function SolutionDetailPage({
  badge, title, subtitle, description, gradient,
  heroIcon: HeroIcon, features, scenarios, usedSystems, stats, workflow, videoSrc,
}: SolutionPageProps) {
  const { isRTL } = useNexaLanguage();

  return (
    <NexaPageWrapper>
      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Background: Video or Gradient */}
        {videoSrc ? (
          <>
            <div className="absolute inset-0 z-0">
              <video
                src={videoSrc}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t dark:from-nexa-deep-dark from-nexa-light-bg to-transparent z-[1]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 dark:bg-nexa-deep-dark bg-nexa-light-bg" />
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} dark:opacity-100 opacity-50`} />
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className={`${isRTL ? "lg:text-right" : "lg:text-left"} text-center`}
            >
              {/* Glass container when video is active */}
              <div className={videoSrc ? "rounded-3xl p-8 border border-white/15" : ""}
                style={videoSrc ? {
                  background: "rgba(10, 15, 28, 0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                } : undefined}
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  videoSrc ? "bg-white/10 border-white/20" : "dark:bg-nexa-primary/10 bg-nexa-primary/5 dark:border-nexa-primary/30 border-nexa-primary/20"
                } border mb-6`}>
                  <span className="w-2 h-2 rounded-full bg-nexa-primary animate-pulse" />
                  <span className={`text-sm font-semibold ${videoSrc ? "text-[var(--accent-primary)]" : "dark:text-nexa-primary text-nexa-primary-dark"}`}>{badge}</span>
                </div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 ${videoSrc ? "text-white" : "dark:text-white text-gray-900"}`}>{title}</h1>
                <p className={`text-lg md:text-xl max-w-xl mb-4 ${videoSrc ? "text-white/85" : "dark:text-nexa-text-secondary text-nexa-light-text-secondary"}`}>{subtitle}</p>
                <p className={`text-base max-w-xl mb-8 ${videoSrc ? "text-white/60" : "dark:text-nexa-text-muted text-nexa-light-text-muted"}`}>{description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="/nexalive#download" className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 justify-center ${
                    videoSrc ? "bg-[var(--accent-primary)] text-white hover:opacity-90 shadow-lg" : "bg-nexa-primary text-white hover:bg-nexa-primary-dark shadow-nexa"
                  }`}>
                    ابدأ مجاناً <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                  </a>
                  <a href="/solutions" className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                    videoSrc ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" : "dark:border-white/15 dark:bg-white/5 dark:text-white border border-gray-300 bg-white text-gray-900 hover:scale-[1.02]"
                  }`}>
                    جميع الحلول
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center">
              <div className={`w-40 h-40 rounded-3xl flex items-center justify-center ${
                videoSrc ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-gradient-to-br from-nexa-primary/20 to-nexa-primary/5 border dark:border-white/10 border-gray-200"
              }`}>
                <HeroIcon className={`w-20 h-20 ${videoSrc ? "text-white" : "text-nexa-primary"}`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Stats Bar ═══ */}
      <section className="py-12 dark:bg-nexa-surface/50 bg-gray-50 border-y dark:border-white/5 border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-nexa-primary mb-1">{s.value}</div>
                <div className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Features Grid ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-deep-dark bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">المميزات الرئيسية</h2>
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary max-w-3xl mx-auto">
              أدوات اتصال متكاملة صُممت خصيصاً لتلبية متطلبات هذا القطاع
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-2xl dark:bg-nexa-surface-elevated/50 bg-white border dark:border-white/5 border-gray-100 dark:hover:border-nexa-primary/30 hover:border-nexa-primary/20 hover:shadow-nexa transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexa-primary/20 to-nexa-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-nexa-primary" />
                  </div>
                  <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Use Case Scenarios ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-surface/30 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">سيناريوهات الاستخدام</h2>
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary">
              كيف يحل NexaLive تحديات الاتصال الحقيقية في هذا القطاع
            </p>
          </div>
          <div className="space-y-8">
            {scenarios.map((sc, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-6 md:p-8 rounded-2xl dark:bg-nexa-surface-elevated/50 bg-white border dark:border-white/5 border-gray-100">
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-nexa-primary/10 text-nexa-primary flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  {sc.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">⚠️ التحدي</div>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{sc.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-nexa-primary mb-2">💡 الحل</div>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{sc.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">✅ النتيجة</div>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{sc.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Systems Used ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-deep-dark bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">الأنظمة المستخدمة</h2>
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary">
              منظومة اتصالات متكاملة تعمل بتناغم تام
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usedSystems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl dark:bg-nexa-surface/50 bg-gray-50 border dark:border-white/5 border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-nexa-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-nexa-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white text-gray-900 mb-1">{sys.name}</h4>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{sys.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Workflow (optional) ═══ */}
      {workflow && workflow.length > 0 && (
        <section className="py-20 dark:bg-nexa-surface/30 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">سير العمل</h2>
            </div>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 dark:bg-white/10 bg-gray-200" />
              {workflow.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="relative flex gap-6 mb-8">
                  <div className="w-12 h-12 rounded-full bg-nexa-primary text-white flex items-center justify-center font-bold text-sm shrink-0 z-10">{i + 1}</div>
                  <div className="pt-2">
                    <h4 className="font-bold dark:text-white text-gray-900 mb-1">{w.step}</h4>
                    <p className="text-sm dark:text-nexa-text-secondary text-nexa-light-text-secondary">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NexaCTABanner titleKey="nexa.solutions.cta.title" descKey="nexa.solutions.cta.desc" />
    </NexaPageWrapper>
  );
}
