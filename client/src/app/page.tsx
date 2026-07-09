"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import LiveCyberFeed from "./components/LiveCyberFeed";
import { 
  Shield, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  AlertTriangle, 
  Cpu,
  MessageSquare, 
  Image as ImageIcon, 
  Database, 
  BarChart3,
  UploadCloud, 
  Binary, 
  ShieldAlert, 
  FileText,
  Search,
  Loader2,
  CheckCircle2,
  Terminal,
  Activity,
  Lock,
  Zap
} from "lucide-react";

// ============================================================================
// MAIN PAGE CONTEXT WRAPPER
// ============================================================================
export default function CipherGuardPremiumLandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1120] font-sans text-[#F8FAFC] antialiased selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Premium Ambient Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[1600px] right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[2600px] left-0 w-[500px] h-[500px] bg-blue-600/5 blur-3xl pointer-events-none z-0" />

      <Navbar />
      <main className="relative z-10 space-y-4 gap-y-12">
        <Hero />
        <TrustStats />
         <LiveCyberFeed />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
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
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Live Demo", href: "#demo" },
    { name: "Testimonials", href: "#testimonials" },
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
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative">
              <Shield className="h-6 w-6 text-blue-500 relative z-10 transition-transform duration-500 group-hover:rotate-12" fill="rgba(37, 99, 235, 0.1)" />
              <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Cipher<span className="text-blue-500 transition-colors group-hover:text-blue-400">Guard</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer" onClick={() => (window.location.href = "/signin")}>
              Login
            </button>
            <button className="relative group overflow-hidden rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-95 cursor-pointer">
              <span className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              Get Started
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
                <button className="w-full text-center py-2 text-sm font-medium text-gray-300 hover:text-white">Login</button>
                <button className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white shadow-md">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ============================================================================
// 2. HERO SECTION & PREMIUM MOCKUP
// ============================================================================
function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 flex flex-col lg:flex-row items-center gap-12 z-10">
      <div className="w-full lg:w-1/2 text-left space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-md"
        >
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>v3.1 Predictive Threat Analytics Matrix Active</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
        >
          Detect Phishing <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Before It Detects You.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed"
        >
          Protect yourself from phishing websites, scam messages, fake QR codes, malicious links, and online fraud using intelligent multi-layer threat analysis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <a href="/analyse" className="group relative flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-98">
            <span>Scan Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="/dashboard" className="rounded-md border border-gray-800 bg-blue-900/40 px-6 py-3.5 text-sm font-semibold text-gray-300 transition-all hover:bg-gray-900 hover:text-white hover:border-gray-700">
            Your DashBoard
          </a>
        </motion.div>
      </div>

      {/* Cyber Security Premium Dashboard Interface Mockup */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full lg:w-1/2 relative"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative mx-auto max-w-[520px] rounded-xl border border-gray-800 bg-[#111827]/80 p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 text-[10px] font-mono text-gray-500 tracking-wider">THREAT_NODE_SECURE</span>
            </div>
            <div className="flex items-center gap-2 rounded bg-gray-900 border border-gray-800 px-2 py-0.5 text-[10px] font-mono text-blue-400">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
              LIVE METRICS
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Risk Index Meter Module */}
            <div className="rounded-lg border border-gray-800 bg-[#0B1120] p-4 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-xl pointer-events-none" />
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Threat Score</span>
              <div className="my-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-red-500 tracking-tight">89%</span>
                <span className="text-xs font-mono text-red-400/60">CRITICAL</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "89%" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500" 
                />
              </div>
              <span className="text-[11px] text-red-400/90 mt-2.5 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 shrink-0" /> Hostile domain variant match
              </span>
            </div>

            {/* URL Monitoring Active Stream */}
            <div className="rounded-lg border border-gray-800 bg-[#0B1120] p-4 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">URL Scanner</span>
                <Globe className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <div className="rounded bg-gray-900 p-2 font-mono text-[11px] text-gray-300 truncate border border-gray-800">
                https://secure-verify-routing.net/login
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Cpu className="h-3.5 w-3.5 text-blue-500 animate-spin [animation-duration:3s]" />
                <span className="text-[11px]">Heuristics array indexing...</span>
              </div>
            </div>
          </div>

          {/* Verification Stream Grid */}
          <div className="mt-4 rounded-lg border border-gray-800 bg-[#0B1120]/40 p-4 space-y-2.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Security Integrity Checks</span>
            <div className="space-y-2">
              {[
                { name: "SSL Authentication Layers", status: "VERIFIED", color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10" },
                { name: "Domain Registration Lifespan Verification", status: "FLAGGED ANOMALY", color: "text-red-500 bg-red-500/5 border-red-500/10" },
                { name: "Structural Layout Identity Clones", status: "CRITICAL MATCH", color: "text-red-500 bg-red-500/5 border-red-500/10" }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs border-b border-gray-800/40 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400">{row.name}</span>
                  <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border ${row.color}`}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ambient Underglow behind card layout */}
        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent blur-2xl opacity-80 pointer-events-none -z-10" />
      </motion.div>
    </section>
  );
}

// ============================================================================
// 3. TRUST STATISTICS SECTION (SCROLL COUNTER)
// ============================================================================
function TrustStats() {
  const stats = [
    { target: 25, suffix: "K+", title: "Threats Analyzed", text: "Malicious vectors isolated daily" },
    { target: 98, suffix: "%", title: "Detection Accuracy", text: "Verified machine logic index score" },
    { target: 5, suffix: "+", title: "Security Engines", text: "Simultaneous calculation loops" },
    { target: 24, suffix: "/7", title: "Continuous Protection", text: "Automated edge monitoring layers" }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((item, idx) => (
          <StatCard key={idx} item={item} index={idx} />
        ))}
      </div>
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
    const duration = 1.5;
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
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-xl border border-gray-800/60 bg-[#111827]/40 p-5 text-center backdrop-blur-md hover:border-gray-700 transition-all group"
    >
      <div className="text-3xl font-black text-white sm:text-4xl font-mono tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent group-hover:text-blue-400 transition-colors duration-300">
        {count}{item.suffix}
      </div>
      <div className="mt-1 text-sm font-semibold text-gray-200">{item.title}</div>
      <div className="mt-0.5 text-xs text-gray-500">{item.text}</div>
    </motion.div>
  );
}

// ============================================================================
// 4. FEATURES SECTION WITH HOVER REFLECTIONS
// ============================================================================
function Features() {
  const featuresList = [
    { icon: Shield, title: "AI Threat Detection", text: "Advanced multi-tier behavioral heuristics capture anomalies without static signatures." },
    { icon: Globe, title: "Malicious URL Analysis", text: "Execute dynamic cloud sandboxing to safely evaluate structural code loops." },
    { icon: MessageSquare, title: "SMS Scam Detection", text: "Natural Language Processing maps incoming textual indicators to eliminate social engineering routes." },
    { icon: ImageIcon, title: "OCR Screenshot Scanner", text: "Computer vision frameworks decode page components to spot precise clone traps." },
    { icon: Database, title: "Threat Intelligence Database", text: "Distributed core synchronization drops update telemetry vectors securely down onto edge networks." },
    { icon: BarChart3, title: "Security Analytics Dashboard", text: "High-performance data dashboards allow teams to trace and audit alerts instantaneously." }
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">Security Architecture</h2>
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Multi-Layer Defensive Engine
        </p>
        <p className="text-gray-400 text-sm sm:text-base">
          No basic rule charts. CipherGuard builds layered checking loops to find, classify, and break advanced network attacks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuresList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-xl border border-gray-800 bg-[#111827]/40 p-6 shadow-sm transition-all hover:bg-[#111827]/80 hover:border-gray-700 overflow-hidden"
            >
              {/* Subtle Internal Flare Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <div className="inline-flex items-center justify-center rounded-lg bg-gray-900 border border-gray-800 p-3 text-blue-500 transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-500/5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// 5. HOW IT WORKS PIPELINE SECTION
// ============================================================================
function HowItWorks() {
  const steps = [
    { icon: UploadCloud, title: "Upload URL", desc: "Submit target routing addresses safely onto our cluster ingestion hub." },
    { icon: Binary, title: "Analyze Security Signals", desc: "Heuristics immediately deconstruct structural tokens, patterns, and tracking metadata." },
    { icon: ShieldAlert, title: "Threat Intelligence Processing", desc: "Cross-checks records through active sandboxing environments simultaneously." },
    { icon: FileText, title: "Generate Risk Report", desc: "Delivers explicit, human-readable scoring and definitive execution advice." }
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">Execution Flow</h2>
        <p className="text-3xl font-bold tracking-tight text-white">How Threat Verification Runs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative rounded-xl border border-gray-800/80 bg-[#111827]/20 p-5 text-center flex flex-col items-center space-y-3 backdrop-blur-md hover:border-gray-700 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 border border-gray-800 text-blue-500 font-bold transition-all group-hover:border-blue-500/40 group-hover:bg-blue-500/5">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">Stage 0{idx + 1}</div>
              <h4 className="text-sm font-semibold text-white tracking-tight">{step.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// 6. LIVE DEMO EXPERIENCE INTERFACE (PREMIUM LIVE STREAM UPDATER)
// ============================================================================
 <LiveCyberFeed />

// ============================================================================
// 7. TESTIMONIALS ARCHITECTURE
// ============================================================================
function Testimonials() {
  const reviews = [
    { text: "CipherGuard integrated seamlessly with our perimeter architecture inside hours. The heuristic analysis engines isolated active zero-day anomalies accurately before users hit the vectors.", author: "Sarah Jenkins", role: "Chief Information Security Officer, Voxel Systems" },
    { text: "The automated screenshot scanning framework gave our network desk comprehensive monitoring visibility over clone login landing pages before phishing campaigns spread.", author: "David Vance", role: "Director of Threat Infrastructure, NexaCorp" },
    { text: "Zero bloatware setup. Crystal clear metric APIs, highly performant calculation engines, and updates that propagate globally inside absolute multi-second windows.", author: "Amina Al-Sayed", role: "Principal Enterprise Cloud Security Architect" }
  ];

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">Enterprise Endorsements</h2>
        <p className="text-3xl font-bold tracking-tight text-white">Trusted Across Global Security Desks</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="rounded-xl border border-gray-800/80 bg-[#111827]/40 p-6 flex flex-col justify-between backdrop-blur-sm"
          >
            <p className="text-sm text-gray-300 italic leading-relaxed">"{r.text}"</p>
            <div className="mt-6 pt-4 border-t border-gray-800/60">
              <div className="text-sm font-bold text-white tracking-tight">{r.author}</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{r.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// 8. CALL TO ACTION SECTION
// ============================================================================
function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-950/20 to-transparent p-8 md:p-12 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-3xl pointer-events-none -z-10" />
        
        <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to browse safely?
        </h3>
        <p className="mx-auto max-w-xl text-sm sm:text-base text-gray-400 leading-relaxed">
          Start protecting yourself today against malicious attacks, scam messages, fake QR codes, and decentralized credentials compromise.
        </p>
        <div className="pt-2">
          <button className="relative group overflow-hidden rounded-md bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-95 cursor-pointer">
            <span className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            Start Free Scan
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// 9. SIGN-OFF FOOTER COMPONENT
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0B1120]">
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