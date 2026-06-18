import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import Projects  from "./components/Projects";
import Skills    from "./components/Skills";
import Education from "./components/Education";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import Cursor    from "./components/Cursor";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div id="cursor-dot"  />
      <div id="cursor-ring" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
