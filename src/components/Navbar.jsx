import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",      id: "home" },
  { label: "About",     id: "about" },
  { label: "Projects",  id: "projects" },
  { label: "Skills",    id: "skills" },
  { label: "Education", id: "education" },
  { label: "Contact",   id: "contact" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop pill nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full
                   hidden md:flex items-center gap-1 transition-all duration-300"
        style={{
          background:     scrolled ? "rgba(5,5,5,0.93)" : "rgba(5,5,5,0.7)",
          border:         "1px solid rgba(107,30,43,0.22)",
          backdropFilter: "blur(18px)",
          boxShadow:      scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
        }}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full
                       cursor-pointer transition-all duration-200"
            style={{
              color:      active === link.id ? "#E8E1D3" : "#6B6056",
              background: active === link.id ? "rgba(107,30,43,0.18)" : "transparent",
            }}>
            {link.label}
          </button>
        ))}
      </motion.nav>

      {/* ── Mobile top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center
                   justify-between px-5 py-4 transition-all duration-300"
        style={{
          background:     scrolled || menuOpen ? "rgba(5,5,5,0.97)" : "rgba(5,5,5,0.6)",
          backdropFilter: "blur(18px)",
          borderBottom:   menuOpen ? "1px solid rgba(107,30,43,0.18)" : "1px solid transparent",
        }}>
        {/* Logo / name */}
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]"
          style={{ color: "#6B1E2B" }}>
          TA
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] cursor-pointer rounded-lg transition-all"
          style={{ background: "rgba(107,30,43,0.08)", border: "1px solid rgba(107,30,43,0.2)" }}>
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-4 h-[1.5px] rounded-full"
            style={{ background: "#E8E1D3", transformOrigin: "center" }} />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block w-4 h-[1.5px] rounded-full"
            style={{ background: "#E8E1D3" }} />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-4 h-[1.5px] rounded-full"
            style={{ background: "#E8E1D3", transformOrigin: "center" }} />
        </button>
      </motion.div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] left-0 right-0 z-40 flex flex-col px-5 py-4 gap-1 md:hidden"
            style={{
              background:     "rgba(5,5,5,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom:   "1px solid rgba(107,30,43,0.18)",
            }}>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-[12px] uppercase tracking-wider px-4 py-3
                           rounded-xl text-left cursor-pointer transition-all duration-200"
                style={{
                  color:      active === link.id ? "#E8E1D3" : "#6B6056",
                  background: active === link.id ? "rgba(107,30,43,0.15)" : "transparent",
                  borderLeft: active === link.id ? "2px solid #6B1E2B" : "2px solid transparent",
                }}>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
