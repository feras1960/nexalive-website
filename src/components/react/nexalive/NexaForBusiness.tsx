import React from "react";
import NexaHeader from "./NexaHeader";
import NexaPricing from "./NexaPricing";
import NexaCTA from "./NexaCTA";
import NexaFooter from "./NexaFooter";
import { NexaLiveLanguageProvider } from "./NexaLiveLanguageContext";

const NexaForBusiness: React.FC = () => {
  return (
    <NexaLiveLanguageProvider>
      <NexaHeader />
      
      <main className="pt-32 min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexalive-blue/10 border border-nexalive-blue/20 text-nexalive-blue text-sm font-bold mb-6">
            Enterprise Edition
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Transform Your Workforce
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            NexaLive For Business provides the ultimate control center. Integrate with TexaCore ERP, manage fleets via the Dispatcher Console, and connect legacy radios using our SIP Gateway.
          </p>
        </div>

        <NexaPricing />
        
        <NexaCTA />
      </main>
      
      <NexaFooter />
    </NexaLiveLanguageProvider>
  );
};

export default NexaForBusiness;
