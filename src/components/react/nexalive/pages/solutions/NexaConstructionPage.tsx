import React from "react";
import { HardHat, Mic, Video, ShieldAlert, Network, MapPin, Users, Ruler, AlertTriangle, Megaphone, Clock, Wifi } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="حلول البناء والتشييد"
      title="تواصل آمن في مواقع البناء"
      subtitle="اتصال فوري يعمل في البيئات الصاخبة وتحت الأرض — PTT، فيديو، وطوارئ SOS لسلامة العمال."
      description="مواقع البناء بيئات خطرة بالطبيعة: ضوضاء عالية، مساحات شاسعة، مناطق تحت الأرض. NexaLive يوفر اتصال PTT يعمل مع سماعات مقاومة للضوضاء، شبكة Mesh للأنفاق والأقبية، ونظام SOS يحمي كل عامل."
      gradient="from-amber-500/15 via-orange-500/10 to-transparent"
      heroIcon={HardHat}
      videoSrc="/videos/solutions/solution-construction.mp4"
      stats={[
        { value: "60%", label: "تقليل حوادث السلامة" },
        { value: "Mesh", label: "تغطية بدون إنترنت" },
        { value: "30%", label: "تحسين إنتاجية الموقع" },
        { value: "SOS", label: "حماية فورية لكل عامل" },
      ]}
      features={[
        { icon: Mic, title: "PTT في الضوضاء", desc: "اتصال صوتي بإلغاء ضوضاء متقدم يعمل بجانب الخلاطات والحفارات. سماعات بلوتوث صناعية متوافقة مع خوذات السلامة." },
        { icon: Network, title: "Mesh تحت الأرض", desc: "شبكة Mesh بين الأجهزة تضمن الاتصال في الأنفاق والحفريات والطوابق السفلية حيث لا توجد إشارة." },
        { icon: Video, title: "فيديو لتوثيق التقدم", desc: "بث فيديو مباشر من الموقع للمهندس أو العميل. توثيق مراحل البناء ومشاركة الملاحظات الفنية." },
        { icon: ShieldAlert, title: "طوارئ الموقع", desc: "زر SOS لحالات السقوط أو الانهيار. تنبيه فوري لفريق السلامة مع الموقع الدقيق داخل الموقع." },
        { icon: AlertTriangle, title: "تحذيرات السلامة", desc: "بث تحذيرات صوتية لجميع العمال: تفجيرات قادمة، مناطق خطرة، تغيير أحوال الطقس." },
        { icon: Users, title: "Lone Worker للحفريات", desc: "حماية العمال في المناطق المعزولة والعميقة. فحص دوري وSOS تلقائي." },
        { icon: Megaphone, title: "إعلانات الموقع", desc: "بث صوتي للموقع بالكامل: بداية ونهاية الدوام، تعليمات السلامة، إعلانات الإدارة." },
        { icon: Ruler, title: "تنسيق المقاولين", desc: "قنوات منفصلة لكل مقاول فرعي مع قناة تنسيق مشتركة. تجنب التعارضات في الجدول." },
        { icon: MapPin, title: "تتبّع العمال", desc: "GPS لمعرفة موقع كل عامل في الموقع. أساسي في حالات الإخلاء الطارئ." },
      ]}
      scenarios={[
        {
          title: "سقوط عامل في حفرة عميقة",
          problem: "عامل يسقط في حفرة أساسات عمقها 5 أمتار. لا أحد يراه ولا تصل إشارة الهاتف.",
          solution: "زر SOS يُفعّل تلقائياً عند اكتشاف سقوط حر. شبكة Mesh ترسل التنبيه حتى بدون إنترنت. الموقع الدقيق يصل لفريق السلامة.",
          result: "فريق الإنقاذ يصل خلال 3 دقائق. العامل يحصل على إسعافات أولية فورية. التقرير موثّق للجهات المختصة.",
        },
        {
          title: "تنسيق صب خرسانة مع 5 فرق",
          problem: "عملية صب خرسانة كبيرة تحتاج تنسيق بين 5 فرق: الخلاطات، الضخ، التسوية، الفحص، والنقل. أي تأخير يُفسد الصبة.",
          solution: "قناة PTT مشتركة لعملية الصب. كل فريق يبلّغ عن جاهزيته. المهندس يوجّه التسلسل صوتياً. Video PTT لمتابعة الجودة.",
          result: "صب 200 متر مكعب بدون خلل. تنسيق مثالي بين الفرق. توفير ساعتين من وقت العمل.",
        },
        {
          title: "إخلاء طارئ بسبب عاصفة",
          problem: "تحذير من عاصفة رملية تقترب. يجب إخلاء 200 عامل من موقع مفتوح خلال دقائق.",
          solution: "بث طوارئ لجميع القنوات: 'إخلاء فوري'. GPS يعرض موقع كل عامل. المشرفون يؤكدون إخلاء مناطقهم صوتياً.",
          result: "إخلاء كامل خلال 8 دقائق. لا إصابات. كل عامل محسوب ومتابع.",
        },
      ]}
      usedSystems={[
        { icon: Mic, name: "PTT صناعي", desc: "اتصال بإلغاء ضوضاء في بيئات البناء" },
        { icon: Network, name: "شبكة Mesh", desc: "تغطية الأنفاق والحفريات والطوابق السفلية" },
        { icon: ShieldAlert, name: "SOS + كشف السقوط", desc: "إنذار تلقائي عند السقوط أو عدم الاستجابة" },
        { icon: Video, name: "فيديو توثيقي", desc: "بث مباشر لتوثيق التقدم والجودة" },
        { icon: MapPin, name: "تتبّع GPS", desc: "موقع كل عامل للسلامة والإخلاء" },
        { icon: Megaphone, name: "إعلانات الموقع", desc: "بث صوتي لجميع العمال في الموقع" },
      ]}
    />
  );
}

export default function NexaConstructionPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
