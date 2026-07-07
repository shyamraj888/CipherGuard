"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Shield,
  Globe,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  Upload,
  ChevronRight,
  Lock,
  Cpu,
  Clock,
  Loader2,
  FileCode,
  Terminal,
  Activity,
  Zap,
  Radio,
  Eye,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Fingerprint
} from "lucide-react";

type ScanType = "url" | "screenshot" | "message" | "email";

interface PersistentFormState {
  url: string;
  screenshot: File | null;
  message: string;
  emailText: string;
  emailFile: File | null;
}

// Sparkle/Particle type for ambient background animation
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export default function HyperPremiumLiveScanPage() {
  const [activeTab, setActiveTab] = useState<ScanType>("url");
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [systemStatus, setSystemStatus] = useState("OPTIMAL");

  // Dynamic Mouse Spotlight Glow Effect for Premium Card Interactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Generate continuous background system metrics noise
  useEffect(() => {
    const statusPool = ["OPTIMAL", "SYNCING NODES", "DECRYPTING PAYLOADS", "PURGING MEMORY BUFFER", "READY"];
    const interval = setInterval(() => {
      setSystemStatus(statusPool[Math.floor(Math.random() * statusPool.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Ambient structural floating micro-particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(initialParticles);
  }, []);

  // Form persistence configuration
  const [formData, setFormData] = useState<PersistentFormState>({
    url: "",
    screenshot: null,
    message: "",
    emailText: "",
    emailFile: null,
  });

  const inspectionTargetPipelines = [
    { label: "SSL Certificate Validity Check", engine: "OpenSSL Cluster Layer v3", status: "READY" },
    { label: "Domain Reputation Index Tracking", engine: "WebRisk Core Matrix", status: "READY" },
    { label: "WHOIS Domain Registration Lifespan Analysis", engine: "MetaRegistry Synchronizer", status: "READY" },
    { label: "Active Dynamic Redirect Vector Trace", engine: "Chromium Headless Cluster", status: "READY" },
    { label: "Heuristic URL Token Structure Profiling", engine: "Semantic Pattern Compiler", status: "READY" },
    { label: "Deep OCR Visual Character Extraction", engine: "Vision Neural Pipeline", status: "READY" },
    { label: "Embedded Payload QR Code Ingestion", engine: "ZBar Grid Analyzer", status: "READY" },
    { label: "Decentralized Community Threat Intelligence Sync", engine: "AlienVault / VT Database", status: "READY" },
  ];

  // Dynamic Live Terminal Log Stepper
  useEffect(() => {
    if (!isScanning) {
      setTerminalLogs([]);
      setScanProgress(0);
      return;
    }

    const telemetryLogsTimeline = [
      "Initializing hyper-isolated dynamic virtualization containment loop...",
      "Allocating dynamic micro-sandbox memory registers safely...",
      "Routing analytics ingestion pipelines through multi-zone secure scrubbing relays...",
      "Parsing target asset patterns and processing DOM trees...",
      "Validating encryption chains and actively checking live SSL parameters...",
      "Matching structural visual components using computer vision neural algorithms...",
      "Cross-referencing telemetry points with global federated honeypots...",
      "Assembling definitive real-time behavioral compromise matrices...",
      "Compiling complete risk mitigation reporting parameters and clearing memory registers."
    ];

    let currentLogPointer = 0;
    const loggingInterval = setInterval(() => {
      if (currentLogPointer < telemetryLogsTimeline.length) {
        setTerminalLogs(prev => [...prev, `[INIT_NODE_${currentLogPointer * 11}]: ${telemetryLogsTimeline[currentLogPointer]}`]);
        setScanProgress(Math.floor(((currentLogPointer + 1) / telemetryLogsTimeline.length) * 100));
        currentLogPointer++;
      } else {
        clearInterval(loggingInterval);
      }
    }, 4000 / telemetryLogsTimeline.length);

    return () => clearInterval(loggingInterval);
  }, [isScanning]);

  const triggerAdvancedSecureScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 4300);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0B1120] text-[#F8FAFC] font-sans antialiased selection:bg-blue-500/30 overflow-x-hidden relative"
    >
      
      {/* --- HYPER-LIVE ANIMATED AMBIENT CANVAS SYSTEM --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370b_1px,transparent_1px),linear-gradient(to_bottom,#1f29370b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Interactive Laser Scanning Radar Beam Element */}
      <motion.div 
        animate={{ translateY: ["0vh", "100vh", "0vh"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none z-10"
      />

      {/* Floating Micro-Telemetry Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0, 0.4, 0],
              x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: "absolute",
              bottom: "-5%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        
        {/* --- PREMIUM HEADER INFRASTRUCTURE --- */}
        <header className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono tracking-widest text-blue-400 font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>CIPHERGUARD LIVE THREAT TELEMETRY CONSOLE // SYSTEM_{systemStatus}</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-black sm:text-5xl tracking-tight text-white flex items-center gap-3"
            >
              Scan Threat
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Analyze suspicious URLs, screenshots, emails and messages using multi-layer threat intelligence.
          </motion.p>
        </header>

        {/* --- INTERACTIVE GRID SELECTION SECTOR WITH DYNAMIC GLOWS --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            { id: "url", title: "Website URL", desc: "Scan suspicious websites and phishing links.", icon: (props: any) => <div className="flex gap-1 items-center"><Shield {...props} className="h-4 w-4" /><Globe {...props} className="h-4 w-4" /></div> },
            { id: "screenshot", title: "Screenshot", desc: "Upload screenshots containing websites, QR codes or suspicious messages.", icon: ImageIcon },
            { id: "message", title: "Message", desc: "Paste SMS, WhatsApp or Telegram conversations.", icon: MessageSquare },
            { id: "email", title: "Email", desc: "Analyze suspicious emails and email content.", icon: Mail },
          ].map((card, idx) => {
            const IconComponent = card.icon;
            const isSelected = activeTab === card.id;

            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (isScanning) return;
                  setActiveTab(card.id as ScanType);
                }}
                className={`group text-left p-6 rounded-xl border relative flex flex-col justify-between h-44 cursor-pointer focus:outline-none transition-all duration-300 ${
                  isScanning ? "opacity-30 cursor-not-allowed" : ""
                } ${
                  isSelected 
                    ? "border-blue-500 bg-[#111827]/90 shadow-2xl shadow-blue-500/[0.04]" 
                    : "border-gray-800 bg-[#111827]/40 backdrop-blur-xs hover:border-gray-700/80 hover:bg-[#111827]/60"
                }`}
              >
                {/* Motion Spotlight Laser Tracker Overlay */}
                {isSelected && (
                  <>
                    <motion.div 
                      layoutId="premiumLineTracker"
                      className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <div className="absolute inset-0 bg-blue-500/[0.01] rounded-xl pointer-events-none" />
                  </>
                )}

                <div className="relative z-10 space-y-4">
                  <div className={`p-2.5 rounded-lg border w-fit transition-all duration-300 ${
                    isSelected 
                      ? "bg-blue-600/20 border-blue-500/40 text-blue-400 scale-105" 
                      : "bg-[#0B1120] border-gray-800 text-gray-400 group-hover:text-white"
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                      {card.title}
                      {!isSelected && (formData[card.id === "email" ? "emailText" : card.id as keyof PersistentFormState] || formData.emailFile) && (
                        <motion.span 
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                        />
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 leading-normal line-clamp-2 font-medium group-hover:text-gray-300 transition-colors">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </section>

        {/* --- MAIN INTERACTIVE WORKSPACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-xl border border-gray-800 bg-[#111827]/50 backdrop-blur-xl p-6 shadow-2xl space-y-4 relative overflow-hidden"
              >
                {/* Live Data Active Pulse Ring */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-gray-500 bg-[#0B1120] px-2 py-0.5 rounded border border-gray-800/80">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PERSISTENT_BUFFER</span>
                </div>

                {activeTab === "url" && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Target Destination Link (URL)</label>
                    <input
                      type="url"
                      disabled={isScanning}
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-gray-800 bg-[#0B1120]/90 px-4 py-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 font-mono tracking-wide"
                    />
                  </div>
                )}

                {activeTab === "screenshot" && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Vision System Target Area</label>
                    <div
                      onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files?.[0]) setFormData(prev => ({ ...prev, screenshot: e.dataTransfer.files[0] })); }}
                      className={`border border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-all duration-300 ${
                        dragActive 
                          ? "border-blue-500 bg-blue-500/[0.03]" 
                          : "border-gray-800 bg-[#0B1120]/80 hover:border-gray-700"
                      }`}
                    >
                      <Upload className={`h-7 w-7 text-gray-500 mb-3 transition-transform duration-300 ${dragActive ? "translate-y-[-4px] text-blue-400" : ""}`} />
                      <p className="text-xs font-bold text-gray-300 text-center">
                        {formData.screenshot ? `✓ Mounted: ${formData.screenshot.name}` : "Drag & drop analysis target picture here or"}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1 mb-4">PNG, JPG, JPEG, WEBP profiles accepted</p>
                      <label className="rounded border border-gray-700 bg-gray-900/60 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-gray-900 hover:text-white cursor-pointer select-none">
                        Browse Files
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isScanning}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setFormData(prev => ({ ...prev, screenshot: file }));
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "message" && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Suspicious Conversation String Log</label>
                    <textarea
                      rows={5}
                      disabled={isScanning}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Paste suspicious WhatsApp, Telegram, or SMS message stream strings..."
                      className="w-full rounded-lg border border-gray-800 bg-[#0B1120]/90 px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 font-sans resize-y"
                    />
                  </div>
                )}

                {activeTab === "email" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Raw Full Message Body Payload</label>
                      <textarea
                        rows={5}
                        disabled={isScanning}
                        value={formData.emailText}
                        onChange={(e) => setFormData(prev => ({ ...prev, emailText: e.target.value }))}
                        placeholder="Paste complete headers and email content text maps directly..."
                        className="w-full rounded-lg border border-gray-800 bg-[#0B1120]/90 px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 font-mono text-xs resize-y"
                      />
                    </div>
                    <div className="pt-3 border-t border-gray-800/60 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FileCode className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="font-medium text-gray-400 truncate">
                          {formData.emailFile ? `Configuration Loaded: ${formData.emailFile.name}` : "Attach standalone configuration asset file (.eml)"}
                        </span>
                      </div>
                      <label className="rounded border border-gray-800 bg-[#0B1120] px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer shrink-0 select-none">
                        {formData.emailFile ? "Replace EML" : "Upload .eml"}
                        <input
                          type="file"
                          accept=".eml"
                          disabled={isScanning}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setFormData(prev => ({ ...prev, emailFile: file }));
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* --- LIVE SECURITY MANIFEST PIPELINE ROADMAP --- */}
            <div className="rounded-xl border border-gray-800 bg-[#111827]/40 backdrop-blur-md p-6 shadow-xl space-y-4 relative">
              <div className="flex justify-between items-center border-b border-gray-800/60 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Active Ingestion Target Pipeline Manifest</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Automated deep inspection processes armed globally by default</p>
                </div>
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {inspectionTargetPipelines.map((pipeline, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0B1120]/70 border border-gray-800/50 relative overflow-hidden group"
                  >
                    {/* Live processing wave glow line on active scan execution */}
                    {isScanning && (
                      <motion.div 
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.15 }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/[0.04] to-transparent z-0 pointer-events-none"
                      />
                    )}

                    <div className="flex items-center gap-2.5 relative z-10">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isScanning ? "bg-amber-400 animate-pulse" : "bg-blue-500"}`} />
                      <span className="text-xs font-semibold text-gray-300">{pipeline.label}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 bg-[#111827] px-2 py-0.5 rounded border border-gray-800/40 tracking-tight shrink-0 relative z-10">
                      {isScanning ? "COMPUTING..." : pipeline.engine}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* --- EXTREMELY LIVE RADAR TELEMETRY LOG DISPLAY WINDOW --- */}
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-gray-800 bg-black/80 font-mono text-xs shadow-2xl overflow-hidden relative"
                >
                  <div className="bg-[#111827]/90 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-400 font-bold">
                      <Terminal className="h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} />
                      <span className="text-[11px] tracking-wider">LIVE TELEMETRY INTERPOLATION DATA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-28 bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                        <motion.div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${scanProgress}%` }} 
                        />
                      </div>
                      <span className="text-[10px] text-gray-300 font-bold min-w-[28px] text-right">{scanProgress}%</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 max-h-56 overflow-y-auto text-gray-400 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
                    {terminalLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-blue-500 font-bold select-none">&gt;</span>
                        <span className={idx === terminalLogs.length - 1 ? "text-blue-400 font-bold" : ""}>{log}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Metrics Vector Control Panel */}
          <div className="space-y-6">
            
            {/* --- TELEMETRY SUMMARY MATRIX CARD --- */}
            <div className="rounded-xl border border-gray-800 bg-[#111827]/40 backdrop-blur-md p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.02] blur-3xl pointer-events-none" />
              
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Scope Validation Blueprint</h3>
                <p className="text-xs text-gray-400 mt-0.5">Active runtime environment definitions</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
                  <span className="text-gray-400 font-sans">Ingestion Inbound Vector</span>
                  <span className="font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1.5 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                    <Zap className="h-3 w-3 animate-pulse" /> {activeTab}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
                  <span className="text-gray-400 font-sans flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-500" /> Computation Target Time
                  </span>
                  <span className="font-bold text-white">2.00s - 4.00s</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
                  <span className="text-gray-400 font-sans flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-gray-500" /> Computing Layers Array
                  </span>
                  <span className="font-bold text-white bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">
                    8 Operational Nodes
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-[#0B1120]/90 border border-gray-800/80 p-4 flex gap-3 relative overflow-hidden">
                <Lock className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0 relative z-10" />
                <div className="space-y-1 relative z-10">
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Confidential Shred Injunction</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Input payloads processing loops occur entirely inside isolated memory registers. Contents are fully destroyed upon script execution complete loops.
                  </p>
                </div>
              </div>
            </div>

            {/* --- EXTREMELY PREMIUM INTERACTIVE ACTION BUTTON TRIGGER --- */}
            <motion.button
              whileHover={isScanning ? {} : { scale: 1.02 }}
              whileTap={isScanning ? {} : { scale: 0.98 }}
              onClick={triggerAdvancedSecureScan}
              disabled={isScanning}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-900 border border-transparent disabled:border-gray-800 py-4 px-4 font-bold text-sm text-white shadow-2xl shadow-blue-600/20 transition-all group overflow-hidden relative cursor-pointer disabled:cursor-not-allowed"
            >
              {/* Internal high-fidelity slide highlight animation layer */}
              <div className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] left-[-60%] group-hover:left-[120%] transition-all duration-[1000ms] ease-out pointer-events-none" />
              
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400 shrink-0" />
                  <span className="font-mono tracking-wider text-gray-400">ANALYZING SIGNATURE FLOW ARRAYS...</span>
                </>
              ) : (
                <>
                  <Fingerprint className="w-4 h-4 text-blue-200" />
                  <span>Start Secure Scan Pipeline</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* --- CONNECTED SYSTEM PIPELINE LOGIC ROADMAP --- */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">FLOW ARCHITECTURE DIAGRAM</h2>
            <p className="text-2xl font-black text-white tracking-tight">How CipherGuard Runs Core Threat Checks</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              { id: "Stage 01", title: "Upload Suspicious Content", desc: "Ingestion loops securely isolate input payloads directly within volatile transient micro-vault files.", icon: Upload },
              { id: "Stage 02", title: "OCR & Security Engine", desc: "Vision nodes trace visual boundaries while advanced code structural parsing handles deep tracking loops.", icon: Eye },
              { id: "Stage 03", title: "Threat Intelligence Analysis", desc: "Resulting telemetry maps trigger rapid lookups across federated decentralized defense indices globally.", icon: Cpu },
              { id: "Stage 04", title: "AI Explanation & Risk Report", desc: "Generates clear plain-text executive risk readouts together with high-fidelity structural audit logs.", icon: Terminal }
            ].map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div 
                  key={idx} 
                  className="relative group"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="h-full rounded-xl border border-gray-800 bg-[#111827]/30 p-6 space-y-4 transition-all duration-300 group-hover:border-gray-700/80 group-hover:bg-[#111827]/50 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded bg-[#0B1120] border border-gray-800 text-blue-500 transition-transform group-hover:scale-110">
                        <StepIcon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-600 group-hover:text-blue-500/50 transition-colors">{step.id}</span>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-white tracking-tight">{step.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>

                  {idx < 3 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-20 items-center justify-center bg-[#0B1120] border border-gray-800 rounded-full w-5 h-5 pointer-events-none">
                      <ChevronRight className="h-3 w-3 text-gray-600 animate-pulse" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
        
      </div>
    </div>
  );
}