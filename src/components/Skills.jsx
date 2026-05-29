import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/skills";

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="skills" 
      className="w-full py-24 md:py-32 px-6 md:px-12 bg-cloud flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl flex flex-col items-start">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-3">
            skills
          </span>
          <h2 className="font-display font-black text-4xl sm:text-[48px] text-tealDark leading-[1.1] selection:bg-aqua/20">
            My <span className="text-gradient">Toolkit.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full flex flex-col gap-6"
        >
          {/* Main 3 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillsData.categories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -6, 
                  boxShadow: "0 12px 48px rgba(0, 201, 200, 0.18)",
                  borderColor: "rgba(0, 201, 200, 0.35)"
                }}
                className={`bg-white rounded-bento border border-aqua/15 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  category.accent ? "border-l-4 border-l-aqua" : ""
                }`}
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl filter drop-shadow-sm select-none" role="img" aria-label="skill icon">
                      {category.icon}
                    </span>
                    <h3 className="font-display font-bold text-lg text-tealDark">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs font-semibold text-aqua-dark bg-aqua/5 border border-aqua/20 px-3 py-1.5 rounded-full hover:bg-aqua/10 hover:border-aqua/30 transition-all duration-300 select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional Note */}
                {category.note && (
                  <p className="font-mono text-[10px] sm:text-xs text-tealMuted/85 border-t border-aqua/10 pt-4 mt-auto">
                    {category.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Full Width Tools & Platforms Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              y: -4, 
              boxShadow: "0 12px 48px rgba(0, 201, 200, 0.18)",
              borderColor: "rgba(0, 201, 200, 0.35)"
            }}
            className="w-full bg-white rounded-bento border border-aqua/15 p-6 sm:p-8 flex flex-col transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl filter drop-shadow-sm select-none" role="img" aria-label="tools icon">
                {skillsData.tools.icon}
              </span>
              <h3 className="font-display font-bold text-lg text-tealDark">
                {skillsData.tools.title}
              </h3>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2.5">
              {skillsData.tools.skills.map((tool, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs font-semibold text-aqua-dark bg-aqua/5 border border-aqua/20 px-3 py-1.5 rounded-full hover:bg-aqua/10 hover:border-aqua/30 transition-all duration-300 select-none"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
