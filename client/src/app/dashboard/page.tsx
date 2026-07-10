"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CipherGuardLogo from "../components/CipherGuardLogo";
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
  Sun,
  Moon,
  LogOut,
  Mail,
  QrCode,
  Shield,
  Image as ImageIcon,
  Info,
  Menu,
  X,
  UserCheck
} from "lucide-react";

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

const cyberAttackMarkers = [
  { id: 1, x: "22%", y: "35%", label: "North America Node // Blocked Brute Force Array" },
  { id: 2, x: "50%", y: "28%", label: "EU Central Node // Quarantined EML Injection Payload" },
  { id: 3, x: "74%", y: "45%", label: "Asia Pacific Node // Mitigated Domain Redirection Matrix" },
  { id: 4, x: "32%", y: "72%", label: "South America Node // Intercepted API Command Spray" }
];

const navigationItems = [
  { label: "Dashboard", ref: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze", ref: "/analyse", icon: Eye },
  { label: "History", ref: "/history", icon: History },
  { label: "Threat Reports", ref: "/threat-reports", icon: FileText },
  { label: "Cyber News", ref: "/", icon: Newspaper },
  { label: "Settings", ref: "/settings", icon: Settings }
];

export default function CipherGuardEnterpriseDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 flex">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* DESKTOP SIDEBAR */}
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

      {/* MOBILE DRAWER OVERLAY */}
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

              {/* MOBILE DEDICATED LOGIN / METRICS AREA */}
              <div className="border-t border-gray-900 pt-4 space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-[#050816]">
                 <a href="/profile"><div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-800 to-slate-900 flex items-center justify-center font-mono text-xs font-black text-cyan-400" >
                    SR
                  </div></a> 
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

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* MOBILE HARIDENED TOP NAVBAR */}
        <header className="h-20 border-b border-gray-900/60 bg-[#050816]/70 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          
          {/* Hamburger (Guaranteed 44x44px Touch Target) */}
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 rounded-xl border border-gray-800 bg-[#090e24]/60 text-gray-400 lg:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar layout rules change gracefully on mobile sizes */}
          <div className={`hidden sm:flex max-w-md w-full rounded-xl bg-[#090e24]/80 border transition-all duration-300 items-center px-3.5 py-2 ${
            searchFocused ? "border-cyan-500/50" : "border-gray-900"
          }`}>
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Query arrays, threat signatures..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          {/* Quick Stats App Logo fallback for ultra-small views */}
          <span className="sm:hidden font-mono font-black text-xs tracking-wider text-gray-400">
            CIPHER<span className="text-cyan-400">GUARD</span>
          </span>

          {/* System Control Clusters */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="p-3 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 relative min-w-[44px] min-h-[44px] flex items-center justify-center">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <Bell className="h-4 w-4" />
            </button>

            {/* Quick Active Status/Login Badge for Android Touch Screens */}
            <div className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-gray-900 bg-[#090e24]/40">
             <a href="/profile"> <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
                SR
              </div></a>
              <span className="text-[10px] font-mono font-bold text-emerald-400 hidden xs:inline-block flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" /> Live
              </span>
            </div>
          </div>
        </header>

        {/* MAIN BODY AREA SCROLLER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* SEARCH BAR POSITION FOR MOBILE VIEWS */}
          <div className="sm:hidden w-full rounded-xl bg-[#090e24]/80 border border-gray-900 flex items-center px-3.5 py-3">
            <Search className="h-4 w-4 mr-2.5 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Scan hashes, IP signatures..."
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          {/* WELCOME SECTION & PIPELINES */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome back, Shyam 👋
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-medium">
                  Protect your digital world with AI-powered threat intelligence. Isolated analysis grids are synchronized.
                </p>
              </div>

              {/* QUICK INGESTION SCAN PIPELINES */}
              <div className="mt-6 space-y-3">
                <span className="text-[10px] font-bold font-mono tracking-widest text-gray-500 uppercase block">QUICK THREAT INGESTION PIPELINES</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Analyze URL", icon: Globe, desc: "Scan link data" },
                    { label: "Scan Email", icon: Mail, desc: "Verify payload" },
                    { label: "Upload Image", icon: ImageIcon, desc: "Neural visual OCR" },
                    { label: "Scan QR Code", icon: QrCode, desc: "Track routing" }
                  ].map((action, aIdx) => {
                    const ActionIcon = action.icon;
                    return (
                      <motion.button
                        key={aIdx}
                        whileTap={{ scale: 0.96 }}
                        className="p-3.5 rounded-xl border border-gray-900 bg-[#050816] flex flex-col text-left gap-3 transition-all cursor-pointer active:border-cyan-500/50 min-h-[105px] justify-between relative z-10"
                      >
                        <div className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-cyan-400 w-fit shrink-0">
                          <ActionIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono tracking-tight">
                            {action.label}
                          </div>
                          <span className="text-[9px] text-gray-500 font-medium mt-0.5 block leading-tight">{action.desc}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECURITY HEALTH SCORE WIDGET */}
            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-gray-900/60 pb-3">
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-wider text-gray-400 uppercase">SECURITY HEALTH SCORE</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Realtime sandbox evaluations</p>
                </div>
                <Info className="h-3.5 w-3.5 text-gray-600" />
              </div>

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
                <span className="text-gray-400">Threat Delta</span>
                <span className="font-bold text-white bg-gray-900 border border-gray-800 px-2 py-0.5 rounded">0.02% Error</span>
              </div>
            </div>
          </section>

          {/* STATISTICS CARDS MATRIX */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Scans Active", value: 245, trend: "+12.4%", subtitle: "Ingested payloads", icon: Activity, color: "text-blue-400" },
              { title: "Threats Blocked Matrix", value: 87, trend: "+4.1%", subtitle: "Quarantined loops", icon: Lock, color: "text-cyan-400" },
              { title: "Safe Audit Reports", value: 158, trend: "+8.2%", subtitle: "Signature clears", icon: CheckCircle2, color: "text-emerald-400" },
              { title: "Average Threat Score", value: "32%", trend: "-2.5%", subtitle: "System aggregates", icon: Zap, color: "text-amber-400" }
            ].map((stat, sIdx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={sIdx}
                  className="rounded-xl border border-gray-900/80 bg-[#090e24]/30 backdrop-blur-md p-5 flex flex-col justify-between h-36 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold font-mono tracking-wider text-gray-500 uppercase block">{stat.title}</span>
                      <h3 className="text-2xl font-black text-white font-mono tracking-tight">{stat.value}</h3>
                    </div>
                    <div className={`p-2 rounded-lg bg-[#050816] border border-gray-900 ${stat.color}`}>
                      <StatIcon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-900/40 font-mono text-[10px]">
                    <span className="text-gray-400 font-sans font-medium">{stat.subtitle}</span>
                    <span className="text-emerald-400 font-bold">{stat.trend}</span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* RECHARTS ACTIVITY GRIDS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-4 sm:p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recent Scan Activity Stream</h3>
              </div>
              <div className="h-64 w-full pt-2 font-mono text-[11px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scanActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="time" stroke="#4b5563" tickLine={false} />
                    <YAxis stroke="#4b5563" tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#090e24", borderColor: "#1f2937", borderRadius: "12px", color: "#fff" }} />
                    <Area type="monotone" dataKey="scans" stroke="#06b6d4" strokeWidth={2} fillOpacity={0.05} fill="#06b6d4" name="Total Ingest Inquiries" />
                    <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={1.5} fillOpacity={0.05} fill="#ef4444" name="Identified Anomaly Clusters" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight font-mono">Scam Categories Weight Matrix</h3>
              </div>

              <div className="h-44 w-full relative flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={scamCategoriesData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                      {scamCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono pointer-events-none">
                  <span className="text-xl font-black text-white">4 Vectors</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-900/60 text-[10px] font-mono">
                {scamCategoriesData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-400 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI NEURAL OUTPUT ENGINE */}
          <section className="rounded-2xl border border-gray-900 bg-[#090e24]/40 backdrop-blur-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">AI Insights Neural Engine</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-mono">Neural telemetry arrays are parsing telemetry weights normally.</p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-[#050816] rounded-lg border border-gray-900 text-[10px] font-mono text-cyan-400 font-bold tracking-tight uppercase shrink-0">
              Heuristic Pattern Aggregation
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}