import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/skills";

// Flatten all skills for marquee
const allSkills = [
  ...(skillsData.categories?.flatMap(c => c.skills) ?? []),
  ...(skillsData.tools?.skills ?? []),
];
const marqueeItems = [...allSkills, ...allSkills];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 md:py-32 flex flex-col justify-center"
      style={{ background: "#050505" }}>

      {/* Header */}
      <div className="px-6 md:px-12 xl:px-20 max-w-6xl mx-auto w-full mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: "#6B1E2B" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#6B1E2B" }}>skills</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-[1.1]" style={{ color: "#E8E1D3" }}>
            My{" "}
            <span style={{
              background: "linear-gradient(135deg, #6B1E2B, #C0556A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Toolkit.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="w-full overflow-hidden mb-16 py-4"
        style={{ borderTop: "1px solid rgba(107,30,43,0.12)", borderBottom: "1px solid rgba(107,30,43,0.12)" }}>
        <div className="marquee-track flex gap-4 md:gap-6 whitespace-nowrap" style={{ width: "max-content" }}>
          {marqueeItems.map((s, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full flex-shrink-0"
              style={{ color: i % 3 === 0 ? "#6B1E2B" : "#6B6056", border: "1px solid rgba(107,30,43,0.15)" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="px-6 md:px-12 xl:px-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          {skillsData.categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
              className="flex flex-col p-6 rounded-2xl transition-all duration-300"
              style={{
                background: "#0D0D0D",
                border: cat.accent ? "1px solid rgba(107,30,43,0.4)" : "1px solid rgba(107,30,43,0.12)",
              }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display font-bold text-base" style={{ color: "#E8E1D3" }}>{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 flex-1">
                {cat.skills.map((s, idx) => (
                  <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                    style={{ color: "#6B1E2B", background: "rgba(107,30,43,0.06)", border: "1px solid rgba(107,30,43,0.15)" }}>
                    {s}
                  </span>
                ))}
              </div>
              {cat.note && (
                <p className="font-mono text-[10px] pt-3 mt-auto" style={{ color: "#6B6056", borderTop: "1px solid rgba(107,30,43,0.08)" }}>
                  {cat.note}
                </p>
              )}
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
          style={{ background: "#0D0D0D", border: "1px solid rgba(107,30,43,0.12)" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{skillsData.tools.icon}</span>
            <h3 className="font-display font-bold text-base" style={{ color: "#E8E1D3" }}>{skillsData.tools.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsData.tools.skills.map((t, i) => (
              <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                style={{ color: "#6B1E2B", background: "rgba(107,30,43,0.06)", border: "1px solid rgba(107,30,43,0.15)" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
