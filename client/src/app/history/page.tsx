"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import {
  Shield,
  Activity,
  Cpu,
  Lock,
  Globe,
  CheckCircle2,
  Zap,
  Search,
  LayoutDashboard,
  Eye,
  History,
  FileText,
  Newspaper,
  Settings,
  Bell,
  LogOut,
  Mail,
  QrCode,
  Image as ImageIcon,
  Info,
  Menu,
  X,
  SlidersHorizontal,
  ChevronRight,
  AlertTriangle,
  Download,
  Trash2,
  ExternalLink
} from "lucide-react";
import CipherGuardLogo from "../components/CipherGuardLogo";

// Mock chronological metrics for historical trend analysis
const historicalTimelineData = [
  { date: "07/03", totalScans: 28, threatsDetected: 3 },
  { date: "07/04", totalScans: 35, threatsDetected: 5 },
  { date: "07/05", totalScans: 42, threatsDetected: 8 },
  { date: "07/06", totalScans: 31, threatsDetected: 2 },
  { date: "07/07", totalScans: 55, threatsDetected: 14 },
  { date: "07/08", totalScans: 64, threatsDetected: 19 },
  { date: "07/09", totalScans: 48, threatsDetected: 11 }
];

// Comprehensive mock database of previously evaluated scans
const historicalScansDatabase = [
  {
    id: "SCAN-2026-8941",
    timestamp: "2026-07-09 22:14:05",
    target: "https://secure-login-portal-auth-verification.com/wp-login",
    type: "URL",
    icon: Globe,
    category: "Phishing Link",
    riskScore: 94,
    status: "QUARANTINED",
    fileSize: "N/A",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    id: "SCAN-2026-8812",
    timestamp: "2026-07-09 19:42:11",
    target: "invoice_99214_payment_remit.pdf.exe",
    type: "FILE",
    icon: FileText,
    category: "Malware Payload",
    riskScore: 87,
    status: "QUARANTINED",
    fileSize: "4.2 MB",
    hash: "6a2f44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b311"
  },
  {
    id: "SCAN-2026-8704",
    timestamp: "2026-07-08 14:05:32",
    target: "paytm-merchant-cashback-qr.png",
    type: "QR_CODE",
    icon: QrCode,
    category: "UPI Spoofing",
    riskScore: 68,
    status: "ISOLATED",
    fileSize: "842 KB",
    hash: "12b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852c902"
  },
  {
    id: "SCAN-2026-8659",
    timestamp: "2026-07-08 09:12:18",
    target: "https://github.com/facebook/react/releases",
    type: "URL",
    icon: Globe,
    category: "Clean Signature",
    riskScore: 4,
    status: "CLEARED",
    fileSize: "N/A",
    hash: "94af44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b811"
  },
  {
    id: "SCAN-2026-8521",
    timestamp: "2026-07-07 17:33:44",
    target: "alert-security-update-hbx81.eml",
    type: "EMAIL",
    icon: Mail,
    category: "Credential Stuffing",
    riskScore: 76,
    status: "QUARANTINED",
    fileSize: "124 KB",
    hash: "88c0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852f441"
  },
  {
    id: "SCAN-2026-8410",
    timestamp: "2026-07-06 11:21:02",
    target: "https://internal-nexus-node.nitrourkela.in/dashboard",
    type: "URL",
    icon: Globe,
    category: "Clean Signature",
    riskScore: 12,
    status: "CLEARED",
    fileSize: "N/A",
    hash: "fa30c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852e185"
  },
  {
    id: "SCAN-2026-8399",
    timestamp: "2026-07-05 15:56:40",
    target: "receipt_screenshot_6619.jpeg",
    type: "IMAGE",
    icon: ImageIcon,
    category: "Neural Visual Cleared",
    riskScore: 18,
    status: "CLEARED",
    fileSize: "2.1 MB",
    hash: "c2b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852a441"
  }
];

const navigationItems = [
  { label: "Dashboard", ref: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze", ref: "/analyse", icon: Eye },
  { label: "History", ref: "/history", icon: History },
  { label: "Threat Reports", ref: "/threat-reports", icon: FileText },
  { label: "Cyber News", ref: "/", icon: Newspaper },
  { label: "Settings", ref: "/settings", icon: Settings }
];

export default function CipherGuardScanHistoryDashboard() {
  const [activeNav, setActiveNav] = useState("History");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filtering and searching states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [activeInspectorReport, setActiveInspectorReport] = useState<typeof historicalScansDatabase[0] | null>(null);

  // Filter evaluation pipeline
  const filteredReports = historicalScansDatabase.filter((scan) => {
    const matchesSearch = scan.target.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scan.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "ALL" || scan.type === selectedType;
    const matchesStatus = selectedStatus === "ALL" || scan.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 flex">
      
      {/* BACKGROUND INTERFEROMETER GLOW ARRANGEMENT */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* DESKTOP SIDEBAR PANEL */}
      <aside className="w-64 border-r border-gray-900/80 bg-[#080d22]/40 backdrop-blur-xl flex flex-col justify-between hidden lg:flex shrink-0 relative z-20">
        <div className="p-6 space-y-8">
          <CipherGuardLogo />

          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold tracking-wide font-mono transition-all relative group cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavGlow"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border-l-2 border-cyan-400 rounded-r-xl shadow-[inset_4px_0_12px_rgba(6,182,212,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <IconComponent className={`h-4 w-4 relative z-10 ${isActive ? "text-cyan-400" : ""}`} />
                  <span className="relative z-10"><a href={item.ref}>{item.label}</a></span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-900/60 font-mono text-[10px] text-gray-500">
          <div>VERSION 4.22.8-PRO</div>
        </div>
      </aside>

      {/* MOBILE DRAWER SHEET OVERLAY */}
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
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                      <Shield className="h-5 w-5 text-[#050816] stroke-[2.5]" />
                    </div>
                    <span className="text-md font-black tracking-wider text-white font-mono">
                      CIPHER<span className="text-cyan-400">GUARD</span>
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
                          setActiveNav(item.label);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          isActive ? "text-white bg-cyan-500/10 border-l-2 border-cyan-400" : "text-gray-400"
                        }`}
                      >
                        <IconComponent className={`h-4 w-4 ${isActive ? "text-cyan-400" : ""}`} />
                        <a href={item.ref}>{item.label}</a>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-gray-900 pt-4 space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-[#050816]">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-800 to-slate-900 flex items-center justify-center font-mono text-xs font-black text-cyan-400">
                    SR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Shyam Raja</div>
                    <span className="text-[10px] text-cyan-400/80 font-mono">Security Officer</span>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold font-mono">
                  <LogOut className="h-4 w-4" />
                  <span>Terminate Session (Logout)</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CORE VIEWPORT MAIN COMPONENT */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* HARDENED TOP STICKY HEADER */}
        <header className="h-20 border-b border-gray-900/60 bg-[#050816]/70 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 rounded-xl border border-gray-800 bg-[#090e24]/60 text-gray-400 lg:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Connected Ingestion Search Pipeline */}
          <div className={`hidden sm:flex max-w-md w-full rounded-xl bg-[#090e24]/80 border transition-all duration-300 items-center px-3.5 py-2 ${
            searchFocused ? "border-cyan-500/50" : "border-gray-900"
          }`}>
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history targets, hash signatures..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          <span className="sm:hidden font-mono font-black text-xs tracking-wider text-gray-400">
            CIPHER<span className="text-cyan-400">GUARD</span>
          </span>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="p-3 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 relative min-w-[44px] min-h-[44px] flex items-center justify-center">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <Bell className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-gray-900 bg-[#090e24]/40">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
                SR
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 hidden xs:inline-block flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" /> Live
              </span>
            </div>
          </div>
        </header>

        {/* COMPREHENSIVE HISTORY CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* MOBILE SCAN PIPELINE FIELD SEARCH FALLBACK */}
          <div className="sm:hidden w-full rounded-xl bg-[#090e24]/80 border border-gray-900 flex items-center px-3.5 py-3">
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search historical records..."
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          {/* HEADER SECTION METADATA ARCHIVE DESCRIPTION */}
          <section className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Historical Scan Index
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-medium">
                Review, filter, and inspect cryptographic signatures from every sandbox evaluation launched on this profile node.
              </p>
            </div>
            <div className="px-3 py-1.5 bg-[#050816] rounded-lg border border-gray-900 text-[10px] font-mono text-cyan-400 font-bold tracking-tight uppercase shrink-0 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 animate-spin [animation-duration:10s]" /> Immutable Archive Pipeline
            </div>
          </section>

          {/* HISTORICAL RUNTIME LOG TREND CHRONOLOGY */}
          <section className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight font-mono">7-Day Aggregated Vault Analytics</h3>
              <span className="text-[10px] font-mono text-gray-500">Historical telemetry tracking intervals</span>
            </div>
            <div className="h-48 w-full pt-2 font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalTimelineData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111827" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" tickLine={false} />
                  <YAxis stroke="#4b5563" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#090e24", borderColor: "#1f2937", borderRadius: "12px", color: "#fff" }} />
                  <Area type="monotone" dataKey="totalScans" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorScans)" name="Ingested Archives" />
                  <Area type="monotone" dataKey="threatsDetected" stroke="#ef4444" strokeWidth={1.5} fillOpacity={1} fill="url(#colorThreats)" name="Neutralized Anomalies" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* FILTER TOOLBAR CLUSTER MATRIX */}
          <section className="rounded-xl border border-gray-900 bg-[#090e24]/60 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-800">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Filter Matrix</span>
              </div>
              
              {/* Type Category Filter Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 text-[10px]">VECTOR:</span>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-[#050816] border border-gray-800 rounded-lg px-2 py-1 text-white outline-none focus:border-cyan-500/50"
                >
                  <option value="ALL">ALL CHANNELS</option>
                  <option value="URL">URL DOMAINS</option>
                  <option value="FILE">FILE PAYLOADS</option>
                  <option value="EMAIL">EMAIL INJECTIONS</option>
                  <option value="IMAGE">NEURAL IMAGES</option>
                  <option value="QR_CODE">QR ROUTING</option>
                </select>
              </div>

              {/* Status Verification Filter Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 text-[10px]">ASSESSMENT:</span>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#050816] border border-gray-800 rounded-lg px-2 py-1 text-white outline-none focus:border-cyan-500/50"
                >
                  <option value="ALL">ALL STATUSES</option>
                  <option value="CLEARED">CLEARED SIGNATURES</option>
                  <option value="QUARANTINED">QUARANTINED</option>
                  <option value="ISOLATED">ISOLATED THREATS</option>
                </select>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 text-left md:text-right">
              Showing <span className="text-cyan-400 font-bold">{filteredReports.length}</span> of {historicalScansDatabase.length} entries matching criteria
            </div>
          </section>

          {/* ADVANCED ARCHIVE SCAN MATRIX GRID LAYOUT */}
          <section className="space-y-3">
            <div className="hidden grid-cols-12 gap-4 px-5 py-2 text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest lg:grid border-b border-gray-900/40">
              <div className="col-span-2">Scan Identity / Time</div>
              <div className="col-span-4">Evaluation Target Parameter</div>
              <div className="col-span-2">Threat Vector</div>
              <div className="col-span-2 text-center">Risk Factor Scale</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-right">Inspect</div>
            </div>

            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {filteredReports.length > 0 ? (
                  filteredReports.map((scan) => {
                    const ScanVectorIcon = scan.icon;
                    const isHighRisk = scan.riskScore > 70;
                    const isMediumRisk = scan.riskScore >= 30 && scan.riskScore <= 70;
                    
                    return (
                      <motion.div
                        key={scan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl border border-gray-900/80 bg-[#090e24]/30 backdrop-blur-md p-4 sm:p-5 lg:py-4 transition-all hover:border-gray-800 hover:bg-[#090e24]/50 group relative overflow-hidden"
                      >
                        {/* High Risk Critical Neon Strip */}
                        {isHighRisk && (
                          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-red-500" />
                        )}

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                          
                          {/* Id / Timestamp metadata column cluster */}
                          <div className="col-span-1 lg:col-span-2 space-y-1 font-mono">
                            <div className="text-xs font-black text-white flex items-center gap-2">
                              <span className="lg:hidden p-1 rounded bg-gray-900 text-cyan-400">
                                <ScanVectorIcon className="h-3 w-3" />
                              </span>
                              {scan.id}
                            </div>
                            <div className="text-[10px] text-gray-500">{scan.timestamp}</div>
                          </div>

                          {/* Evaluation Target Path details column */}
                          <div className="col-span-1 lg:col-span-4 font-mono">
                            <span className="text-[9px] font-bold text-gray-600 uppercase block lg:hidden">Target Scope</span>
                            <div className="text-xs text-gray-200 font-medium truncate max-w-full group-hover:text-cyan-400 transition-colors">
                              {scan.target}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate mt-0.5 font-sans">
                              SHA256: <span className="font-mono text-[9px] text-gray-600">{scan.hash.substring(0, 24)}...</span>
                            </div>
                          </div>

                          {/* Threat Type Category classification column */}
                          <div className="col-span-1 lg:col-span-2 font-mono">
                            <span className="text-[9px] font-bold text-gray-600 uppercase block lg:hidden">Classification</span>
                            <div className="flex items-center gap-2 mt-0.5 lg:mt-0">
                              <div className="hidden lg:inline-flex p-1.5 rounded-lg bg-[#050816] border border-gray-900 text-cyan-400">
                                <ScanVectorIcon className="h-3.5 w-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-white tracking-tight">{scan.type}</div>
                                <div className="text-[10px] text-gray-500">{scan.category}</div>
                              </div>
                            </div>
                          </div>

                          {/* Risk Index Radial Progression bar mockup */}
                          <div className="col-span-1 lg:col-span-2 font-mono">
                            <span className="text-[9px] font-bold text-gray-600 uppercase block lg:hidden">Risk Index Assessment</span>
                            <div className="flex items-center gap-3 justify-start lg:justify-center mt-1 lg:mt-0">
                              <div className="w-full bg-[#050816] border border-gray-900 rounded-full h-1.5 max-w-[100px] hidden sm:block">
                                <div 
                                  className={`h-full rounded-full ${
                                    isHighRisk ? "bg-red-500" : isMediumRisk ? "bg-amber-500" : "bg-emerald-500"
                                  }`}
                                  style={{ width: `${scan.riskScore}%` }}
                                />
                              </div>
                              <span className={`text-xs font-black ${
                                isHighRisk ? "text-red-400" : isMediumRisk ? "text-amber-400" : "text-emerald-400"
                              }`}>{scan.riskScore}%</span>
                            </div>
                          </div>

                          {/* Verification Operational status flag */}
                          <div className="col-span-1 lg:col-span-1 text-left lg:text-center font-mono">
                            <span className="text-[9px] font-bold text-gray-600 uppercase block lg:hidden">Status Output</span>
                            <span className={`inline-block text-[9px] font-bold tracking-widest px-2 py-0.5 rounded border mt-1 lg:mt-0 ${
                              scan.status === "CLEARED" ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" :
                              scan.status === "ISOLATED" ? "bg-amber-500/5 border-amber-500/20 text-amber-400" :
                              "bg-red-500/5 border-red-500/20 text-red-400"
                            }`}>
                              {scan.status}
                            </span>
                          </div>

                          {/* Row Action expansion deployment button */}
                          <div className="col-span-1 lg:col-span-1 text-right">
                            <button
                              onClick={() => setActiveInspectorReport(scan)}
                              className="w-full lg:w-auto text-center justify-center font-mono text-[10px] font-bold tracking-tight uppercase px-3 py-1.5 rounded-lg bg-[#050816] border border-gray-900 text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                            >
                              <span>Inspect</span>
                              <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl border border-dashed border-gray-900 p-12 text-center font-mono text-xs text-gray-500"
                  >
                    <AlertTriangle className="h-6 w-6 text-amber-500/50 mx-auto mb-2" />
                    No historical scan logs matched current diagnostic search parameter vectors.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </main>
      </div>

      {/* DETAILED CRYPTOGRAPHIC REPORT ANALYSIS INSPECTOR MODAL */}
      <AnimatePresence>
        {activeInspectorReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInspectorReport(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-2xl bg-[#070b1e] border border-gray-900 rounded-2xl overflow-hidden shadow-2xl relative z-10 font-mono text-xs"
            >
              {/* Header Title Metadata Block */}
              <div className="p-5 border-b border-gray-900 bg-[#090e24]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-[#050816] border ${activeInspectorReport.riskScore > 70 ? 'text-red-400 border-red-500/20' : 'text-cyan-400 border-cyan-500/20'}`}>
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{activeInspectorReport.id} Diagnostic</h3>
                    <span className="text-[10px] text-gray-500">{activeInspectorReport.timestamp}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveInspectorReport(null)}
                  className="p-1.5 rounded-lg border border-gray-900 bg-[#050816] text-gray-500 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sandbox Data Telemetry Content Parameters */}
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Target Parameter Vector</span>
                  <div className="p-3 bg-[#050816] border border-gray-900 rounded-xl text-white break-all font-medium selection:bg-cyan-500/50">
                    {activeInspectorReport.target}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#050816]/50 border border-gray-900/60 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-500 uppercase font-bold">Vector Engine Type</span>
                    <div className="text-gray-200 text-xs font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      {activeInspectorReport.type}
                    </div>
                  </div>
                  <div className="p-3 bg-[#050816]/50 border border-gray-900/60 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-500 uppercase font-bold">Payload Profile Size</span>
                    <div className="text-gray-200 text-xs font-bold">{activeInspectorReport.fileSize}</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Immutable SHA256 Checksum Signature</span>
                  <div className="p-3 bg-[#050816] border border-gray-900 rounded-xl text-gray-400 break-all text-[11px]">
                    {activeInspectorReport.hash}
                  </div>
                </div>

                {/* Score Alert Ingest Strip banner */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  activeInspectorReport.riskScore > 70 ? 'bg-red-500/5 border-red-500/20 text-red-400' :
                  activeInspectorReport.riskScore >= 30 ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
                  'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                }`}>
                  <Info className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="space-y-1 font-sans">
                    <div className="font-mono text-xs font-bold uppercase">Verdict Assessment Matrix: {activeInspectorReport.category}</div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      {activeInspectorReport.riskScore > 70 
                        ? "This vector shows explicit malicious heuristics matching active weaponized patterns. Automated isolation routines successfully executed system sanitization." 
                        : "No critical threats found. This entity meets basic compliance standards and is marked safe for structural node routing inside local systems."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Sheet Footer Controls */}
              <div className="p-4 border-t border-gray-900 bg-[#090e24]/30 flex flex-wrap items-center justify-between gap-3">
                <button className="text-red-400 hover:text-red-300 font-bold px-3 py-2 rounded-lg hover:bg-red-500/5 transition-all flex items-center gap-1.5 cursor-pointer">
                  <Trash2 className="h-3.5 w-3.5" /> Purge Log
                </button>
                
                <div className="flex items-center gap-2">
                  {activeInspectorReport.type === "URL" && (
                    <button className="px-3 py-2 rounded-lg border border-gray-900 bg-[#050816] text-gray-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer">
                      <ExternalLink className="h-3.5 w-3.5" /> Sandbox Navigate
                    </button>
                  )}
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#050816] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10">
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