import React from "react";
import { Landmark, ShieldCheck, Lock, PhoneCall, Headphones, Mic2, Users, FileDigit, ShieldAlert } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="القطاع المالي والمصرفي"
      title="اتصالات بنكية آمنة وموثوقة"
      subtitle="حماية فائقة للبيانات، تسجيل دقيق للمكالمات، وتجربة عملاء استثنائية لعملاء الـ VIP."
      description="البنوك وشركات التأمين تتعامل مع أكثر البيانات حساسية. NexaLive يوفر بنية اتصالات مشفرة بالكامل، مع ميزات متقدمة مثل 'الاتصال المباشر' لعملاء إدارة الثروات، وتسجيل المكالمات المتوافق مع المتطلبات التنظيمية."
      gradient="from-emerald-500/15 via-teal-500/10 to-transparent"
      heroIcon={Landmark}
      stats={[
        { value: "AES-256", label: "تشفير عسكري" },
        { value: "100%", label: "تسجيل الامتثال" },
        { value: "Direct", label: "توجيه VIP" },
        { value: "On-Prem", label: "أو سحابي خاص" },
      ]}
      features={[
        { icon: Lock, title: "تشفير اتصالات صارم", desc: "جميع المكالمات والرسائل الداخلية مشفرة E2E لضمان سرية المعلومات المالية للعملاء والمناقشات الإدارية." },
        { icon: PhoneCall, title: "توجيه ذكي للـ VIP", desc: "نظام PBX يتعرف على عملاء التميز من أرقامهم ويوجههم مباشرة إلى مدراء حساباتهم (Direct Routing) دون المرور بـ IVR." },
        { icon: Mic2, title: "تسجيل للامتثال التنظيمي", desc: "تسجيل آمن لجميع مكالمات مركز خدمة العملاء وغرف التداول، مع أرشفة قابلة للبحث للامتثال لمتطلبات البنك المركزي." },
        { icon: Headphones, title: "كول سنتر مصرفي", desc: "نظام متكامل لخدمة العملاء يشمل ACD و Callback لتقليل أوقات انتظار العملاء وتوفير تجربة ممتازة." },
        { icon: FileDigit, title: "رسائل داخلية مشفرة", desc: "بديل آمن لتطبيقات المراسلة العامة. مشاركة المستندات المالية والاعتمادات بين الفروع والمقر الرئيسي بأمان تام." },
        { icon: Users, title: "مؤتمرات فيديو آمنة", desc: "عقد اجتماعات مجالس الإدارة ولجان الائتمان عبر مكالمات فيديو مشفرة لا تترك أثراً على الخوادم العامة." },
        { icon: ShieldAlert, title: "تنبيهات طوارئ الفروع", desc: "زر SOS للموظفين في الفروع وحراس الأمن للإبلاغ الفوري عن أي تهديد أو محاولة سطو، مع تحديد الموقع الدقيق." },
        { icon: ShieldCheck, title: "إدارة صلاحيات الوصول", desc: "تحديد دقيق لمن يمكنه التواصل مع من، ومن يحق له الاستماع للتسجيلات، متوافق مع سياسات الـ Compliance." },
      ]}
      scenarios={[
        {
          title: "اتصال عميل من فئة كبار الشخصيات",
          problem: "عميل VIP يتصل بالبنك ويضطر للانتظار في الطابور العادي وسماع قائمة طويلة من الخيارات.",
          solution: "نظام NexaLive يتعرف على رقم العميل تلقائياً، ويتجاوز الـ IVR ليربطه مباشرة بهاتف مدير حسابه الشخصي (Direct Inward Dialing).",
          result: "تجربة عميل استثنائية، وتعزيز العلاقة بين البنك وعملائه الأهم.",
        },
        {
          title: "مراجعة عملية تداول متنازع عليها",
          problem: "عميل يدعي أنه لم يطلب تنفيذ صفقة معينة، وإدارة الرقابة تحتاج لمراجعة المكالمة فوراً.",
          solution: "مدير الرقابة يدخل لنظام التسجيلات، ويبحث برقم العميل وتاريخ الصفقة، ويستمع للتسجيل المشفر والمحفوظ بأمان.",
          result: "حماية البنك من المخاطر القانونية وإثبات صحة الإجراء المتبع بسرعة وسهولة.",
        },
      ]}
      usedSystems={[
        { icon: Lock, name: "تشفير E2E", desc: "سرية تامة للمعلومات" },
        { icon: PhoneCall, name: "مقسم VIP", desc: "تعرف تلقائي وتوجيه مباشر" },
        { icon: Mic2, name: "تسجيل آمن", desc: "متوافق مع البنك المركزي" },
        { icon: FileDigit, name: "مراسلة آمنة", desc: "بديل لتطبيقات المستهلكين" },
      ]}
    />
  );
}

export default function NexaBanksPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
