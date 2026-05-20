import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNexaLanguage } from "./NexaLiveLanguageContext";
import { Mic, Lock, WifiOff, BarChart3, LayoutDashboard, Globe } from "lucide-react";

// ═══ Animated counter hook ═══
function useCountOnView(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    const fmt = new Intl.NumberFormat();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = "+" + fmt.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return ref;
}

// ═══ Individual Bento Cards ═══

function VoiceCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  return (
    <div className="group relative col-span-2 row-span-1 rounded-[20px] overflow-hidden p-8 h-[260px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ background: 'var(--bg-dark-section)', color: 'var(--text-on-dark)' }}>
      {/* Audio waveform visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] opacity-20">
        <svg viewBox="0 0 400 100" className="w-full h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <rect key={i} x={i * 10 + 2} y={50 - Math.random() * 40} width="6" height={Math.random() * 80 + 10}
              rx="3" fill="var(--accent-primary)" opacity={0.3 + Math.random() * 0.5}>
              <animate attributeName="height" values={`${Math.random()*40+10};${Math.random()*80+10};${Math.random()*40+10}`}
                dur={`${1 + Math.random()}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </svg>
      </div>
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4"
          style={{ background: 'rgba(0,196,122,0.15)', color: 'var(--accent-primary)' }}>
          HD Audio
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>
          {t("nexa.ui.crystal_clear_voice")}
        </h3>
        <p className="text-white/50 text-sm max-w-[360px] leading-relaxed">
          {t("nexa.ui.nexavoice_codec_delivers_excep")}
        </p>
      </div>
      <Mic className="w-6 h-6 text-white/20 self-end" />
    </div>
  );
}

function SecurityCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  return (
    <div className="group rounded-[20px] p-8 flex flex-col justify-between h-[260px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--gradient-card)', borderColor: 'var(--border-card)' }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'var(--accent-glow)' }}>
        <Lock className="w-7 h-7" style={{ color: 'var(--accent-primary)' }} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {t("nexa.ui.secure_by_design")}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t("nexa.ui.256_bit_aes_end_to_end_encrypt")}
        </p>
      </div>
    </div>
  );
}

function OfflineCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  return (
    <div className="group rounded-[20px] p-8 flex flex-col justify-between h-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--accent-primary)', color: 'white' }}>
      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
        <WifiOff className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
          {t("nexa.ui.works_offline")}
        </h3>
        <p className="text-sm leading-relaxed text-white/70">
          {t("nexa.ui.full_functionality_zero_intern")}
        </p>
      </div>
    </div>
  );
}

function CounterCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  const countRef = useCountOnView(50000);
  return (
    <div className="group rounded-[20px] p-8 flex flex-col justify-center items-center h-[220px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--gradient-card)', borderColor: 'var(--border-card)' }}>
      <span ref={countRef} className="text-[clamp(36px,5vw,52px)] font-extrabold font-mono"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
        +0
      </span>
      <span className="text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
        {t("nexa.ui.conversations_today")}
      </span>
    </div>
  );
}

function DashboardCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  return (
    <div className="group col-span-2 rounded-[20px] p-8 border h-[220px] flex items-center gap-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--gradient-card)', borderColor: 'var(--border-card)' }}>
      {/* Mock dashboard */}
      <div className="flex-1 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-light)' }}>
        <div className="p-3 flex items-center gap-2" style={{ background: 'var(--bg-dark-section)' }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-white/40 text-[10px] font-mono mx-auto">admin.nexalive.ai</span>
        </div>
        <div className="p-4 grid grid-cols-3 gap-2" style={{ background: 'var(--bg-secondary)' }}>
          {[32, 67, 45, 89, 23, 56].map((v, i) => (
            <div key={i} className="rounded-lg p-2 flex flex-col" style={{ background: 'var(--bg-card)' }}>
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Ch {i + 1}</span>
              <div className="w-full h-1.5 rounded-full mt-1" style={{ background: 'var(--border-light)' }}>
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: 'var(--accent-primary)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <LayoutDashboard className="w-6 h-6 mb-3" style={{ color: 'var(--accent-primary)' }} />
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {t("nexa.ui.one_dashboard")}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t("nexa.ui.manage_your_entire_organizatio")}
        </p>
      </div>
    </div>
  );
}

function LatencyCard({ isRTL }: { isRTL: boolean }) {
  const { t } = useNexaLanguage();
  return (
    <div className="group rounded-[20px] p-8 flex flex-col justify-between h-[220px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--gradient-card)', borderColor: 'var(--border-card)' }}>
      <Globe className="w-6 h-6 mb-3" style={{ color: 'var(--text-muted)' }} />
      <div>
        <span className="text-3xl font-extrabold font-mono" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
          &lt;100ms
        </span>
        <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
          {t("nexa.ui.response_time_7_regions")}
        </p>
      </div>
    </div>
  );
}

// ═══ Main Bento Grid ═══

const NexaBentoGrid: React.FC = () => {
  const { t, isRTL } = useNexaLanguage();

  return (
    <section className="py-24 lg:py-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-[clamp(28px,5vw,52px)] font-bold max-w-[600px]"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {t("nexa.ui.everything_your_team_needs_to")}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: Voice (2 cols) + Security (1 col) */}
          <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
            <VoiceCard isRTL={isRTL} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <SecurityCard isRTL={isRTL} />
          </motion.div>

          {/* Row 2: Latency + Counter + Offline — all same height */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <LatencyCard isRTL={isRTL} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <CounterCard isRTL={isRTL} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <OfflineCard isRTL={isRTL} />
          </motion.div>

          {/* Row 3: Dashboard (2 cols) */}
          <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <DashboardCard isRTL={isRTL} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NexaBentoGrid;
