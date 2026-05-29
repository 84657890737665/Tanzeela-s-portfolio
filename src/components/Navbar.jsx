import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to update active link & scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Nav animations
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-5xl glass-card flex items-center justify-between px-6 py-3 md:py-2.5 rounded-bento border border-aqua/20 shadow-soft transition-all duration-300">
        {/* Logo */}
        <motion.div 
          variants={linkVariants}
          onClick={() => handleLinkClick("home")}
          className="font-display font-extrabold text-2xl text-aqua cursor-pointer tracking-tighter"
        >
          T.
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                variants={linkVariants}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 font-body rounded-full ${
                  isActive ? "text-aqua-dark" : "text-tealMuted hover:text-aqua"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-aqua/10 border border-aqua/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          variants={linkVariants}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-lg text-tealDark hover:text-aqua hover:bg-aqua/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu (Bento Grid Style: 2 columns x 3 rows) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="absolute top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-bento border border-aqua/25 shadow-lg p-5 md:hidden"
          >
            <div className="grid grid-cols-2 gap-3.5">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex flex-col justify-center items-center h-24 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "bg-aqua/10 border-aqua/40 shadow-soft" 
                        : "bg-cloud/50 border-aqua/10 hover:border-aqua/30 hover:bg-aqua/5"
                    }`}
                  >
                    <span className="font-mono text-xs text-aqua/70 mb-1">0{idx + 1}</span>
                    <span className={`font-display font-bold text-sm tracking-wide ${isActive ? "text-aqua-dark" : "text-tealDark"}`}>
                      {link.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
