"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  LayoutDashboard,
  Eye,
  History,
  FileText,
  Newspaper,
  Settings,
  Bell,
  Search,
  SlidersHorizontal,
  Globe,
  FileCode,
  Mail,
  QrCode,
  Terminal,
  AlertTriangle,
  Download,
  Trash2,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Server,
  Network,
  Cpu,
  Radio,
  MapPin,
  Calendar,
  Layers
} from "lucide-react";

// ============================================================================
// MOCK GLOBAL DATA ARRAY (SCANNED BY EVERYONE ON THE PLATFORM)
// ============================================================================
const globalThreatsDatabase = [
  {
    id: "TR-2026-9912",
    timestamp: "2026-07-09 23:42:11",
    target: "https://eth-airdrop-drainer-rewards.net/secure/connect.js",
    type: "URL",
    icon: Globe,
    category: "Crypto Wallet Drainer",
    severity: "CRITICAL",
    riskScore: 98,
    detectionRatio: "68/72",
    submittedBy: "Node_Operator_401",
    origin: "United States (US_EAST)",
    hash: "f4b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b110",
    behavioralFlags: ["Polymorphic Script", "Anti-Sandbox Evasion", "Direct ABI Injection"]
  },
  {
    id: "TR-2026-9875",
    timestamp: "2026-07-09 22:15:04",
    target: "patch_v4.22_firmware_update.bin.exe",
    type: "FILE",
    icon: FileCode,
    category: "Trojan Ransomware",
    severity: "CRITICAL",
    riskScore: 95,
    detectionRatio: "71/72",
    submittedBy: "SecOps_Agent_Alpha",
    origin: "Germany (EU_CENTRAL)",
    hash: "6a2f44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b311",
    behavioralFlags: ["Shadow Copy Deletion", "Registry Key Persist", "AES-256 Payload Loop"]
  },
  {
    id: "TR-2026-9764",
    timestamp: "2026-07-09 20:05:32",
    target: "CVE-2026-41120_exploit_payload.py",
    type: "FILE",
    icon: FileCode,
    category: "Remote Code Execution",
    severity: "HIGH",
    riskScore: 88,
    detectionRatio: "59/70",
    submittedBy: "Academic_Sandbox_NITR",
    origin: "India (IN_WEST)",
    hash: "12b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852c902",
    behavioralFlags: ["Stack Buffer Overflow", "Heap Spraying Vector", "Reverse Shell Bind"]
  },
  {
    id: "TR-2026-9659",
    timestamp: "2026-07-09 17:12:18",
    target: "hsbc_security_verification_alert.eml",
    type: "EMAIL",
    icon: Mail,
    category: "Spear Phishing Injection",
    severity: "HIGH",
    riskScore: 82,
    detectionRatio: "44/68",
    submittedBy: "Enterprise_Mesa_Proxy",
    origin: "United Kingdom (UK_SOUTH)",
    hash: "94af44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b811",
    behavioralFlags: ["Spoofed Header Flag", "Hidden Content Obfuscation", "External Inline Frame"]
  },
  {
    id: "TR-2026-9521",
    timestamp: "2026-07-09 11:33:44",
    target: "mumbai_central_parking_payment_qr.png",
    type: "QR_CODE",
    icon: QrCode,
    category: "UPI Malicious Routing",
    severity: "WARNING",
    riskScore: 64,
    detectionRatio: "28/65",
    submittedBy: "Citizen_Node_882",
    origin: "India (IN_SOUTH)",
    hash: "88c0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852f441",
    behavioralFlags: ["Deep-Linked Payment Alteration", "Obfuscated Destination Domain"]
  },
  {
    id: "TR-2026-9410",
    timestamp: "2026-07-08 19:21:02",
    target: "http://192.168.1.254/config/backup.sh",
    type: "URL",
    icon: Globe,
    category: "Intranet Exfiltration",
    severity: "WARNING",
    riskScore: 55,
    detectionRatio: "19/70",
    submittedBy: "Node_Operator_09X",
    origin: "Canada (CA_EAST)",
    hash: "fa30c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852e185",
    behavioralFlags: ["Shell Script Execution", "Cleartext Password Scraping"]
  },
  {
    id: "TR-2026-9399",
    timestamp: "2026-07-08 14:56:40",
    target: "telegram_desktop_installer_cracked.msi",
    type: "FILE",
    icon: FileCode,
    category: "Spyware / Session Stealer",
    severity: "HIGH",
    riskScore: 79,
    detectionRatio: "52/72",
    submittedBy: "Gamer_Node_Delta",
    origin: "Brazil (BR_SOUTH)",
    hash: "c2b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852a441",
    behavioralFlags: ["Local Storage Aggregation", "Cookie File Harvesting", "Encrypted Form Exfil"]
  }
];

const navigationItems = [
  { label: "Dashboard", ref: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze", ref: "/analyze", icon: Eye },
  { label: "History", ref: "/history", icon: History },
  { label: "Threat Reports", ref: "/threat-reports", icon: FileText },
  { label: "Cyber News", ref: "/cyber-news", icon: Newspaper },
  { label: "Settings", ref: "/settings", icon: Settings }
];

export default function CipherGuardGlobalThreatReportsPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Threat Reports");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filtering vectors and query states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [selectedVector, setSelectedVector] = useState("ALL");
  const [activeThreatManifest, setActiveThreatManifest] = useState<typeof globalThreatsDatabase[0] | null>(null);

  // Filter pipeline execution
  const filteredThreats = globalThreatsDatabase.filter((threat) => {
    const matchesSearch = threat.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          threat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          threat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          threat.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === "ALL" || threat.severity === selectedSeverity;
    const matchesVector = selectedVector === "ALL" || threat.type === selectedVector;
    return matchesSearch && matchesSeverity && matchesVector;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-red-500/30 flex">
      
      {/* HUD DESIGN GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-red-500/5 blur-3xl pointer-events-none rounded-full z-0" />

      {/* DESKTOP SIDEBAR PANEL */}
      <aside className="w-64 border-r border-gray-900/80 bg-[#080d22]/40 backdrop-blur-xl flex flex-col justify-between hidden lg:flex shrink-0 relative z-20">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
              <ShieldAlert className="h-5 w-5 text-[#050816] stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 font-mono">
              CIPHER<span className="text-red-400">GUARD</span>
            </span>
          </div>

          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => router.push(item.ref)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold tracking-wide font-mono transition-all relative group cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="globalNavActiveGlow"
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/5 border-l-2 border-red-400 rounded-r-xl shadow-[inset_4px_0_12px_rgba(239,68,68,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <IconComponent className={`h-4 w-4 relative z-10 ${isActive ? "text-red-400" : ""}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-900/60 font-mono text-[10px] text-gray-500">
          <div className="flex items-center gap-2 text-red-400/80 font-bold mb-1">
            <Radio className="w-3 h-3 animate-pulse" /> OVERWATCH_LIVE_FEED
          </div>
          <div>GLOBAL FEDERATED DATA</div>
        </div>
      </aside>

      {/* MOBILE SHEETS OVERLAY VIEW */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-[#070b1e] border-r border-gray-900 p-6 flex flex-col justify-between z-50 lg:hidden shadow-2xl"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600">
                      <ShieldAlert className="h-5 w-5 text-[#050816] stroke-[2.5]" />
                    </div>
                    <span className="text-md font-black tracking-wider text-white font-mono">
                      CIPHER<span className="text-red-400">GUARD</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl border border-gray-800 bg-[#090e24] text-gray-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeNav === item.label;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.ref);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          isActive ? "text-white bg-red-500/10 border-l-2 border-red-400" : "text-gray-400"
                        }`}
                      >
                        <IconComponent className={`h-4 w-4 ${isActive ? "text-red-400" : ""}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* PLATFORM HEADER */}
        <header className="h-20 border-b border-gray-900/60 bg-[#050816]/70 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 rounded-xl border border-gray-800 bg-[#090e24]/60 text-gray-400 lg:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Central Search Processing Block */}
          <div className={`hidden sm:flex max-w-md w-full rounded-xl bg-[#090e24]/80 border transition-all duration-300 items-center px-3.5 py-2 ${
            searchFocused ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.05)]" : "border-gray-900"
          }`}>
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query public threat logs, categories, payload hashes..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          <span className="sm:hidden font-mono font-black text-xs tracking-wider text-gray-400">
            CIPHER<span className="text-red-400">GUARD</span>
          </span>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 rounded-xl bg-red-950/20 border border-red-900/50 px-3 py-1.5 font-mono text-[10px] text-red-400 font-bold">
              <Network className="w-3.5 h-3.5 animate-pulse" />
              <span>COMMUNITY LIVE INGEST SYNCED</span>
            </div>

            <button className="p-3 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 relative min-w-[44px] min-h-[44px] flex items-center justify-center">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* MAIN WORKSPACE LOGIC CONTROLLER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* SEARCH FIELD ACCORDION FOR MOBILE */}
          <div className="sm:hidden w-full rounded-xl bg-[#090e24]/80 border border-gray-900 flex items-center px-3.5 py-3">
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search global database reports..."
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          {/* GLOBAL THREAT INTELLIGENCE FEED INTRO HERO CARD */}
          <section className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-widest">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Network Sandbox Ledger
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Global Threat Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed font-medium">
                Real-time crowdsourced evaluations. This index displays structural security scans, file payloads, and compromised URLs checked globally by all system operators.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#050816] border border-gray-900 flex items-center gap-4 shrink-0 font-mono">
              <div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Total Global Ingest Pool</div>
                <div className="text-lg font-black text-white mt-0.5">14,812 <span className="text-red-400 text-xs font-medium">Packages</span></div>
              </div>
            </div>
          </section>

          {/* FILTER MATRIX ACTION CLUSTER */}
          <section className="rounded-xl border border-gray-900 bg-[#090e24]/60 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-800">
                <SlidersHorizontal className="h-3.5 w-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Filter Grid</span>
              </div>

              {/* Severity Selector */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[10px]">SEVERITY:</span>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="bg-[#050816] border border-gray-800 rounded-lg px-2.5 py-1 text-white outline-none focus:border-red-500/50 text-xs"
                >
                  <option value="ALL">ALL RISK VERDICTS</option>
                  <option value="CRITICAL">CRITICAL ONLY</option>
                  <option value="HIGH">HIGH SEVERITY</option>
                  <option value="WARNING">WARNING HAZARDS</option>
                </select>
              </div>

              {/* Target Vector Selector */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[10px]">VECTOR:</span>
                <select
                  value={selectedVector}
                  onChange={(e) => setSelectedVector(e.target.value)}
                  className="bg-[#050816] border border-gray-800 rounded-lg px-2.5 py-1 text-white outline-none focus:border-red-500/50 text-xs"
                >
                  <option value="ALL">ALL CHANNELS</option>
                  <option value="URL">URL EXPLOITS</option>
                  <option value="FILE">FILE MALWARE</option>
                  <option value="EMAIL">EMAIL SPAM</option>
                  <option value="QR_CODE">QR OVERLAYS</option>
                </select>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 font-bold">
              Matches <span className="text-red-400">{filteredThreats.length}</span> public anomaly blocks
            </div>
          </section>

          {/* COOL LOOKING BLOCKS / GRID CARDS LAYOUT (REPLACED TABLE/LIST GRID) */}
          <section className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredThreats.length > 0 ? (
                  filteredThreats.map((threat) => {
                    const VectorIconComponent = threat.icon;
                    const isCritical = threat.severity === "CRITICAL";
                    const isHigh = threat.severity === "HIGH";

                    let severityColorClasses = "border-amber-500/20 text-amber-400 bg-amber-500/5";
                    let severityBadgeLine = "bg-amber-500";
                    if (isCritical) {
                      severityColorClasses = "border-red-500/30 text-red-400 bg-red-500/5";
                      severityBadgeLine = "bg-red-500";
                    } else if (isHigh) {
                      severityColorClasses = "border-orange-500/30 text-orange-400 bg-orange-500/5";
                      severityBadgeLine = "bg-orange-500";
                    }

                    return (
                      <motion.div
                        key={threat.id}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative group rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-gray-800 transition-all hover:bg-[#0c1433]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] overflow-hidden"
                      >
                        {/* Futuristic Dynamic Gradient Corner Indicator */}
                        <div className={`absolute top-0 left-0 w-full h-[2px] ${severityBadgeLine} opacity-40 group-hover:opacity-100 transition-opacity`} />
                        
                        {/* Upper Section Meta Layout */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 font-mono text-[10px]">
                              <span className="p-1.5 rounded-lg bg-[#050816] border border-gray-800 text-gray-400 block group-hover:text-red-400 transition-colors">
                                <VectorIconComponent className="h-3.5 w-3.5" />
                              </span>
                              <div>
                                <div className="text-white font-black tracking-tight">{threat.id}</div>
                                <div className="text-gray-500 text-[9px] flex items-center gap-1 mt-0.5">
                                  <Server className="w-2.5 h-2.5" /> {threat.submittedBy}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-end text-right font-mono">
                              <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded border uppercase ${severityColorClasses}`}>
                                {threat.severity}
                              </span>
                              <span className="text-[9px] text-gray-600 mt-1 flex items-center gap-1">
                                <Calendar className="w-2.5 h-2.5" /> {threat.timestamp.split(" ")[1]}
                              </span>
                            </div>
                          </div>

                          {/* Block Target Parameter Scope Description */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider block font-mono">Evaluation Ingestion Target</span>
                            <div className="text-xs text-gray-100 font-bold break-all line-clamp-2 min-h-[32px] group-hover:text-red-400 transition-colors">
                              {threat.target}
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#050816] border border-gray-900 font-mono text-[10px] text-gray-400">
                              <Layers className="w-3 h-3 text-red-400/80" /> {threat.category}
                            </div>
                          </div>

                          {/* Cryptographic Node Verification Metrics */}
                          <div className="p-3 rounded-xl bg-[#050816]/60 border border-gray-900 space-y-2 font-mono text-[10px]">
                            <div className="flex justify-between items-center text-gray-400">
                              <span>Origin Segment:</span>
                              <span className="text-gray-200 font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-600" /> {threat.origin.split(" ")[0]}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400">
                              <span>Engine Core Hit Ratio:</span>
                              <span className="text-red-400 font-bold">{threat.detectionRatio} Vendors</span>
                            </div>
                            <div className="pt-1.5 border-t border-gray-900/60 flex items-center justify-between text-gray-500 text-[9px]">
                              <span className="uppercase">SHA256 Sig:</span>
                              <span className="font-mono text-gray-600 tracking-tighter text-right block truncate w-36">
                                {threat.hash}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Lower Section Block Interactive Trigger HUD */}
                        <div className="mt-5 pt-3.5 border-t border-gray-900/60 flex items-center justify-between gap-4">
                          <div className="font-mono flex items-baseline gap-1">
                            <span className="text-[9px] text-gray-500 uppercase font-bold">Risk Weight:</span>
                            <span className={`text-sm font-black ${isCritical ? 'text-red-400' : isHigh ? 'text-orange-400' : 'text-amber-400'}`}>
                              {threat.riskScore}%
                            </span>
                          </div>

                          <button
                            onClick={() => setActiveThreatManifest(threat)}
                            className="text-center font-mono text-[10px] font-black tracking-tight uppercase px-3 py-1.5 rounded-lg bg-[#050816] border border-gray-800 text-gray-400 hover:text-white hover:border-red-500/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <span>Inspect Manifest</span>
                            <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full rounded-2xl border border-dashed border-gray-900 p-16 text-center font-mono text-xs text-gray-500"
                  >
                    <AlertTriangle className="h-7 w-7 text-red-500/40 mx-auto mb-2" />
                    No network anomalies found matching selected criteria.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

        </main>
      </div>

      {/* DETAILED TECHNICAL SANDBOX MANIFEST INSPECTOR OVERLAY MODAL */}
      <AnimatePresence>
        {activeThreatManifest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveThreatManifest(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-2xl bg-[#070b1e] border border-gray-900 rounded-2xl overflow-hidden shadow-2xl relative z-10 font-mono text-xs"
            >
              {/* Manifest Header Info Block */}
              <div className="p-5 border-b border-gray-900 bg-[#090e24]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#050816] border border-red-500/20 text-red-400">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{activeThreatManifest.id} Global Manifest</h3>
                    <span className="text-[10px] text-gray-500">Logged on {activeThreatManifest.timestamp}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveThreatManifest(null)}
                  className="p-1.5 rounded-lg border border-gray-900 bg-[#050816] text-gray-500 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Manifest Configuration Body Parameter Fields */}
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Compromised Target Vector Space</span>
                  <div className="p-3 bg-[#050816] border border-gray-900 rounded-xl text-red-400 break-all font-medium selection:bg-red-500/20">
                    {activeThreatManifest.target}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-[#050816]/50 border border-gray-900/60 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-500 uppercase font-bold block">Reporting Node</span>
                    <div className="text-gray-200 font-bold truncate">{activeThreatManifest.submittedBy}</div>
                  </div>
                  <div className="p-3 bg-[#050816]/50 border border-gray-900/60 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-500 uppercase font-bold block">Geographic Intake</span>
                    <div className="text-gray-200 font-bold truncate">{activeThreatManifest.origin}</div>
                  </div>
                  <div className="p-3 bg-[#050816]/50 border border-gray-900/60 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-500 uppercase font-bold block">AV Engine Hit Ratio</span>
                    <div className="text-red-400 font-bold">{activeThreatManifest.detectionRatio} Vendors</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Dynamic Behavioral Flags Identified</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeThreatManifest.behavioralFlags.map((flag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-red-950/20 border border-red-900/50 text-red-400 text-[10px] font-bold">
                        ⚠️ {flag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Cryptographic Integrity Signature SHA256</span>
                  <div className="p-3 bg-[#050816] border border-gray-900 rounded-xl text-gray-400 break-all text-[11px] selection:bg-red-500/20">
                    {activeThreatManifest.hash}
                  </div>
                </div>

                {/* Mitigation Containment Operational Context Alert Banner */}
                <div className="p-4 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 flex items-start gap-3">
                  <Terminal className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="space-y-1 font-sans">
                    <div className="font-mono text-xs font-bold uppercase">Automated Isolation Actions Enforced</div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      CipherGuard routing systems generated an immediate quarantine routine across the network cluster loop. Outbound parameters attempting structural queries to this asset signature will remain sandboxed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Controls Footer */}
              <div className="p-4 border-t border-gray-900 bg-[#090e24]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[10px] text-gray-500 font-bold">
                  METAMATRIX_STATUS: BLOCKED_AND_ISOLATED
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-lg border border-gray-900 bg-[#050816] text-gray-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
                    <ExternalLink className="h-3.5 w-3.5" /> VT_Matrix Link
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-[#050816] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/10">
                    <Download className="h-3.5 w-3.5 stroke-[2.5]" /> Export JSON Manifest
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}