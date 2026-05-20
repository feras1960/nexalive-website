import React from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Factory, Hotel, Heart, Truck, ShieldCheck, HardHat, Siren, Building2, Store, ShoppingCart, Headset, Building, Landmark, Hammer, ArrowRight } from "lucide-react";

const solutions = [
  { icon: Factory, key: "factories", href: "/solutions/factories" },
  { icon: Hotel, key: "hotels", href: "/solutions/hotels" },
  { icon: Heart, key: "hospitals", href: "/solutions/hospitals" },
  { icon: Truck, key: "logistics", href: "/solutions/logistics" },
  { icon: ShieldCheck, key: "security", href: "/solutions/security" },
  { icon: HardHat, key: "construction", href: "/solutions/construction" },
  { icon: Siren, key: "emergency", href: "/solutions/emergency" },
  { icon: Building2, key: "offices", href: "/solutions/offices" },
  { icon: Store, key: "business", href: "/solutions/business" },
  { icon: ShoppingCart, key: "ecommerce", href: "/solutions/ecommerce" },
  { icon: Headset, key: "callcenters", href: "/solutions/callcenters" },
  { icon: Building, key: "government", href: "/solutions/government" },
  { icon: Landmark, key: "banks", href: "/solutions/banks" },
  { icon: ShieldCheck, key: "police", href: "/solutions/police" },
  { icon: Hammer, key: "fieldteams", href: "/solutions/fieldteams" },
];

const NexaUseCases: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  return (
    <section className="py-24 lg:py-32" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="text-[13px] uppercase tracking-[0.08em] font-semibold mb-3 block"
              style={{ color: 'var(--accent-primary)' }}>
              {t("nexa.ui.industry_solutions")}
            </span>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold max-w-[500px]"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {t("nexa.usecases.title")}
            </h2>
          </div>
          <a href="/solutions/"
            className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
            style={{ color: 'var(--accent-primary)' }}>
            {t("nexa.ui.view_all_solutions")}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </a>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <motion.a
                key={sol.key}
                href={sol.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-[20px] p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                }}
              >
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: 'var(--accent-primary)' }} />

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'var(--accent-glow)' }}>
                  <Icon className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {t(`nexa.solutions.${sol.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(`nexa.solutions.${sol.key}.desc`)}
                </p>
                <div className={`flex items-center gap-1 mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                  style={{ color: 'var(--accent-primary)' }}>
                  {t("nexa.ui.learn_more_1")}
                  <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NexaUseCases;
