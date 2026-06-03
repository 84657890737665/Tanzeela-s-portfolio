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
      className="w-full py-24 md:py-32 px-4 md:px-8 xl:px-16 bg-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl flex flex-col items-start">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-tealMuted mb-3">
            projects
          </span>
          <h2 className="font-display font-black text-4xl md:text-[48px] text-tealDark leading-[1.1] selection:bg-aqua/20">
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

              {/* View Project Button */}
              {project.projectUrl && (
                <motion.a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 inline-flex items-center gap-2 self-start font-mono text-xs font-semibold uppercase tracking-widest text-aqua border border-aqua/30 px-5 py-2.5 rounded-full hover:bg-aqua hover:text-white hover:border-aqua hover:shadow-[0_0_18px_rgba(0,201,200,0.35)] transition-all duration-300"
                >
                  {project.projectType === "mobile-app" ? "Install App" : "View Project"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
