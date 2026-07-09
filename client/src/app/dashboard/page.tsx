"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Shield,
  Activity,
  Cpu,
  Terminal,
  Zap,
  Radio,
  Lock,
  Globe,
  Clock,
  Server,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Database,
  Search,
  ArrowUpRight,
  TrendingUp,
  Fingerprint,
  LayoutDashboard,
  Eye,
  History,
  FileText,
  Newspaper,
  User,
  Settings,
  Bell,
  Sun,
  Moon,
  LogOut,
  Mail,
  QrCode,
  Image as ImageIcon,
  ChevronRight,
  TrendingDown,
  Info
} from "lucide-react";

// --- HIGH REALISM SAMPLE CYBERSECURITY DATA ---
const scanActivityData = [
  { time: "00:00", scans: 12, threats: 2 },
  { time: "04:00", scans: 18, threats: 4 },
  { time: "08:00", scans: 45, threats: 12 },
  { time: "12:00", scans: 89, threats: 28 },
  { time: "16:00", scans: 61, threats: 19 },
  { time: "20:00", scans: 40, threats: 15 },
  { time: "24:00", scans: 20, threats: 7 }
];

const threatDistributionData = [
  { name: "Risk Index 0-20%", count: 140 },
  { name: "Risk Index 21-50%", count: 55 },
  { name: "Risk Index 51-80%", count: 32 },
  { name: "Risk Index 81-100%", count: 18 }
];

const scamCategoriesData = [
  { name: "Phishing Links", value: 42, color: "#06b6d4" },
  { name: "Malware Payloads", value: 25, color: "#3b82f6" },
  { name: "UPI Spoofing", value: 18, color: "#f59e0b" },
  { name: "Credential Stuffing", value: 15, color: "#ef4444" }
];

const recentScansList = [
  { id: "SC-8401", type: "URL String", input: "https://secure-login-axis-update.com/verify", score: 89, status: "High Risk", date: "2026-07-09 16:44" },
  { id: "SC-8402", type: "Email Payload", input: "Urgent: Income Tax Refund Statement Request.eml", score: 45, status: "Suspicious", date: "2026-07-09 15:12" },
  { id: "SC-8403", type: "QR Code Ingestion", input: "Static_UPI_Merchant_Gateway_Blob.png", score: 12, status: "Safe", date: "2026-07-09 14:05" },
  { id: "SC-8404", type: "Screenshot Vision", input: "WhatsApp_Chat_Investment_Offer.jpg", score: 68, status: "Suspicious", date: "2026-07-09 11:30" },
  { id: "SC-8405", type: "URL String", input: "https://github.com/cipherguard-network/sandbox", score: 0, status: "Safe", date: "2026-07-09 09:15" }
];

const liveCyberNews = [
  { id: 1, headline: "Zero-Day Exploit Targeted Across Banking Networks Bypassing Standard Auth Layers", source: "ThreatPost Intel", time: "12m ago" },
  { id: 2, headline: "Critical Multi-Factor Authentication Bypass Vector Identified in Common OAuth Ingestion Gateways", source: "CyberDefense Wire", time: "45m ago" },
  { id: 3, headline: "Massive Phishing Wave Exploiting Fake Government Relief Invoices Targets SMB Subnets", source: "BleepingComputer", time: "2h ago" },
  { id: 4, headline: "Decentralized Ransomware Syndicate Deploys Polymorphic Payloads via Malicious QR Vector Assemblies", source: "Mandiant Core", time: "4h ago" }
];

const cyberAttackMarkers = [
  { id: 1, x: "22%", y: "35%", label: "North America Node // Blocked Brute Force Array" },
  { id: 2, x: "50%", y: "28%", label: "EU Central Node // Quarantined EML Injection Payload" },
  { id: 3, x: "74%", y: "45%", label: "Asia Pacific Node // Mitigated Domain Redirection Matrix" },
  { id: 4, x: "32%", y: "72%", label: "South America Node // Intercepted API Command Spray" }
];

const recentDetectionsTimeline = [
  { time: "12:04 PM", title: "QR Scam Blocked", desc: "Malicious UPI routing payload completely sandboxed", type: "danger" },
  { time: "11:15 AM", title: "Safe Website Verified", desc: "SSL encryption chains and DOM reputation parameters optimal", type: "success" },
  { time: "10:31 AM", title: "Phishing Email Detected", desc: "Heuristic pattern analyzer flagged illegal sender spoof matrices", type: "warning" }
];

export default function CipherGuardEnterpriseDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 flex">
      
      {/* --- BACKGROUND GLOW LAYER MESH --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/[0.02] blur-[130px] pointer-events-none rounded-full" />

      {/* ────────────────────────────────────────────────────────
          LEFT SIDEBAR PANEL
      ──────────────────────────────────────────────────────── */}
      <aside className="w-64 border-r border-gray-900/80 bg-[#080d22]/40 backdrop-blur-xl flex flex-col justify-between hidden lg:flex shrink-0 relative z-20">
        <div className="p-6 space-y-8">
          {/* Logo Assembly */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Shield className="h-5 w-5 text-[#050816] stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 font-mono">
              CIPHER<span className="text-cyan-400">GUARD</span>
            </span>
          </div>

          {/* Navigation Items Map */}
          <nav className="space-y-1.5">
            {[
              { label: "Dashboard", ref : "/dashboard",icon: LayoutDashboard },
              { label: "Analyze", ref : "/analyse", icon: Eye },
              { label: "History", ref : "/history", icon: History },
              { label: "Threat Reports", ref : "/threat-reports", icon: FileText },
              { label: "Cyber News", ref : "/", icon: Newspaper },
              { label: "Settings", ref : "/settings", icon: Settings }
            ].map((item) => {
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
                    <>
                      <motion.div
                        layoutId="activeNavGlow"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border-l-2 border-cyan-400 rounded-r-xl shadow-[inset_4px_0_12px_rgba(6,182,212,0.15)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                      <span className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-2 h-8 bg-cyan-400 rounded-r-full blur-[4px] opacity-80" />
                    </>
                  )}
                  <IconComponent className={`h-4 w-4 relative z-10 transition-transform duration-300 ${isActive ? "text-cyan-400 scale-110" : "group-hover:scale-105"}`} />
                  <span className="relative z-10"><a href={item.ref}>{item.label}</a></span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Environment Status Metadata */}
        <div className="p-6 border-t border-gray-900/60 font-mono text-[10px] text-gray-500 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SECURE SYSTEM_NODE_01</span>
          </div>
          <div>VERSION 4.22.8-PRO</div>
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* ────────────────────────────────────────────────────────
            TOP NAVBAR INFRASTRUCTURE
        ──────────────────────────────────────────────────────── */}
        <header className="h-20 border-b border-gray-900/60 bg-[#050816]/70 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          
          {/* Interactive Unified Search Engine */}
          <div className={`max-w-md w-full rounded-xl bg-[#090e24]/80 border transition-all duration-300 flex items-center px-3.5 py-2 ${
            searchFocused ? "border-cyan-500/50 shadow-lg shadow-cyan-500/[0.03] scale-[1.01]" : "border-gray-900"
          }`}>
            <Search className={`h-4 w-4 mr-2.5 transition-colors duration-300 ${searchFocused ? "text-cyan-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Query IP arrays, suspicious domain hashes, threat signatures..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          {/* Action Arrays */}
          <div className="flex items-center gap-4">
            
            {/* Realtime Alert Multiplier Bell */}
            <button className="p-2.5 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 hover:text-white hover:border-gray-800 transition-all cursor-pointer relative group">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <Bell className="h-4 w-4 group-hover:scale-105 transition-transform" />
            </button>

            {/* Premium Theme Selector Toggles */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 hover:text-white hover:border-gray-800 transition-all cursor-pointer group"
            >
              {isDarkMode ? <Sun className="h-4 w-4 group-hover:rotate-45 transition-transform" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile Matrix Section */}
            <div className="h-8 w-px bg-gray-900" />
            
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-[3px] opacity-40 group-hover:opacity-70 transition-opacity" />
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-800 to-slate-900 border border-gray-700/50 flex items-center justify-center font-mono text-xs font-black text-cyan-400 relative z-10">
                  SR
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold font-mono text-white tracking-tight leading-none">Shyam Raja</div>
                <span className="text-[10px] font-mono text-cyan-400/80 font-medium tracking-tight">Security Officer</span>
              </div>
            </div>

            {/* System Logoff Mechanism */}
            <button className="p-2.5 rounded-xl border border-transparent text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer group ml-1">
              <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </header>

        {/* MAIN BODY AREA SCROLLER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-900">
          
          {/* ────────────────────────────────────────────────────────
              WELCOME CONTEXT SECTION & HEALTH SUMMARY MESH
          ──────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Greetings Ingestion Dashboard Unit */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/[0.01] blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                  Welcome back, Shyam <span className="animate-bounce origin-bottom-right inline-block">👋</span>
                </h2>
                <p className="text-sm text-gray-400 max-w-xl leading-relaxed font-medium">
                  Protect your digital world with AI-powered threat intelligence. The hyper-isolated analysis grid is synchronized and operating at low latency overhead thresholds.
                </p>
              </div>

              {/* Action Vectors Row Mapping */}
              <div className="mt-6 space-y-3">
                <span className="text-[10px] font-bold font-mono tracking-widest text-gray-500 uppercase block">QUICK THREAT INGESTION PIPELINES</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Analyze URL", icon: Globe, desc: "Scan link reputation" },
                    { label: "Scan Email", icon: Mail, desc: "Verify body payload" },
                    { label: "Upload Screenshot", icon: ImageIcon, desc: "Neural visual OCR" },
                    { label: "Scan QR Code", icon: QrCode, desc: "Track merchant routing" }
                  ].map((action, aIdx) => {
                    const ActionIcon = action.icon;
                    return (
                      <motion.button
                        key={aIdx}
                        whileHover={{ y: -3, borderColor: "rgba(6,182,212,0.4)" }}
                        className="p-3.5 rounded-xl border border-gray-900 bg-[#050816]/90 flex flex-col text-left gap-2.5 transition-all cursor-pointer hover:bg-gradient-to-b hover:from-[#090e24] hover:to-[#050816] relative overflow-hidden group/btn"
                      >
                        <div className="p-2 rounded-lg bg-gray-900/60 border border-gray-800 text-cyan-400 w-fit group-hover/btn:scale-105 transition-transform">
                          <ActionIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
                            {action.label}
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity translate-x-[-4px] group-hover/btn:translate-x-0 transition-transform" />
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium mt-0.5 block font-sans">{action.desc}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────
                SECURITY HEALTH SCORE WIDGET
            ──────────────────────────────────────────────────────── */}
            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-gray-900/60 pb-3">
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wider text-gray-400 uppercase">SECURITY HEALTH SCORE</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Realtime sandbox evaluations</p>
                </div>
                <Info className="h-3.5 w-3.5 text-gray-600" />
              </div>

              {/* High Tech Radial Progress Chart Ingress UI */}
              <div className="py-4 flex items-center justify-center relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="54" className="stroke-gray-900 stroke-[7] fill-none" />
                  <motion.circle 
                    cx="64" 
                    cy="64" 
                    r="54" 
                    className="stroke-cyan-400 stroke-[7] fill-none" 
                    strokeDasharray="339.3"
                    initial={{ strokeDashoffset: 339.3 }}
                    animate={{ strokeDashoffset: 339.3 - (339.3 * 92) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-3xl font-black text-white tracking-tight">92%</span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">EXCELLENT</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#050816]/90 border border-gray-900 p-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-gray-400">Threat Matrix Threshold</span>
                <span className="font-bold text-white bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">
                  0.02% Error Delta
                </span>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              STATISTICS CARDS MATRIX
          ──────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Scans Active", value: 245, trend: "+12.4%", up: true, subtitle: "Ingested payloads total", icon: Activity, color: "text-blue-400" },
              { title: "Threats Blocked Matrix", value: 87, trend: "+4.1%", up: true, subtitle: "Quarantined real-time", icon: Lock, color: "text-cyan-400" },
              { title: "Safe Audit Reports", value: 158, trend: "+8.2%", up: true, subtitle: "Clear signature validation", icon: CheckCircle2, color: "text-emerald-400" },
              { title: "Average Threat Score", value: "32%", trend: "-2.5%", up: false, subtitle: "System index aggregate", icon: Zap, color: "text-amber-400" }
            ].map((stat, sIdx) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={sIdx}
                  whileHover={{ y: -3, borderColor: "rgba(31,41,55,1)" }}
                  className="rounded-xl border border-gray-900/80 bg-[#090e24]/30 backdrop-blur-md p-5 flex flex-col justify-between h-36 transition-all relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold font-mono tracking-wider text-gray-500 uppercase block">{stat.title}</span>
                      <h3 className="text-2xl font-black text-white font-mono tracking-tight">{stat.value}</h3>
                    </div>
                    <div className={`p-2 rounded-lg bg-[#050816] border border-gray-900 ${stat.color} shadow-inner group-hover:scale-105 transition-transform`}>
                      <StatIcon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-900/40 font-mono text-[10px]">
                    <span className="text-gray-400 font-sans font-medium">{stat.subtitle}</span>
                    <div className={`flex items-center gap-0.5 font-bold ${stat.up ? "text-emerald-400" : "text-blue-400"}`}>
                      {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </section>

          {/* ────────────────────────────────────────────────────────
              THREAT ANALYTICS SECTION (RECHARTS INTEL MATRIX)
          ──────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Scan Time Series Activity Ingestion */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recent Scan Activity Stream</h3>
                <p className="text-xs text-gray-400 mt-0.5">Realtime ingestion counts cross-referenced with isolated dynamic threat anomalies</p>
              </div>
              <div className="h-64 w-full pt-2 font-mono text-[11px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scanActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="threatsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#4b5563" tickLine={false} />
                    <YAxis stroke="#4b5563" tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#090e24", borderColor: "#1f2937", borderRadius: "12px", color: "#white" }} />
                    <Area type="monotone" dataKey="scans" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#scansGrad)" name="Total Ingest Inquiries" />
                    <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={1.5} fillOpacity={1} fill="url(#threatsGrad)" name="Identified Anomaly Clusters" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inbound Attack Allocation Category Share */}
            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Scam Categories Weight Matrix</h3>
                <p className="text-xs text-gray-400 mt-0.5">Classification index map of active payload signatures</p>
              </div>

              <div className="h-44 w-full relative flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={scamCategoriesData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                      {scamCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#090e24", borderColor: "#1f2937", borderRadius: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono pointer-events-none">
                  <span className="text-xl font-black text-white">4 Vectors</span>
                  <span className="text-[9px] text-gray-500 uppercase font-medium tracking-tight mt-0.5">Monitored Loops</span>
                </div>
              </div>

              {/* Legend mapping details */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-900/60 text-[10px] font-mono">
                {scamCategoriesData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-400 truncate">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional secondary metric plot row distribution context */}
          <section className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight font-mono">Threat Score Distribution Array</h3>
              <p className="text-xs text-gray-400 mt-0.5">Stratification density indexing payload vulnerability indicators</p>
            </div>
            <div className="h-40 w-full pt-1 font-mono text-[11px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={threatDistributionData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#4b5563" tickLine={false} />
                  <YAxis stroke="#4b5563" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#090e24", borderColor: "#1f2937" }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={45}>
                    {threatDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? "#ef4444" : index === 2 ? "#f59e0b" : "#06b6d4"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              THREAT MAP VECTOR & AI INSIGHTS HARVEST PANEL
          ──────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* World Node Attack Trace Matrix Mapping */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Global Threat Map Synchronization</h3>
                <p className="text-xs text-gray-400 mt-0.5">Animated glowing markers pinpointing live telemetry intercept relays</p>
              </div>

              {/* High-fidelity abstract digital grid system rendering coordinates safely */}
              <div className="flex-1 bg-[#050816]/90 border border-gray-900/60 rounded-xl my-4 relative overflow-hidden flex items-center justify-center min-h-[220px]">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-70" />
                
                {/* Abstract structural outline layout decoration maps */}
                <svg className="absolute inset-0 w-full h-full text-gray-900/40 opacity-20 pointer-events-none" viewBox="0 0 800 400" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M50 150h120l30 40h80l20-30h110l40 60h100l30-40h120M200 80v200M450 50v260M650 90v220" />
                  <circle cx="200" cy="180" r="120" strokeDasharray="4 4" />
                  <circle cx="550" cy="220" r="90" strokeDasharray="3 6" />
                </svg>

                {/* Cyber attack coordinate markers iteration */}
                {cyberAttackMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute group/marker cursor-pointer"
                    style={{ left: marker.x, top: marker.y }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-white/20" />
                    </span>
                    
                    {/* Hover text label description layout popup panel */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 bg-[#090e24] border border-gray-800 text-[9px] font-mono p-2 rounded-lg shadow-2xl opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none z-30 leading-normal text-center text-white">
                      {marker.label}
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-2.5 right-3 flex items-center gap-4 font-mono text-[9px] text-gray-500">
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /><span>FEDERATED LOOKUPS ACTIVE</span></div>
                </div>
              </div>
            </div>

            {/* AI Insights Neural Output Container */}
            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between">
              <div className="border-b border-gray-900/60 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-white uppercase tracking-wider">
                  <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
                  <span>AI Security Insights Engine</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Automated mitigation directives parsed directly from live telemetry sets</p>
              </div>

              <div className="flex-1 space-y-3.5">
                {[
                  { type: "danger", msg: "High increase in phishing attacks targeting banking users identified across localized subnets today." },
                  { type: "warning", msg: "Multiple fake UPI scam domains detected running rogue certificate generation chains." },
                  { type: "success", msg: "Your recent scans indicate low exposure risk parameters across public repository matrices." }
                ].map((insight, iIdx) => (
                  <div
                    key={iIdx}
                    className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-relaxed font-medium ${
                      insight.type === "danger" ? "bg-red-500/5 border-red-500/10 text-red-400/90" :
                      insight.type === "warning" ? "bg-amber-500/5 border-amber-500/10 text-amber-400/90" :
                      "bg-emerald-500/5 border-emerald-500/10 text-emerald-400/90"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>{insight.msg}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-center border border-gray-800 bg-[#050816]/80 hover:bg-gray-900 rounded-xl py-2.5 text-xs font-bold font-mono tracking-wide text-gray-300 hover:text-white transition-colors cursor-pointer select-none">
                Deploy Structural Rules Matrix
              </button>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              RECENT SCANS TABLE & EVENT TIMELINE ROW
          ──────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Primary Ledger Ingestion Data Table Grid */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 shadow-2xl">
              <div className="border-b border-gray-900/60 pb-4 mb-4">
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recent Log Ingestion Stream</h3>
                <p className="text-xs text-gray-400 mt-0.5">Real-time index trace of incoming payload inquiries matching sandbox registers</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-gray-900/60 text-gray-500 font-sans font-bold text-[10px] tracking-wider uppercase">
                      <th className="pb-3 pl-1">Type Vector</th>
                      <th className="pb-3">Input Target Metadata</th>
                      <th className="pb-3">Risk Indicator</th>
                      <th className="pb-3">Reputation Status</th>
                      <th className="pb-3 text-right pr-1">Action Vector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900/20">
                    {recentScansList.map((row) => (
                      <tr key={row.id} className="hover:bg-cyan-500/[0.01] transition-colors group/row">
                        <td className="py-3.5 pl-1 font-bold text-gray-400 group-hover/row:text-white transition-colors">{row.type}</td>
                        <td className="py-3.5 max-w-xs truncate text-gray-300 font-sans font-medium pr-4" title={row.input}>{row.input}</td>
                        <td className="py-3.5 font-bold">
                          <span className={row.score > 70 ? "text-red-400" : row.score > 30 ? "text-amber-400" : "text-emerald-400"}>
                            {row.score}%
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            row.status === "High Risk" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                            row.status === "Suspicious" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right pr-1">
                          <button className="text-[10px] font-bold bg-[#050816] border border-gray-800 hover:border-cyan-500/40 rounded px-2.5 py-1 text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 ml-auto">
                            <span>View Report</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Timeline Detections Panel */}
            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recent Detections Feed</h3>
                <p className="text-xs text-gray-400 mt-0.5">Chronological sequencing of system log events</p>
              </div>

              <div className="relative border-l border-gray-800 pl-4 ml-1 space-y-5 py-2">
                {recentDetectionsTimeline.map((item, dIdx) => (
                  <div key={dIdx} className="relative group/time">
                    {/* Ring anchor placement node element wrapper definitions */}
                    <span className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border bg-[#050816] transition-transform group-hover/time:scale-125 ${
                      item.type === "danger" ? "border-red-500" :
                      item.type === "warning" ? "border-amber-500" :
                      "border-emerald-500"
                    }`} />
                    
                    <div className="space-y-0.5 font-mono">
                      <span className="text-[10px] text-gray-500 font-bold block">{item.time}</span>
                      <h4 className="text-xs font-bold text-white tracking-tight font-sans">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 font-sans font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────
              LIVE CYBER NEWS BANNER CAROUSEL
          ──────────────────────────────────────────────────────── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Newspaper className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold font-mono tracking-widest text-white uppercase">LIVE CYBER SECURITY INTEL INTEGRATION FEED</span>
            </div>

            {/* Horizontal auto-scrollable container layer */}
            <div className="w-full overflow-x-auto flex gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-900">
              {liveCyberNews.map((news) => (
                <div
                  key={news.id}
                  className="w-80 rounded-xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-md p-4 flex flex-col justify-between shrink-0 hover:border-gray-800 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[9px]">
                      <span className="text-cyan-400/90 font-bold bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">{news.source}</span>
                      <span className="text-gray-500">{news.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-400/90 transition-colors leading-snug line-clamp-2 font-sans font-medium">
                      {news.headline}
                    </h4>
                  </div>
                  <button className="mt-3 text-[10px] font-bold font-mono text-gray-400 hover:text-white flex items-center gap-0.5 w-fit cursor-pointer">
                    <span>Read Investigation Overview</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* ────────────────────────────────────────────────────────
            APPLICATION FOOTER BLOCK
        ──────────────────────────────────────────────────────── */}
        <footer className="h-14 border-t border-gray-900/40 bg-[#050816]/90 px-6 flex items-center justify-between text-[10px] font-mono text-gray-500 relative z-20">
          <span>CipherGuard © 2026</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span>Powered by AI Threat Intelligence Core Matrices</span>
          </div>
        </footer>

      </div>
    </div>
  );
}