import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(0,201,184,0.1)", background: "#0a1520" }}>
      <span className="font-mono text-[11px] text-[#8BA3B8] uppercase tracking-wider">
        © 2026 Tanzeela Arshad — Built with React + Vite
      </span>
      <span className="font-mono text-[11px]" style={{ color: "#00C9B8" }}>
        Karachi, Pakistan 🇵🇰
      </span>
    </footer>
  );
}
