import React from "react";
import { Phone, PhoneCall, Video, Wifi, Bluetooth, Contact } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badgeKey="nexa.hw.phones.badge"
      titleKey="nexa.hw.phones.title"
      subtitleKey="nexa.hw.phones.subtitle"
      descriptionKey="nexa.hw.phones.desc"
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Phone}
      features={[
        { icon: PhoneCall, titleKey: "nexa.hw.phones.f1.title", descKey: "nexa.hw.phones.f1.desc" },
        { icon: Wifi, titleKey: "nexa.hw.phones.f2.title", descKey: "nexa.hw.phones.f2.desc" },
        { icon: Video, titleKey: "nexa.hw.phones.f3.title", descKey: "nexa.hw.phones.f3.desc" },
        { icon: Bluetooth, titleKey: "nexa.hw.phones.f4.title", descKey: "nexa.hw.phones.f4.desc" },
        { icon: Contact, titleKey: "nexa.hw.phones.f5.title", descKey: "nexa.hw.phones.f5.desc" },
      ]}
      models={[
        {
          name: "Nexa Phone-Basic (X1)",
          imageSrc: "",
          descKey: "nexa.hw.phones.m1.desc",
          specs: [
            { labelKey: "nexa.hw.spec.lines", value: "2 SIP Lines" },
            { labelKey: "nexa.hw.spec.screen", value: "B&W LCD" },
            { labelKey: "nexa.hw.spec.audio", value: "HD Voice" },
            { labelKey: "nexa.hw.spec.network", value: "2 x 10/100 Mbps (PoE)" },
          ]
        },
        {
          name: "Nexa Phone-Pro (X3)",
          imageSrc: "",
          descKey: "nexa.hw.phones.m2.desc",
          specs: [
            { labelKey: "nexa.hw.spec.lines", value: "4 SIP Lines" },
            { labelKey: "nexa.hw.spec.screen", value: "2.8\" Color" },
            { labelKey: "nexa.hw.spec.connection", value: "Gigabit Ethernet (PoE)" },
            { labelKey: "nexa.hw.spec.keys", value: "12 BLF Keys" },
          ]
        },
        {
          name: "Nexa Phone-Video (XV5)",
          imageSrc: "",
          descKey: "nexa.hw.phones.m3.desc",
          specs: [
            { labelKey: "nexa.hw.spec.screen", value: "7\" Touch" },
            { labelKey: "nexa.hw.spec.camera", value: "2MP (Privacy Shutter)" },
            { labelKey: "nexa.hw.spec.os", value: "Android 9.0" },
            { labelKey: "nexa.hw.spec.connection", value: "Wi-Fi & Bluetooth" },
          ]
        },
        {
          name: "Nexa Phone-DECT (W1)",
          imageSrc: "",
          descKey: "nexa.hw.phones.m4.desc",
          specs: [
            { labelKey: "nexa.hw.spec.range", value: "50m Indoor / 300m Outdoor" },
            { labelKey: "nexa.hw.spec.battery", value: "18h Talk Time" },
            { labelKey: "nexa.hw.spec.handsets", value: "Up to 8 per Base" },
            { labelKey: "nexa.hw.spec.screen", value: "1.8\" Color" },
          ]
        }
      ]}
      compatibilityKeys={[
        "nexa.hw.phones.c1",
        "nexa.hw.phones.c2",
        "nexa.hw.phones.c3",
        "nexa.hw.phones.c4",
        "nexa.hw.phones.c5",
        "nexa.hw.phones.c6",
      ]}
    />
  );
}

export default function NexaIPPhonesPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
