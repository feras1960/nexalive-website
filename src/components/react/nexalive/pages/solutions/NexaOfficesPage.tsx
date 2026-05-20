import React from "react";
import { Building2, Mic, Video, Phone, MessageSquare, Lock, Users, Monitor, Headphones, Calendar, BarChart3, Globe } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="حلول المكاتب"
      title="مكتب ذكي. فريق متصل."
      subtitle="مقسم سحابي، محادثات مشفرة، مؤتمرات فيديو — كل اتصالات المكتب في تطبيق واحد."
      description="المكاتب الحديثة تحتاج أكثر من هاتف مكتبي. NexaLive يوفر مقسم PBX سحابي متكامل، محادثات نصية مشفرة، ومؤتمرات فيديو — كل ذلك في تطبيق واحد يعمل على الهاتف والكمبيوتر."
      gradient="from-slate-500/15 via-blue-500/10 to-transparent"
      heroIcon={Building2}
      videoSrc="/videos/solutions/solution-offices.mp4"
      stats={[
        { value: "80%", label: "توفير تكاليف الاتصال" },
        { value: "E2E", label: "تشفير كامل" },
        { value: "UCaaS", label: "اتصالات موحّدة" },
        { value: "∞", label: "فروع مرتبطة" },
      ]}
      features={[
        { icon: Phone, title: "مقسم PBX سحابي", desc: "استقبال وتحويل المكالمات، بريد صوتي، رد آلي IVR، وتسجيل المكالمات. يعمل من أي مكان — المكتب أو المنزل." },
        { icon: MessageSquare, title: "محادثات مشفرة", desc: "دردشة فورية مشفرة E2E بين الموظفين. مجموعات لكل قسم وفريق. مشاركة ملفات آمنة." },
        { icon: Video, title: "مؤتمرات فيديو", desc: "اجتماعات فيديو عالية الجودة تصل لـ 50 مشارك. مشاركة الشاشة، تسجيل الاجتماعات، وغرف فرعية." },
        { icon: Mic, title: "PTT داخلي", desc: "اتصال صوتي فوري بين الأقسام. أسرع من المكالمة الهاتفية، أسرع من الرسالة النصية." },
        { icon: Globe, title: "ربط الفروع", desc: "ربط جميع فروع الشركة في نظام اتصال واحد. مكالمات داخلية مجانية بين الفروع." },
        { icon: Monitor, title: "تطبيق سطح المكتب", desc: "NexaLive يعمل على Windows و Mac و Web. نفس الحساب على الهاتف والكمبيوتر." },
        { icon: Lock, title: "أمان المؤسسة", desc: "تشفير E2E لكل الاتصالات. إدارة مركزية للحسابات والصلاحيات. تسجيل خروج عن بُعد." },
        { icon: Calendar, title: "تكامل التقويم", desc: "جدولة الاجتماعات وربطها بمؤتمرات فيديو تلقائياً. تذكيرات قبل الموعد." },
        { icon: BarChart3, title: "تحليلات الاستخدام", desc: "تقارير عن حجم المكالمات، ساعات الاستخدام، وجودة الاتصال. تساعد في التخطيط." },
      ]}
      scenarios={[
        {
          title: "فريق يعمل عن بُعد",
          problem: "نصف الفريق يعمل من المنزل. التواصل بطيء بين المكتب والمنزل. المكالمات الدولية مكلفة.",
          solution: "مقسم PBX سحابي يعمل من أي مكان. الموظف في المنزل يستقبل مكالمات المكتب على هاتفه. مكالمات داخلية مجانية. PTT للتنسيق السريع.",
          result: "لا فرق بين موظف المكتب وموظف المنزل. توفير 70% من تكاليف الاتصال الدولي. إنتاجية أعلى.",
        },
        {
          title: "اجتماع طارئ مع 3 فروع",
          problem: "قرار إداري عاجل يحتاج موافقة مدراء 3 فروع في مدن مختلفة. لا وقت للسفر.",
          solution: "مؤتمر فيديو فوري عبر NexaLive. مشاركة شاشة لعرض البيانات. تسجيل الاجتماع للتوثيق. قرار خلال 30 دقيقة.",
          result: "توفير يوم سفر كامل. قرار فوري بدلاً من انتظار أسبوع. تسجيل الاجتماع كمرجع.",
        },
        {
          title: "حماية بيانات العملاء",
          problem: "الفريق يتبادل بيانات عملاء حساسة عبر واتساب. لا تشفير مؤسسي. خطر تسرّب البيانات.",
          solution: "نقل كل المحادثات لـ NexaLive المشفر E2E. الإدارة تتحكم في الصلاحيات. حذف البيانات عن بُعد عند مغادرة الموظف.",
          result: "حماية كاملة لبيانات العملاء. امتثال لمعايير حماية البيانات. لا تسرّب ممكن.",
        },
      ]}
      usedSystems={[
        { icon: Phone, name: "مقسم PBX سحابي", desc: "نظام هاتفي كامل يعمل من أي مكان" },
        { icon: MessageSquare, name: "محادثات مشفرة", desc: "دردشة فورية مع مشاركة ملفات آمنة" },
        { icon: Video, name: "مؤتمرات فيديو", desc: "اجتماعات عالية الجودة حتى 50 مشارك" },
        { icon: Mic, name: "PTT داخلي", desc: "اتصال فوري بين الأقسام" },
        { icon: Lock, name: "أمان E2E", desc: "تشفير كامل وإدارة مركزية" },
        { icon: Globe, name: "ربط الفروع", desc: "جميع الفروع في نظام واحد" },
      ]}
    />
  );
}

export default function NexaOfficesPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
