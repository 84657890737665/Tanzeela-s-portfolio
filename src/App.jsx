import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#F0FAFA] overflow-x-hidden selection:bg-aqua/20 selection:text-aqua-dark">
      {/* Floating Pill Bento Navbar */}
      <Navbar />

      {/* Main Sections */}
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
//
