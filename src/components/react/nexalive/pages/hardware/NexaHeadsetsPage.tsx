import React from "react";
import { Headphones, Bluetooth, MicOff, BatteryFull, Activity, MonitorSmartphone } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badge="سماعات الرأس (Headsets)"
      title="سماعات احترافية لبيئات العمل"
      subtitle="ارفع إنتاجية فريقك مع سماعات بلوتوث وسلكية مصممة خصيصاً لمراكز الاتصال (Call Centers) وفرق العمل السحابية."
      description="توفر سماعات NexaLive جودة صوت استثنائية مع تقنيات إلغاء الضوضاء المتقدمة، لتضمن تركيز الموظفين التام على المكالمة دون تشتيت من البيئة المحيطة، مع راحة تامة طوال يوم العمل."
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Headphones}
      features={[
        { icon: MicOff, title: "إلغاء الضوضاء النشط (ANC)", desc: "ميكروفونات ذكية تعزل ضجيج المكتب بالكامل لضمان وصول صوتك نقياً للعميل." },
        { icon: BatteryFull, title: "بطارية تدوم طويلاً", desc: "سماعات لاسلكية ببطاريات تكفي لأكثر من 15 ساعة من التحدث المتواصل." },
        { icon: Bluetooth, title: "اتصال لاسلكي متعدد", desc: "تقنية Multipoint للاتصال بالكمبيوتر والهاتف المحمول في نفس الوقت والتبديل بينهما بسلاسة." },
        { icon: Activity, title: "تصميم مريح", desc: "وسائد أذن من الفوم الميموري (Memory Foam) ووزن خفيف لراحة لا مثيل لها حتى مع الاستخدام المكثف." },
        { icon: MonitorSmartphone, title: "توافق شامل", desc: "تعمل بكفاءة مع هواتف IP، الكمبيوترات (USB)، وتطبيق NexaLive للموبايل (Softphone)." },
      ]}
      models={[
        {
          name: "Nexa Head-Pro (USB)",
          imageSrc: "",
          description: "سماعة سلكية مخصصة لموظفي مراكز الاتصال (Call Centers).",
          specs: [
            { label: "التوصيل", value: "USB-A / USB-C" },
            { label: "الوزن", value: "95 جرام فقط" },
            { label: "الميكروفون", value: "عزل ضوضاء محيطية بنسبة 90%" },
            { label: "التحكم", value: "أزرار مدمجة بالكابل (رد/كتم/صوت)" },
          ]
        },
        {
          name: "Nexa Head-Air (Bluetooth)",
          imageSrc: "",
          description: "سماعة لاسلكية بلمسة احترافية للمدراء والموظفين المتنقلين.",
          specs: [
            { label: "التوصيل", value: "Bluetooth 5.0 / USB Dongle" },
            { label: "البطارية", value: "حتى 18 ساعة تحدث" },
            { label: "المدى", value: "حتى 30 متر" },
            { label: "المؤشرات", value: "ضوء انشغال (Busylight) مدمج" },
          ]
        },
        {
          name: "Nexa Head-Xtreme (ANC)",
          imageSrc: "",
          description: "سماعة لاسلكية مزدوجة مع إلغاء ضوضاء نشط للبيئات المفتوحة والصاخبة.",
          specs: [
            { label: "إلغاء الضوضاء", value: "Active Noise Cancellation (ANC)" },
            { label: "الميكروفون", value: "4 ميكروفونات ذكية" },
            { label: "التوصيل", value: "Bluetooth 5.2" },
            { label: "الشحن", value: "دعم الشحن السريع (ساعتين تحدث في 15 دقيقة)" },
          ]
        },
        {
          name: "Nexa Ear-Pro (TWS)",
          imageSrc: "",
          description: "سماعات أذن لاسلكية بالكامل مخصصة للأعمال وللمدراء.",
          specs: [
            { label: "النمط", value: "True Wireless Stereo (داخل الأذن)" },
            { label: "البطارية", value: "حتى 8 ساعات (32 ساعة مع الحافظة)" },
            { label: "المقاومة", value: "مقاومة للماء والتعرق IP55" },
            { label: "التحكم", value: "باللمس عبر السماعة" },
          ]
        }
      ]}
      compatibility={[
        "توافق كامل مع تطبيق NexaLive Softphone (Windows/Mac/iOS/Android)",
        "تعمل بسلاسة مع هواتف NexaLive IP Phones عبر الـ USB أو البلوتوث",
        "معتمدة للاستخدام مع منصات الاجتماعات المرئية (Teams, Zoom, Meet)",
        "دعم بروتوكولات حماية السمع (Acoustic Shock Protection)"
      ]}
    />
  );
}

export default function NexaHeadsetsPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
