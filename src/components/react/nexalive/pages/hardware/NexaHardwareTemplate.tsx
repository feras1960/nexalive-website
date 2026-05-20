import React from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "../../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaCTABanner } from "../../NexaPageTemplate";
import { ArrowRight, CheckCircle, type LucideIcon } from "lucide-react";

// ─── Types ───
interface DeviceModel {
  name: string;
  imageSrc: string;
  description: string;
  specs: { label: string; value: string }[];
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface HardwarePageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  heroIcon: LucideIcon;
  features: Feature[];
  models: DeviceModel[];
  compatibility: string[];
  videoSrc?: string;
}

export function HardwareDetailPage({
  badge, title, subtitle, description, gradient,
  heroIcon: HeroIcon, features, models, compatibility, videoSrc,
}: HardwarePageProps) {
  const { isRTL } = useNexaLanguage();

  return (
    <NexaPageWrapper>
      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
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
                style={{ playbackRate: 0.75 } as any}
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
                    اطلب عرض أسعار <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                  </a>
                  <a href="/hardware" className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                    videoSrc ? "bg-white/10 border border-white/20 text-white hover:bg-white/20" : "dark:border-white/15 dark:bg-white/5 dark:text-white border border-gray-300 bg-white text-gray-900 hover:scale-[1.02]"
                  }`}>
                    جميع الأجهزة
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

      {/* ═══ Features Grid ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-surface bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">الميزات التقنية الأساسية</h2>
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary max-w-2xl mx-auto">
              أجهزة مصممة خصيصاً للعمل بكفاءة تامة مع أنظمة NexaLive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl dark:bg-nexa-surface-elevated bg-gray-50 border dark:border-white/5 border-gray-100 hover:border-nexa-primary/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nexa-primary/20 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7 text-nexa-primary" />
                </div>
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">{feat.title}</h3>
                <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Device Models ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-deep-dark bg-gray-50 border-t dark:border-white/5 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">الموديلات المتوفرة</h2>
            <p className="text-lg dark:text-nexa-text-secondary text-nexa-light-text-secondary max-w-2xl mx-auto">
              اختر الجهاز المناسب لحجم أعمالك ومتطلباتك التقنية.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {models.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl dark:bg-nexa-surface bg-white border dark:border-white/10 border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-nexa transition-all"
              >
                <div className="w-full md:w-2/5 dark:bg-black/20 bg-gray-100 flex items-center justify-center p-8">
                  {/* Using a placeholder visual since we don't have images yet */}
                  <div className="text-center">
                    <HeroIcon className="w-24 h-24 mx-auto text-nexa-primary mb-4 opacity-80" />
                    <span className="text-sm font-bold text-nexa-primary dark:bg-nexa-primary/10 bg-nexa-primary/5 px-3 py-1 rounded-full">{model.name}</span>
                  </div>
                </div>
                <div className="p-8 w-full md:w-3/5 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{model.name}</h3>
                  <p className="dark:text-nexa-text-secondary text-nexa-light-text-secondary text-sm mb-6">{model.description}</p>
                  
                  <div className="space-y-3">
                    {model.specs.map((spec, j) => (
                      <div key={j} className="flex justify-between items-center py-2 border-b dark:border-white/5 border-gray-100 last:border-0">
                        <span className="dark:text-nexa-text-muted text-gray-500 text-sm">{spec.label}</span>
                        <span className="dark:text-white text-gray-900 font-semibold text-sm text-left" dir="ltr">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Compatibility ═══ */}
      <section className="py-20 md:py-28 dark:bg-nexa-surface-elevated bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 rounded-3xl dark:bg-nexa-primary/10 bg-blue-50 border dark:border-nexa-primary/20 border-blue-100 relative overflow-hidden">
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-8">التوافق والدعم التقني</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                {compatibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--accent-success)] shrink-0" />
                    <span className="dark:text-nexa-text-secondary text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <NexaCTABanner 
        titleKey="جاهز لترقية اتصالاتك؟" 
        descKey="تواصل معنا اليوم للحصول على استشارة مجانية وعرض أسعار لأجهزة NexaLive المناسبة لأعمالك." 
      />
    </NexaPageWrapper>
  );
}
