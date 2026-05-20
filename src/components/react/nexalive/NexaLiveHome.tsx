import React from "react";
import { NexaLiveLanguageProvider, useNexaLanguage } from "./NexaLiveLanguageContext";
import NexaHeader from "./NexaHeader";
import NexaHero from "./NexaHero";
import NexaCinematicShowcase from "./NexaCinematicShowcase";
import NexaBentoGrid from "./NexaBentoGrid";
import NexaFeatureSection from "./NexaFeatureSection";
import NexaFeatureTabs from "./NexaFeatureTabs";
import NexaFreePlan from "./NexaFreePlan";
import NexaComparison from "./NexaComparison";
import NexaPricing from "./NexaPricing";
import NexaDownload from "./NexaDownload";
import NexaSecurity from "./NexaSecurity";
import NexaDiagonalSolutions from "./NexaDiagonalSolutions";
import NexaCTA from "./NexaCTA";
import NexaFooter from "./NexaFooter";
import { Mic, Video, ShieldAlert, Activity, Globe, Smartphone, PlaySquare, Eye, MapPin, UserX, FileText, BrainCircuit, Network, Phone, PhoneForwarded, Radio, Headphones } from "lucide-react";

const NexaLiveHomeContent: React.FC = () => {
  const { t, dir } = useNexaLanguage();

  return (
    <div dir={dir} className="min-h-screen overflow-hidden transition-colors"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <NexaHeader />
      
      <main>
        {/* [1] Cinematic Feature Showcase — Now serving as the dynamic video Hero */}
        <NexaCinematicShowcase />

        {/* [2] Solutions by Industry — Interactive Diagonal Video Showcase */}
        <NexaDiagonalSolutions />

        {/* [3] Hero — Ajax-style two-column layout (Hidden, replaced by Cinematic Showcase)
        <NexaHero />
        */}

        {/* [4] Bento Grid — Ajax-style mixed-size cards */}
        <NexaBentoGrid />
        
        {/* [5a] Cloud PBX — Core Feature */}
        <NexaFeatureSection
          id="feature-pbx"
          title={t("nexa.feat.pbx.title")}
          description={t("nexa.feat.pbx.desc")}
          icon={Phone}
          animationType="cloud-pbx"
          imageAlt="NexaLive Cloud PBX"
          badge={t("nexa.feat.pbx.badge")}
          glowColor="purple"
          features={[
            { icon: PhoneForwarded, title: t("nexa.feat.pbx.1.title"), description: t("nexa.feat.pbx.1.desc") },
            { icon: Radio, title: t("nexa.feat.pbx.2.title"), description: t("nexa.feat.pbx.2.desc") },
            { icon: Headphones, title: t("nexa.feat.pbx.3.title"), description: t("nexa.feat.pbx.3.desc") },
            { icon: Network, title: t("nexa.feat.pbx.4.title"), description: t("nexa.feat.pbx.4.desc") },
          ]}
        />

        {/* [5b] Feature Deep-Dives — PTT */}
        <NexaFeatureSection
          id="feature-ptt"
          title={t("nexa.feat.ptt.title")}
          description={t("nexa.feat.ptt.desc")}
          icon={Mic}
          animationType="ptt-button"
          imageAlt="NexaLive Push-to-Talk Interface"
          badge={t("nexa.feat.ptt.badge")}
          glowColor="blue"
          isReversed={true}
          features={[
            { icon: Globe, title: t("nexa.feat.ptt.1.title"), description: t("nexa.feat.ptt.1.desc") },
            { icon: Smartphone, title: t("nexa.feat.ptt.2.title"), description: t("nexa.feat.ptt.2.desc") },
            { icon: PlaySquare, title: t("nexa.feat.ptt.3.title"), description: t("nexa.feat.ptt.3.desc") },
            { icon: Network, title: t("nexa.feat.ptt.4.title"), description: t("nexa.feat.ptt.4.desc") }
          ]}
        />

        <NexaFeatureSection
          id="feature-video"
          title={t("nexa.feat.video.title")}
          description={t("nexa.feat.video.desc")}
          icon={Video}
          videoSrc="/videos/feature-ptt-person.mp4"
          imageAlt="NexaLive Video PTT Interface"
          badge={t("nexa.feat.video.badge")}
          glowColor="cyan"
          isReversed={true}
          features={[
            { icon: Activity, title: t("nexa.feat.video.1.title"), description: t("nexa.feat.video.1.desc") },
            { icon: Eye, title: t("nexa.feat.video.2.title"), description: t("nexa.feat.video.2.desc") }
          ]}
        />

        <NexaFeatureSection
          id="feature-sos"
          title={t("nexa.feat.sos.title")}
          description={t("nexa.feat.sos.desc")}
          icon={ShieldAlert}
          animationType="sos-pulse"
          imageAlt="NexaLive Emergency SOS Interface"
          badge={t("nexa.feat.sos.badge")}
          glowColor="sos"
          features={[
            { icon: MapPin, title: t("nexa.feat.sos.1.title"), description: t("nexa.feat.sos.1.desc") },
            { icon: UserX, title: t("nexa.feat.sos.2.title"), description: t("nexa.feat.sos.2.desc") }
          ]}
        />

        <NexaFeatureSection
          id="feature-ai"
          title={t("nexa.feat.ai.title")}
          description={t("nexa.feat.ai.desc")}
          icon={Activity}
          animationType="ai-waves"
          imageAlt="NexaLive AI Analytics Interface"
          badge={t("nexa.feat.ai.badge")}
          glowColor="success"
          isReversed={true}
          features={[
            { icon: FileText, title: t("nexa.feat.ai.1.title"), description: t("nexa.feat.ai.1.desc") },
            { icon: BrainCircuit, title: t("nexa.feat.ai.2.title"), description: t("nexa.feat.ai.2.desc") }
          ]}
        />

        {/* [6] Product Showcase — tabs (dark section) */}
        <NexaFeatureTabs />
        
        {/* [7] Free Plan */}
        <NexaFreePlan />

        {/* [7] How It Works */}
        <NexaComparison />

        {/* [8] Pricing */}
        <NexaPricing />

        {/* [9] Download CTA */}
        <NexaDownload />

        {/* [10] Security */}
        <NexaSecurity />

        {/* [11] Final CTA */}
        <NexaCTA />

      </main>
      
      <NexaFooter />
    </div>
  );
};

const NexaLiveHome: React.FC = () => {
  return (
    <NexaLiveLanguageProvider>
      <NexaLiveHomeContent />
    </NexaLiveLanguageProvider>
  );
};

export default NexaLiveHome;
