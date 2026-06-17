import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-[#0D1B2A] flex justify-center">
      <div className="w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8]">skills</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#E8F4F8] leading-[1.1] mt-3">
            My{" "}
            <span style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Toolkit.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          {skillsData.categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}
              className="flex flex-col p-6 rounded-2xl transition-all duration-300"
              style={{
                background: "#0F2030",
                border: cat.accent ? "1px solid rgba(0,201,184,0.35)" : "1px solid rgba(0,201,184,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display font-bold text-base text-[#E8F4F8]">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 flex-1">
                {cat.skills.map((s, idx) => (
                  <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#00C9B8", background: "rgba(0,201,184,0.06)", border: "1px solid rgba(0,201,184,0.15)" }}>
                    {s}
                  </span>
                ))}
              </div>
              {cat.note && <p className="font-mono text-[10px] text-[#8BA3B8] border-t border-[rgba(0,201,184,0.08)] pt-3 mt-auto">{cat.note}</p>}
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl transition-all duration-300"
          style={{ background: "#0F2030", border: "1px solid rgba(0,201,184,0.12)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{skillsData.tools.icon}</span>
            <h3 className="font-display font-bold text-base text-[#E8F4F8]">{skillsData.tools.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsData.tools.skills.map((t, i) => (
              <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#00C9B8", background: "rgba(0,201,184,0.06)", border: "1px solid rgba(0,201,184,0.15)" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
