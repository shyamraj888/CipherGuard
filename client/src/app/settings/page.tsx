"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Eye,
  History,
  FileText,
  Newspaper,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Database,
  ArrowUpRight,
  Globe,
  Mail,
  SlidersHorizontal,
  UploadCloud,
  Layers,
  Palette,
  EyeOff,
  Trash2,
  ShieldAlert,
  Server,
  CloudLightning,
  Check,
  X
} from "lucide-react";

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}

const PremiumToggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-900 bg-[#050816]/60 backdrop-blur-md hover:border-gray-800 transition-all group">
      <div className="space-y-1 max-w-[80%]">
        <label 
          className="text-xs font-bold text-gray-200 tracking-wide font-sans block cursor-pointer group-hover:text-white transition-colors" 
          onClick={() => onChange(!checked)}
        >
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-gray-500 font-sans font-medium leading-relaxed tracking-normal">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative shrink-0 ${
          checked ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-gray-900 border border-gray-800"
        }`}
      >
        <motion.div
          layout
          className="w-4 h-4 rounded-full bg-white shadow-md"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          animate={{ x: checked ? 18 : 0 }}
        />
      </button>
    </div>
  );
};

interface CardWrapperProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  danger?: boolean;
}

const SectionCard: React.FC<CardWrapperProps> = ({ title, subtitle, icon: Icon, children, danger = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-2xl border bg-[#090e24]/30 backdrop-blur-xl p-6 relative overflow-hidden ${
        danger ? "border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.03)]" : "border-gray-900/80"
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.005] blur-2xl pointer-events-none" />
      <div className="flex items-start gap-4 border-b border-gray-900/60 pb-4 mb-5">
        <div className={`p-2 rounded-xl bg-[#050816] border ${danger ? "border-red-500/20 text-red-400" : "border-gray-800 text-cyan-400"}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white tracking-wider font-mono uppercase">
            {title}
          </h3>
          <p className="text-[11px] text-gray-500 font-sans font-medium tracking-normal leading-normal">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
  );
};
// MAIN CONFIGURATION ENGINE
// ────────────────────────────────────────────────────────

export default function CipherGuardSettings() {
  const [activeNav] = useState("Settings");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  
 const [showThemeNotice, setShowThemeNotice] = useState(false);

 useEffect(() => {
  if (showThemeNotice) {
const timer = setTimeout(() => setShowThemeNotice(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showThemeNotice]);

  // Form State Vectors
  const [accountForm, setAccountForm] = useState({
    name: "Shyam Raja",
    email: "shyam.raja@cipherguard.io",
    username: "shyam_raja_sec",
    phone: "+91 98765 43210"
  });

  const [securitySwitches, setSecuritySwitches] = useState({
    twoFactor: true,
    loginNotif: true,
    trustedDev: false,
    biometrics: true,
    reqPassword: true,
    autoLogout: true,
    showScore: true
  });

  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [showPass, setShowPass] = useState({ current: false, next: false, confirm: false });

  const [notifSwitches, setNotifSwitches] = useState({
    email: true,
    threat: true,
    weekly: true,
    updates: false,
    marketing: false,
    browser: true,
    push: true
  });

  const [scanSettings, setScanSettings] = useState({
    mode: "Standard Scan",
    autoSave: true,
    enableOcr: true,
    enableAi: true,
    showTech: true,
    format: "JSON"
  });

  const [appearance, setAppearance] = useState({
    theme: "Dark",
    accent: "Cyan",
    fontSize: "Medium",
    animations: true,
    glass: true,
    compact: false
  });

  const [privacy, setPrivacy] = useState({
    anonymous: false,
    storeHistory: true,
    retention: "30 Days"
  });

  const [services, setServices] = useState([
    { id: "vt", name: "VirusTotal Core Grid", status: "Connected", icon: Server },
    { id: "gsb", name: "Google Safe Browsing Node", status: "Connected", icon: Globe },
    { id: "aib", name: "AbuseIPDB Reputation API", status: "Connected", icon: ShieldAlert },
    { id: "napi", name: "Global Intelligence News Feed", status: "Disconnected", icon: CloudLightning }
  ]);

  const [refreshingService, setRefreshingService] = useState<string | null>(null);

  // Password Complexity Evaluator
  const getPasswordStrength = () => {
    if (!passwordForm.next) return { score: 0, label: "Null Array", color: "bg-gray-800" };
    let strength = 0;
    if (passwordForm.next.length >= 8) strength++;
    if (/[A-Z]/.test(passwordForm.next)) strength++;
    if (/[0-9]/.test(passwordForm.next)) strength++;
    if (/[^A-Za-z0-9]/.test(passwordForm.next)) strength++;

    switch (strength) {
      case 1: return { score: 25, label: "CRITICAL COMPROMISE RISK", color: "bg-red-500" };
      case 2: return { score: 50, label: "WEAK SIGNATURE", color: "bg-amber-500" };
      case 3: return { score: 75, label: "SECURE INGESTION ENGINE", color: "bg-blue-500" };
      case 4: return { score: 100, label: "UNCOMPROMISABLE VAULT MATRIX", color: "bg-emerald-500" };
      default: return { score: 0, label: "Null Array", color: "bg-gray-800" };
    }
  };

  const strength = getPasswordStrength();

  const handleRefreshService = (id: string) => {
    setRefreshingService(id);
    setTimeout(() => {
      setServices(prev =>
        prev.map(s => (s.id === id ? { ...s, status: "Connected" } : s))
      );
      setRefreshingService(null);
    }, 1000);
  };

  const triggerModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 flex">
      {/* BACKGROUND VECTOR LAYERS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/[0.015] blur-[150px] pointer-events-none rounded-full" />

      {/* ────────────────────────────────────────────────────────
          LEFT SIDEBAR HOUSING PIPELINES
      ──────────────────────────────────────────────────────── */}
      <aside className="w-64 border-r border-gray-900/80 bg-[#080d22]/40 backdrop-blur-xl flex flex-col justify-between hidden lg:flex shrink-0 relative z-20">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Shield className="h-5 w-5 text-[#050816] stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 font-mono">
              CIPHER<span className="text-cyan-400">GUARD</span>
            </span>
          </div>

          <nav className="space-y-1.5">
            {[
              { label: "Dashboard", ref : "/dashboard",icon: LayoutDashboard },
                           { label: "Analyze", ref : "/analyse", icon: Eye },
                           { label: "History", ref : "/history", icon: History },
                           { label: "Threat Reports", ref : "/threat-reports", icon: FileText },
                           { label: "Cyber News", ref : "/", icon: Newspaper },
                           { label: "Settings", ref : "/settings", icon: Settings }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold tracking-wide font-mono transition-all relative group cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="sidebarActiveGlow"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border-l-2 border-cyan-400 rounded-r-xl shadow-[inset_4px_0_12px_rgba(6,182,212,0.15)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                      <span className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-2 h-8 bg-cyan-400 rounded-r-full blur-[4px]" />
                    </>
                  )}
                  <IconComp className={`h-4 w-4 relative z-10 ${isActive ? "text-cyan-400 scale-110" : "group-hover:scale-105"}`} />
                  <span className="relative z-10"><a href={item.ref}>{item.label}</a></span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-900/60 font-mono text-[10px] text-gray-500 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>SECURE SYSTEM_NODE_01</span>
          </div>
          <div>VERSION 1.0.0-PRO</div>
        </div>
      </aside>

      {/* COMPONENT STREAM CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* ────────────────────────────────────────────────────────
            TOP NAVIGATION LAYER
        ──────────────────────────────────────────────────────── */}
        <header className="h-20 border-b border-gray-900/60 bg-[#050816]/70 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className={`max-w-md w-full rounded-xl bg-[#090e24]/80 border transition-all duration-300 flex items-center px-3.5 py-2 ${
            searchFocused ? "border-cyan-500/50 shadow-lg shadow-cyan-500/[0.03]" : "border-gray-900"
          }`}>
            <Search className={`h-4 w-4 mr-2.5 ${searchFocused ? "text-cyan-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Query routing targets, rules matrices, config structures..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-xs font-mono placeholder-gray-600 outline-none text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 hover:text-white relative group">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <Bell className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-xl border border-gray-900 bg-[#090e24]/60 text-gray-400 hover:text-white">
              <Sun className="h-4 w-4" />
            </button>
            <div className="h-8 w-px bg-gray-900" />
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-800 to-slate-900 border border-gray-700/50 flex items-center justify-center font-mono text-xs font-black text-cyan-400">
                SR
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold font-mono text-white tracking-tight leading-none">Shyam Raja</div>
                <span className="text-[10px] font-mono text-cyan-400/80 font-medium">Security Officer</span>
              </div>
            </div>
            <button className="p-2.5 rounded-xl border border-transparent text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA SCROLLER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-5xl w-full mx-auto">
          
          {/* HEADER FRAME */}
          <div className="border-b border-gray-900/60 pb-6">
            <h1 className="text-2xl font-black text-white tracking-tight font-mono uppercase">System Settings</h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Manage your CipherGuard instance rules, privacy parameters, ingestion triggers, and deployment authorization states.
            </p>
          </div>

          {/* ────────────────────────────────────────────────────────
              SECTION 1: ACCOUNT CONTEXT PIPELINES
          ──────────────────────────────────────────────────────── */}
          <SectionCard title="Account Settings" subtitle="Modify system operator credentials and route channels" icon={User}>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6 bg-[#050816]/40 p-4 rounded-xl border border-gray-900">
              <div className="relative group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/10">
                  <div className="h-full w-full bg-[#090e24] rounded-[14px] flex items-center justify-center font-mono text-xl font-black text-white">
                    SR
                  </div>
                </div>
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-cyan-400 hover:text-white transition-colors shadow-xl">
                  <UploadCloud className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Operator Profile Matrix</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Avatar adjustments dynamically populate active report logs. PNG/JPG formats permitted.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {[
                { key: "name", label: "Operator Full Name", val: accountForm.name },
                { key: "email", label: "Email Route Address", val: accountForm.email },
                { key: "username", label: "System Identity Tag", val: accountForm.username },
                { key: "phone", label: "Secure Gateway Phone", val: accountForm.phone }
              ].map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{field.label}</span>
                  <input
                    type="text"
                    value={field.val}
                    onChange={(e) => setAccountForm({ ...accountForm, [field.key]: e.target.value })}
                    className="w-full bg-[#050816]/80 border border-gray-900 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500/40 focus:shadow-[0_0_15px_rgba(6,182,212,0.02)] transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-900/40">
              <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-bold font-mono text-gray-400 hover:text-white transition-all">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold font-mono text-[#050816] transition-all shadow-md shadow-cyan-500/10">
                Save Changes
              </button>
            </div>
          </SectionCard>

          {/* ────────────────────────────────────────────────────────
              SECTION 2: SECURITY & SYSTEM REPUTATION SCORE
          ──────────────────────────────────────────────────────── */}
          <SectionCard title="Security Settings" subtitle="Configure multi-tenant authorization rules and validation tokens" icon={Lock}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              <div className="md:col-span-2 space-y-3">
                <PremiumToggle
                  checked={securitySwitches.twoFactor}
                  onChange={(val) => setSecuritySwitches({ ...securitySwitches, twoFactor: val })}
                  label="Enable Two-Factor Authentication (2FA)"
                  description="Enforces strict verification tokens alongside identity arrays upon entry loop."
                />
                <PremiumToggle
                  checked={securitySwitches.loginNotif}
                  onChange={(val) => setSecuritySwitches({ ...securitySwitches, loginNotif: val })}
                  label="Real-time Login Notification Triggers"
                  description="Dispatches instant perimeter alerts to verified email addresses on entry."
                />
            
                <PremiumToggle
                  checked={securitySwitches.reqPassword}
                  onChange={(val) => setSecuritySwitches({ ...securitySwitches, reqPassword: val })}
                  label="Require Password for Sensitive Mutations"
                  description="Forces immediate password verification loops when modifying system definitions."
                />
                
                
              </div>

              {/* SECURITY GAUGE */}
              <div className="rounded-xl border border-gray-900 bg-[#050816]/40 p-5 flex flex-col items-center justify-between h-full text-center min-h-[280px]">
                <div className="w-full text-left font-mono">
                  <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block">SECURITY SECURITY GAIN</span>
                </div>

                <div className="relative flex items-center justify-center my-4">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle cx="56" cy="56" r="48" className="stroke-gray-900 stroke-[6] fill-none" />
                    <circle 
                      cx="56" 
                      cy="56" 
                      r="48" 
                      className="stroke-cyan-400 stroke-[6] fill-none" 
                      strokeDasharray="301.6"
                      strokeDashoffset={301.6 - (301.6 * 92) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                    <span className="text-2xl font-black text-white tracking-tight">92%</span>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">EXCELLENT</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 leading-normal font-medium">
                  Perimeter encryption arrays are optimal. Activating trusted devices option will reduce this vector threshold by 2%.
                </p>
              </div>

            </div>
          </SectionCard>

         

          {/* ────────────────────────────────────────────────────────
              SECTION 4: ALERT NOTIFICATION SUBSYSTEMS
          ──────────────────────────────────────────────────────── */}
          <SectionCard title="Notification Subsystems" subtitle="Calibrate dispatch arrays for real-time telemetry drops" icon={Bell}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PremiumToggle checked={notifSwitches.email} onChange={(v) => setNotifSwitches({ ...notifSwitches, email: v })} label="Global Cybersecurity Alerts" description="Send you the latest cybersecurity updates and threat intelligence." />
              <PremiumToggle checked={notifSwitches.push} onChange={(v) => setNotifSwitches({ ...notifSwitches, push: v })} label="Alert when someone also reports the same threat" description="Enable it for better protection" />
            </div>
          </SectionCard>

{//section 5: APPEARANCE CONFIGURATIONS
}        

     <SectionCard title="Appearance Configurations" subtitle="Select your global infrastructure workspace interface skin" icon={Palette}>
  <div className="font-mono text-xs max-w-md relative min-h-[115px]">
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
          Master Theme Engine
        </span>
        <span className="text-[10px] font-bold text-gray-600 font-mono tracking-tight uppercase flex items-center gap-1">
          ● Standard Dark Active
        </span>
      </div>
      
      <button
        type="button"
        onClick={() => setShowThemeNotice(true)}
        className="w-full py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-wider bg-[#050816] border border-gray-900 hover:border-gray-800 text-gray-400 hover:text-gray-200 transition-all flex items-center justify-between cursor-pointer group"
      >
        <span>Change Interface Theme</span>
        <span className="text-[9px] bg-gray-950 border border-gray-900 px-2 py-0.5 rounded text-gray-500 group-hover:text-cyan-400 transition-colors">
          COMING SOON
        </span>
      </button>

      <p className="text-[11px] text-gray-500 font-sans font-medium mt-1 leading-normal">
        Custom visual skins, high-contrast assets, and custom telemetry color mapping maps are currently restricted.
      </p>
    </div>

    {showThemeNotice && (
      <div className="absolute inset-0 bg-[#050816]/95 backdrop-blur-xs border border-cyan-500/20 rounded-xl flex items-center justify-center p-4 transition-all duration-200 ease-out">
        <div className="text-center space-y-1">
          <div className="text-cyan-400 font-bold text-[11px] uppercase tracking-widest animate-pulse">
            System Notice
          </div>
          <p className="text-gray-400 text-[11px] font-sans font-medium">
            This feature will be available in future updates.
          </p>
        </div>
      </div>
    )}
  </div>
</SectionCard>
        
          {/* ────────────────────────────────────────────────────────
              SECTION 8: FEDERATED INTEL PLUGINS
          ──────────────────────────────────────────────────────── */}
          <SectionCard title="Connected Intelligence Services" subtitle="Validate federated third-party API reputation integrations" icon={Database}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {services.map((srv) => {
                const ServiceIcon = srv.icon;
                const isConnected = srv.status === "Connected";
                const isThisRefreshing = refreshingService === srv.id;

                return (
                  <div key={srv.id} className="p-4 rounded-xl border border-gray-900 bg-[#050816]/60 flex items-center justify-between gap-4 group hover:border-gray-800 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-950 border border-gray-900 ${isConnected ? "text-cyan-400" : "text-gray-600"}`}>
                        <ServiceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white tracking-tight">{srv.name}</h4>
                        <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border mt-1 ${
                          isConnected ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-red-500/5 border-red-500/20 text-red-400"
                        }`}>
                          {srv.status}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRefreshService(srv.id)}
                      disabled={isThisRefreshing}
                      className="p-2 rounded-lg bg-gray-950 border border-gray-900 text-gray-400 hover:text-white transition-colors cursor-pointer group/btn disabled:opacity-50"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${isThisRefreshing ? "animate-spin text-cyan-400" : "group-hover/btn:rotate-180 transition-transform duration-300"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* ────────────────────────────────────────────────────────
              SECTION 9: DANGER DEPLOYMENT SECTOR
          ──────────────────────────────────────────────────────── */}
          <SectionCard title="Danger Injunction Zone" subtitle="Destructive actions " icon={ShieldAlert} danger>
            <p className="text-xs text-red-400/80 leading-relaxed font-mono font-medium mb-4 bg-red-500/[0.02] border border-red-500/10 p-3 rounded-xl">
              WARNING: Operations housed within this perimeter manipulate root instances directly. Data destruction cycles triggered cannot be bypassed or pulled back post execution.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              <button onClick={() => triggerModal("purgeReports")} className="w-full text-center border border-red-900/30 bg-red-500/5 hover:bg-red-500/10 rounded-xl py-2.5 font-bold tracking-wide text-red-400 transition-all cursor-pointer">
                Clear All Threat Reports
              </button>
              <button onClick={() => triggerModal("killSessions")} className="w-full text-center border border-gray-900 bg-gray-950 hover:bg-gray-900 rounded-xl py-2.5 font-bold tracking-wide text-gray-300 transition-all cursor-pointer">
                Logout
              </button>
             
              <button onClick={() => triggerModal("terminateAccount")} className="w-full text-center bg-red-600 hover:bg-red-500 rounded-xl py-2.5 font-bold tracking-wide text-[#050816] transition-all cursor-pointer shadow-lg shadow-red-500/5">
                Terminate Master Account
              </button>
            </div>
          </SectionCard>

        </main>

        {/* ────────────────────────────────────────────────────────
            FOOTER CHASSIS
        ──────────────────────────────────────────────────────── */}
        <footer className="h-16 border-t border-gray-900/40 bg-[#050816]/90 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-gray-500 shrink-0 relative z-20 py-3 sm:py-0 text-center sm:text-left">
          <span>CipherGuard © 2026 // SYSTEM TERMINAL CONSOLE</span>
          <div className="flex items-center gap-4">
            <span>VERSION 1.0.0</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span>LAST HARD CONFIG REFRESH: JULY 2026</span>
          </div>
        </footer>
      </div>

      {/* ────────────────────────────────────────────────────────
          OPERATIONAL VALIDATION MODAL CHAMBER
      ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#090e24] border border-red-500/30 rounded-2xl max-w-md w-full p-6 relative z-10 shadow-2xl font-mono text-xs space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    {modalType === "terminateAccount" && "Authorize Master Elimination"}
                    {modalType === "purgeReports" && "Authorize Report Database Purge"}
                    {modalType === "killSessions" && "Terminate Distributed Sessions"}
                    {modalType === "resetConfig" && "Confirm Instance Architecture Reset"}
                    {modalType === "wipeHistory" && "Confirm Local History Destruction"}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed font-sans font-medium">
                    {modalType === "terminateAccount" && "This pipeline drops all provisioned subscription profiles, clears system storage vaults completely, and releases network hashes permanently."}
                    {modalType === "purgeReports" && "This process executes a hard truncate statement across all accumulated detection sheets. Downstream analytic aggregators will drop metrics."}
                    {modalType === "killSessions" && "Forcibly revokes active bearer tokens across all devices. Current operation sessions outside this tracking console terminate immediately."}
                    {modalType === "resetConfig" && "Restores default operational weight settings, disabling all custom white-lists and metric tracking filters."}
                    {modalType === "wipeHistory" && "Wipes the local index trace cache cleanly. Global server backups remain unmutated unless instance termination is authorized."}
                  </p>
                </div>
              </div>

              <div className="bg-[#050816]/80 border border-gray-900 p-3.5 rounded-xl space-y-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Verification Challenge Input</span>
                <p className="text-[11px] text-gray-400 font-sans font-medium">Type <span className="text-white font-mono font-bold select-all bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800">AUTHORIZE_DESTRUCT</span> to commit structural override:</p>
                <input
                  type="text"
                  placeholder="Challenge input value..."
                  className="w-full bg-[#050816] border border-gray-900 rounded-lg px-3 py-2 text-white outline-none focus:border-red-500/40 mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                  Abort Action
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-[#050816] font-bold transition-all shadow-md shadow-red-500/10"
                >
                  Confirm & Commit Execution Loop
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}