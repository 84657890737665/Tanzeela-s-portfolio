import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: "1px solid rgba(107,30,43,0.12)", background: "#000000" }}>
      <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider" style={{ color: "#6B6056" }}>
        © 2026 Tanzeela Arshad — Built with React + Vite
      </span>
      <span className="font-mono text-[10px] md:text-[11px]" style={{ color: "#6B1E2B" }}>
        Karachi, Pakistan 🇵🇰
      </span>
    </footer>
  );
}
