import React from "react";
import { motion } from "framer-motion";

const detailsList = [
  { icon: "📌", label: "Location", value: "Karachi, Pakistan" },
  { icon: "🎓", label: "Student", value: "SMIT (Cisco NetAcad)" },
  { icon: "🤖", label: "AI Certified", value: "GIAIC" },
  { icon: "☁️", label: "Cloud Specialist", value: "Google Cloud Practitioner" },
  { icon: "⚡", label: "Team Leadership", value: "Google AI Seekho 2026 Participant" }
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="about" 
      className="w-full py-24 md:py-32 px-4 md:px-8 xl:px-16 bg-cloud flex justify-center items-center overflow-hidden"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start"
      >
        {/* Left Column Text Content */}
        <motion.div 
          variants={childVariants}
          className="md:col-span-7 flex flex-col items-start text-left"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-4">
            about
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-[56px] leading-[1.1] text-tealDark mb-6 selection:bg-aqua/20">
            Building the web <br />
            <span className="text-gradient">cinematically.</span>
          </h2>
          <div className="space-y-4 font-body text-base sm:text-lg text-tealMuted leading-relaxed max-w-xl selection:bg-aqua/20">
            <p>
              I am Tanzeela, a Cybersecurity student and AI developer passionate about engineering highly intelligent, secure, and visually breathtaking digital solutions.
            </p>
            <p>
              As a core member of the <strong className="text-tealDark font-semibold">KaamYaar AI</strong> team, I focus on constructing multilingual parsers, agentic orchestrators, and agritech systems that push boundaries.
            </p>
            <p>
              Currently expanding my technical horizons through active specialization programs at SMIT with Cisco NetAcad, and GIAIC (Governor Initiative for Artificial Intelligence Certification).
            </p>
          </div>
        </motion.div>

        {/* Right Column Glass Bento Card */}
        <motion.div 
          variants={childVariants}
          className="md:col-span-5 w-full"
        >
          <motion.div
            whileHover={{ y: -6, boxShadow: "0 12px 48px rgba(0,201,200,0.22)" }}
            className="w-full bg-white/70 backdrop-blur-md rounded-bento border border-aqua/20 shadow-md p-6 sm:p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 border-b border-aqua/15 pb-4">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
              <span className="font-mono text-xs text-tealMuted ml-auto tracking-wider">tanzeela.json</span>
            </div>

            <div className="flex flex-col gap-4.5">
              {detailsList.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-3 bg-cloud/40 rounded-xl border border-aqua/5 hover:border-aqua/15 hover:bg-white transition-all duration-300"
                >
                  <span className="text-2xl mt-0.5 filter drop-shadow-sm select-none">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-tealMuted">
                      {item.label}
                    </span>
                    <span className="font-body font-semibold text-sm sm:text-base text-tealDark mt-0.5">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
