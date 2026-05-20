import React from "react";
import { Phone, PhoneCall, Video, Wifi, Bluetooth, Contact } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badge="أجهزة IP Phones"
      title="هواتف مكتبية احترافية"
      subtitle="هواتف IP متطورة للمكاتب الحديثة، تجمع بين نقاء الصوت العالي، واجهة الاستخدام السهلة، والاتصال الآمن بشبكة NexaLive."
      description="صُممت تشكيلة الهواتف المكتبية من NexaLive لتلبي احتياجات جميع مستويات الأعمال؛ من هواتف الاستقبال الأساسية إلى هواتف الإدارة العليا المزودة بشاشات لمس وكاميرات فيديو، لضمان تواصل احترافي بلا انقطاع."
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Phone}
      features={[
        { icon: PhoneCall, title: "صوت HD فائق الوضوح", desc: "تقنيات صوت عالي الدقة (HD Voice) لضمان جودة مكالمات خالية من التشويش أو الصدى." },
        { icon: Wifi, title: "اتصال لاسلكي وسلكي", desc: "خيارات هواتف تدعم شبكات Wi-Fi مزدوجة النطاق (2.4G/5G) أو كابلات إيثرنت (Gigabit)." },
        { icon: Video, title: "مكالمات فيديو", desc: "موديلات متقدمة مزودة بكاميرات مدمجة لعقد اجتماعات مرئية مباشرة من مكتبك." },
        { icon: Bluetooth, title: "دعم البلوتوث", desc: "اربط سماعاتك اللاسلكية بسهولة واستمتع بحرية الحركة أثناء المكالمات الطويلة." },
        { icon: Contact, title: "شاشات تفاعلية", desc: "شاشات ملونة تعمل باللمس لتسهيل تصفح جهات الاتصال وإدارة المكالمات ومراقبة الخطوط (BLF)." },
      ]}
      models={[
        {
          name: "Nexa Phone-Basic (X1)",
          imageSrc: "",
          description: "هاتف مكتبي أساسي مثالي لمراكز الاتصال ومكاتب الموظفين.",
          specs: [
            { label: "الخطوط", value: "2 خطوط SIP" },
            { label: "الشاشة", value: "شاشة LCD أبيض وأسود" },
            { label: "الصوت", value: "HD Voice" },
            { label: "الشبكة", value: "2 x 10/100 Mbps (PoE)" },
          ]
        },
        {
          name: "Nexa Phone-Pro (X3)",
          imageSrc: "",
          description: "هاتف احترافي للمدراء مع مفاتيح اختصار متعددة (BLF).",
          specs: [
            { label: "الخطوط", value: "4 خطوط SIP" },
            { label: "الشاشة", value: "شاشة ملونة 2.8 بوصة" },
            { label: "التوصيل", value: "Gigabit Ethernet (PoE)" },
            { label: "مفاتيح", value: "12 مفتاح BLF مبرمج" },
          ]
        },
        {
          name: "Nexa Phone-Video (XV5)",
          imageSrc: "",
          description: "هاتف فيديو أندرويد للإدارة العليا والاجتماعات المرئية.",
          specs: [
            { label: "الشاشة", value: "شاشة لمس 7 بوصة" },
            { label: "الكاميرا", value: "2 Mega-pixel (قابلة للإغلاق)" },
            { label: "النظام", value: "Android 9.0" },
            { label: "الاتصال", value: "Wi-Fi & Bluetooth مدمج" },
          ]
        },
        {
          name: "Nexa Phone-DECT (W1)",
          imageSrc: "",
          description: "هاتف لاسلكي DECT لحرية الحركة داخل المكاتب والمستودعات.",
          specs: [
            { label: "المدى", value: "50 متر داخلي / 300 متر خارجي" },
            { label: "البطارية", value: "حتى 18 ساعة تحدث" },
            { label: "السماعات", value: "دعم حتى 8 سماعات للقاعدة" },
            { label: "الشاشة", value: "شاشة ملونة 1.8 بوصة" },
          ]
        }
      ]}
      compatibility={[
        "تكوين تلقائي (Auto Provisioning) عبر NexaLive Cloud",
        "دعم كامل لبروتوكول SIP القياسي (RFC3261)",
        "دعم OPUS Codec لجودة صوت عالية في أسوأ ظروف الشبكة",
        "تشفير TLS و SRTP لمكالمات آمنة تماماً",
        "دعم سماعات الرأس (RJ9 / Bluetooth / EHS)",
        "توافق مع دليل الهاتف المركزي (LDAP / XML)"
      ]}
    />
  );
}

export default function NexaIPPhonesPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
