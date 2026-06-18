import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projectsData } from "../data/projects";

const statusStyle = (s) => {
  if (s === "Live")        return { color: "#4ade80",  background: "rgba(74,222,128,0.07)",   border: "1px solid rgba(74,222,128,0.2)" };
  if (s === "Published")   return { color: "#93c5fd",  background: "rgba(147,197,253,0.07)",  border: "1px solid rgba(147,197,253,0.2)" };
  if (s === "Coming Soon") return { color: "#6B1E2B",  background: "rgba(107,30,43,0.08)",    border: "1px solid rgba(107,30,43,0.2)" };
  return                          { color: "#fbbf24",  background: "rgba(251,191,36,0.07)",   border: "1px solid rgba(251,191,36,0.2)" };
};

function TiltCard({ children, featured, style, className }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, ...style }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20 md:py-32 px-6 md:px-12 xl:px-20 flex justify-center"
      style={{ background: "#000000" }}>
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: "#6B1E2B" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#6B1E2B" }}>projects</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-[1.1]"
            style={{ color: "#E8E1D3" }}>
            Things I've{" "}
            <span style={{
              background: "linear-gradient(135deg, #6B1E2B, #C0556A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Built.</span>
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
              className={p.featured ? "md:col-span-2" : ""}>
              <TiltCard
                featured={p.featured}
                className="relative flex flex-col p-7 rounded-2xl h-full transition-all duration-300"
                style={{
                  background: "#0D0D0D",
                  border: p.featured ? "1px solid rgba(107,30,43,0.4)" : "1px solid rgba(107,30,43,0.12)",
                  boxShadow: p.featured ? "0 0 50px rgba(107,30,43,0.07)" : "none",
                }}>
                {/* Featured top line */}
                {p.featured && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg, #6B1E2B, transparent)" }} />
                )}

                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="flex items-center gap-2">
                    {p.badge && (
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ color: "#6B1E2B", background: "rgba(107,30,43,0.08)", border: "1px solid rgba(107,30,43,0.2)" }}>
                        {p.badge}
                      </span>
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={statusStyle(p.status)}>
                      {p.status}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: "#6B6056" }}>{p.subtitle}</span>
                <h3 className="font-display font-black text-xl md:text-2xl mb-3" style={{ color: "#E8E1D3" }}>{p.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-6 flex-1" style={{ color: "#A09585" }}>{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                      style={{ color: "#6B1E2B", background: "rgba(107,30,43,0.06)", border: "1px solid rgba(107,30,43,0.15)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {p.projectUrl && (
                  <a href={p.projectUrl} target="_blank" rel="noopener noreferrer"
                    className="self-start font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300"
                    style={{ color: "#E8E1D3", border: "1px solid rgba(107,30,43,0.35)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#6B1E2B"; e.currentTarget.style.color = "#E8E1D3"; e.currentTarget.style.boxShadow = "0 0 20px rgba(107,30,43,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E8E1D3"; e.currentTarget.style.boxShadow = "none"; }}>
                    View Project →
                  </a>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
