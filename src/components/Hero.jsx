import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ROLES = ["Agentic AI Engineer", "Full Stack Developer", "Cybersec Student"];

function AnimatedWord({ word, delay }) {
  return (
    <span style={{ display: "inline-flex", overflow: "hidden" }}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", willChange: "transform" }}>
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT   = Math.min(45, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const CONNECT_DIST = 120;

    class Node {
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.r  = Math.random() * 1.4 + 0.5;
      }
      constructor() { this.reset(); }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(107,30,43,0.45)";
        ctx.fill();
      }
    }

    const nodes = Array.from({ length: NODE_COUNT }, () => new Node());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(107,30,43,${(1 - d/CONNECT_DIST)*0.16})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => { n.update(); n.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(p => (p + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#000000" }}>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Orbs — smaller on mobile */}
      <div className="orb-1 absolute pointer-events-none z-0"
        style={{ top: "15%", left: "5%",
          width: "min(520px, 80vw)", height: "min(520px, 80vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,30,43,0.18) 0%, transparent 70%)",
          filter: "blur(40px)" }} />
      <div className="orb-2 absolute pointer-events-none z-0"
        style={{ bottom: "10%", right: "5%",
          width: "min(420px, 70vw)", height: "min(420px, 70vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,30,43,0.12) 0%, transparent 70%)",
          filter: "blur(60px)" }} />

      {/* Content — pt for mobile top bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 xl:px-20
                      flex flex-col items-start pt-24 md:pt-0">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-6 md:mb-8">
          <div style={{ width: 28, height: 1, background: "#6B1E2B", flexShrink: 0 }} />
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.35em]"
            style={{ color: "#6B1E2B" }}>
            tanzeela arshad — karachi, pk
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-black leading-[0.95] mb-5 md:mb-6"
          style={{ fontSize: "clamp(2.8rem, 10vw, 9rem)", color: "#E8E1D3" }}>
          <div style={{ overflow: "hidden" }}>
            <AnimatedWord word="Developer" delay={0.35} />
          </div>
          <div style={{ overflow: "hidden", marginTop: "0.05em" }}>
            <motion.span
              initial={{ y: "110%" }} animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #6B1E2B 0%, #C0556A 60%, #8B2535 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              + AI Engineer
            </motion.span>
          </div>
        </h1>

        {/* Cycling role */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8 md:mb-10" style={{ height: 28, overflow: "hidden" }}>
          <motion.p
            key={roleIdx}
            initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base md:text-lg" style={{ color: "#A09585" }}>
            ↳ {ROLES[roleIdx]}
          </motion.p>
        </motion.div>

        {/* Chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {["KhiNext'26 Delegate", "Google AI Seekho 2026", "Cisco NetAcad"].map((c, i) => (
            <span key={i}
              className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(107,30,43,0.35)", color: "#6B1E2B", background: "rgba(107,30,43,0.06)" }}>
              {c}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => scrollTo("projects")}
            className="magnetic-btn px-6 md:px-8 py-3 md:py-4 font-body font-semibold
                       text-sm rounded-full cursor-pointer"
            style={{ background: "#6B1E2B", color: "#E8E1D3", boxShadow: "0 0 28px rgba(107,30,43,0.45)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#8B2535"; e.currentTarget.style.boxShadow = "0 0 40px rgba(107,30,43,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#6B1E2B"; e.currentTarget.style.boxShadow = "0 0 28px rgba(107,30,43,0.45)"; }}>
            View My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="magnetic-btn px-6 md:px-8 py-3 md:py-4 font-body font-semibold
                       text-sm rounded-full cursor-pointer transition-all duration-300"
            style={{ border: "1px solid rgba(107,30,43,0.4)", color: "#E8E1D3", background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(107,30,43,0.10)"; e.currentTarget.style.borderColor = "rgba(107,30,43,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(107,30,43,0.4)"; }}>
            Initiate Contact
          </button>
        </motion.div>
      </div>

      {/* Floating chips — desktop only (hidden on mobile to avoid overflow) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="absolute bottom-28 right-[6%] font-mono text-[10px] uppercase
                   tracking-wider px-3 py-2 rounded-xl z-10 hidden md:block"
        style={{ background: "rgba(13,13,13,0.88)", border: "1px solid rgba(107,30,43,0.3)",
          color: "#E8E1D3", backdropFilter: "blur(10px)" }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6B1E2B] mr-1.5 animate-pulse" />
        Available for work
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[5%] font-mono text-[10px] uppercase
                   tracking-wider px-3 py-2 rounded-xl z-10 hidden md:block"
        style={{ background: "rgba(13,13,13,0.88)", border: "1px solid rgba(107,30,43,0.3)",
          color: "#A09585", backdropFilter: "blur(10px)" }}>
        🤖 KaamYaar AI — Live
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.8 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer
                   z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "#6B6056" }}>scroll</span>
        <div className="relative w-[1px] h-8 md:h-10 overflow-hidden"
          style={{ background: "rgba(107,30,43,0.15)" }}>
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2"
            style={{ background: "#6B1E2B" }} />
        </div>
      </motion.div>
    </section>
  );
}
