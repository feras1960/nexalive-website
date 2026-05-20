import React from "react";
import { ShieldCheck, Mic, Video, ShieldAlert, MapPin, Users, Eye, Lock, Radio, Scan, Clock, Network, Phone, PhoneForwarded } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="حلول الأمن والحراسة"
      title="أمن ذكي. استجابة فورية."
      subtitle="نظام اتصال مشفر لفرق الأمن — قنوات سرية، فيديو مباشر، وتنبيهات طوارئ مع تتبّع حي."
      description="فرق الأمن تحتاج اتصالاً موثوقاً ومشفراً يعمل في كل الظروف. NexaLive يوفر قنوات PTT مشفرة بالكامل، Video PTT للإبلاغ عن الحوادث، ونظام Lone Worker لحماية حراس المناوبات الليلية."
      gradient="from-nexa-primary/15 via-emerald-500/10 to-transparent"
      heroIcon={ShieldCheck}
      videoSrc="/videos/solutions/solution-security.mp4"
      stats={[
        { value: "E2E", label: "تشفير كامل" },
        { value: "45%", label: "أسرع في الاستجابة" },
        { value: "24/7", label: "حماية مستمرة" },
        { value: "GPS", label: "تتبّع حي للدوريات" },
      ]}
      features={[
        { icon: Lock, title: "قنوات مشفرة", desc: "جميع الاتصالات مشفرة E2E. لا يمكن لأي طرف ثالث الاستماع أو اعتراض المحادثات. مثالي لشركات الأمن الحساسة." },
        { icon: Mic, title: "PTT تكتيكي", desc: "اتصال فوري بين الحراس والمشرفين ومركز التحكم. قنوات مقسمة حسب المناطق والمهام مع أولوية الطوارئ." },
        { icon: Video, title: "إبلاغ بالفيديو", desc: "حارس يرصد نشاطاً مشبوهاً؟ يبث فيديو مباشر لمركز التحكم. دليل مرئي فوري لاتخاذ القرار الصحيح." },
        { icon: Eye, title: "جولات الدوريات", desc: "تسجيل مسار الدوريات عبر GPS. تأكيد الوصول لنقاط التفتيش صوتياً. تقارير تلقائية للإدارة." },
        { icon: Users, title: "حماية Lone Worker", desc: "حراس المناوبات الليلية محميون بنظام Lone Worker. فحص دوري وSOS تلقائي عند عدم الاستجابة." },
        { icon: ShieldAlert, title: "إنذار الطوارئ", desc: "زر SOS مع 3 مستويات: تسلل، مساعدة، خطر. التنبيه يصل لكل الفريق فوراً مع الموقع." },
        { icon: Radio, title: "بديل أجهزة اللاسلكي", desc: "استبدال أجهزة Motorola/Hytera المكلفة بتطبيق NexaLive. نفس الأداء، تشفير أقوى، تكلفة أقل." },
        { icon: Scan, title: "تكامل مع كاميرات المراقبة", desc: "ربط مع أنظمة CCTV لمشاركة الصور من الكاميرات عبر قنوات PTT مباشرة." },
        { icon: Clock, title: "سجل الأحداث", desc: "كل اتصال وتنبيه موثّق بالتاريخ والوقت. تقارير جاهزة للعملاء والجهات الرسمية." },
        { icon: Phone, title: "مقسم لاستقبال بلاغات العملاء", desc: "رقم موحد لشركتك الأمنية مع IVR: 'لبلاغ طوارئ اضغط 1، للإدارة اضغط 2'. توزيع تلقائي للبلاغات حسب المنطقة والأولوية. تسجيل كل مكالمة كدليل." },
        { icon: PhoneForwarded, title: "توزيع البلاغات بين الفرق", desc: "بلاغ من العميل يصل فوراً لأقرب دورية عبر PTT مع تفاصيل الموقع. المشرف يتابع الاستجابة. تقرير تلقائي للعميل." },
      ]}
      scenarios={[
        {
          title: "رصد تسلل ليلي",
          problem: "حارس يرصد شخصاً مشبوهاً يحاول الدخول من البوابة الخلفية ليلاً. يحتاج إبلاغ المركز فوراً مع دليل مرئي.",
          solution: "الحارس يضغط PTT ويبلّغ صوتياً ثم يسحب للأعلى لتفعيل Video PTT. مركز التحكم يرى البث المباشر ويتخذ القرار: إرسال دورية أو إبلاغ الشرطة.",
          result: "استجابة خلال 30 ثانية. فيديو مسجّل كدليل. المشبوه يُوقف قبل الدخول.",
        },
        {
          title: "حارس لا يستجيب في مناوبة ليلية",
          problem: "حارس في مبنى بعيد لم يؤكد وصوله لنقطة التفتيش منذ 20 دقيقة. لا أحد يعرف هل هو بخير.",
          solution: "نظام Lone Worker يكتشف عدم الحركة ويرسل فحص. عدم الاستجابة خلال 60 ثانية يفعّل SOS مع آخر موقع GPS معروف.",
          result: "فريق الدعم يصل خلال 5 دقائق. الحارس كان قد تعثّر وأصيب. الإسعاف الفوري منع تفاقم الإصابة.",
        },
        {
          title: "تنسيق أمن حدث كبير",
          problem: "تأمين فعالية بـ 5000 شخص مع 30 حارس في مناطق مختلفة. التنسيق بالهاتف مستحيل.",
          solution: "قنوات PTT مقسمة: بوابات، مواقف، صالة رئيسية، VIP. المشرف يبث تعليمات لكل مجموعة. GPS يعرض موقع كل حارس.",
          result: "تغطية أمنية كاملة. استجابة لأي حادثة خلال دقيقة. الفعالية تمر بسلام.",
        },
      ]}
      usedSystems={[
        { icon: Lock, name: "اتصال مشفر E2E", desc: "قنوات سرية لا يمكن اعتراضها" },
        { icon: Mic, name: "PTT تكتيكي", desc: "اتصال فوري مع أولوية الطوارئ" },
        { icon: Video, name: "فيديو مباشر", desc: "بث حي للحوادث وتوثيقها" },
        { icon: Users, name: "Lone Worker", desc: "حماية حراس المناوبات الليلية" },
        { icon: MapPin, name: "تتبّع GPS", desc: "موقع كل حارس ومسار الدوريات" },
        { icon: ShieldAlert, name: "إنذار SOS", desc: "تنبيه طوارئ متعدد المستويات" },
      ]}
    />
  );
}

export default function NexaSecuritySolPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
