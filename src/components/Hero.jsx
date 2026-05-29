import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle Configuration
    const particles = [];
    const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 25000));
    const connectionDistance = 120;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce back from boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 201, 200, 0.45)";
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first for correct layering
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 201, 200, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToWork = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-[#F0FAFA] overflow-hidden flex flex-col justify-center items-start px-6 md:px-16 lg:px-24"
    >
      {/* Background Canvas Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Content Stack */}
      <div className="z-10 text-left max-w-4xl flex flex-col items-start">
        {/* tanzeela label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-base md:text-[18px] uppercase tracking-[0.25em] text-tealMuted lowercase mb-4 selection:bg-aqua/20"
        >
          tanzeela
        </motion.p>

        {/* Developer + AI Engineer Title */}
        <div className="flex flex-col mb-10 overflow-hidden py-1 leading-[1.1]">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-[44px] sm:text-[64px] md:text-[96px] text-gradient selection:bg-aqua/20"
          >
            Developer +
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-[44px] sm:text-[64px] md:text-[96px] text-gradient selection:bg-aqua/20"
          >
            AI Engineer
          </motion.h1>
        </div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          onClick={handleScrollToWork}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 bg-gradient-to-r from-aqua to-aqua-dark text-white font-body font-semibold text-sm rounded-full shadow-soft hover:shadow-glow transition-all duration-300 flex items-center gap-2 group cursor-pointer z-20"
        >
          View My Work
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.button>
      </div>

      {/* Scroll indicator bouncing line at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={handleScrollToWork}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-tealMuted uppercase">SCROLL</span>
        <div className="w-[2px] h-12 bg-aqua/20 rounded-full overflow-hidden relative">
          <motion.div
            animate={{
              y: ["-100%", "100%"]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-aqua rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
