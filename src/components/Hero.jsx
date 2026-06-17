import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    const CONNECT_DIST = 140;

    class Node {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 1.8 + 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,201,184,0.55)";
        ctx.fill();
      }
    }

    const nodes = Array.from({ length: NODE_COUNT }, () => new Node());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,201,184,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => { n.update(); n.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const roles = ["Agentic AI Engineer", "Full Stack Developer", "Cybersec Student"];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#0D1B2A] overflow-hidden flex items-center"
    >
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Radial glow behind photo */}
      <div
        className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(0,201,184,0.10) 0%, transparent 70%)" }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-10 py-24 md:py-0 min-h-screen">

        {/* LEFT — Text */}
        <div className="flex flex-col items-start max-w-xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00C9B8] mb-5"
          >
            tanzeela arshad — karachi, pk
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl xl:text-[88px] leading-[1.0] text-[#E8F4F8] mb-3"
          >
            Developer
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl xl:text-[88px] leading-[1.0] mb-8"
            style={{
              background: "linear-gradient(135deg, #00C9B8 0%, #00a89a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            + AI Engineer
          </motion.h1>

          {/* Roles list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col gap-2 mb-10"
          >
            {roles.map((role, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C9B8]" />
                <span className="font-body text-sm text-[#8BA3B8]">{role}</span>
              </div>
            ))}
          </motion.div>

          {/* Credentials chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {["KhiNext'26 Delegate", "Google AI Seekho 2026", "Cisco NetAcad"].map((c, i) => (
              <span
                key={i}
                className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(0,201,184,0.3)",
                  color: "#00C9B8",
                  background: "rgba(0,201,184,0.06)",
                }}
              >
                {c}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3.5 font-body font-semibold text-sm text-[#0D1B2A] rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #00C9B8, #00a89a)", boxShadow: "0 0 24px rgba(0,201,184,0.3)" }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 font-body font-semibold text-sm text-[#00C9B8] rounded-full cursor-pointer transition-all duration-300 hover:bg-[rgba(0,201,184,0.08)]"
              style={{ border: "1px solid rgba(0,201,184,0.35)" }}
            >
              Initiate Contact
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-shrink-0 flex items-end justify-center"
        >
          {/* Aqua ring behind photo */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(0,201,184,0.08) 0%, transparent 65%)",
            }}
          />

          {/* Photo */}
          <div className="relative w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] md:w-[420px] md:h-[560px] flex items-end justify-center">
            <img
              src="/tanzeela.png"
              alt="Tanzeela Arshad"
              className="w-full h-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 30px rgba(0,201,184,0.20))",
              }}
              onError={(e) => {
                // Fallback placeholder if photo not found
                e.target.style.display = "none";
              }}
            />

            {/* Floating status chip */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute top-2 -left-4 md:-left-10 font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-xl"
              style={{
                background: "rgba(13,27,42,0.9)",
                border: "1px solid rgba(0,201,184,0.3)",
                color: "#00C9B8",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00C9B8] mr-1.5 animate-pulse" />
              Available for work
            </motion.div>

            {/* KaamYaar chip */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 -right-2 md:-right-8 font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-xl"
              style={{
                background: "rgba(13,27,42,0.9)",
                border: "1px solid rgba(0,201,184,0.3)",
                color: "#E8F4F8",
                backdropFilter: "blur(8px)",
              }}
            >
              🤖 KaamYaar AI — Live
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#8BA3B8] uppercase">scroll</span>
        <div className="w-[1px] h-10 bg-[rgba(0,201,184,0.2)] relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#00C9B8]"
          />
        </div>
      </motion.div>
    </section>
  );
}
