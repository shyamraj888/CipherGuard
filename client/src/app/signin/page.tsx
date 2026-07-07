"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Activity,
  Loader2,
  CheckCircle2
} from "lucide-react";

// ============================================================================
// CIPHERGUARD LOGIN PAGE — matches landing page theme
// ============================================================================
export default function CipherGuardLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStage, setScanStage] = useState(0);

  const scanStages = [
    "Validating credentials...",
    "Checking device fingerprint...",
    "Establishing secure session...",
    "Access granted"
  ];

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setScanStage(0);
    const interval = setInterval(() => {
      setScanStage((prev) => {
        if (prev >= scanStages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 900);
          return prev;
        }
        return prev + 1;
      });
    }, 650);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1120] font-sans text-[#F8FAFC] antialiased selection:bg-blue-500/30 selection:text-blue-200 flex items-center justify-center px-4 py-12">

      {/* Ambient Background Effects — matches landing page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2.5 mb-8"
        >
          <div className="relative">
            <Shield className="h-7 w-7 text-blue-500 relative z-10" fill="rgba(37, 99, 235, 0.1)" />
            <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md opacity-60" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Cipher<span className="text-blue-500">Guard</span>
          </span>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative rounded-xl border border-gray-800 bg-[#111827]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Header Controls — matches dashboard mockup styling */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 text-[10px] font-mono text-gray-500 tracking-wider">AUTH_NODE_SECURE</span>
            </div>
            <div className="flex items-center gap-2 rounded bg-gray-900 border border-gray-800 px-2 py-0.5 text-[10px] font-mono text-blue-400">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
              TLS 1.3
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h1>
            <p className="text-sm text-gray-400">Verify your identity to reach the threat console.</p>
          </div>

          <AnimatePresence mode="wait">
            {!isLoading ? (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Email Field */}
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
                      className="w-full rounded-md bg-gray-900 border border-gray-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-md bg-gray-900 border border-gray-800 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
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

                {/* Live Security Signal Strip */}
                <div className="rounded-lg border border-gray-800 bg-[#0B1120]/60 px-3 py-2.5 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] text-gray-400">This session is being monitored by <span className="text-gray-300 font-medium">Threat Node #4471</span></span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group relative w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-98 cursor-pointer mt-2"
                >
                  <span className="absolute inset-0 rounded-md bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  Sign in securely
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-gray-500 pt-2">
                  Don't have an account? <a href="#" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Create one</a>
                </p>
              </motion.form>
            ) : (
              // Live Verification Stream — echoes the "Security Integrity Checks" module on the landing page
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-gray-800 border-t-blue-500"
                    />
                    <Fingerprint className="h-6 w-6 text-blue-500" />
                  </div>

                  <div className="w-full space-y-2 mt-2">
                    {scanStages.map((stage, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 text-xs font-mono transition-opacity duration-300 ${
                          idx <= scanStage ? "opacity-100" : "opacity-25"
                        }`}
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
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer trust strip */}
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