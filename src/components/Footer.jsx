import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-tealDark text-white/80 py-6 px-4 text-center font-mono text-xs select-none border-t border-white/5">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span style={{ color: '#E8D5B7' }}> Built with ❤️ by</span>
        <span className="text-aqua font-semibold tracking-wide uppercase font-display text-[13px]">
          Tanzeela
        </span>
        <span className="hidden sm:inline">·</span>
        <span style={{ color: '#E8D5B7' }}>2026</span>
      </div>
    </footer>
  );
}
