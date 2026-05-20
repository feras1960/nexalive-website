import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield } from "lucide-react";
import { useNexaLanguage } from "./NexaLiveLanguageContext";

const COOKIE_CONSENT_KEY = "nexalive_cookie_consent";

const NexaCookieConsent: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl
              bg-white/10 dark:bg-white/5
              backdrop-blur-2xl
              border border-white/20 dark:border-white/10
              shadow-[0_8px_40px_rgba(0,0,0,0.3)]
              p-5 sm:p-6
            ">
              {/* Subtle gradient glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00C47A]/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Cookie className="w-6 h-6 text-amber-400" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-base mb-1">
                    {t("nexa.cookies.banner.title")}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t("nexa.cookies.banner.desc")}{" "}
                    <a href="/cookies" className="text-[#00C47A] hover:underline inline-flex items-center gap-1">
                      {t("nexa.cookies.banner.learnMore")}
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={decline}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 
                      bg-white/5 border border-white/10 
                      hover:bg-white/10 hover:text-white transition-all"
                  >
                    {t("nexa.cookies.banner.decline")}
                  </button>
                  <button
                    onClick={accept}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold text-white 
                      bg-[#00C47A] hover:bg-[#00D68A]
                      shadow-[0_4px_15px_rgba(0,196,122,0.3)]
                      transition-all hover:shadow-[0_4px_20px_rgba(0,196,122,0.4)]"
                  >
                    {t("nexa.cookies.banner.accept")}
                  </button>
                </div>

                {/* Close button */}
                <button
                  onClick={decline}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NexaCookieConsent;
