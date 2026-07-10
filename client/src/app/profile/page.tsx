"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CipherGuardLogo from "../components/CipherGuardLogo";
import { 
  Shield, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  AlertTriangle, 
  Cpu,
  User,
  Lock,
  Key,
  Terminal,
  Activity,
  Zap,
  Mail,
  Smartphone,
  MapPin,
  Calendar,
  CheckCircle2,
  Server,
  CloudLightning,
  RefreshCw,
  LogOut,
  Sliders,
  Database
} from "lucide-react";

// ============================================================================
// MAIN PROFILE PAGE CONTEXT WRAPPER
// ============================================================================
export default function CipherGuardProfilePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1120] font-sans text-[#F8FAFC] antialiased selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Premium Ambient Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[2000px] right-0 w-[500px] h-[500px] bg-blue-600/5 blur-3xl pointer-events-none z-0" />

      <Navbar />
      
      <main className="relative z-10 space-y-12 max-w-7xl mx-auto px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <ProfileHeader />
        <UserStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main profile settings/info form takes 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <AccountDetails />
            <SecurityNodes />
          </div>
          
          {/* Live Activity Feed panel takes 1 col */}
          <div className="lg:col-span-1">
            <LiveActivityTerminal />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ============================================================================
// 1. STICKY NAVBAR COMPONENT
// ============================================================================
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Threat Vault", href: "/threat-history" },
    { name: "Home", href: "/" },
    { name: "Profile Node", href: "/profile" },
    { name: "System Settings", href: "/settings" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? "border-gray-800/80 bg-[#0B1120]/80 backdrop-blur-md py-3" : "border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <CipherGuardLogo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white relative group ${link.name === "Profile Node" ? "text-white" : "text-gray-400"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full ${link.name === "Profile Node" ? "w-full" : "w-0"}`} />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#111827]/60 border border-gray-800 px-3 py-1.5 rounded-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-400">NODE_AUTH_OK</span>
            </div>
            <button className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer">
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white focus:outline-none cursor-pointer">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-gray-800 bg-[#0B1120]"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-900 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-3 bg-[#111827] border border-gray-800 py-2 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-gray-400">NODE_AUTH_OK</span>
                </div>
                <button className="w-full text-center py-2 text-sm font-medium text-red-400 border border-red-500/10 bg-red-500/5 rounded-md">Disconnect Node</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ============================================================================
// 2. PROFILE HERO HEADER COMPONENT
// ============================================================================
function ProfileHeader() {
  return (
    <section className="relative w-full z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-gray-800 bg-[#111827]/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Decorative Grid Line flare */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Animated Avatar Layout */}
            <div className="relative group">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-blue-500/10 relative z-10 overflow-hidden">
                <div className="h-full w-full bg-[#0B1120] rounded-[10px] flex items-center justify-center font-mono text-3xl font-black text-white relative overflow-hidden">
                  SR
                  <motion.div 
                    animate={{ y: ["-100%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent w-full h-1/2 pointer-events-none"
                  />
                </div>
              </div>
              <div className="absolute -inset-1.5 bg-blue-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 border-4 border-[#111827] w-6 h-6 rounded-full z-20 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Shyam Raja</h1>
                <div className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-2.5 py-0.5 text-[10px] font-mono font-medium text-blue-400 backdrop-blur-md">
                  <Activity className="h-3 w-3 animate-pulse" />
                  <span>v3.1 Verified Operator</span>
                </div>
              </div>
              
              <p className="text-sm font-mono text-gray-400">
                System Security Custodian & Full-Stack Core Engineer
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-gray-500 font-medium font-mono pt-1">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-blue-500" /> NIT Rourkela Matrix</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-blue-500" /> Ingested Oct 2025</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
            <button className="flex-1 md:flex-none text-center justify-center rounded-md border border-gray-800 bg-blue-900/40 px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-gray-900 hover:text-white hover:border-gray-700 cursor-pointer flex items-center gap-2" onClick={() => (window.location.href = "/forget")}>
              <RefreshCw className="h-3.5 w-3.5 text-blue-400 animate-spin [animation-duration:8s]" />
             Reset Password
            </button>
            <button className="flex-1 md:flex-none text-center justify-center relative group overflow-hidden rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-95 cursor-pointer flex items-center gap-2" onClick={() => (window.location.href = "/analyse")}>
              <span className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <ShieldCheck className="h-4 w-4" />
             Scan New
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// 3. TRUST STATISTICS SECTION (SCROLL COUNTER)
// ============================================================================
function UserStats() {
  const stats = [
    { target: 142, suffix: "K+", title: "Vectors Scanned", text: "Suspicious domains indexed" },
    { target: 99, suffix: ".8%", title: "Threat Accuracy", text: "Algorithmic decision threshold" },
    { target: 36, suffix: "", title: "Isolated Exploits", text: "Zero-day vectors neutralized" },
    { target: 5, suffix: "ms", title: "Gateway Latency", text: "Distributed proxy bounce pool" }
  ];

  return (
    <section className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 relative z-10">
      {stats.map((item, idx) => (
        <StatCard key={idx} item={item} index={idx} />
      ))}
    </section>
  );
}

function StatCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = item.target;
    const duration = 1.2;
    const increment = end / (duration * 60);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, item.target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="rounded-xl border border-gray-800/60 bg-[#111827]/40 p-5 text-center backdrop-blur-md hover:border-gray-700 transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="text-3xl font-black text-white sm:text-4xl font-mono tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent group-hover:text-blue-400 transition-colors duration-300">
        {count}{item.suffix}
      </div>
      <div className="mt-1 text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">{item.title}</div>
      <div className="mt-0.5 text-[11px] text-gray-500 font-sans">{item.text}</div>
    </motion.div>
  );
}

// ============================================================================
// 4. ACCOUNT DETAILS PIPELINE CARD
// ============================================================================
function AccountDetails() {
  const [formData, setFormData] = useState({
    name: "Shyam Raja",
    username: "shyam_raja",
    email: "shyam.raja@cipherguard.io",
    phone: "+91 98765 43210"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-800/60 bg-[#111827]/40 p-6 backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/20 to-transparent" />
      
      <div className="flex items-center gap-3 border-b border-gray-800/60 pb-4 mb-6">
        <div className="inline-flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 p-2.5 text-blue-500">
          <User className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider font-mono uppercase">Identity Matrix Attributes</h3>
          <p className="text-[11px] text-gray-500 font-mono">Configure core cryptographic ownership parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            Full Identity Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0B1120] border border-gray-800 rounded-md px-3.5 py-2.5 text-white outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            Handle / Node Alias
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#0B1120] border border-gray-800 rounded-md px-3.5 py-2.5 text-white outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            Secure Communications Routing
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-3.5 w-3.5 text-gray-600" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0B1120] border border-gray-800 rounded-md pl-9 pr-3.5 py-2.5 text-white outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            Telemetry Device Link
          </label>
          <div className="relative flex items-center">
            <Smartphone className="absolute left-3 h-3.5 w-3.5 text-gray-600" />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#0B1120] border border-gray-800 rounded-md pl-9 pr-3.5 py-2.5 text-white outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-800/40 font-mono text-xs">
        <button className="px-4 py-2 rounded-md border border-gray-800 bg-transparent text-gray-400 hover:text-white transition-all cursor-pointer">
          Reset Matrix
        </button>
        <button className="relative group overflow-hidden rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-md shadow-blue-600/10 transition-all hover:bg-blue-500 active:scale-95 cursor-pointer">
          <span className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          Commit Ingest Changes
        </button>
      </div>

    </motion.div>
  );
}

// ============================================================================
// 5. SECURE HARDWARE & KEYS CONNECTIONS
// ============================================================================
function SecurityNodes() {
  const [nodes, setNodes] = useState([
    { id: "n1", name: "AWS S3 Cloud Pipeline", status: "ONLINE", type: "Storage Hub", icon: Server },
    { id: "n2", name: "Mainframe Kernel Workspace", status: "ONLINE", type: "Core Agent", icon: Database },
    { id: "n3", name: "Cryptographic PGP Safe Node", status: "ONLINE", type: "HSM Vault", icon: Lock },
    { id: "n4", name: "Secondary Telemetry Mirror", status: "STALE_LEAK", type: "Edge Node", icon: CloudLightning }
  ]);

  const [refreshing, setRefreshing] = useState<string | null>(null);

  const syncNode = (id: string) => {
    setRefreshing(id);
    setTimeout(() => {
      setNodes(prev =>
        prev.map(n => (n.id === id ? { ...n, status: "ONLINE" } : n))
      );
      setRefreshing(null);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="rounded-xl border border-gray-800/60 bg-[#111827]/40 p-6 backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/20 to-transparent" />
      
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 p-2.5 text-blue-500">
            <Key className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider font-mono uppercase">Federated Authorization Bridges</h3>
            <p className="text-[11px] text-gray-500 font-mono">Active cryptographic channels connected to your profile context</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        {nodes.map((node) => {
          const NodeIcon = node.icon;
          const isOnline = node.status === "ONLINE";
          const isThisRefreshing = refreshing === node.id;

          return (
            <div 
              key={node.id} 
              className="p-4 rounded-lg border border-gray-800/80 bg-[#0B1120]/60 flex items-center justify-between gap-4 group hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-md bg-gray-900 border border-gray-800 shrink-0 ${isOnline ? "text-blue-400" : "text-amber-500"}`}>
                  <NodeIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white tracking-tight truncate">{node.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-500 uppercase">{node.type}</span>
                    <span className={`text-[8px] font-black tracking-wide px-1.5 py-0.2 rounded border ${
                      isOnline ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-amber-500/5 border-amber-500/20 text-amber-400"
                    }`}>
                      {node.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => syncNode(node.id)}
                disabled={isThisRefreshing}
                className="p-2 rounded-md bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-40 shrink-0"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isThisRefreshing ? "animate-spin text-blue-400" : "group-hover:rotate-180 transition-transform duration-300"}`} />
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ============================================================================
// 6. LIVE ACTIVITY TERMINAL (PREMIUM REAL-TIME LOGGER)
// ============================================================================
function LiveActivityTerminal() {
  const [logs, setLogs] = useState([
    { id: 1, time: "23:14:02", tag: "AUTH", msg: "Token validation request granted for cluster_node_delta", type: "success" },
    { id: 2, time: "23:15:10", tag: "SYNC", msg: "Heuristics cluster integrity audit complete. 0 alerts", type: "info" },
    { id: 3, time: "23:18:44", tag: "GATE", msg: "Proxy load-balancer rotated safely across 4 segments", type: "info" },
    { id: 4, time: "23:22:19", tag: "CORE", msg: "Database replication matrix snapshot committed successfully", type: "success" }
  ]);

  useEffect(() => {
    const actions = [
      { tag: "AUTH", msg: "Session key handshake updated for active operator Shyam Raja", type: "success" },
      { tag: "WARN", msg: "Transient verification attempt blocked on edge node 04", type: "warn" },
      { tag: "SYS", msg: "Re-indexing dynamic predictive threat intelligence tree", type: "info" },
      { tag: "SYNC", msg: "Glacier cold storage checksum matched successfully", type: "success" },
      { tag: "CRIT", msg: "Reputation scan verification: Level 5 credentials valid", type: "info" }
    ];

    const interval = setInterval(() => {
      const selected = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      const newLog = {
        id: Date.now(),
        time: timeStr,
        ...selected
      };

      setLogs(prev => [...prev.slice(1), newLog]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-gray-800 bg-[#111827]/80 p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden h-[460px] flex flex-col justify-between"
    >
      {/* Absolute underglow behind terminal layout */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-xl pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[10px] font-mono text-gray-500 tracking-wider">LIVE_OPERATOR_LOGS</span>
          </div>
          <div className="flex items-center gap-1.5 rounded bg-gray-900 border border-gray-800 px-2 py-0.5 text-[9px] font-mono text-blue-400">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            LIVE_FEED
          </div>
        </div>

        <p className="text-[11px] text-gray-400 font-sans mb-3 leading-relaxed">
          Monitor streaming transaction loops, validation telemetry drops, and session handshakes securely below.
        </p>

        {/* Dynamic Log Queue Terminal Grid */}
        <div className="space-y-3 font-mono text-[11px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="p-2.5 bg-[#0B1120] border border-gray-800/70 rounded-md space-y-1 relative"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500">{log.time}</span>
                  <span className={`font-bold tracking-widest text-[9px] px-1.5 rounded border ${
                    log.type === "success" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
                    log.type === "warn" ? "text-amber-400 border-amber-500/20 bg-amber-500/5" :
                    "text-blue-400 border-blue-500/20 bg-blue-500/5"
                  }`}>
                    [{log.tag}]
                  </span>
                </div>
                <p className="text-gray-300 leading-normal line-clamp-2">{log.msg}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800/40 text-center">
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500">
          <Cpu className="h-3.5 w-3.5 text-blue-500 animate-spin [animation-duration:4s]" />
          <span>Core pipeline synchronizer scanning...</span>
        </div>
      </div>

    </motion.div>
  );
}

// ============================================================================
// 7. SIGN-OFF FOOTER COMPONENT
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0B1120] relative z-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-bold text-white tracking-tight">
            Cipher<span className="text-blue-500">Guard</span>
          </span>
          <span className="text-xs text-gray-600 ml-2 font-mono">© 2026 CipherGuard Inc.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
      </div>
    </footer>
  );
}