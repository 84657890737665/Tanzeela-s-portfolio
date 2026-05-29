import React from "react";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";

const getBadgeStyles = (status) => {
  switch (status) {
    case "Live":
      return "bg-emerald-50 text-emerald-600 border-emerald-200/50";
    case "Published":
      return "bg-blue-50 text-blue-600 border-blue-200/50";
    default:
      return "bg-amber-50 text-amber-600 border-amber-200/50";
  }
};

export default function Projects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="projects" 
      className="w-full py-24 md:py-32 px-6 md:px-12 bg-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl flex flex-col items-start">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-3">
            projects
          </span>
          <h2 className="font-display font-black text-4xl sm:text-[48px] text-tealDark leading-[1.1] selection:bg-aqua/20">
            Things I've <span className="text-gradient">Built.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 12px 48px rgba(0, 201, 200, 0.18)",
                borderColor: "rgba(0, 201, 200, 0.4)"
              }}
              className={`relative bg-white rounded-bento border border-aqua/15 p-7 sm:p-8 flex flex-col justify-between transition-colors duration-300 ${
                project.featured ? "md:col-span-2 border-l-4 border-l-aqua" : ""
              }`}
            >
              {/* Card Header Info */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Icon */}
                  <span className="text-3xl filter drop-shadow-sm select-none" role="img" aria-label="Project icon">
                    {project.icon}
                  </span>
                  
                  {/* Status Badge */}
                  <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${getBadgeStyles(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-col mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-tealMuted mb-0.5">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-tealDark group-hover:text-aqua transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="font-body text-sm sm:text-base text-tealMuted leading-relaxed mb-8 max-w-2xl selection:bg-aqua/20">
                  {project.description}
                </p>
              </div>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="font-mono text-xs font-medium text-aqua-dark bg-aqua/5 border border-aqua/10 px-3 py-1 rounded-full hover:bg-aqua/10 hover:border-aqua/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
