import React from "react";
import { Server, Network, PhoneForwarded, Shield, Cpu, Activity } from "lucide-react";
import { NexaLiveLanguageProvider } from "../../NexaLiveLanguageContext";
import { HardwareDetailPage } from "./NexaHardwareTemplate";

function Content() {
  return (
    <HardwareDetailPage
      badgeKey="nexa.hw.gw.badge"
      titleKey="nexa.hw.gw.title"
      subtitleKey="nexa.hw.gw.subtitle"
      descriptionKey="nexa.hw.gw.desc"
      gradient="from-blue-600/20 via-indigo-600/10 to-transparent"
      heroIcon={Server}
      features={[
        { icon: Network, titleKey: "nexa.hw.gw.f1.title", descKey: "nexa.hw.gw.f1.desc" },
        { icon: PhoneForwarded, titleKey: "nexa.hw.gw.f2.title", descKey: "nexa.hw.gw.f2.desc" },
        { icon: Cpu, titleKey: "nexa.hw.gw.f3.title", descKey: "nexa.hw.gw.f3.desc" },
        { icon: Shield, titleKey: "nexa.hw.gw.f4.title", descKey: "nexa.hw.gw.f4.desc" },
        { icon: Activity, titleKey: "nexa.hw.gw.f5.title", descKey: "nexa.hw.gw.f5.desc" },
      ]}
      models={[
        {
          name: "Nexa Gate-FXO-4",
          imageSrc: "",
          descKey: "nexa.hw.gw.m1.desc",
          specs: [
            { labelKey: "nexa.hw.spec.ports", value: "4 x RJ11 FXO" },
            { labelKey: "nexa.hw.spec.network", value: "2 x 10/100/1000 Mbps" },
            { labelKey: "nexa.hw.spec.protocol", value: "SIP (RFC3261)" },
            { labelKey: "nexa.hw.spec.fax", value: "T.38 & T.30" },
          ]
        },
        {
          name: "Nexa Gate-FXS-8",
          imageSrc: "",
          descKey: "nexa.hw.gw.m2.desc",
          specs: [
            { labelKey: "nexa.hw.spec.ports", value: "8 x RJ11 FXS" },
            { labelKey: "nexa.hw.spec.network", value: "2 x 10/100/1000 Mbps" },
            { labelKey: "nexa.hw.spec.range", value: "Up to 3 km" },
            { labelKey: "nexa.hw.spec.mounting", value: "Rack mountable 1U" },
          ]
        },
        {
          name: "Nexa Gate-SIM-LTE",
          imageSrc: "",
          descKey: "nexa.hw.gw.m3.desc",
          specs: [
            { labelKey: "nexa.hw.spec.sim", value: "4 x SIM (4G/LTE)" },
            { labelKey: "nexa.hw.spec.frequency", value: "Global LTE Bands" },
            { labelKey: "nexa.hw.spec.features", value: "SMS to Email / USSD" },
            { labelKey: "nexa.hw.spec.network", value: "1 x 10/100 Mbps" },
          ]
        },
        {
          name: "Nexa Gate-PRI (E1/T1)",
          imageSrc: "",
          descKey: "nexa.hw.gw.m4.desc",
          specs: [
            { labelKey: "nexa.hw.spec.ports", value: "1 x E1/T1/J1 (30 concurrent calls)" },
            { labelKey: "nexa.hw.spec.network", value: "Gigabit Ethernet" },
            { labelKey: "nexa.hw.spec.features", value: "Echo Cancellation (G.168)" },
            { labelKey: "nexa.hw.spec.compatibility", value: "ISDN PRI" },
          ]
        }
      ]}
      compatibilityKeys={[
        "nexa.hw.gw.c1",
        "nexa.hw.gw.c2",
        "nexa.hw.gw.c3",
        "nexa.hw.gw.c4",
        "nexa.hw.gw.c5",
        "nexa.hw.gw.c6",
      ]}
    />
  );
}

export default function NexaGatewaysPage() {
  return <NexaLiveLanguageProvider><Content /></NexaLiveLanguageProvider>;
}
