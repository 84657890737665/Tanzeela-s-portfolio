import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:tanzeelaarshad320@gmail.com";
  };

  return (
    <section 
      id="contact" 
      className="w-full py-24 md:py-32 px-6 md:px-12 bg-cloud flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-3">
            contact
          </span>
          <h2 className="font-display font-black text-4xl sm:text-[48px] text-tealDark leading-[1.1] selection:bg-aqua/20">
            Let's Build <span className="text-gradient">Something.</span>
          </h2>
        </div>

        {/* Centered Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="w-full max-w-[600px] bg-white rounded-[24px] border border-aqua/20 shadow-soft hover:shadow-card p-10 md:p-12 flex flex-col items-center text-center transition-all duration-300"
        >
          {/* Card Intro */}
          <p className="font-body text-base md:text-lg text-tealMuted leading-relaxed mb-8 max-w-md selection:bg-aqua/20">
            Open to collaborations, projects, and opportunities. Feel free to reach out and let's bring intelligent ideas to life!
          </p>

          {/* Email CTA button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(0, 201, 200, 0.45)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmailClick}
            className="flex items-center gap-3 bg-gradient-to-r from-aqua to-aqua-dark text-white font-body font-semibold px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-md mb-8 select-none"
          >
            <Mail size={18} />
            <span className="text-sm sm:text-base">tanzeelaarshad320@gmail.com</span>
          </motion.button>

          {/* Divider */}
          <div className="w-2/3 h-[1px] bg-aqua/10 mb-8" />

          {/* Social Row */}
          <div className="flex gap-4">
            {/* GitHub */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1, color: "#00C9C8" }}
              className="w-11 h-11 rounded-full bg-cloud border border-aqua/10 flex items-center justify-center text-tealDark hover:bg-aqua/5 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1, color: "#00C9C8" }}
              className="w-11 h-11 rounded-full bg-cloud border border-aqua/10 flex items-center justify-center text-tealDark hover:bg-aqua/5 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
