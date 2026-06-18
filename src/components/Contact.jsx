import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 flex justify-center relative overflow-hidden"
      style={{ background: "#050505" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,30,43,0.1) 0%, transparent 70%)",
          filter: "blur(80px)"
        }} />
      </div>

      <div className="w-full max-w-6xl flex flex-col items-center text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: "#6B1E2B" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#6B1E2B" }}>contact</span>
            <div style={{ width: 24, height: 1, background: "#6B1E2B" }} />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[1.1]" style={{ color: "#E8E1D3" }}>
            Let's Build{" "}
            <span style={{
              background: "linear-gradient(135deg, #6B1E2B, #C0556A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Something.</span>
          </h2>
          <p className="font-body text-base mt-5 max-w-md mx-auto" style={{ color: "#A09585" }}>
            Open to collaborations, AI projects, and international opportunities. Let's bring intelligent ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-md p-8 rounded-2xl flex flex-col items-center gap-6"
          style={{ background: "#0D0D0D", border: "1px solid rgba(107,30,43,0.2)" }}>
          <a
            href="mailto:tanzeelaarshad320@gmail.com"
            className="flex items-center gap-3 w-full justify-center px-6 py-4 rounded-full font-body font-semibold text-sm transition-all duration-300"
            style={{
              background: "#6B1E2B",
              color: "#E8E1D3",
              boxShadow: "0 0 28px rgba(107,30,43,0.4)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#8B2535"; e.currentTarget.style.boxShadow = "0 0 40px rgba(107,30,43,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#6B1E2B"; e.currentTarget.style.boxShadow = "0 0 28px rgba(107,30,43,0.4)"; }}>
            <Mail size={16} />
            tanzeelaarshad320@gmail.com
          </a>

          <div className="w-2/3 h-[1px]" style={{ background: "rgba(107,30,43,0.12)" }} />

          <div className="flex gap-3">
            {[
              { icon: <FaGithub size={18} />,    href: "https://github.com/84657890737665/",                            label: "GitHub" },
              { icon: <FaLinkedin size={18} />,  href: "https://www.linkedin.com/in/tanzeela-arshad-39b217236",         label: "LinkedIn" },
              { icon: <FaInstagram size={18} />, href: "https://instagram.com/tanzeela_bint_arshad",                    label: "Instagram" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label={s.label}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ color: "#A09585", background: "rgba(107,30,43,0.05)", border: "1px solid rgba(107,30,43,0.15)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#E8E1D3"; e.currentTarget.style.borderColor = "rgba(107,30,43,0.5)"; e.currentTarget.style.background = "rgba(107,30,43,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#A09585"; e.currentTarget.style.borderColor = "rgba(107,30,43,0.15)"; e.currentTarget.style.background = "rgba(107,30,43,0.05)"; }}>
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
