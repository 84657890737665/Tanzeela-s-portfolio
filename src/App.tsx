/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  Layers,
  Brain,
  Shield,
  Zap,
  Rocket,
  Menu,
  X
} from "lucide-react";
import LightRays from "./components/LightRays";
import NexusTerminal from "./components/NexusTerminal";
import SecureForm from "./components/SecureForm";
import kaamyaarScreenshot from "./assets/projects/kaamyaar-ai.jpeg";
import sarsabzScreenshot from "./assets/projects/sarsabz.jpeg";
import taskflowScreenshot from "./assets/projects/taskflow.jpeg";
import { ServiceItem, ProjectItem, DiagnosticStat } from "./types";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Capabilities dataset
  const capabilities: ServiceItem[] = [
    {
      id: "full-stack",
      title: "Full-Stack Architecture",
      description: "Designing scalable, high-performance web applications with modern frameworks. Ensuring seamless data flow from database to DOM.",
      iconName: "Layers"
    },
    {
      id: "agentic-ai",
      title: "Agentic AI Integration",
      description: "Building autonomous LLM-driven agents capable of complex reasoning, tool use, and multi-step execution environments.",
      iconName: "Brain"
    },
    {
      id: "security",
      title: "Security Auditing",
      description: "Proactive vulnerability assessment, penetration testing, and implementation of zero-trust architectures to harden critical systems.",
      iconName: "Shield"
    }
  ];

  // Active Deployments dataset — real shipped work
  const projects: ProjectItem[] = [
    {
      id: "project-1",
      title: "KaamYaar AI",
      description: "An 8-agent platform for Pakistan's informal gig economy, built for Google AI Seekho 2026. Includes a Women Safety Calling Agent, CNIC/face verification, and multi-language support across 8 Pakistani languages.",
      tags: ["FastAPI", "Flutter", "Firebase", "Cloud Run", "Google AI"],
      imageUrl: kaamyaarScreenshot,
      imageAlt: "KaamYaar AI mobile app screenshot"
    },
    {
      id: "project-2",
      title: "Sarsabz",
      description: "An agritech initiative exploring AI-driven solutions for farmers, developed during the Google AI Seekho 2026 program.",
      tags: ["Python", "AI/ML", "Agritech"],
      imageUrl: sarsabzScreenshot,
      imageAlt: "Sarsabz Pakistan agritech app screenshot"
    },
    {
      id: "project-3",
      title: "Taskflow",
      description: "A task and workflow management build focused on clean architecture and practical productivity tooling.",
      tags: ["React", "TypeScript"],
      imageUrl: taskflowScreenshot,
      imageAlt: "Taskflow app screenshot"
    }
  ];

  // Visual diagnostics metrics
  const stats: DiagnosticStat[] = [
    { label: "Projects Completed", value: "10+", description: "Production deployments dispatched" },
    { label: "Uptime Guaranteed", value: "99.9%", description: "Continuous SLA availability" },
    { label: "Certifications Active", value: "3+", description: "Security & AI accredited nodes" },
    { label: "Threat Monitoring", value: "24/7", description: "Autonomous firewall checks" }
  ];

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-white/20 selection:text-white pb-0 bg-bg-void">
      
      {/* Background Mesh layout + glowing points */}
      <div className="absolute inset-0 z-0 grid-mesh pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40vh] right-[10%] w-[500px] h-[500px] bg-white/3 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20vh] left-[5%] w-80 h-80 bg-white/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Floating Glass Navigation Header */}
      <nav id="navbar" className="fixed top-6 left-0 right-0 w-full z-50 px-4 flex justify-center">
        <div className="glass-card rounded-full flex justify-between items-center px-6 py-3 w-full max-w-4xl mx-auto border border-white/10 shadow-lg select-none">
          
          <div className="flex items-center gap-2.5 font-mono text-white text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <Cpu size={16} className="text-white shrink-0" />
            <span className="font-serif italic font-normal tracking-wide text-sm">TANZEELA</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-mono text-xs">
            <a href="#bio" className="text-zinc-400 hover:text-white transition-colors duration-200 uppercase tracking-widest font-semibold text-[10px]">
              BIO
            </a>
            <a href="#agents" className="text-zinc-400 hover:text-white transition-colors duration-200 uppercase tracking-widest font-semibold text-[10px]">
              AGENTS
            </a>
            <a href="#projects" className="text-zinc-400 hover:text-white transition-colors duration-200 uppercase tracking-widest font-semibold text-[10px]">
              PROJECTS
            </a>
            <a href="#stats" className="text-zinc-400 hover:text-white transition-colors duration-200 uppercase tracking-widest font-semibold text-[10px]">
              UPTIME
            </a>
          </div>

          {/* User connection action triggers */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="bg-white/5 border border-white/15 text-white rounded-full px-4 py-1.5 text-[10px] font-mono font-bold hover:text-white hover:border-white transition-all duration-300 uppercase tracking-widest"
            >
              CONTACT
            </a>
            <a
              href="#secure-channel"
              className="bg-white text-[#02155a] rounded-full px-5 py-2 text-[10px] font-mono font-black hover:bg-zinc-200 transition-all duration-300 uppercase tracking-[0.15em] shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
            >
              CONNECT
            </a>
          </div>

          {/* Mobile Hamburguer trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 z-40 mx-4 max-w-lg md:hidden"
          >
            <div className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4 font-mono text-sm shadow-2xl text-left">
              <a
                href="#bio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
              >
                // BIO
              </a>
              <a
                href="#agents"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
              >
                // AGENTS
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
              >
                // PROJECTS
              </a>
              <a
                href="#stats"
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
              >
                // UPTIME
              </a>
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-white/5 text-white border border-white/10 rounded-xl py-2.5 text-center font-bold"
                >
                  CONTACT
                </a>
                <a
                  href="#secure-channel"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-white text-[#02155a] rounded-xl py-2.5 text-center font-bold"
                >
                  CONNECT
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 md:pt-44">
        
        {/* HERO SECTION */}
        <section id="bio" className="relative min-h-[60vh] flex flex-col items-center justify-start px-6 md:px-12 text-center select-none max-w-6xl mx-auto">
          
          {/* Embedding LightRays perfectly in backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-none h-[500px]">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.2}
              lightSpread={0.9}
              rayLength={1.5}
              followMouse={true}
              mouseInfluence={0.08}
              noiseAmount={0.02}
              distortion={0.06}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto mt-4 md:mt-8 space-y-6">
            
            {/* Status indicator tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[11px] font-bold tracking-widest uppercase animate-pulse">
              System Online // Authenticated <Zap size={11} className="text-white shrink-0" />
            </div>

            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Engineering the Future of <br className="hidden md:inline" />
              <span className="text-gradient italic font-normal">Agentic AI &amp; Secure Systems</span>
            </h1>

            <p className="font-sans text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Full-Stack Developer • Agentic AI Engineer • Cybersecurity Student.
              <br />
              Deploying autonomous architectures and resilient zero-trust security postures.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a
                href="#projects"
                className="bg-white text-[#02155a] border border-white/20 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-zinc-200 cursor-pointer shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.25)]"
              >
                Deploy Protocols <Rocket size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* DEC INTERFACE TERMINAL COMPONENT */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 -mt-8 md:-mt-12 mb-20">
          <NexusTerminal />
        </section>

        {/* TELEMETRY STATS — Bento Grid */}
        <section id="stats" className="py-16 border-y border-white/5 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-5 md:p-7 text-left border border-white/5 hover:border-white/15 transition-all duration-300 group"
                >
                  <div className="text-4xl md:text-5xl font-black text-white font-sans mb-3 group-hover:scale-105 transition-transform duration-300 inline-block">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-relaxed">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES — Numbered Services List */}
        <section id="agents" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="inline-flex px-4 py-1.5 rounded-full mb-6 bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase">
              Core Capabilities
            </div>
            <h2 className="text-6xl md:text-8xl font-sans font-black uppercase tracking-tighter leading-none select-none"
                style={{ color: 'rgba(255,255,255,0.07)' }}>
              SERVICES
            </h2>
          </div>

          <div>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row items-start gap-6 md:gap-10 group cursor-default"
              >
                {/* Large faded number */}
                <span
                  className="text-7xl md:text-9xl font-black font-sans leading-none shrink-0 select-none transition-colors duration-500 w-full md:w-36"
                  style={{ color: 'rgba(255,255,255,0.07)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 md:pt-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                      {cap.iconName === "Layers" && <Layers size={15} className="text-white/50" />}
                      {cap.iconName === "Brain" && <Brain size={15} className="text-white/50" />}
                      {cap.iconName === "Shield" && <Shield size={15} className="text-white/50" />}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-xl font-sans">
                    {cap.description}
                  </p>
                </div>

                {/* Arrow reveal on hover */}
                <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
                  <span className="text-white/40 font-mono text-lg">→</span>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </section>

        {/* ACTIVE DEPLOYMENTS — Redesigned Projects List */}
        <section id="projects" className="py-24 border-t border-white/5 bg-[#010826]/40 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <div className="inline-flex px-4 py-1.5 rounded-full mb-6 bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                Active Deployments
              </div>
              <h2 className="text-6xl md:text-8xl font-sans font-black uppercase tracking-tighter leading-none select-none"
                  style={{ color: 'rgba(255,255,255,0.07)' }}>
                PROJECTS
              </h2>
            </div>

            <div>
              {projects.map((proj, idx) => {
                const labels = ["GOOGLE AI SEEKHO 2026", "AGRITECH INITIATIVE", "TASKFLOW INITIATIVE"];
                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row items-start gap-6 md:gap-10 group cursor-default"
                  >
                    {/* Large faded number */}
                    <span
                      className="text-7xl md:text-9xl font-black font-sans leading-none shrink-0 select-none transition-colors duration-500 w-full md:w-36"
                      style={{ color: 'rgba(255,255,255,0.07)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Center Column */}
                    <div className="flex-1 md:pt-3">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        {labels[idx]}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans mt-1">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-xl font-sans mt-2.5">
                        {proj.description}
                      </p>
                      
                      {/* Technologies - clean text-based list */}
                      <div className="flex flex-wrap items-center gap-x-2.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-4">
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tag} className="flex items-center gap-2.5">
                            {tIdx > 0 && <span className="text-zinc-600/50">•</span>}
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Elements */}
                    <div className="flex flex-col items-end gap-2 shrink-0 md:self-center w-full md:w-auto mt-4 md:mt-0">
                      <a
                        href="#"
                        className="text-[10px] font-mono text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2.5 py-1 transition-all duration-300 tracking-widest uppercase whitespace-nowrap"
                      >
                        LIVE PROJECT
                      </a>
                      <span className="text-white/40 font-mono text-lg hidden md:block transition-all duration-300 transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </motion.div>
                );
              })}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>

        {/* SECURE INPUT CHANNEL */}
        <SecureForm />

      </main>

      {/* FOOTER */}
      <footer className="bg-[#010826] border-t border-white/5 relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 font-bold tracking-widest select-none">
            <Cpu size={14} className="text-white shrink-0" />
            <span>© {new Date().getFullYear()} TANZEELA. ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex space-x-6 font-mono text-zinc-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS OF SERVICE
            </a>
            <a href="#" className="hover:text-white transition-colors">
              PARTNERSHIP
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
