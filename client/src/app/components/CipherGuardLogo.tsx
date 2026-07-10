"use client";

import { Shield } from "lucide-react";

interface CipherGuardLogoProps {
  wrapperClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  highlightClassName?: string;
  fillColor?: string;
}

export default function CipherGuardLogo({
  wrapperClassName = "flex items-center gap-2.5 cursor-pointer group",
  iconClassName = "h-6 w-6 text-blue-500 relative z-10 transition-transform duration-500 group-hover:rotate-12",
  textClassName = "text-lg font-bold tracking-tight text-white",
  highlightClassName = "text-blue-500 transition-colors group-hover:text-blue-400",
  fillColor = "rgba(37, 99, 235, 0.1)",
}: CipherGuardLogoProps) {
  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <Shield className={iconClassName} fill={fillColor} />
        <div className="absolute -inset-1 bg-blue-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className={textClassName}>
        Cipher<span className={highlightClassName}>Guard</span>
      </span>
    </div>
  );
}
