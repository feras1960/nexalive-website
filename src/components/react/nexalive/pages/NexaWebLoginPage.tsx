import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexaLiveLanguageProvider, useNexaLanguage } from "../NexaLiveLanguageContext";
import NexaHeader from "../NexaHeader";
import NexaFooter from "../NexaFooter";
import {
  Smartphone,
  QrCode,
  Shield,
  Zap,
  Monitor,
  RefreshCw,
  CheckCircle2,
  Lock,
  MessageSquare,
  Phone,
  Video,
  Mic,
  Globe,
  Network,
  Search,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  Users,
  Radio,
  Settings,
  LogOut,
  Image as ImageIcon,
  PhoneCall,
  VideoIcon,
  Check,
  CheckCheck,
  Star,
  Pin,
  Bell,
  BellOff,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   QR Code Generator
   ═══════════════════════════════════════════════════ */
const generateQRMatrix = (seed: number): boolean[][] => {
  const size = 33;
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  const drawFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[row + r][col + c] = isOuter || isInner;
      }
  };
  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }
  let s = seed;
  const nextRand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s; };
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      if ((r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9)) continue;
      if (r === 6 || c === 6) continue;
      matrix[r][c] = nextRand() % 3 !== 0;
    }
  return matrix;
};

const QRCodeSVG: React.FC<{ seed: number; size: number }> = ({ seed, size }) => {
  const matrix = generateQRMatrix(seed);
  const cellSize = size / 33;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-xl">
      <rect width={size} height={size} fill="white" rx="12" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell && (
            <rect key={`${r}-${c}`} x={c * cellSize + 1} y={r * cellSize + 1}
              width={cellSize - 0.5} height={cellSize - 0.5} rx={cellSize * 0.15} fill="#0f172a" />
          )
        )
      )}
      <rect x={size / 2 - 24} y={size / 2 - 24} width={48} height={48} rx={12} fill="#0d9488" />
      <text x={size / 2} y={size / 2 + 6} textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui">N</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════
   Chat App Mock Data
   ═══════════════════════════════════════════════════ */
const contacts = [
  { id: 1, nameKey: "nexa.weblogin.item_19.name", avatar: "🏭", isGroup: true, online: true, unread: 3, pinned: true,
    lastMsgKey: "nexa.weblogin.item_26.lastMsg", time: "10:42" },
  { id: 2, nameKey: "nexa.weblogin.item_20.name", avatar: "👤", isGroup: false, online: true, unread: 0, pinned: true,
    lastMsgKey: "nexa.weblogin.item_27.lastMsg", time: "10:30" },
  { id: 3, nameKey: "nexa.weblogin.item_21.name", avatar: "🚨", isGroup: true, online: true, unread: 0, pinned: false,
    lastMsgKey: "nexa.weblogin.item_28.lastMsg", time: "09:15" },
  { id: 4, nameKey: "nexa.weblogin.item_22.name", avatar: "🛡️", isGroup: true, online: true, unread: 1, pinned: false,
    lastMsgKey: "nexa.weblogin.item_29.lastMsg", time: "09:00" },
  { id: 5, nameKey: "nexa.weblogin.item_23.name", avatar: "💻", isGroup: false, online: false, unread: 0, pinned: false,
    lastMsgKey: "nexa.weblogin.item_30.lastMsg", time: "أمس" },
  { id: 6, nameKey: "nexa.weblogin.item_24.name", avatar: "🚛", isGroup: true, online: true, unread: 5, pinned: false,
    lastMsgKey: "nexa.weblogin.item_31.lastMsg", time: "أمس" },
  { id: 7, nameKey: "nexa.weblogin.item_25.name", avatar: "🔧", isGroup: false, online: false, unread: 0, pinned: false,
    lastMsgKey: "nexa.weblogin.item_32.lastMsg", time: "أمس" },
];

const messages = [
  { id: 1, senderKey: "nexa.weblogin.item_33.sender", textKey: "nexa.weblogin.item_39.text", time: "10:30", isMine: false, status: "read" },
  { id: 2, senderKey: "nexa.weblogin.item_34.sender", textKey: "nexa.weblogin.item_40.text", time: "10:32", isMine: true, status: "read" },
  { id: 3, senderKey: "nexa.weblogin.item_35.sender", textKey: "nexa.weblogin.item_41.text", time: "10:35", isMine: false, status: "read" },
  { id: 4, senderKey: "nexa.weblogin.item_36.sender", textKey: "nexa.weblogin.item_42.text", time: "10:38", isMine: false, status: "read" },
  { id: 5, senderKey: "nexa.weblogin.item_37.sender", textKey: "nexa.weblogin.item_43.text", time: "10:40", isMine: true, status: "delivered" },
  { id: 6, senderKey: "nexa.weblogin.item_38.sender", textKey: "nexa.weblogin.item_44.text", time: "10:42", isMine: false, status: "read" },
];

/* ═══════════════════════════════════════════════════
   Chat App Interface Component
   ═══════════════════════════════════════════════════ */
const NexaChatApp: React.FC<{ isRTL: boolean; onLogout: () => void }> = ({ isRTL, onLogout }) => {
  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [sidebarTab, setSidebarTab] = useState<"chats" | "channels" | "settings">("chats");

  return (
    <div className="h-screen flex flex-col" style={{ background: "#0b0f1a" }}>
      {/* App Header */}
      <div className="h-14 flex items-center justify-between px-4 bg-[#111827] border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-white font-bold text-sm">NexaLive <span className="text-teal-400 font-normal text-xs">Web</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-medium">{t("nexa.ui.connected")}</span>
          </div>
          <button className="p-2 text-white/40 hover:text-white/70 transition-colors"><Search className="w-4 h-4" /></button>
          <button onClick={onLogout} className="p-2 text-white/40 hover:text-red-400 transition-colors" title={t("nexa.ui.logout")}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[320px] flex flex-col bg-[#0f1420] border-r border-white/5 flex-shrink-0">
          {/* Sidebar tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-white/5">
            {([
              { key: "chats" as const, icon: MessageSquare, label: t("nexa.ui.chats") },
              { key: "channels" as const, icon: Radio, label: t("nexa.ui.channels") },
              { key: "settings" as const, icon: Settings, label: t("nexa.ui.settings") },
            ]).map(tab => (
              <button key={tab.key} onClick={() => setSidebarTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  sidebarTab === tab.key ? "bg-teal-500/10 text-teal-400" : "text-white/40 hover:text-white/60"
                }`}>
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
              <Search className="w-3.5 h-3.5 text-white/30" />
              <input type="text" placeholder={t("nexa.ui.search")} dir={isRTL ? "rtl" : "ltr"}
                className="bg-transparent text-white text-sm outline-none placeholder-white/20 w-full" />
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div key={contact.id} onClick={() => setActiveChat(contact)}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors ${
                  activeChat.id === contact.id ? "bg-teal-500/10 border-r-2 border-teal-500" : "hover:bg-white/[0.02]"
                }`}>
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-xl">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0f1420]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium truncate">{t(contact.nameKey)}</span>
                    <span className="text-white/25 text-[10px] flex-shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-white/35 text-xs truncate">{t(contact.lastMsgKey)}</p>
                    {contact.unread > 0 && (
                      <span className="flex-shrink-0 min-w-[18px] h-[18px] rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0b0f1a]">
          {/* Chat header */}
          <div className="h-14 flex items-center justify-between px-4 bg-[#111827] border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-lg">
                {activeChat.avatar}
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold">{t(activeChat.nameKey)}</h3>
                <p className="text-emerald-400 text-[10px]">
                  {activeChat.isGroup
                    ? (t("nexa.ui.12_members_8_online"))
                    : (activeChat.online ? (t("nexa.ui.online_1")) : (t("nexa.ui.last_seen_3_00_pm")))}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-white/40 hover:text-white/70 transition-colors"><PhoneCall className="w-4 h-4" /></button>
              <button className="p-2 text-white/40 hover:text-white/70 transition-colors"><VideoIcon className="w-4 h-4" /></button>
              <button className="p-2 text-teal-400 hover:text-teal-300 transition-colors" title="PTT"><Mic className="w-4 h-4" /></button>
              <button className="p-2 text-white/40 hover:text-white/70 transition-colors"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(13,148,136,0.03) 0%, transparent 70%)" }}>
            {/* Date separator */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 rounded-lg bg-white/5 text-white/30 text-[10px] font-medium">
                {t("nexa.ui.today")}
              </span>
            </div>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[65%] rounded-2xl px-4 py-2.5 ${
                  msg.isMine
                    ? "bg-teal-600/30 border border-teal-500/20 rounded-br-md"
                    : "bg-white/[0.04] border border-white/5 rounded-bl-md"
                }`}>
                  {!msg.isMine && (
                    <p className="text-teal-400 text-[11px] font-semibold mb-1">{t(msg.senderKey)}</p>
                  )}
                  <p className="text-white/90 text-[13px] leading-relaxed">{t(msg.textKey)}</p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.isMine ? "justify-end" : ""}`}>
                    <span className="text-white/25 text-[10px]">{msg.time}</span>
                    {msg.isMine && (
                      <CheckCheck className={`w-3 h-3 ${msg.status === "read" ? "text-teal-400" : "text-white/25"}`} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 bg-[#111827] border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button className="p-2 text-white/30 hover:text-white/60 transition-colors"><Smile className="w-5 h-5" /></button>
              <button className="p-2 text-white/30 hover:text-white/60 transition-colors"><Paperclip className="w-5 h-5" /></button>
              <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                <input type="text" dir={isRTL ? "rtl" : "ltr"}
                  placeholder={t("nexa.ui.type_a_message")}
                  className="bg-transparent text-white text-sm outline-none placeholder-white/20 w-full" />
              </div>
              <button className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white transition-colors">
                <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <button className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 transition-colors" title="Push-to-Talk">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Login Page Data
   ═══════════════════════════════════════════════════ */
const featuresData = [
  { icon: MessageSquare, titleKey: "nexa.weblogin.item_1.title", color: "text-emerald-400" },
  { icon: Phone, titleKey: "nexa.weblogin.item_2.title", color: "text-blue-400" },
  { icon: Video, titleKey: "nexa.weblogin.item_3.title", color: "text-purple-400" },
  { icon: Mic, titleKey: "nexa.weblogin.item_4.title", color: "text-orange-400" },
  { icon: Shield, titleKey: "nexa.weblogin.item_5.title", color: "text-red-400" },
  { icon: Globe, titleKey: "nexa.weblogin.item_6.title", color: "text-cyan-400" },
];

const steps = [
  { num: 1, icon: Smartphone, titleKey: "nexa.weblogin.item_7.title", descKey: "nexa.weblogin.item_13.desc" },
  { num: 2, icon: QrCode, titleKey: "nexa.weblogin.item_8.title", descKey: "nexa.weblogin.item_14.desc" },
  { num: 3, icon: Monitor, titleKey: "nexa.weblogin.item_9.title", descKey: "nexa.weblogin.item_15.desc" },
];

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
const NexaWebLoginPage: React.FC = () => {
  const { isRTL, t } = useNexaLanguage();
  const [qrSeed, setQrSeed] = useState(Date.now());
  const [countdown, setCountdown] = useState(45);
  const [isExpired, setIsExpired] = useState(false);
  const [featureIdx, setFeatureIdx] = useState(0);
  const [appState, setAppState] = useState<"login" | "connecting" | "app">("login");

  useEffect(() => {
    setIsExpired(false);
    setCountdown(45);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { setIsExpired(true); clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qrSeed]);

  useEffect(() => {
    const timer = setInterval(() => setFeatureIdx((prev) => (prev + 1) % featuresData.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const refreshQR = () => setQrSeed(Date.now());
  const currentFeature = featuresData[featureIdx];

  // Simulate scan (for demo purposes)
  const simulateScan = useCallback(() => {
    setAppState("connecting");
    setTimeout(() => setAppState("app"), 2000);
  }, []);

  const handleLogout = useCallback(() => {
    setAppState("login");
    setQrSeed(Date.now());
  }, []);

  /* ═══ Connecting State ═══ */
  if (appState === "connecting") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050810" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-teal-500/20 border-t-teal-500"
          />
          <h2 className="text-white text-xl font-bold mb-2">{t("nexa.ui.connecting")}</h2>
          <p className="text-white/40 text-sm">{t("nexa.ui.securely_syncing_your_data")}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="w-3.5 h-3.5 text-teal-500/60" />
            <span className="text-teal-500/60 text-xs">{t("nexa.ui.end_to_end_encrypted")}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ═══ App State (Chat Interface) ═══ */
  if (appState === "app") {
    return <NexaChatApp isRTL={isRTL} onLogout={handleLogout} />;
  }

  /* ═══ Login State (QR Code) ═══ */
  return (
    <div style={{ background: "#050810", color: "#ffffff" }} dir={isRTL ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-3">
              <Monitor className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-teal-300">NexaLive Web</span>
            </div>
            <h1 className="text-[clamp(22px,3.5vw,34px)] font-extrabold text-white mb-2" style={{ lineHeight: 1.2 }}>
              {t("nexa.ui.use_nexalive_on_your_computer")}
            </h1>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              {t("nexa.ui.scan_the_qr_code_from_nexalive")}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 mb-8">
            {/* QR Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring" }} className="relative flex-shrink-0 order-1 lg:order-none">
              <div className="absolute -inset-8 bg-teal-500/5 rounded-[40px] blur-2xl" />

              <div className="relative w-[270px] rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                <div className="px-5 pt-5 pb-2 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-1">
                    <QrCode className="w-3 h-3 text-teal-400" />
                    <span className="text-[10px] font-semibold text-teal-300">{t("nexa.ui.scan_qr_code")}</span>
                  </div>
                </div>

                <div className="px-5 pb-3 flex justify-center">
                  <div className="relative cursor-pointer" onClick={simulateScan} title={t("nexa.ui.click_to_simulate_scan")}>
                    {!isExpired && (
                      <motion.div className="absolute -inset-2 rounded-xl border-2 border-teal-500/25"
                        animate={{ boxShadow: ["0 0 0 0 rgba(13,148,136,0)", "0 0 0 6px rgba(13,148,136,0.1)", "0 0 0 0 rgba(13,148,136,0)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                    )}
                    <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${isExpired ? "opacity-20 blur-sm" : ""}`}>
                      <QRCodeSVG seed={qrSeed} size={200} />
                      {!isExpired && (
                        <motion.div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                          animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                      )}
                    </div>
                    {isExpired && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center">
                        <button onClick={(e) => { e.stopPropagation(); refreshQR(); }} className="flex flex-col items-center gap-3 group cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                            <RefreshCw className="w-6 h-6 text-teal-400 group-hover:rotate-180 transition-transform duration-500" />
                          </div>
                          <span className="text-white font-semibold text-sm">{t("nexa.ui.refresh_code")}</span>
                        </button>
                      </motion.div>
                    )}
                    {!isExpired && (
                      <>
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-400 rounded-tl-md" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-400 rounded-tr-md" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-400 rounded-bl-md" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-400 rounded-br-md" />
                      </>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-2">
                  {!isExpired && (
                    <div className="flex items-center gap-2">
                      <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                          initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 45, ease: "linear" }} key={qrSeed} />
                      </div>
                      <span className="text-white/30 text-[10px] font-mono flex-shrink-0">{countdown}</span>
                    </div>
                  )}
                </div>
                <div className="px-5 pb-3 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-500/60" />
                  <span className="text-white/30 text-[10px]">{t("nexa.ui.end_to_end_encrypted")}</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }} className="flex-1 max-w-[400px] order-2">
              <h2 className="text-lg font-bold text-white mb-1">{t("nexa.ui.how_to_get_started")}</h2>
              <p className="text-white/40 text-xs mb-4">{t("nexa.ui.three_simple_steps_to_begin")}</p>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div key={step.num} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-teal-500/30 transition-colors flex-shrink-0">
                      <step.icon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-[13px]">
                        <span className="text-teal-400 font-mono text-xs mr-1">{step.num}.</span>
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-white/35 text-[11px]">{t(step.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2.5 h-5">
                  <span className="text-white/20 text-[10px] uppercase tracking-widest font-medium flex-shrink-0">{t("nexa.ui.available")}</span>
                  <AnimatePresence mode="wait">
                    <motion.div key={featureIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="flex items-center gap-1.5">
                      <currentFeature.icon className={`w-3.5 h-3.5 ${currentFeature.color}`} />
                      <span className="text-white/60 font-medium text-[11px]">{t(currentFeature.titleKey)}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security cards - compact inline */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: Shield, titleKey: "nexa.weblogin.item_10.title",
              descKey: "nexa.weblogin.item_16.desc", color: "text-emerald-400" },
            { icon: Network, titleKey: "nexa.weblogin.item_11.title",
              descKey: "nexa.weblogin.item_17.desc", color: "text-teal-400" },
            { icon: Lock, titleKey: "nexa.weblogin.item_12.title",
              descKey: "nexa.weblogin.item_18.desc", color: "text-blue-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
              <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} />
              <div>
                <h4 className="text-white font-semibold text-[11px]">{t(item.titleKey)}</h4>
                <p className="text-white/30 text-[10px]">{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const NexaWebLoginPageWrapped: React.FC = () => (
  <NexaLiveLanguageProvider>
    <div style={{ background: "#050810", color: "#ffffff" }} className="min-h-screen">
      <NexaHeader />
      <NexaWebLoginPage />
      <NexaFooter />
    </div>
  </NexaLiveLanguageProvider>
);

export default NexaWebLoginPageWrapped;
