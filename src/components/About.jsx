import React from "react";
import { motion } from "framer-motion";

const details = [
  { label: "Location",   value: "Karachi, Pakistan",                                icon: "📌" },
  { label: "Delegate",   value: "KhiNext'26 — Asia's First Multi-Domain AI Summit", icon: "🏛️" },
  { label: "AI Program", value: "GIAIC — Governor Initiative for AI",                icon: "🤖" },
  { label: "Cybersec",   value: "SMIT × Cisco NetAcad",                             icon: "🛡️" },
  { label: "Award",      value: "Networking Academy Learn-A-Thon 2026",             icon: "🏆" },
  { label: "Google",     value: "AI Seekho 2026 — Team Lead, KaamYaar AI",          icon: "☁️" },
];

export default function About() {
  return (
    <section id="about"
      className="w-full py-20 md:py-32 px-6 md:px-12 xl:px-20 flex justify-center"
      style={{ background: "#050505" }}>
      <div className="w-full max-w-6xl">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12 md:mb-16">
          <div style={{ width: 24, height: 1, background: "#6B1E2B", flexShrink: 0 }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#6B1E2B" }}>about</span>
        </motion.div>

        {/* Grid — stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col">

            {/* Photo + name */}
            <div className="mb-7 md:mb-8 flex items-center gap-4">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: "1.5px solid rgba(107,30,43,0.4)" }}>
                <img src="/tanzeela.png" alt="Tanzeela Arshad"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <div>
                <p className="font-display font-bold text-sm md:text-base" style={{ color: "#E8E1D3" }}>Tanzeela Arshad</p>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider mt-0.5"
                  style={{ color: "#6B1E2B" }}>Hafiza · AI Engineer · Developer</p>
              </div>
            </div>

            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 md:mb-6"
              style={{ color: "#E8E1D3" }}>
              Building things that<br />
              <span style={{
                background: "linear-gradient(135deg, #6B1E2B, #C0556A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>actually matter.</span>
            </h2>

            <div className="space-y-4 font-body text-sm md:text-base leading-relaxed" style={{ color: "#A09585" }}>
              <p>I'm Tanzeela — a Full Stack Developer and Agentic AI Engineer from Karachi,
                building AI systems that work in the real world, not just in demos.</p>
              <p>As <strong style={{ color: "#E8E1D3" }}>Team Lead</strong> of KaamYaar AI, I architected
                an 8-agent platform for Pakistan's informal gig economy — multilingual, deployed on
                Google Cloud Run, with women safety features built into the core.</p>
              <p>Attended <strong style={{ color: "#E8E1D3" }}>KhiNext'26</strong> as an official delegate.
                Also studying Ethical Hacking at SMIT × Cisco NetAcad.</p>
            </div>
          </motion.div>

          {/* RIGHT — terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-7">
            <div className="w-full rounded-2xl p-5 md:p-6 flex flex-col gap-2 md:gap-3"
              style={{ background: "#0D0D0D", border: "1px solid rgba(107,30,43,0.18)" }}>
              <div className="flex items-center gap-2 pb-3 md:pb-4 mb-1"
                style={{ borderBottom: "1px solid rgba(107,30,43,0.1)" }}>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#FF5F56" }} />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#FFBD2E" }} />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#27C93F" }} />
                <span className="font-mono text-[10px] ml-auto" style={{ color: "#6B6056" }}>tanzeela.json</span>
              </div>
              {details.map((d, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-2.5 md:p-3 rounded-xl cursor-default transition-all duration-200"
                  style={{ background: "rgba(107,30,43,0.03)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(107,30,43,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(107,30,43,0.03)"}>
                  <span className="text-base md:text-lg mt-0.5">{d.icon}</span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "#6B6056" }}>{d.label}</p>
                    <p className="font-body font-semibold text-xs md:text-sm mt-0.5 break-words" style={{ color: "#E8E1D3" }}>{d.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
