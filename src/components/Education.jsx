import React from "react";
import { motion } from "framer-motion";
import { educationData } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-[#0a1520] flex justify-center">
      <div className="w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8]">education</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#E8F4F8] leading-[1.1] mt-3">
            Where I{" "}
            <span style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Learned.
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {educationData.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ x: 4 }}
              className="flex flex-col md:flex-row gap-6 p-7 rounded-2xl transition-all duration-300"
              style={{ background: "#0F2030", border: "1px solid rgba(0,201,184,0.12)" }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(0,201,184,0.08)", border: "1px solid rgba(0,201,184,0.2)" }}>
                  {ed.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#E8F4F8]">{ed.institution}</h3>
                    <p className="font-body text-sm text-[#00C9B8] mt-0.5">{ed.program}</p>
                    {ed.platform && <p className="font-mono text-[10px] text-[#8BA3B8] mt-1 uppercase tracking-wider">{ed.platform}</p>}
                    {ed.organizers && <p className="font-mono text-[10px] text-[#8BA3B8] mt-1">{ed.organizers}</p>}
                    {ed.role && <p className="font-mono text-[10px] text-[#00C9B8] mt-1 uppercase tracking-wider">{ed.role}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 mb-3">
                  {ed.details.map((d, idx) => (
                    <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5"
                      style={{
                        color: d.completed ? "#00C9B8" : "#8BA3B8",
                        background: d.completed ? "rgba(0,201,184,0.06)" : "rgba(255,255,255,0.03)",
                        border: d.completed ? "1px solid rgba(0,201,184,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {d.completed ? "✓" : "◦"} {d.text}
                    </span>
                  ))}
                </div>
                {ed.highlight && (
                  <p className="font-mono text-[11px] text-[#00C9B8] mt-3 border-t border-[rgba(0,201,184,0.1)] pt-3">{ed.highlight}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
