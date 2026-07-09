"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  Activity,
  Loader2,
  CheckCircle2,
  Radar,
  Wifi
} from "lucide-react";



interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function CipherGuardLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ticker, setTicker] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
   

  const scanStages = [
    "Validating credentials...",
    "Checking device fingerprint...",
    "Cross-referencing threat DB...",
    "Establishing secure session...",
    
  ];

  const tickerFeed = [
    "IP 41.203.x.x flagged 0.4s ago",
    "New login pattern learned",
    "12,847 sessions verified today",
    "Zero anomalies in last 60s",
    "Node latency 14ms"
  ];

  useEffect(() => {
    const p = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 6,
      size: 1 + Math.random() * 2
    }));
    setParticles(p);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTicker((v) => (v + 1) % tickerFeed.length), 2600);
    return () => clearInterval(t);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setScanStage(0);
    const interval = setInterval(() => {
      setScanStage((prev) => {
        if (prev >= scanStages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 1100);
          return prev;
        }
        return prev + 1;
      });
    }, 550);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1120] font-sans text-[#F8FAFC] antialiased selection:bg-blue-500/30 selection:text-blue-200 flex items-center justify-center px-4 py-12">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293714_1px,transparent_1px),linear-gradient(to_bottom,#1f293714_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none" />

      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[520px] bg-gradient-to-b from-blue-500/15 via-transparent to-transparent blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-indigo-500/10 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }}
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-600/10 blur-3xl pointer-events-none z-0"
      />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-blue-400/40 pointer-events-none z-0"
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}

      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent pointer-events-none z-0"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      <div className="relative z-10 w-full max-w-md">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2.5 mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
              className="absolute -inset-2 rounded-full border border-blue-500/40"
            />
            <Shield className="h-7 w-7 text-blue-500 relative z-10" fill="rgba(37, 99, 235, 0.15)" />
            <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md opacity-60" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Cipher<span className="text-blue-500">Guard</span>
          </span>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-6 h-4 overflow-hidden">
          <Wifi className="h-3 w-3 text-emerald-500 shrink-0" />
          <AnimatePresence mode="wait">
            <motion.span
              key={ticker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-mono text-gray-500"
            >
              {tickerFeed[ticker]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative rounded-xl p-[1px] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(120deg, rgba(59,130,246,0.6), rgba(99,102,241,0.1), rgba(59,130,246,0.6))",
              backgroundSize: "200% 200%"
            }}
            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />

          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            className="relative rounded-[11px] border border-gray-800 bg-[#111827]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60 transition-opacity"
              style={{
                background: `radial-gradient(300px circle at ${mouse.x}% ${mouse.y}%, rgba(59,130,246,0.08), transparent 70%)`
              }}
            />

            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-500/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-500/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-500/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-500/40 pointer-events-none" />

            <div className="relative flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="h-2.5 w-2.5 rounded-full bg-green-500"
                />
                <span className="ml-3 text-[10px] font-mono text-gray-500 tracking-wider">AUTH_NODE_SECURE</span>
              </div>
              <div className="flex items-center gap-2 rounded bg-gray-900 border border-gray-800 px-2 py-0.5 text-[10px] font-mono text-blue-400">
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
                TLS 1.3
              </div>
            </div>

            <div className="relative space-y-1 mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h1>
              <p className="text-sm text-gray-400">Verify your identity to reach the threat console.</p>
            </div>

            <AnimatePresence mode="wait">
              {!isLoading ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="relative space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-md bg-gray-900 border border-gray-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                      <a href="/forget" className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">Forgot?</a>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-md bg-gray-900 border border-gray-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-lg border border-gray-800 bg-[#0B1120]/60 px-3 py-2.5 flex items-center gap-2 overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                    />
                    <Radar className="h-3.5 w-3.5 text-emerald-500 shrink-0 relative" />
                    <span className="text-[11px] text-gray-400 relative">This session is being monitored by <span className="text-gray-300 font-medium">Threat Node #4471</span></span>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 active:scale-98 cursor-pointer mt-2 overflow-hidden"
                  >
                    <motion.span
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatDelay: 1 }}
                      className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    Sign in securely
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-2">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Create one</a>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative py-6"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-blue-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut", delay: 0.5 }}
                        className="absolute inset-0 rounded-full border border-blue-500"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-2 border-gray-800 border-t-blue-500"
                      />
                      <Fingerprint className="h-7 w-7 text-blue-500" />
                    </div>

                    <div className="w-full space-y-2 mt-2">
                      {scanStages.map((stage, idx) => (
                        <motion.div
                          key={idx}
                          initial={false}
                          animate={{ opacity: idx <= scanStage ? 1 : 0.2 }}
                          className="flex items-center gap-2.5 text-xs font-mono"
                        >
                          {idx < scanStage || (idx === scanStage && idx === scanStages.length - 1) ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          ) : idx === scanStage ? (
                            <Loader2 className="h-3.5 w-3.5 text-blue-500 shrink-0 animate-spin" />
                          ) : (
                            <Activity className="h-3.5 w-3.5 text-gray-700 shrink-0" />
                          )}
                          <span className={idx === scanStages.length - 1 && idx === scanStage ? "text-emerald-400" : "text-gray-400"}>
                            {stage}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mt-1">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        animate={{ width: `${((scanStage + 1) / scanStages.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 mt-6"
        >
          <Lock className="h-3 w-3 text-gray-600" />
          <span className="text-[11px] text-gray-600 font-mono">256-bit encrypted · SOC 2 compliant</span>
        </motion.div>
      </div>
    </div>
  );
}