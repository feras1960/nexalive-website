import React from "react";
import { Server, Network, PhoneForwarded, Shield, Cpu, Activity } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badge="أجهزة Gateways"
      title="بوابات الاتصال الهاتفي للشركات"
      subtitle="اربط شبكة الاتصالات التقليدية (FXS/FXO) وشبكات المحمول (SIM) بنظام NexaLive السحابي بسهولة واستقرار."
      description="توفر بوابات NexaLive (Gateways) جسراً موثوقاً بين البنية التحتية التناظرية القديمة والاتصالات الرقمية الحديثة (VoIP)، مما يتيح لك الاستفادة من ميزات السنترال السحابي مع الحفاظ على خطوطك الحالية."
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Server}
      features={[
        { icon: Network, title: "تحويل سلس (VoIP to Analog)", desc: "ربط الخطوط الأرضية التقليدية (FXO) والهواتف العادية (FXS) بنظام السنترال السحابي." },
        { icon: PhoneForwarded, title: "دعم شرائح المحمول (SIM)", desc: "بوابات GSM/LTE لاستخدام أرقام المحمول في استقبال وإرسال المكالمات عبر السنترال." },
        { icon: Cpu, title: "أداء مستقر وعالي", desc: "معالجات قوية لضمان جودة الصوت العالية وتقليل التأخير في تحويل الصوت (Low Latency)." },
        { icon: Shield, title: "تشفير وأمان", desc: "دعم لبروتوكولات الأمان (SRTP/TLS) لحماية المكالمات من الاختراق والتنصت." },
        { icon: Activity, title: "سهولة الإدارة المركزية", desc: "إعداد وتكوين عن بعد عبر واجهة ويب سهلة مع دعم أنظمة التزويد التلقائي (Auto Provisioning)." },
      ]}
      models={[
        {
          name: "Nexa Gate-FXO-4",
          imageSrc: "",
          description: "بوابة تناظرية بـ 4 منافذ FXO لربط خطوط الهاتف الأرضي.",
          specs: [
            { label: "المنافذ", value: "4 x RJ11 FXO" },
            { label: "الشبكة", value: "2 x 10/100/1000 Mbps" },
            { label: "البروتوكول", value: "SIP (RFC3261)" },
            { label: "الفاكس", value: "T.38 & T.30" },
          ]
        },
        {
          name: "Nexa Gate-FXS-8",
          imageSrc: "",
          description: "بوابة تناظرية بـ 8 منافذ FXS لتوصيل الهواتف التناظرية والفاكس.",
          specs: [
            { label: "المنافذ", value: "8 x RJ11 FXS" },
            { label: "الشبكة", value: "2 x 10/100/1000 Mbps" },
            { label: "المسافة", value: "حتى 3 كيلومتر" },
            { label: "كابل التركيب", value: "Rack mountable 1U" },
          ]
        },
        {
          name: "Nexa Gate-SIM-LTE",
          imageSrc: "",
          description: "بوابة خلوية تدعم 4 شرائح SIM لربط شبكة المحمول بالسنترال.",
          specs: [
            { label: "الشرائح", value: "4 x SIM (4G/LTE)" },
            { label: "نطاق التردد", value: "Global LTE Bands" },
            { label: "الميزات", value: "SMS to Email / USSD" },
            { label: "الشبكة", value: "1 x 10/100 Mbps" },
          ]
        },
        {
          name: "Nexa Gate-PRI (E1/T1)",
          imageSrc: "",
          description: "بوابة رقمية لدعم خطوط PRI عالية السعة للشركات الكبرى.",
          specs: [
            { label: "المنافذ", value: "1 x E1/T1/J1 (حتى 30 مكالمة متزامنة)" },
            { label: "الشبكة", value: "Gigabit Ethernet" },
            { label: "ميزات متقدمة", value: "Echo Cancellation (G.168)" },
            { label: "التوافق", value: "ISDN PRI" },
          ]
        }
      ]}
      compatibility={[
        "متوافق بالكامل مع نظام NexaLive Cloud PBX",
        "دعم بروتوكول SIP القياسي (RFC3261)",
        "دعم كامل للأنظمة المفتوحة المصدر (Asterisk, FreePBX, 3CX)",
        "التشفير المدعوم: TLS / SRTP",
        "ترميزات الصوت (Codecs): G.711, G.722, G.729A/B, OPUS",
        "الفاكس: دعم T.38 لضمان إرسال موثوق"
      ]}
    />
  );
}

export default function NexaGatewaysPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
