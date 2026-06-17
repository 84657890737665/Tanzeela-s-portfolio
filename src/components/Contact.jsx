import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="w-full py-24 md:py-32 px-6 md:px-12 xl:px-20 bg-[#0D1B2A] flex justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8]">contact</span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[#E8F4F8] leading-[1.1] mt-3">
            Let's Build{" "}
            <span style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Something.
            </span>
          </h2>
          <p className="font-body text-[#8BA3B8] text-base mt-5 max-w-md mx-auto">
            Open to collaborations, AI projects, and international opportunities. Let's bring intelligent ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-md p-8 rounded-2xl flex flex-col items-center gap-6"
          style={{ background: "#0F2030", border: "1px solid rgba(0,201,184,0.2)" }}
        >
          <a
            href="mailto:tanzeelaarshad320@gmail.com"
            className="flex items-center gap-3 w-full justify-center px-6 py-4 rounded-full font-body font-semibold text-sm text-[#0D1B2A] transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", boxShadow: "0 0 24px rgba(0,201,184,0.3)" }}
          >
            <Mail size={16} />
            tanzeelaarshad320@gmail.com
          </a>

          <div className="w-2/3 h-[1px] bg-[rgba(0,201,184,0.1)]" />

          <div className="flex gap-3">
            {[
              { icon: <FaGithub size={18} />, href: "https://github.com/84657890737665/", label: "GitHub" },
              { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/tanzeela-arshad-39b217236", label: "LinkedIn" },
              { icon: <FaInstagram size={18} />, href: "https://instagram.com/tanzeela_bint_arshad", label: "Instagram" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                aria-label={s.label}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ color: "#8BA3B8", background: "rgba(0,201,184,0.05)", border: "1px solid rgba(0,201,184,0.15)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00C9B8"; e.currentTarget.style.borderColor = "rgba(0,201,184,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#8BA3B8"; e.currentTarget.style.borderColor = "rgba(0,201,184,0.15)"; }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
