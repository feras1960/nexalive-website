import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mic, MessageSquare, Shield, Network, Video,
  ShieldAlert, BrainCircuit, ArrowRight, X, Check, ChevronRight,
} from "lucide-react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import { NexaPageWrapper, NexaSection, NexaCTABanner } from "../NexaPageTemplate";

// ═══════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════

interface FeatureSlide {
  id: string;
  icon: React.ElementType;
  video: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  stats: { value: string; labelAr: string; labelEn: string }[];
  colorClass: string;
  hexColor: string;
}

const heroSlides: FeatureSlide[] = [
  {
    id: "cloud-pbx",
    icon: Phone,
    video: "/videos/feature-pbx.mp4",
    titleKey: "nexa.features.item_1.title",
    subtitleKey: "nexa.features.item_21.subtitle",
    colorClass: "text-violet-400",
    hexColor: "#A78BFA",
    stats: [
      { value: "IVR", labelAr: "ذكي", labelEn: "Smart" },
      { value: "ACD", labelAr: "توزيع", labelEn: "Routing" },
      { value: "50+", labelAr: "دولة", labelEn: "Countries" },
    ],
  },
  {
    id: "push-to-talk",
    icon: Mic,
    video: "/videos/features/ptt-hero.mp4",
    titleKey: "nexa.features.item_2.title",
    subtitleKey: "nexa.features.item_22.subtitle",
    colorClass: "text-emerald-400",
    hexColor: "#34D399",
    stats: [
      { value: "PTT", labelAr: "فوري", labelEn: "Instant" },
      { value: "GPS", labelAr: "مباشر", labelEn: "Live" },
      { value: "SOS", labelAr: "طوارئ", labelEn: "Emergency" },
    ],
  },
  {
    id: "encryption",
    icon: Shield,
    video: "/videos/features/security-hero.mp4",
    titleKey: "nexa.features.item_3.title",
    subtitleKey: "nexa.features.item_23.subtitle",
    colorClass: "text-purple-400",
    hexColor: "#A855F7",
    stats: [
      { value: "E2EE", labelAr: "تشفير", labelEn: "Encryption" },
      { value: "AES", labelAr: "256-bit", labelEn: "256-bit" },
      { value: "ZK", labelAr: "صفر معرفة", labelEn: "Zero-Knowledge" },
    ],
  },
  {
    id: "mesh-network",
    icon: Network,
    video: "/videos/features/mesh-hero.mp4",
    titleKey: "nexa.features.item_4.title",
    subtitleKey: "nexa.features.item_24.subtitle",
    colorClass: "text-teal-400",
    hexColor: "#2DD4BF",
    stats: [
      { value: "Mesh", labelAr: "بلا إنترنت", labelEn: "Offline" },
      { value: "3km", labelAr: "نطاق", labelEn: "Range" },
      { value: "BLE", labelAr: "بلوتوث", labelEn: "Bluetooth" },
    ],
  },
];

interface FeatureCard {
  icon: React.ElementType;
  key: string;
  iconColor: string;
  hexColor: string;
  href: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  detailsAr: string[];
  detailsEn: string[];
}

const allFeatures: FeatureCard[] = [
  {
    icon: Phone, key: "pbx", iconColor: "text-nexa-primary", hexColor: "#6366F1",
    href: "/features/pbx",
    titleKey: "nexa.features.item_5.title",
    descKey: "nexa.features.item_13.desc",
    detailsAr: [
      "نظام IVR ذكي متعدد المستويات مع رسائل ترحيب مخصصة",
      "توزيع تلقائي للمكالمات (ACD) مع قوائم انتظار ذكية",
      "تسجيل تلقائي للمكالمات مع أرشفة سحابية غير محدودة",
      "أرقام محلية افتراضية (DID) في أكثر من 50 دولة",
      "تقارير CDR مفصلة مع تحليلات لوحة التحكم",
      "تحويل مكالمات ذكي بين الأقسام والفروع",
    ],
    detailsEn: [
      "Multi-level smart IVR with customizable welcome messages",
      "Automatic Call Distribution (ACD) with intelligent queueing",
      "Automatic call recording with unlimited cloud archiving",
      "Virtual local numbers (DID) in 50+ countries",
      "Detailed CDR reports with dashboard analytics",
      "Smart call forwarding between departments and branches",
    ],
  },
  {
    icon: Mic, key: "ptt", iconColor: "text-emerald-500", hexColor: "#10B981",
    href: "/features/ptt",
    titleKey: "nexa.features.item_6.title",
    descKey: "nexa.features.item_14.desc",
    detailsAr: [
      "بث صوتي فوري بزمن استجابة أقل من 200 مللي ثانية",
      "قنوات ومجموعات غير محدودة مع صلاحيات مرنة",
      "تتبع GPS مباشر للفرق الميدانية على خريطة حية",
      "سجل صوتي كامل لجميع الاتصالات",
      "يعمل عبر الإنترنت، WiFi، أو شبكة Mesh",
      "متوافق مع أجهزة اللاسلكي الاحترافية والهواتف الذكية",
    ],
    detailsEn: [
      "Instant voice broadcast with <200ms latency",
      "Unlimited channels and groups with flexible permissions",
      "Live GPS tracking for field teams on a live map",
      "Complete voice log for all communications",
      "Works over Internet, WiFi, or Mesh network",
      "Compatible with professional radios and smartphones",
    ],
  },
  {
    icon: Video, key: "video", iconColor: "text-cyan-500", hexColor: "#06B6D4",
    href: "/features/ptt",
    titleKey: "nexa.features.item_7.title",
    descKey: "nexa.features.item_15.desc",
    detailsAr: [
      "بث فيديو مباشر بدقة HD من أي جهاز",
      "مشاركة الشاشة والصور الفورية مع الفريق",
      "تسجيل فيديو تلقائي مع أرشفة سحابية",
      "تشفير الفيديو من طرف لطرف (E2EE)",
      "يعمل حتى مع اتصال إنترنت ضعيف (تكيف تلقائي)",
      "مثالي للتفتيش عن بُعد والإشراف الميداني",
    ],
    detailsEn: [
      "HD live video streaming from any device",
      "Screen and instant photo sharing with the team",
      "Automatic video recording with cloud archiving",
      "End-to-end video encryption (E2EE)",
      "Works even with weak internet (adaptive bitrate)",
      "Ideal for remote inspection and field supervision",
    ],
  },
  {
    icon: MessageSquare, key: "messaging", iconColor: "text-blue-500", hexColor: "#3B82F6",
    href: "/features/messaging",
    titleKey: "nexa.features.item_8.title",
    descKey: "nexa.features.item_16.desc",
    detailsAr: [
      "تشفير من طرف لطرف لجميع الرسائل والملفات",
      "مشاركة ملفات بلا حدود (PDF، صور، فيديو، صوت)",
      "مجموعات دردشة مع صلاحيات إدارية متقدمة",
      "رسائل ذاتية الحذف مع مؤقت قابل للتعديل",
      "مشاركة الموقع الجغرافي في الوقت الفعلي",
      "بحث متقدم في المحادثات مع فلاتر ذكية",
    ],
    detailsEn: [
      "End-to-end encryption for all messages and files",
      "Unlimited file sharing (PDF, photos, video, audio)",
      "Group chats with advanced admin permissions",
      "Self-destructing messages with adjustable timer",
      "Real-time location sharing",
      "Advanced search in conversations with smart filters",
    ],
  },
  {
    icon: Shield, key: "security", iconColor: "text-purple-500", hexColor: "#8B5CF6",
    href: "/features/security",
    titleKey: "nexa.features.item_9.title",
    descKey: "nexa.features.item_17.desc",
    detailsAr: [
      "تشفير AES-256 لجميع الاتصالات والبيانات",
      "بنية صفر معرفة (Zero Knowledge) — لا أحد يصل لبياناتك",
      "مصادقة ثنائية (2FA) إلزامية لجميع الحسابات",
      "شهادات SSL/TLS مع تثبيت الشهادة (Certificate Pinning)",
      "إدارة مفاتيح التشفير محلياً على جهاز المستخدم",
      "تدقيق أمني مستمر مع سجلات وصول مفصلة",
    ],
    detailsEn: [
      "AES-256 encryption for all communications and data",
      "Zero-knowledge architecture — no one accesses your data",
      "Mandatory two-factor authentication (2FA) for all accounts",
      "SSL/TLS certificates with Certificate Pinning",
      "Encryption key management locally on user's device",
      "Continuous security auditing with detailed access logs",
    ],
  },
  {
    icon: Network, key: "mesh", iconColor: "text-teal-500", hexColor: "#14B8A6",
    href: "/features/mesh",
    titleKey: "nexa.features.item_10.title",
    descKey: "nexa.features.item_18.desc",
    detailsAr: [
      "اتصال صوتي ونصي بدون إنترنت أو شبكة خلوية",
      "شبكة Bluetooth Mesh تلقائية بين الأجهزة القريبة",
      "نطاق يصل إلى 3 كم بين الأجهزة (قابل للتوسعة)",
      "مثالي للأنفاق، المناجم، المناطق النائية، والكوارث",
      "انتقال تلقائي بين Mesh والإنترنت حسب التوفر",
      "تشفير كامل حتى في وضع Mesh",
    ],
    detailsEn: [
      "Voice and text communication without internet or cellular",
      "Automatic Bluetooth Mesh network between nearby devices",
      "Range up to 3km between devices (expandable)",
      "Ideal for tunnels, mines, remote areas, and disasters",
      "Auto-switching between Mesh and internet by availability",
      "Full encryption even in Mesh mode",
    ],
  },
  {
    icon: ShieldAlert, key: "sos", iconColor: "text-red-500", hexColor: "#EF4444",
    href: "/features/sos",
    titleKey: "nexa.features.item_11.title",
    descKey: "nexa.features.item_19.desc",
    detailsAr: [
      "زر طوارئ SOS مخصص يعمل بنقرة واحدة",
      "إرسال الموقع الجغرافي الدقيق تلقائياً لمركز التحكم",
      "تنبيهات صوتية ومرئية فورية لفريق الاستجابة",
      "حماية العامل الوحيد (Lone Worker Protection)",
      "كشف السقوط التلقائي وإرسال تنبيه فوري",
      "تسجيل صوتي تلقائي عند تفعيل الطوارئ",
    ],
    detailsEn: [
      "Dedicated SOS emergency button with one-click activation",
      "Automatic exact GPS location sent to control center",
      "Instant audio and visual alerts for response team",
      "Lone Worker Protection (LWP)",
      "Automatic fall detection with instant alert",
      "Automatic audio recording when emergency is activated",
    ],
  },
  {
    icon: BrainCircuit, key: "ai", iconColor: "text-amber-500", hexColor: "#F59E0B",
    href: "/features/ptt",
    titleKey: "nexa.features.item_12.title",
    descKey: "nexa.features.item_20.desc",
    detailsAr: [
      "تفريغ صوتي تلقائي (Speech-to-Text) لجميع المكالمات",
      "تحليل مشاعر المتصلين (Sentiment Analysis)",
      "تقارير أداء ذكية مع مؤشرات KPI مخصصة",
      "كشف الكلمات المفتاحية والمواضيع في المحادثات",
      "ملخصات تلقائية للاجتماعات والمكالمات الطويلة",
      "ميزة حصرية للمقاسم المحلية لتقييم الأداء",
    ],
    detailsEn: [
      "Automatic Speech-to-Text for all calls",
      "Caller Sentiment Analysis",
      "Smart performance reports with custom KPI metrics",
      "Keyword and topic detection in conversations",
      "Automatic summaries for meetings and long calls",
      "Exclusive feature for on-premise PBX for performance evaluation",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// Hero Component (Cinematic Skewed Slices)
// ═══════════════════════════════════════════════════════════════

const SLIDE_DURATION = 8000;
const SKEW = 15;

function FeaturesHero() {
  const { t, isRTL } = useNexaLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [active]);

  const activeSlide = heroSlides[active];
  const inactiveSlides = heroSlides.filter((_, i) => i !== active);
  const slots = isRTL ? [activeSlide, ...inactiveSlides] : [...inactiveSlides, activeSlide];

  const getSlotParams = (slotIdx: number) => {
    const isActiveSlot = isRTL ? slotIdx === 0 : slotIdx === 3;
    let start = 0, width = 0;
    if (isRTL) {
      if (slotIdx === 0) { start = 0; width = 70; }
      else if (slotIdx === 1) { start = 70; width = 15; }
      else if (slotIdx === 2) { start = 85; width = 15; }
      else { start = 100; width = 15; }
    } else {
      if (slotIdx === 0) { start = 0; width = 15; }
      else if (slotIdx === 1) { start = 15; width = 15; }
      else if (slotIdx === 2) { start = 30; width = 15; }
      else { start = 45; width = 70; }
    }
    const end = start + width;
    return { start, width, clipPath: `polygon(${start}% 0%, ${end}% 0%, ${end - SKEW}% 100%, ${start - SKEW}% 100%)`, isActiveSlot };
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] bg-black overflow-hidden select-none">
      {slots.map((slide, i) => {
        const { start, width, clipPath, isActiveSlot } = getSlotParams(i);
        const originalIndex = heroSlides.findIndex(s => s.id === slide.id);
        const Icon = slide.icon;
        return (
          <div key={`slot-${i}`} className="absolute inset-0 z-0" style={{ clipPath }}>
            <AnimatePresence mode="wait">
              <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
                <video src={slide.video} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={isActiveSlot ? { objectPosition: t("nexa.ui.15_center") } : undefined} />
              </motion.div>
            </AnimatePresence>
            <div className={`absolute inset-0 transition-colors duration-500 ${isActiveSlot ? 'bg-black/10' : 'bg-black/70 hover:bg-black/50 cursor-pointer'}`}
              onClick={() => !isActiveSlot && setActive(originalIndex)} />
            {!isActiveSlot && (
              <div className="absolute top-0 h-full pointer-events-none"
                style={{ left: `${start}%`, width: `${width}%`, transform: `skewX(-15deg)`, transformOrigin: 'top' }}>
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-px bg-white/10`} />
                <div className="absolute bottom-12 inset-x-0 flex flex-col items-center justify-end" style={{ transform: `skewX(15deg)` }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={slide.id + "-icon"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                        <Icon className={`w-5 h-5 ${slide.colorClass}`} />
                      </div>
                      <span className="text-white/80 font-bold tracking-[0.2em] uppercase whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: isRTL ? '' : 'rotate(180deg)' }}>
                        {t(slide.titleKey)}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
            {isActiveSlot && <div className="absolute inset-0 z-10" />}
          </div>
        );
      })}

      {/* Glass Card */}
      <div className={`absolute top-0 bottom-0 z-20 ${t("nexa.ui.left_0_w_35")} flex items-center justify-center pointer-events-none px-6 lg:px-10`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id + "-text"}
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -40 : 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xl p-10 sm:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
              {React.createElement(activeSlide.icon, { className: `w-5 h-5 ${activeSlide.colorClass}` })}
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {t("nexa.ui.features")}
              </span>
            </div>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-extrabold text-white mb-6 leading-[1.1]">
              {t(activeSlide.titleKey)}
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] text-gray-300 leading-relaxed mb-10">
              {t(activeSlide.subtitleKey)}
            </p>
            <div className="flex flex-wrap items-center gap-8 mb-10 border-t border-white/10 pt-8">
              {activeSlide.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-bold text-white font-mono">{stat.value}</span>
                  <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mt-1.5">
                    {isRTL ? stat.labelAr : stat.labelEn}
                  </span>
                </div>
              ))}
            </div>
            <a href="#features-grid"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white transition-all hover:bg-white/20 border border-white/20 bg-white/10 group"
              style={{ boxShadow: `0 4px 20px ${activeSlide.hexColor}30` }}
            >
              {t("nexa.ui.explore_all_features")}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Feature Detail Modal
// ═══════════════════════════════════════════════════════════════

function FeatureDetailModal({ feature, onClose, isRTL }: { feature: FeatureCard; onClose: () => void; isRTL: boolean }) {
  const Icon = feature.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl 
          dark:bg-[#0F1117] bg-white 
          border dark:border-white/10 border-gray-200 
          shadow-2xl"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 dark:bg-[#0F1117]/95 bg-white/95 backdrop-blur-xl border-b dark:border-white/5 border-gray-100 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${feature.hexColor}15`, border: `2px solid ${feature.hexColor}30` }}>
              <Icon className="w-7 h-7" style={{ color: feature.hexColor }} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold dark:text-white text-gray-900">
                {t(feature.titleKey)}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center dark:text-white/60 text-gray-500 hover:dark:text-white hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8">
          {/* Description */}
          <p className="text-lg dark:text-gray-300 text-gray-600 leading-relaxed">
            {t(feature.descKey)}
          </p>

          {/* Capabilities */}
          <div>
            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-5 flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full" style={{ background: feature.hexColor }} />
              {t("nexa.ui.detailed_capabilities")}
            </h3>
            <div className="space-y-3">
              {(isRTL ? feature.detailsAr : feature.detailsEn).map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl dark:bg-white/[0.03] bg-gray-50 dark:hover:bg-white/[0.06] hover:bg-gray-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${feature.hexColor}20` }}>
                    <Check className="w-3.5 h-3.5" style={{ color: feature.hexColor }} />
                  </div>
                  <span className="dark:text-gray-300 text-gray-600 text-[15px] leading-relaxed">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 pt-4 border-t dark:border-white/5 border-gray-100">
            <a
              href={feature.href}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: feature.hexColor }}
            >
              {t("nexa.ui.learn_more")}
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-xl font-bold dark:text-white text-gray-900 dark:bg-white/5 bg-gray-100 hover:dark:bg-white/10 hover:bg-gray-200 transition-colors"
            >
              {t("nexa.ui.close")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════════

function NexaFeaturesContent() {
  const { t, isRTL } = useNexaLanguage();
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  return (
    <div className="min-h-screen transition-colors" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* 1. Cinematic Hero */}
      <FeaturesHero />

      <NexaPageWrapper>
        {/* 2. Features Grid */}
        <NexaSection
          id="features-grid"
          titleKey={t("nexa.ui.all_features")}
          subtitleKey={t("nexa.ui.click_any_feature_to_explore_i")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.button
                  key={feat.key}
                  onClick={() => setSelectedFeature(feat)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group relative block p-8 rounded-3xl text-start
                    dark:bg-nexa-surface-elevated/50 bg-white
                    border dark:border-white/5 border-gray-100
                    dark:hover:border-white/15 hover:border-gray-200
                    hover:shadow-nexa transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {/* Glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: feat.hexColor }} />

                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl dark:bg-white/5 bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 0 0 0 ${feat.hexColor}00` }}>
                      <Icon className={`w-7 h-7 ${feat.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold dark:text-white text-gray-900 mb-2 text-xl">
                        {t(feat.titleKey)}
                      </h3>
                      <p className="text-[15px] dark:text-nexa-text-secondary text-nexa-light-text-secondary mb-4 leading-relaxed line-clamp-2">
                        {t(feat.descKey)}
                      </p>
                      <div className={`flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                        style={{ color: feat.hexColor }}>
                        {t("nexa.ui.explore_details")}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </NexaSection>

        {/* 3. CTA */}
        <NexaCTABanner
          titleKey={t("nexa.ui.ready_to_upgrade_your_communic")}
          descKey={t("nexa.ui.join_thousands_of_companies_re")}
        />
      </NexaPageWrapper>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <FeatureDetailModal
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
            isRTL={isRTL}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NexaFeaturesPage() {
  return (
    <NexaLiveLanguageProvider>
      <NexaFeaturesContent />
    </NexaLiveLanguageProvider>
  );
}
