import React from "react";
import { Hammer, WifiOff, Mic, MapPin, BatteryMedium, MessageSquare, Phone, CloudRain } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { SolutionDetailPage } from "../NexaSolutionTemplate";

function Content() {
  return (
    <SolutionDetailPage
      badge="الفرق الميدانية والصيانة"
      title="تواصل مستمر أينما كان عملك"
      subtitle="نظام مصمم للعمل في أصعب الظروف: بدون إنترنت، استهلاك منخفض للبطارية، وتنسيق تام بين الإدارة والميدان."
      description="فرق الصيانة، تمديد الشبكات، والعمل الميداني يواجهون تحديات انقطاع التغطية ونفاد البطارية. NexaLive مصمم خصيصاً للتغلب على هذه العقبات عبر شبكة Mesh المحلية، وبروتوكولات نقل صوت تستهلك أقل قدر من البيانات والبطارية."
      gradient="from-orange-500/15 via-yellow-500/10 to-transparent"
      heroIcon={Hammer}
      videoSrc="/videos/solutions/solution-fieldteams.mp4"
      stats={[
        { value: "0", label: "حاجة للإنترنت (عبر Mesh)" },
        { value: "12h+", label: "عمر بطارية ممتد" },
        { value: "Low", label: "استهلاك بيانات" },
        { value: "Live", label: "مشاركة مواقع" },
      ]}
      features={[
        { icon: WifiOff, title: "شبكة Mesh محلية", desc: "في المواقع النائية أو الأقبية، تتصل الأجهزة ببعضها عبر البلوتوث والواي فاي المباشر لنقل الصوت دون الحاجة لبرج اتصالات أو راوتر." },
        { icon: Mic, title: "PTT للفرق", desc: "تواصل فوري بين أعضاء الفريق الميداني بضغطة زر. لا حاجة لطلب أرقام أو انتظار الرد، مثالي أثناء العمل اليدوي." },
        { icon: BatteryMedium, title: "كفاءة طاقة قصوى", desc: "تطبيق مُحسّن لا يستهلك البطارية في الخلفية، لضمان بقاء هواتف الفنيين تعمل طوال وردية العمل الطويلة." },
        { icon: MapPin, title: "مشاركة الموقع الحية", desc: "مدير العمليات يمكنه رؤية مواقع كل الفنيين لتوزيع المهام على أقرب فني لموقع العطل الجديد، وتقليل وقت السفر." },
        { icon: Phone, title: "ربط مع مقسم الشركة", desc: "يمكن للفني الاتصال بالعميل لتأكيد الموعد من خلال تطبيق NexaLive، بحيث يظهر رقم الشركة الرسمي للعميل بدلاً من رقم الفني الشخصي." },
        { icon: MessageSquare, title: "رسائل الصور والمستندات", desc: "إرسال صور للأعطال، طلبات قطع غيار، أو تقارير إنجاز بصيغة PDF فوراً للمشرفين لتوثيق العمل." },
        { icon: CloudRain, title: "دعم الأجهزة المتينة (Rugged)", desc: "يتوافق NexaLive بالكامل مع هواتف العمل الشاقة (Rugged Phones) وأزرار PTT الجانبية للعمل في المطر أو الغبار." },
      ]}
      scenarios={[
        {
          title: "إصلاح عطل في قبو بدون تغطية",
          problem: "فريق صيانة يعمل في قبو لا تصل إليه شبكة الموبايل. يحتاج الفني لتوجيه زميله الموجود في الطابق الأعلى.",
          solution: "نظام NexaLive يتحول تلقائياً لوضع Mesh. الأجهزة تتصل ببعضها مباشرة، ويتمكن الفنيان من التحدث عبر PTT دون أي انقطاع.",
          result: "إنجاز العمل بسرعة وأمان دون الحاجة للصعود والهبوط المتكرر للبحث عن تغطية.",
        },
        {
          title: "توزيع مهام الصيانة المفاجئة",
          problem: "ورد طلب إصلاح عاجل في وسط المدينة. كيف نعرف من هو أقرب فني لإنقاذ الموقف؟",
          solution: "المشرف يفتح الخريطة التفاعلية في نظام Dispatch، يحدد أقرب فني للعنوان، ويرسل له رسالة PTT مباشرة مع تفاصيل المهمة وموقعها.",
          result: "استجابة أسرع للعميل، توفير في الوقود، وتوزيع أكثر ذكاءً لجهد الفريق.",
        },
      ]}
      usedSystems={[
        { icon: WifiOff, name: "Mesh Network", desc: "اتصال دون إنترنت" },
        { icon: Mic, name: "PTT", desc: "تواصل صوتي فوري" },
        { icon: Phone, name: "مقسم الشركة", desc: "إخفاء رقم الفني الشخصي" },
        { icon: MapPin, name: "GPS Tracking", desc: "توجيه ذكي للمهام" },
      ]}
    />
  );
}

export default function NexaFieldTeamsPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
