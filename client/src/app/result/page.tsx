"use client";
import { useEffect } from "react";


import React, { useState } from "react";
import CipherGuardLogo from "../components/CipherGuardLogo";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Brain, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  FileCode, 
  Lock, 
  Key, 
  Link2, 
  Copy, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Download, 
  Share2, 
  LayoutDashboard, 
  Terminal, 
  FileText, 
  Shield, 
  Eye, 
  Zap, 
  Fingerprint, 
  Radar 
} from "lucide-react";

// Types
interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface ScanRiskReport {
  url: string;
  score: number;
  level: string;
  reasons: string[];
}

interface ScanResult {
  success: boolean;
  type: string;
  extractedText: string;
  extractedUrls: string[];
  detectedKeywords: string[];
  safeBrowsingResults: Array<{ url: string; safe?: boolean; error?: string; threats?: any[] }>;
  virusTotalResults: Array<{ url: string; malicious?: number; suspicious?: number; harmless?: number; undetected?: number; error?: string }>;
  WhoisResults: Array<{ url: string; createdDate?: string; registrar?: string; domain?: string; error?: string }>;
  sslResults: Array<{ url: string; https?: boolean; valid?: boolean; issuer?: string; reason?: string; error?: string }>;
  riskReports: ScanRiskReport[];
}

export default function CipherGuardScanResult() {
  // Local Interactive States
  const [isOriginalContentOpen, setIsOriginalContentOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [reportedCount, setReportedCount] = useState(2480);
  const [hasReported, setHasReported] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const riskReports = result?.riskReports ?? [];
  const detectedKeywords = result?.detectedKeywords ?? [];
  const safeBrowsingResults = result?.safeBrowsingResults ?? [];
  const virusTotalResults = result?.virusTotalResults ?? [];
  const whoisResults = result?.WhoisResults ?? [];
  const sslResults = result?.sslResults ?? [];
  const extractedUrls = result?.extractedUrls ?? [];

  const bestRiskReport = riskReports.reduce<ScanRiskReport | null>((best, current) => {
    if (!best || current.score > best.score) {
      return current;
    }
    return best;
  }, null);

  const riskScore = bestRiskReport?.score ?? 0;
  const riskLevel = bestRiskReport?.level ?? "SAFE";
  const confidenceScore = Math.min(99, 82 + detectedKeywords.length * 3 + (riskReports.length > 0 ? 4 : 0) + (safeBrowsingResults.some((item) => item.safe === false) ? 5 : 0));
  const communityStatus = riskScore >= 80 ? "CRITICAL" : riskScore >= 60 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW";
  const communityMessage =
    riskScore >= 80
      ? "Scan indicates critical threats. Do not interact with suspicious links."
      : riskScore >= 60
        ? "High-risk indicators detected. Proceed with extreme caution."
        : riskScore >= 40
          ? "Moderate risk found. Review the details before acting."
          : "No major threats detected, but remain vigilant.";
  const assessmentSummary = bestRiskReport?.reasons.join(" • ") || "No significant risk indicators were identified in this scan.";

  const severityBadges = [
    { label: "CRITICAL", active: riskLevel === "CRITICAL", color: "bg-red-500/10 text-red-400 border-red-500/30" },
    { label: "HIGH", active: riskLevel === "HIGH", color: "text-orange-500/40 border-gray-800" },
    { label: "MEDIUM", active: riskLevel === "MEDIUM", color: "text-yellow-500/40 border-gray-800" },
    { label: "LOW", active: riskLevel === "LOW", color: "text-blue-500/40 border-gray-800" },
    { label: "SAFE", active: riskLevel === "SAFE", color: "text-green-500/40 border-gray-800" },
  ];

  const maxMaliciousDetections = Math.max(0, ...virusTotalResults.map((item) => Number(item.malicious) || 0));
  const firstSafeBrowsing = safeBrowsingResults[0] ?? {};
  const firstVirusTotal = virusTotalResults[0] ?? {};
  const firstWhois = whoisResults[0] ?? {};
  const firstSsl = sslResults[0] ?? {};

  const whoisAgeDays = firstWhois.createdDate
    ? Math.max(0, Math.floor((Date.now() - new Date(firstWhois.createdDate).getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const whoisAgeRisk = whoisAgeDays !== null ? Math.min(100, Math.max(10, 90 - whoisAgeDays)) : 10;
  const sslRisk = firstSsl.https === false || firstSsl.valid === false ? 85 : 20;

  const safeBrowsingLabel = firstSafeBrowsing.safe === false ? "Flagged" : firstSafeBrowsing.safe === true ? "Clear" : "Unknown";
  const safeBrowsingBadge = firstSafeBrowsing.safe === false ? "MALICIOUS" : firstSafeBrowsing.safe === true ? "SAFE" : "UNKNOWN";
  const safeBrowsingBadgeColor = firstSafeBrowsing.safe === false ? "bg-red-500/10 border-red-500/30 text-red-400" : firstSafeBrowsing.safe === true ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-slate-800/20 border-slate-700 text-slate-400";

  const virusTotalDetections = Number(firstVirusTotal.malicious) || 0;
  const virusTotalTier = virusTotalDetections >= 20 ? "Critical Risk" : virusTotalDetections >= 10 ? "High Risk" : virusTotalDetections >= 5 ? "Elevated Risk" : virusTotalDetections >= 1 ? "Low Risk" : "No Detections";
  const virusTotalBadgeColor = virusTotalDetections >= 10 ? "bg-red-500/10 border-red-500/30 text-red-400" : virusTotalDetections >= 1 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
  const virusTotalBadgeLabel = virusTotalDetections >= 10 ? "DANGER" : virusTotalDetections >= 1 ? "WARNING" : "SAFE";

  const whoisAgeLabel = whoisAgeDays !== null ? `${whoisAgeDays} Days` : "Unknown";
  const whoisRegistrar = firstWhois.registrar || firstWhois.domain || "Unknown";
  const whoisBadgeLabel = whoisAgeDays !== null && whoisAgeDays <= 7 ? "NEW" : whoisAgeDays !== null && whoisAgeDays <= 180 ? "YOUNG" : "ESTABLISHED";
  const whoisBadgeColor = whoisAgeDays !== null && whoisAgeDays <= 7 ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : whoisAgeDays !== null && whoisAgeDays <= 180 ? "bg-orange-500/10 border-orange-500/30 text-orange-300" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";

  const sslStatusLabel = firstSsl.https === false ? "No HTTPS" : firstSsl.valid === false ? "Invalid" : "Active";
  const sslBadgeLabel = firstSsl.https === false || firstSsl.valid === false ? "INVALID" : "VALID";
  const sslBadgeColor = firstSsl.https === false || firstSsl.valid === false ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-green-500/10 border-green-500/30 text-green-400";
  const sslIssuer = firstSsl.issuer || firstSsl.reason || "Unknown";

  const threatIndicators = detectedKeywords.length > 0
    ? [
        { title: "Keyword Match", desc: `Suspicious terms like ${detectedKeywords.slice(0, 4).join(", ")} were detected.`, icon: Key },
        { title: "Link Exposure", desc: `${extractedUrls.length} URL(s) were extracted from the submitted content.`, icon: Link2 },
        { title: "Risk Reasons", desc: bestRiskReport?.reasons.slice(0, 2).join(" • ") ?? "Multiple indicators were combined into the final risk score.", icon: AlertTriangle },
        { title: "Signal Confidence", desc: `The assessment uses ${riskReports.length} URL-specific risk checks and support signals.`, icon: Brain },
      ]
    : [
        { title: "No Strong Indicators", desc: "The submitted content did not expose obvious scam signatures in the current analysis.", icon: ShieldCheck },
        { title: "Link Exposure", desc: `${extractedUrls.length} URL(s) were extracted from the submitted content.`, icon: Link2 },
      ];

  const riskBreakdown = [
    { name: "Keyword Analysis", val: Math.min(100, detectedKeywords.length * 12 + 10), color: "from-blue-600 to-blue-400" },
    { name: "Google Safe Browsing", val: safeBrowsingResults.some((item) => item.safe === false) ? 100 : 20, color: "from-red-600 to-red-400" },
    { name: "VirusTotal Reputation Engine", val: Math.min(100, Math.max(15, maxMaliciousDetections * 4 + 10)), color: "from-red-500 to-orange-500" },
    { name: "WHOIS Registry Lifespan", val: whoisAgeRisk, color: "from-yellow-600 to-yellow-400" },
    { name: "SSL Infrastructure Verification", val: sslRisk, color: "from-green-600 to-green-400" },
  ];

  const keywords = detectedKeywords.length > 0 ? detectedKeywords : ["No suspicious keyword signatures detected"];

  const recommendations = riskScore >= 80
    ? [
        "Do not execute any form of financial transaction or processing fees.",
        "Avoid interacting with any links or OTP requests from the scanned content.",
        "Report this site to help protect others from similar phishing attempts.",
      ]
    : riskScore >= 60
      ? [
          "Review the extracted links carefully before clicking or sharing them.",
          "Cross-check any account or payment requests through official channels.",
          "Keep monitoring this source for additional suspicious activity.",
        ]
      : [
          "The scanned content appears low risk, but remain cautious with unexpected links.",
          "Verify the origin of any requests for payment, credentials, or verification.",
        ];

  const originalMessage = result?.extractedText ?? "No extracted content was available from the analysis request.";

  const resolvedUrls = extractedUrls.map((url, index) => {
    const report = riskReports.find((item) => item.url === url) ?? riskReports[index] ?? null;
    const score = report?.score ?? 0;

    let status = "Clean";
    let risk = "Safe";
    let badge = "SAFE";

    if (score >= 80) {
      status = "Malicious";
      risk = "Critical";
      badge = "CRITICAL";
    } else if (score >= 60) {
      status = "Suspicious";
      risk = "High";
      badge = "HIGH";
    } else if (score >= 40) {
      status = "Warning";
      risk = "Medium";
      badge = "MEDIUM";
    } else if (score >= 20) {
      status = "Caution";
      risk = "Low";
      badge = "LOW";
    }

    const badgeColor =
      badge === "CRITICAL" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
      badge === "HIGH" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
      badge === "MEDIUM" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";

    let domain = "unknown";
    try {
      domain = new URL(url).hostname;
    } catch {
      domain = url.replace(/^https?:\/\//, "").split("/")[0] || "unknown";
    }

    return { url, domain, status, risk };
  });

  // Helper helper to generate dynamic toast notifications
  const pushToast = (message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    pushToast("Content successfully copied to core system clipboard", "success");
  };

  const handleReportWebsite = () => {
    if (hasReported) {
      pushToast("You have already contributed a report for this website.", "info");
      return;
    }

    setReportedCount((prev) => prev + 1);
    setHasReported(true);
    pushToast("Thank you for reporting this website. Your contribution helps protect others.", "success");
  };

  const handleDownloadPdf = () => {
    const reportTitle = `CipherGuard Scan Report - ${new Date().toLocaleDateString()}`;
    const rows = resolvedUrls
      .map(
        (row) => `
          <tr>
            <td>${row.url}</td>
            <td>${row.domain}</td>
            <td>${row.status}</td>
            <td>${row.risk}</td>
          </tr>
        `
      )
      .join("");

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      pushToast("Please allow popups to download your PDF report.", "warning");
      return;
    }

    printWindow.document.write(`<!DOCTYPE html>
      <html>
        <head><title>${reportTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
          h1 { margin-bottom: 8px; }
          .meta { color: #475569; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
          th { background: #f8fafc; }
        </style>
        </head>
        <body>
          <h1>${reportTitle}</h1>
          <div class="meta">Threat score: ${riskScore}/100 • Risk level: ${riskLevel}</div>
          <p><strong>Detected keywords:</strong> ${keywords.join(", ")}</p>
          <p><strong>Summary:</strong> ${assessmentSummary}</p>
          <table>
            <thead><tr><th>URL</th><th>Domain</th><th>Status</th><th>Risk</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </body>
      </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    pushToast("Your PDF report is being prepared.", "info");
  };

  const handleShareReport = async () => {
    const shareText = `CipherGuard flagged this content with a ${riskScore}/100 risk score. ${resolvedUrls.length} URL(s) were analyzed.`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "CipherGuard Threat Report",
          text: shareText,
          url: shareUrl,
        });
        pushToast("Report shared successfully.", "success");
        return;
      } catch {
        pushToast("Sharing was cancelled.", "info");
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      pushToast("Share link copied to your clipboard.", "success");
    } catch {
      pushToast("Unable to share right now.", "warning");
    }
  };

  // Animation Variant Blueprints
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("scanResult");

    if (stored) {
      setResult(JSON.parse(stored));

      // Remove after reading
      sessionStorage.removeItem("scanResult");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden antialiased relative pb-16">
      
      {/* HIGH-TECH BACKGROUND GLOW ARCHITECTURE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-24 right-10 w-96 h-96 bg-red-500/[0.02] rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* GLOBAL HIGH-TECH CORNER GLOW EFFECT */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="pointer-events-auto w-full p-4 rounded-xl border border-blue-500/30 bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl shadow-black/50 flex items-start gap-3"
            >
              <Shield className="h-5 w-5 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">System Telemetry</p>
                <p className="text-xs text-slate-300 mt-1">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ENTERPRISE CORE CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 space-y-8">
        
        {/* TOP BRAND BAR */}
        <header className="flex items-center justify-between border-b border-slate-800/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl shadow-lg shadow-blue-500/20 border border-blue-400/30">
            <CipherGuardLogo />  
            </div>
            <div>
              
              <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">Threat Intel Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            STATUS: EVALUATIONS_COMPLETE
          </div>
        </header>

        {/* ROOT MAIN CONTAINER */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* ==================== STAGE 1: SYSTEM OVERVIEW SECTION (LEFT COLUMN) ==================== */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            
            {/* COMPLETED SCAN CORE METRICS HEADER CARD */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl animate-pulse" />
                <div className="p-4 rounded-full bg-red-950/20 border border-red-500/30 relative text-red-400 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]">
                  <ShieldAlert className="h-12 w-12 stroke-[1.5]" />
                </div>
              </div>

              <h1 className="text-lg font-mono font-black tracking-wide text-white">SCAN COMPLETED</h1>
              <p className="text-xs text-slate-400 mt-1">CipherGuard Sandbox Environment v4.12</p>

              {/* RADIAL RISK CIRCLE DISPLAY MODULE */}
              <div className="my-8 relative flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="68" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                  <motion.circle 
                    cx="80" cy="80" r="68" 
                    stroke="#ef4444" strokeWidth="8" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 68}
                    initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - riskScore / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black font-mono tracking-tight text-white">{riskScore}</span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">Risk Index</span>
                </div>
              </div>

              {/* SEVERITY ACCORDION PILLS */}
              <div className="w-full flex flex-col gap-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-left mb-1">Threat Classification Matrix</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-1 gap-1.5 w-full">
                  {severityBadges.map((badge, idx) => (
                    <div 
                      key={idx} 
                      className={`px-3 py-2 rounded-xl border text-center font-mono text-[10px] font-black tracking-wider transition-all duration-300 ${
                        badge.active 
                          ? `${badge.color} shadow-[0_2px_12px_rgba(239,68,68,0.1)] scale-[1.02]` 
                          : "bg-slate-900/30 border-slate-800/40 text-slate-600"
                      }`}
                    >
                      {badge.label} {badge.active && "✦"}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* CARD 1: COMMUNITY REPORTING GLASS PANEL */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-4 shadow-[0_0_30px_rgba(59,130,246,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-300">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase">Scan Intelligence</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Live scan assessment based on the submitted content.</p>
                  </div>
                </div>
                <div className="rounded-full border border-slate-700/50 bg-slate-900/70 px-2.5 py-1 text-[10px] font-mono text-slate-300 uppercase">
                  {communityStatus}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 backdrop-blur">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-4xl font-black text-white font-mono">{riskScore}</p>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Risk score from active scan</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Result confidence</div>
                    <div className="text-sm font-semibold text-emerald-400">{confidenceScore}%</div>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-800/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, Math.max(0, riskScore))}%` }} />
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
                  {communityMessage}
                </p>
              </div>

              <button
                onClick={handleReportWebsite}
                disabled={hasReported}
                className={`w-full px-4 py-2.5 rounded-xl border font-mono text-xs font-bold tracking-tight flex items-center justify-center gap-2 transition-all ${
                  hasReported
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300 cursor-not-allowed"
                    : "border-blue-400/20 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20"
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                {hasReported ? "Thanks for contributing" : "Contribute a report"}
              </button>
            </motion.section>

            {/* CARD 2: AI SECURITY VERDICT ENGINE */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-6 space-y-4 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-400">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase">AI Security Assessment</h3>
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">Gemini Engine LLM-Insight</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-medium relative">
                <span className="absolute -top-2 left-3 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[8px] font-mono text-slate-400 uppercase tracking-wider">Verdict Synthesis</span>
                {assessmentSummary}
              </div>

              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">LLM Engine Confidence Matrix</span>
                  <span className="text-blue-400 font-bold">{confidenceScore}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/60 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${confidenceScore}%` }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                  />
                </div>
              </div>
            </motion.section>
          </div>

          {/* ==================== STAGE 2: GRANULAR THREAT DATA (RIGHT COLUMN) ==================== */}
          <div className="col-span-1 lg:col-span-8 space-y-6">
            
            {/* CARD 2: BEHAVIORAL THREAT INDICATORS INTEGRATION GRID */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-6 space-y-4 shadow-xl"
            >
              <div>
                <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-red-400" /> Behavioral Anomaly Fingerprints
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Isolated static indicators mapping malicious structural intent.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {threatIndicators.map((ind, idx) => {
                  const IndIcon = ind.icon;
                  return (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl border border-red-500/20 bg-red-950/[0.02] hover:bg-red-950/[0.04] transition-all duration-300 relative group flex gap-3 items-start"
                    >
                      <div className="p-1.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-400 shrink-0">
                        <IndIcon className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono font-bold text-slate-200 truncate group-hover:text-red-400 transition-colors">{ind.title}</span>
                          <span className="text-[8px] font-mono font-black tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 uppercase shrink-0">FAIL</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">{ind.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* CARD 3: REPUTATION VENDOR & SECURITY ENGINE TELEMETRY MATRIX */}
            <motion.section 
              variants={itemVariants}
              className="space-y-4"
            >
              <div className="px-1 flex justify-between items-baseline">
                <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" /> Federated Technical Deep Dive
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Multi-Source Verification Engine</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* Google Safe Browsing Card */}
                <div className="p-4 rounded-xl border border-red-500/20 bg-[#111827]/40 backdrop-blur-xl flex flex-col justify-between space-y-3 group hover:border-red-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200 font-bold">
                      <Globe className="h-4 w-4 text-red-400" /> Safe Browsing
                    </div>
                    <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded border ${safeBrowsingBadgeColor} uppercase`}>{safeBrowsingBadge}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500">Verdict:</span><span className="text-slate-200 font-bold">{safeBrowsingLabel}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className="text-slate-300 truncate w-24 text-right">{firstSafeBrowsing.error ? firstSafeBrowsing.error : firstSafeBrowsing.threats && firstSafeBrowsing.threats.length > 0 ? `${firstSafeBrowsing.threats.length} threat(s)` : "No threats detected"}</span></div>
                  </div>
                </div>

                {/* VirusTotal Verification Card */}
                <div className="p-4 rounded-xl border border-red-500/20 bg-[#111827]/40 backdrop-blur-xl flex flex-col justify-between space-y-3 group hover:border-red-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200 font-bold">
                      <ShieldCheck className="h-4 w-4 text-orange-400" /> VirusTotal
                    </div>
                    <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded border ${virusTotalBadgeColor} uppercase`}>{virusTotalBadgeLabel}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500">Detections:</span><span className={`font-bold ${virusTotalDetections >= 10 ? "text-red-400" : virusTotalDetections >= 1 ? "text-yellow-400" : "text-emerald-300"}`}>{virusTotalDetections} Vendor(s)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Score Tier:</span><span className="text-slate-300">{virusTotalTier}</span></div>
                  </div>
                </div>

                {/* WHOIS Verification Card */}
                <div className="p-4 rounded-xl border border-yellow-500/20 bg-[#111827]/40 backdrop-blur-xl flex flex-col justify-between space-y-3 group hover:border-yellow-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200 font-bold">
                      <FileCode className="h-4 w-4 text-yellow-400" /> WHOIS Registry
                    </div>
                    <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded border ${whoisBadgeColor} uppercase`}>{whoisBadgeLabel}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500">Domain Age:</span><span className="text-slate-200 font-bold">{whoisAgeLabel}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Registrar:</span><span className="text-slate-300">{whoisRegistrar}</span></div>
                  </div>
                </div>

                {/* SSL Verification Card */}
                <div className="p-4 rounded-xl border border-green-500/20 bg-[#111827]/40 backdrop-blur-xl flex flex-col justify-between space-y-3 group hover:border-green-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200 font-bold">
                      <Lock className="h-4 w-4 text-green-400" /> SSL Certificate
                    </div>
                    <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded border ${sslBadgeColor} uppercase`}>{sslBadgeLabel}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className={`font-bold ${sslBadgeLabel === 'VALID' ? 'text-emerald-300' : 'text-red-400'}`}>{sslStatusLabel}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Issuer:</span><span className="text-slate-300 truncate w-20 text-right">{sslIssuer}</span></div>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* TWO COLUMN GRID FOR SUB-ANALYSIS LAYOUT (RISK BREAKDOWN + EXTRACTED URLS TABLE) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
              
              {/* CARD 4: RISK DISTRIBUTION BREAKDOWN */}
              <motion.section 
                variants={itemVariants}
                className="xl:col-span-5 rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-5 space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase">Risk Index Contribution</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Weighted algorithm distribution structure mapping.</p>
                </div>

                <div className="space-y-3">
                  {riskBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="truncate pr-2">{item.name}</span>
                        <span className="text-slate-200 font-bold">{item.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800/40">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* CARD 6: EXTRACTED KEYWORD TOKEN ANALYSIS */}
              <motion.section 
                variants={itemVariants}
                className="xl:col-span-7 rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-5 space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase">Isolated Signature Keywords</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Extracted token values carrying structural social engineering weights.</p>
                </div>

                <div className="flex flex-wrap gap-2 py-2">
                  {keywords.map((word, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight bg-slate-900 border border-slate-800 text-slate-300 shadow-inner hover:border-blue-500/40 hover:text-white transition-all cursor-default"
                    >
                      🏷️ {word}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-blue-950/10 border border-blue-900/40 rounded-xl text-[11px] font-mono text-blue-400/90 leading-normal flex items-start gap-2">
                  <Terminal className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Heuristics flag count hits: Token pattern matches statistical database bounds for fraud deployment layout vectors.</span>
                </div>
              </motion.section>
            </div>

            {/* CARD 5: COMPREHENSIVE EXTRACTED LINK DATABASE GRID */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl p-5 space-y-4 shadow-xl overflow-hidden"
            >
              <div>
                <h3 className="text-xs font-mono font-black tracking-wider text-white uppercase">Extracted URI Reference Index</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Granular sandbox evaluation matrix of parsed hyper-links.</p>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full font-mono text-xs text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-800/60 text-slate-500 text-[10px] tracking-widest uppercase">
                      <th className="pb-3 font-black">Target URL Specifier</th>
                      <th className="pb-3 font-black">Domain Anchor</th>
                      <th className="pb-3 font-black">System Status</th>
                      <th className="pb-3 font-black">Risk Tier</th>
                      <th className="pb-3 font-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {resolvedUrls.map((row, idx) => {
                      const isMalicious = row.status === "Malicious";
                      const isSuspicious = row.status === "Suspicious";
                      
                      return (
                        <tr key={idx} className="group hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 pr-4 max-w-xs truncate text-slate-200 font-medium">{row.url}</td>
                          <td className="py-3.5 pr-4 text-slate-400">{row.domain}</td>
                          <td className="py-3.5 pr-4">
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              isMalicious ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              isSuspicious ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                              "bg-green-500/10 text-green-400 border border-green-500/20"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className={`py-3.5 pr-4 font-bold ${isMalicious ? "text-red-400" : isSuspicious ? "text-yellow-400" : "text-green-400"}`}>
                            {row.risk}
                          </td>
                          <td className="py-3.5 text-right space-x-2 whitespace-nowrap">
                            <button 
                              onClick={() => copyToClipboard(row.url)}
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer inline-flex items-center justify-center"
                              title="Copy Target URL"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <a 
                              href="#sandbox-view"
                              onClick={(e) => { e.preventDefault(); pushToast("Initializing isolated virtualization loop...", "info"); }}
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all inline-flex items-center justify-center"
                              title="Inspect safely inside sandbox"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.section>

            
            {/* CARD 8: COLLAPSIBLE SYSTEM DATA SCANNED PAYLOAD */}
            <motion.section 
              variants={itemVariants}
              className="rounded-2xl border border-slate-800/80 bg-[#111827]/40 backdrop-blur-xl shadow-xl overflow-hidden"
            >
              <button
                onClick={() => setIsOriginalContentOpen(!isOriginalContentOpen)}
                className="w-full p-5 flex items-center justify-between text-left border-b border-transparent hover:bg-slate-900/20 transition-all font-mono cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-white uppercase">Scanned Input Frame Raw Stream</h3>
                    <span className="text-[10px] text-slate-500 block">Payload String Sequence Dump</span>
                  </div>
                </div>
                {isOriginalContentOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>

              <AnimatePresence initial={false}>
                {isOriginalContentOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-slate-950 border-t border-slate-900 font-mono text-[11px] leading-relaxed text-slate-400 select-text overflow-x-auto whitespace-pre-wrap selection:bg-blue-500/40">
                      {originalMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* ==================== STAGE 3: INTERACTIVE ACTION ACTIONS AREA ==================== */}
            <motion.div 
              variants={itemVariants}
              className="pt-4 flex flex-wrap items-center justify-end gap-3.5 border-t border-slate-800/60"
            >
              <button 
                onClick={() => {
                  pushToast("Redirecting to new scan interface...", "info");
                  window.location.href = "/analyse";
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-mono text-xs font-bold tracking-tight flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Scan Another Payload
              </button>
              
              <button 
                onClick={handleDownloadPdf}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-mono text-xs font-bold tracking-tight flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF Report
              </button>
              
              <button 
                onClick={handleShareReport}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-mono text-xs font-bold tracking-tight flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Share2 className="h-3.5 w-3.5" /> Share Unique Token Report
              </button>

              <button 
                onClick={() => {
                  pushToast("Navigating back to main operational dashboard terminal layer...", "info");
                  window.location.href = "/dashboard";
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all font-mono text-xs font-black tracking-tight flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20 border border-blue-400/20"
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Go Dashboard
              </button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}