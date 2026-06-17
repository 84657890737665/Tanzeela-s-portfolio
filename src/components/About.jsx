import React from "react";
import { motion } from "framer-motion";

const details = [
  { label: "Location", value: "Karachi, Pakistan", icon: "📌" },
  { label: "Delegate", value: "KhiNext'26 — Asia's First Multi-Domain AI Summit", icon: "🏛️" },
  { label: "AI Program", value: "GIAIC — Governor Initiative for AI", icon: "🤖" },
  { label: "Cybersec", value: "SMIT × Cisco NetAcad", icon: "🛡️" },
  { label: "Award", value: "Networking Academy Learn-A-Thon 2026", icon: "🏆" },
  { label: "Google", value: "AI Seekho 2026 — Team Lead, KaamYaar AI", icon: "☁️" },
];

export default function About() {
  return (
    <section id="about" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-[#0D1B2A] flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-6 flex flex-col"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8] mb-4">about</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#E8F4F8] leading-[1.1] mb-6">
            Building things that<br />
            <span style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              actually matter.
            </span>
          </h2>
          <div className="space-y-4 font-body text-[#8BA3B8] text-base leading-relaxed">
            <p>
              I'm Tanzeela — a Full Stack Developer and Agentic AI Engineer from Karachi, Pakistan, currently building AI systems that work in the real world, not just in demos.
            </p>
            <p>
              As <strong className="text-[#E8F4F8]">Team Lead</strong> of KaamYaar AI, I architected an 8-agent platform for Pakistan's informal gig economy — multilingual, deployed on Google Cloud Run, with women safety features built into the core.
            </p>
            <p>
              I attended <strong className="text-[#E8F4F8]">KhiNext'26</strong> as an official delegate — Asia's first multi-domain AI & Innovation Summit. Parallel to building, I'm studying Ethical Hacking and Cybersecurity at SMIT × Cisco NetAcad.
            </p>
          </div>
        </motion.div>

        {/* Right — card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="md:col-span-6"
        >
          <div
            className="w-full rounded-2xl p-6 flex flex-col gap-3"
            style={{ background: "#0F2030", border: "1px solid rgba(0,201,184,0.15)" }}
          >
            {/* Terminal top bar */}
            <div className="flex items-center gap-2 border-b border-[rgba(0,201,184,0.1)] pb-4 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="font-mono text-[10px] text-[#8BA3B8] ml-auto">tanzeela.json</span>
            </div>
            {details.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 cursor-default"
                style={{ background: "rgba(0,201,184,0.03)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,201,184,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,201,184,0.03)"}
              >
                <span className="text-xl mt-0.5">{d.icon}</span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#8BA3B8]">{d.label}</p>
                  <p className="font-body font-semibold text-sm text-[#E8F4F8] mt-0.5">{d.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
