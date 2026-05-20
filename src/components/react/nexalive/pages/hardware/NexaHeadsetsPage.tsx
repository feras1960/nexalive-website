import React from "react";
import { Headphones, Bluetooth, MicOff, BatteryFull, Activity, MonitorSmartphone } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badgeKey="nexa.hw.hs.badge"
      titleKey="nexa.hw.hs.title"
      subtitleKey="nexa.hw.hs.subtitle"
      descriptionKey="nexa.hw.hs.desc"
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Headphones}
      features={[
        { icon: MicOff, titleKey: "nexa.hw.hs.f1.title", descKey: "nexa.hw.hs.f1.desc" },
        { icon: BatteryFull, titleKey: "nexa.hw.hs.f2.title", descKey: "nexa.hw.hs.f2.desc" },
        { icon: Bluetooth, titleKey: "nexa.hw.hs.f3.title", descKey: "nexa.hw.hs.f3.desc" },
        { icon: Activity, titleKey: "nexa.hw.hs.f4.title", descKey: "nexa.hw.hs.f4.desc" },
        { icon: MonitorSmartphone, titleKey: "nexa.hw.hs.f5.title", descKey: "nexa.hw.hs.f5.desc" },
      ]}
      models={[
        {
          name: "Nexa Head-Pro (USB)",
          imageSrc: "",
          descKey: "nexa.hw.hs.m1.desc",
          specs: [
            { labelKey: "nexa.hw.spec.connection", value: "USB-A / USB-C" },
            { labelKey: "nexa.hw.spec.weight", value: "95g" },
            { labelKey: "nexa.hw.spec.microphone", value: "90% Noise Isolation" },
            { labelKey: "nexa.hw.spec.controls", value: "Inline Controls (Answer/Mute/Volume)" },
          ]
        },
        {
          name: "Nexa Head-Air (Bluetooth)",
          imageSrc: "",
          descKey: "nexa.hw.hs.m2.desc",
          specs: [
            { labelKey: "nexa.hw.spec.connection", value: "Bluetooth 5.0 / USB Dongle" },
            { labelKey: "nexa.hw.spec.battery", value: "18h Talk Time" },
            { labelKey: "nexa.hw.spec.range", value: "Up to 30m" },
            { labelKey: "nexa.hw.spec.features", value: "Built-in Busylight" },
          ]
        },
        {
          name: "Nexa Head-Xtreme (ANC)",
          imageSrc: "",
          descKey: "nexa.hw.hs.m3.desc",
          specs: [
            { labelKey: "nexa.hw.spec.anc", value: "Active Noise Cancellation" },
            { labelKey: "nexa.hw.spec.microphone", value: "4 Smart Microphones" },
            { labelKey: "nexa.hw.spec.connection", value: "Bluetooth 5.2" },
            { labelKey: "nexa.hw.spec.charging", value: "Fast Charge (2h talk in 15min)" },
          ]
        },
        {
          name: "Nexa Ear-Pro (TWS)",
          imageSrc: "",
          descKey: "nexa.hw.hs.m4.desc",
          specs: [
            { labelKey: "nexa.hw.spec.type", value: "True Wireless Stereo (In-Ear)" },
            { labelKey: "nexa.hw.spec.battery", value: "8h (32h with case)" },
            { labelKey: "nexa.hw.spec.waterproof", value: "IP55 Water Resistant" },
            { labelKey: "nexa.hw.spec.controls", value: "Touch Controls" },
          ]
        }
      ]}
      compatibilityKeys={[
        "nexa.hw.hs.c1",
        "nexa.hw.hs.c2",
        "nexa.hw.hs.c3",
        "nexa.hw.hs.c4",
      ]}
    />
  );
}

export default function NexaHeadsetsPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
