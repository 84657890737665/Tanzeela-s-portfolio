import { motion } from "motion/react";
import { Lock } from "lucide-react";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-2 group hover:border-white/30 transition-all duration-300 flex flex-col justify-between text-left h-full"
    >
      <div>
        {/* Image header with a cyber HUD frame */}
        <div className="relative rounded-xl overflow-hidden mb-4 h-48 border border-white/10">
          <img
            src={project.imageUrl}
            alt={project.imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 grid-mesh opacity-40" />

          {/* HUD corner brackets — intensify on hover */}
          <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/30 group-hover:border-white/80 transition-colors duration-300" />
          <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30 group-hover:border-white/80 transition-colors duration-300" />
          <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/30 group-hover:border-white/80 transition-colors duration-300" />
          <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/30 group-hover:border-white/80 transition-colors duration-300" />

          {/* Live status badge */}
          <span className="absolute top-3 right-3 bg-black/75 border border-white/10 text-zinc-300 font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 terminal-cursor" />
            DEPLOYED <Lock size={8} className="text-white" />
          </span>
        </div>

        <div className="px-4 pb-4 pt-1">
          <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans mb-4">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-white/5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/3 border border-white/5 text-zinc-450"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
