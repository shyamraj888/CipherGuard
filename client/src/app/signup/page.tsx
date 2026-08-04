"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Fingerprint,
  Activity,
  Loader2,
  CheckCircle2,
  Check,
  Radar,
  Wifi,
  ArrowLeft
} from "lucide-react";
import CipherGuardLogo from "../components/CipherGuardLogo";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function CipherGuardSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ticker, setTicker] = useState(0);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const scanStages = [
    "Preparing secure verification...",
    "Generating one-time code...",
    "Dispatching to your inbox...",
    "Verification ready"
  ];

  const tickerFeed = [
    "312 accounts provisioned today",
    "Key exchange 14ms avg",
    "Zero collisions in last 60s",
    "New profile synced to mesh",
    "Node latency 11ms"
  ];

  const passwordChecks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "1 number", pass: /\d/.test(password) },
    { label: "1 uppercase letter", pass: /[A-Z]/.test(password) }
  ];

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

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

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const startScan = (onComplete: () => void | Promise<void>) => {
    setIsLoading(true);
    setScanStage(0);
    const interval = window.setInterval(() => {
      setScanStage((prev) => {
        if (prev >= scanStages.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            void Promise.resolve(onComplete()).finally(() => setIsLoading(false));
          }, 900);
          return prev;
        }
        return prev + 1;
      });
    }, 550);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (!passwordChecks.every((check) => check.pass)) {
      setError("Password must meet all requirements.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("");

    startScan(async () => {
      try {
        const response = await fetch("https://cipherguard-n2ye.onrender.com/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to send verification code.");
        }

        setStep("otp");
        setOtp(["", "", "", "", "", ""]);
        setResendTimer(30);
        setSuccess("A 6-digit code was sent to your email.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to send verification code.");
      }
    });
  };

  const handleOtpChange = (idx: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[idx] = value.slice(-1);
    setOtp(next);
    if (value && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const code = otp.join("");
    if (code.length < 6) {
      setError("Enter the full 6-digit code.");
      return;
    }

    setError("");
    setSuccess("");

    startScan(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, otp: code })
        });


        const data = await response.json();

        localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            router.push("/");

        if (!response.ok) {
          throw new Error(data.message || "Wrong OTP. Please try again.");
        }

        router.push("/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wrong OTP. Please try again.");
      }
    });
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend code.");
      }

      setOtp(["", "", "", "", "", ""]);
      setResendTimer(30);
      setSuccess("A fresh verification code has been sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resend code.");
    }
  };

  const goBack = () => {
    setStep("form");
    setError("");
    setSuccess("");
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
          <CipherGuardLogo wrapperClassName="flex items-center justify-center gap-2.5 mb-6" />
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

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="scan-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 rounded-[11px] bg-[#0B1120]/92 backdrop-blur-sm"
                >
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-blue-500/15"
                    />
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                      className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
                    />
                    {scanStage >= scanStages.length - 1 ? (
                      <CheckCircle2 className="relative h-7 w-7 text-emerald-500" />
                    ) : (
                      <Fingerprint className="relative h-7 w-7 text-blue-400" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 px-4 text-center">
                    {scanStage < scanStages.length - 1 && (
                      <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-blue-400" />
                    )}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={scanStage}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs font-mono text-gray-300"
                      >
                        {scanStages[scanStage]}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {scanStages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                          idx <= scanStage ? "bg-blue-500" : "bg-gray-800"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-600">
                    <Activity className="h-3 w-3" />
                    <span>REGISTER_NODE_SECURE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="h-2.5 w-2.5 rounded-full bg-green-500"
                />
                <span className="ml-3 text-[10px] font-mono text-gray-500 tracking-wider">REGISTER_NODE_SECURE</span>
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
              <div className="flex items-center gap-2">
                {step === "otp" && (
                  <button type="button" onClick={goBack} className="text-gray-400 hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">
                    {step === "otp" ? "Verify your email" : "Create your account"}
                  </h1>
                  <p className="text-sm text-gray-400">
                    {step === "otp"
                      ? "Enter the 6-digit code sent to your inbox."
                      : "Join the threat console and start scanning in minutes."}
                  </p>
                </div>
              </div>
            </div>

            {error ? (
              <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                {success}
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="relative space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Cooper"
                        className="w-full rounded-md bg-gray-900 border border-gray-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      />
                    </div>
                  </div>

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
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
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

                    {password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-wrap gap-x-4 gap-y-1 pt-1"
                      >
                        {passwordChecks.map((check, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            {check.pass ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <span className="h-3 w-3 rounded-full border border-gray-700" />
                            )}
                            <span className={`text-[10px] font-mono ${check.pass ? "text-emerald-500" : "text-gray-600"}`}>
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirm password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full rounded-md bg-gray-900 border py-2.5 pl-10 pr-16 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:ring-1 ${
                          confirmPassword.length > 0
                            ? passwordsMatch
                              ? "border-emerald-600/60 focus:border-emerald-500/60 focus:ring-emerald-500/30"
                              : "border-red-600/60 focus:border-red-500/60 focus:ring-red-500/30"
                            : "border-gray-800 focus:border-blue-500/60 focus:ring-blue-500/30"
                        }`}
                      />
                      {confirmPassword.length > 0 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          {passwordsMatch ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <span className="text-[10px] font-mono text-red-500">no match</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative rounded-lg border border-gray-800 bg-[#0B1120]/60 px-3 py-2.5 flex items-center gap-2 overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                    />
                    <Radar className="h-3.5 w-3.5 text-emerald-500 shrink-0 relative" />
                    <span className="text-[11px] text-gray-400 relative">Your data is encrypted with <span className="text-gray-300 font-medium">AES-256</span> at rest</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 active:scale-98 cursor-pointer mt-2 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                  >
                    <motion.span
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatDelay: 1 }}
                      className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    Create account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-2">
                    Already have an account? <a href="/signin" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Sign in</a>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="otp"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleOtpSubmit}
                  className="relative space-y-4"
                >
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="h-12 w-11 rounded-md border border-gray-700 bg-gray-900 text-center text-lg font-semibold text-white outline-none focus:border-blue-500"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/40 active:scale-98 cursor-pointer mt-2 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                  >
                    Verify code
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="text-center text-sm text-gray-400">
                    <button type="button" onClick={handleResend} disabled={resendTimer > 0 || isLoading} className="text-blue-500 hover:text-blue-400 disabled:text-gray-500">
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend code"}
                    </button>
                  </div>
                </motion.form>
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