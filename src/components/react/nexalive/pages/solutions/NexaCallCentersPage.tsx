import React from "react";
import { Headset, PhoneForwarded, Users, Activity, Ear, Clock, BarChart4, PhoneCall, Mic2 } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="حلول مراكز الاتصال"
      title="مركز اتصال ذكي ومتكامل"
      subtitle="ارتقِ بخدمة العملاء مع نظام PBX سحابي متقدم يتضمن طوابير انتظار ذكية، ميزة الكول باك (Callback)، ولوحات تحكم للمشرفين."
      description="مراكز الاتصال تحتاج إلى أكثر من مجرد استقبال مكالمات. NexaLive يوفر توزيعاً تلقائياً للمكالمات (ACD)، ميزة الاتصال العكسي (Callback) لتقليل وقت الانتظار، وأدوات متقدمة للمشرفين مثل الهمس (Whisper) والمقاطعة (Barge-in) لضمان أعلى جودة خدمة."
      gradient="from-indigo-500/15 via-blue-500/10 to-transparent"
      heroIcon={Headset}
      videoSrc="/videos/solutions/solution-pbx.mp4"
      stats={[
        { value: "40%", label: "تقليل وقت الانتظار" },
        { value: "99.9%", label: "استقرار النظام" },
        { value: "100%", label: "تسجيل المكالمات" },
        { value: "Live", label: "مراقبة الأداء" },
      ]}
      features={[
        { icon: PhoneForwarded, title: "توزيع ذكي (ACD)", desc: "توجيه المكالمات بناءً على مهارات الموظف، لغة العميل، أو أوقات الدوام. ضمان وصول العميل للشخص المناسب من أول مرة." },
        { icon: Clock, title: "ميزة الكول باك (Callback)", desc: "بدل انتظار العميل الطويل على الخط، يعرض النظام خيار 'الاحتفاظ بالدور والاتصال بك لاحقاً'. يقلل التخلي عن المكالمات." },
        { icon: Ear, title: "الهمس والمقاطعة", desc: "المشرف يمكنه الاستماع للمكالمة الحية، الهمس للموظف دون أن يسمعه العميل، أو الدخول في المكالمة (Barge-in) عند الحاجة." },
        { icon: BarChart4, title: "تحليلات حية", desc: "لوحة تحكم حية تعرض عدد المتصلين في الطابور، متوسط وقت الانتظار، وأداء كل موظف لمساعدة المشرفين في اتخاذ قرارات فورية." },
        { icon: PhoneCall, title: "IVR متعدد اللغات", desc: "قوائم رد آلي ذكية توجه العملاء آلياً للاستعلامات البسيطة أو تحولهم للأقسام الصحيحة مع دعم اللغتين العربية والإنجليزية." },
        { icon: Mic2, title: "تسجيل المكالمات وتحليلها", desc: "تسجيل سحابي آمن لجميع المكالمات لأغراض الجودة والتدريب، مع إمكانية البحث المتقدم." },
        { icon: Users, title: "دعم العمل عن بعد", desc: "موظفو الكول سنتر يمكنهم العمل من أي مكان عبر تطبيق NexaLive على الكمبيوتر أو الموبايل بنفس الكفاءة." },
        { icon: Activity, title: "التكامل مع CRM", desc: "ربط مباشر مع نظام إدارة العملاء (مثل Salesforce أو TexaCore CRM) لظهور ملف العميل فور اتصاله." },
      ]}
      scenarios={[
        {
          title: "وقت ذروة وضغط اتصالات",
          problem: "مركز الاتصال يستقبل 500 مكالمة في نفس الوقت، والعملاء يشتكون من طول وقت الانتظار على الخط.",
          solution: "نظام NexaLive يفعّل تلقائياً ميزة الـ Callback. العميل يضغط 1 ليحتفظ بدوره ويغلق الخط. عندما يفرغ موظف، يقوم النظام بالاتصال بالعميل فوراً.",
          result: "انخفاض شكاوى الانتظار بنسبة 80%، وتحسين ملحوظ في تجربة العملاء (CSAT).",
        },
        {
          title: "موظف جديد يواجه عميل غاضب",
          problem: "موظف تحت التدريب يستقبل مكالمة صعبة من عميل غاضب ولا يعرف كيف يحل المشكلة.",
          solution: "المشرف يلاحظ طول المكالمة عبر لوحة التحكم. يدخل المكالمة بوضع 'الهمس' ليوجه الموظف، وعند تفاقم الأمر يستخدم 'المقاطعة' لتهدئة العميل.",
          result: "تم احتواء العميل وحل المشكلة باحترافية، وتم استخدام التسجيل لاحقاً كحالة دراسية.",
        },
      ]}
      usedSystems={[
        { icon: PhoneForwarded, name: "توزيع ذكي ACD", desc: "توجيه المكالمات بذكاء" },
        { icon: Clock, name: "كول باك Callback", desc: "الاتصال التلقائي بالعملاء المنتظرين" },
        { icon: Ear, name: "أدوات المشرفين", desc: "استماع، همس، ومقاطعة" },
        { icon: BarChart4, name: "Analytics Dashboard", desc: "مراقبة حية للأداء" },
      ]}
    />
  );
}

export default function NexaCallCentersPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
