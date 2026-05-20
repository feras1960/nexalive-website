import React from "react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Smartphone, Monitor } from "lucide-react";

const NexaDownload: React.FC = () => {
  const { t } = useNexaLanguage();

  return (
    <section id="download" className="py-24 relative overflow-hidden dark:bg-gradient-to-b dark:from-nexa-deep-dark dark:to-black bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold dark:text-white text-gray-900 mb-6">
            {t("nexa.download.title")}
          </h2>
          <p className="text-xl dark:text-gray-400 text-gray-600">
            {t("nexa.download.subtitle")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          
          {/* Mobile Downloads */}
          <div className="flex-1 dark:bg-white/5 bg-white dark:border-white/10 border-gray-200 border rounded-3xl p-8 md:p-12 w-full max-w-md text-center dark:hover:bg-white/10 hover:bg-gray-50 transition-colors relative overflow-hidden group shadow-sm">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-nexa-primary/20 rounded-full blur-[50px] group-hover:bg-nexa-primary/30 transition-colors"></div>
            <Smartphone className="w-16 h-16 text-nexa-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-8">Mobile App</h3>
            
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.65.05 3.16.65 4.1 1.8-3.41 2.05-2.84 6.78.36 8.16-.7 1.77-1.54 3.52-2.67 5.2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {t("nexa.download.appstore")}
              </a>
              <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 22.035V1.965C3 1.155 3.882.656 4.568 1.082l16.143 10.035c.62.386.62 1.38 0 1.766L4.568 22.918C3.882 23.344 3 22.845 3 22.035z"/>
                </svg>
                {t("nexa.download.playstore")}
              </a>
            </div>
          </div>

          {/* Desktop Downloads */}
          <div className="flex-1 dark:bg-white/5 bg-white dark:border-white/10 border-gray-200 border rounded-3xl p-8 md:p-12 w-full max-w-md text-center dark:hover:bg-white/10 hover:bg-gray-50 transition-colors relative overflow-hidden group shadow-sm">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] group-hover:bg-blue-500/30 transition-colors"></div>
            <Monitor className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-8">Desktop App</h3>
            
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#0078D7] text-white font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,120,215,0.4)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
                {t("nexa.download.windows")}
              </a>
              <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl dark:border-white border-gray-300 border-2 dark:text-white text-gray-900 font-bold dark:hover:bg-white dark:hover:text-black hover:bg-gray-900 hover:text-white transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.65.05 3.16.65 4.1 1.8-3.41 2.05-2.84 6.78.36 8.16-.7 1.77-1.54 3.52-2.67 5.2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {t("nexa.download.mac")}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NexaDownload;
