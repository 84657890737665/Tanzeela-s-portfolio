import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home",      id: "home" },
  { label: "About",     id: "about" },
  { label: "Projects",  id: "projects" },
  { label: "Skills",    id: "skills" },
  { label: "Education", id: "education" },
  { label: "Contact",   id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full flex items-center gap-1 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.93)" : "rgba(5,5,5,0.7)",
        border: "1px solid rgba(107,30,43,0.2)",
        backdropFilter: "blur(18px)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
      }}>
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollTo(link.id)}
          className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
          style={{
            color:      active === link.id ? "#E8E1D3" : "#6B6056",
            background: active === link.id ? "rgba(107,30,43,0.18)" : "transparent",
          }}>
          {link.label}
        </button>
      ))}
    </motion.nav>
  );
}
