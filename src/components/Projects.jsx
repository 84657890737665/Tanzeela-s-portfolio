import React from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";

const statusStyle = (s) => {
  if (s === "Live") return { color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" };
  if (s === "Published") return { color: "#60a5fa", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)" };
  if (s === "Coming Soon") return { color: "#00C9B8", background: "rgba(0,201,184,0.08)", border: "1px solid rgba(0,201,184,0.2)" };
  return { color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" };
};

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-[#0a1520] flex justify-center">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8]">projects</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#E8F4F8] leading-[1.1] mt-3">
            Things I've{" "}
            <span style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Built.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projectsData.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
              className={`relative flex flex-col p-7 rounded-2xl transition-all duration-300 ${p.featured ? "md:col-span-2" : ""}`}
              style={{
                background: "#0F2030",
                border: p.featured ? "1px solid rgba(0,201,184,0.35)" : "1px solid rgba(0,201,184,0.12)",
                boxShadow: p.featured ? "0 0 40px rgba(0,201,184,0.06)" : "none",
              }}
            >
              {/* Featured accent line */}
              {p.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, #00C9B8, transparent)" }} />
              )}

              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{p.icon}</span>
                <div className="flex items-center gap-2">
                  {p.badge && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: "#00C9B8", background: "rgba(0,201,184,0.08)", border: "1px solid rgba(0,201,184,0.2)" }}>
                      {p.badge}
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full" style={statusStyle(p.status)}>
                    {p.status}
                  </span>
                </div>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8BA3B8] mb-1">{p.subtitle}</span>
              <h3 className="font-display font-black text-xl md:text-2xl text-[#E8F4F8] mb-3">{p.title}</h3>
              <p className="font-body text-sm text-[#8BA3B8] leading-relaxed mb-6 flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ color: "#00C9B8", background: "rgba(0,201,184,0.06)", border: "1px solid rgba(0,201,184,0.15)" }}>
                    {t}
                  </span>
                ))}
              </div>

              {p.projectUrl && (
                <a
                  href={p.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300"
                  style={{ color: "#00C9B8", border: "1px solid rgba(0,201,184,0.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#00C9B8"; e.currentTarget.style.color = "#0D1B2A"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00C9B8"; }}
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
