import React from "react";
import { motion } from "framer-motion";
import { educationData } from "../data/education";

export default function Education() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="education" 
      className="w-full py-24 md:py-32 px-4 md:px-8 xl:px-16 bg-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl flex flex-col items-start">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-3">
            education
          </span>
          <h2 className="font-display font-black text-4xl md:text-[48px] text-tealDark leading-[1.1] selection:bg-aqua/20">
            Where I <span className="text-gradient">Learn.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {educationData.map((edu) => (
            <motion.div
              key={edu.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 12px 48px rgba(0, 201, 200, 0.18)",
                borderColor: "rgba(0, 201, 200, 0.35)"
              }}
              className="bg-white rounded-bento border border-aqua/15 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Institution & Icon */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cloud border border-aqua/15 flex items-center justify-center text-2xl filter drop-shadow-sm select-none">
                    {edu.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display font-bold text-base text-tealDark leading-snug">
                      {edu.institution}
                    </h3>
                    {edu.organizers && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-tealMuted mt-0.5">
                        {edu.organizers}
                      </span>
                    )}
                  </div>
                </div>

                {/* Program Info */}
                <div className="flex flex-col mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-tealMuted mb-1">
                    Program / Track
                  </span>
                  <p className="font-body font-bold text-sm text-tealDark leading-relaxed">
                    {edu.program}
                  </p>
                  {edu.role && (
                    <span className="font-mono text-xs font-semibold text-aqua-dark mt-1">
                      {edu.role}
                    </span>
                  )}
                </div>

                {/* Details List */}
                <div className="flex flex-col gap-2.5 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-tealMuted">
                    Highlights & Curriculum
                  </span>
                  <div className="flex flex-col gap-2">
                    {edu.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className={`text-[13px] mt-0.5 select-none ${detail.completed ? "text-aqua" : "text-tealMuted/50"}`}>
                          {detail.completed ? "✓" : "○"}
                        </span>
                        <span className={`font-body text-xs leading-normal ${detail.completed ? "text-tealDark font-medium" : "text-tealMuted/60"}`}>
                          {detail.text} {!detail.completed && <span className="font-mono text-[9px] italic bg-aqua/5 px-1 rounded">(in progress)</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Accent Highlight */}
              {edu.highlight && (
                <div className="font-mono text-[11px] font-semibold text-aqua-dark bg-aqua/5 border border-aqua/15 rounded-lg px-3 py-2 text-center select-none mt-auto">
                  {edu.highlight}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
