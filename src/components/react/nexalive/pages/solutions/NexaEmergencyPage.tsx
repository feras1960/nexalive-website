import React from "react";
import { Siren, Mic, Video, ShieldAlert, Network, MapPin, Users, Radio, Zap, Flame, Activity, Ambulance } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="حلول خدمات الطوارئ"
      title="عندما تنهار البنية التحتية"
      subtitle="نظام اتصال يعمل بدون إنترنت — شبكة Mesh، PTT فوري، وفيديو مباشر لفرق الإنقاذ والدفاع المدني."
      description="في الكوارث والطوارئ، أول ما ينهار هو شبكات الاتصال. NexaLive يوفر شبكة Mesh بين الأجهزة تعمل بدون أي بنية تحتية — لا إنترنت، لا أبراج، لا كهرباء. اتصال PTT مباشر بين فرق الإنقاذ في أصعب الظروف."
      gradient="from-red-600/15 via-orange-500/10 to-transparent"
      heroIcon={Siren}
      videoSrc="/videos/solutions/solution-emergency.mp4"
      stats={[
        { value: "Mesh", label: "يعمل بدون إنترنت" },
        { value: "0ms", label: "زمن تأخير الطوارئ" },
        { value: "GPS", label: "تتبّع فرق الإنقاذ" },
        { value: "24/7", label: "جاهزية كاملة" },
      ]}
      features={[
        { icon: Network, title: "شبكة Mesh طارئة", desc: "اتصال بين أجهزة الفريق بدون أي بنية تحتية. كل جهاز يعمل كنقطة ترحيل. مدى يمتد مع كل جهاز إضافي." },
        { icon: Mic, title: "PTT تكتيكي", desc: "اتصال صوتي فوري بين فرق الإنقاذ. قنوات مخصصة: إطفاء، إسعاف، شرطة، تنسيق. أولوية قصوى للقادة." },
        { icon: Video, title: "بث فيديو من الميدان", desc: "فريق الميدان يبث فيديو مباشر لمركز العمليات. رؤية واقعية للوضع تساعد في اتخاذ القرارات." },
        { icon: MapPin, title: "خريطة الفرق", desc: "GPS يعرض موقع كل فريق إنقاذ على الخريطة. أساسي لتوزيع الفرق وتجنب التكرار." },
        { icon: ShieldAlert, title: "SOS للمصابين", desc: "المدنيون المحاصرون يستطيعون إرسال SOS مع موقعهم عبر التطبيق. يصل لأقرب فريق إنقاذ." },
        { icon: Radio, title: "تكامل مع أجهزة DMR", desc: "ربط مع أجهزة اللاسلكي الموجودة (Motorola, Hytera) عبر بوابة التكامل." },
        { icon: Zap, title: "بطارية طويلة", desc: "وضع توفير الطاقة يمد عمر البطارية لـ 48 ساعة. PTT يعمل حتى مع 5% بطارية." },
        { icon: Activity, title: "مركز عمليات", desc: "لوحة تحكم مركزية تعرض: مواقع الفرق، حالة الاتصال، تسجيلات المكالمات، وتقارير الحوادث." },
        { icon: Users, title: "تنسيق الجهات", desc: "قنوات مشتركة بين الدفاع المدني والشرطة والإسعاف. تنسيق موحّد بدلاً من فوضى الاتصالات." },
      ]}
      scenarios={[
        {
          title: "زلزال يقطع جميع الاتصالات",
          problem: "زلزال يدمر أبراج الاتصالات والكهرباء. فرق الإنقاذ لا تستطيع التنسيق. كل فريق يعمل منفرداً.",
          solution: "أجهزة NexaLive تنشئ شبكة Mesh تلقائياً. كل جهاز يتصل بالأقرب. PTT فوري بين الفرق بدون أي بنية تحتية. GPS يعرض مواقع المحاصرين.",
          result: "تنسيق 15 فريق إنقاذ خلال 10 دقائق. إنقاذ 120 شخص في أول 3 ساعات. شبكة Mesh تغطي منطقة 2 كم².",
        },
        {
          title: "حريق في مبنى تجاري",
          problem: "حريق كبير في مبنى من 10 طوابق. فرق الإطفاء داخل المبنى لا تستطيع التواصل مع الخارج بسبب سمك الجدران.",
          solution: "Mesh يعمل بين أجهزة رجال الإطفاء داخل المبنى ويرتبط بالفرق الخارجية. Video PTT من داخل الحريق. تتبّع GPS لكل رجل إطفاء.",
          result: "تنسيق مثالي بين الداخل والخارج. إخلاء 500 شخص بسلام. التحكم بالحريق خلال ساعة.",
        },
        {
          title: "فيضان يعزل منطقة سكنية",
          problem: "فيضان يعزل حي سكني. سكان محاصرون يطلبون النجدة. لا يوجد اتصال خلوي.",
          solution: "توزيع أجهزة NexaLive على المتطوعين. شبكة Mesh تربط الحي المعزول بمركز العمليات. السكان يرسلون SOS مع مواقعهم.",
          result: "إنقاذ 80 عائلة في يوم واحد. خريطة حية لمواقع المحتاجين. تنسيق توزيع الإغاثة.",
        },
      ]}
      usedSystems={[
        { icon: Network, name: "شبكة Mesh", desc: "اتصال بدون بنية تحتية يعمل في أي ظرف" },
        { icon: Mic, name: "PTT تكتيكي", desc: "اتصال فوري بين فرق الإنقاذ" },
        { icon: Video, name: "فيديو الميدان", desc: "بث مباشر من مواقع الكوارث" },
        { icon: MapPin, name: "خريطة حية", desc: "تتبّع فرق الإنقاذ والمحاصرين" },
        { icon: ShieldAlert, name: "SOS مدني", desc: "نداء استغاثة للمدنيين المحاصرين" },
        { icon: Activity, name: "مركز عمليات", desc: "لوحة تحكم مركزية لإدارة الكارثة" },
      ]}
    />
  );
}

export default function NexaEmergencyPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
