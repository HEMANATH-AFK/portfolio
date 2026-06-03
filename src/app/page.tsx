"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Providers from "@/components/Providers";
import HtmlOverlay from "@/components/HtmlOverlay";
import { Code, Mail, User, Layers, BookOpen, Menu, X } from "lucide-react";

// Dynamically import client components to prevent SSR hydration errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
const ImageSequencePlayer = dynamic(() => import("@/components/ImageSequencePlayer"), { ssr: false });
const TechOverlayGrid = dynamic(() => import("@/components/TechOverlayGrid"), { ssr: false });

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Silence the THREE.Clock deprecation warning stemming from react-three-fiber internals
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        args[0] &&
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock: This module has been deprecated")
      ) {
        return;
      }
      originalWarn(...args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // High-performance scroll tracking for direct DOM updates and scroll-to-top visibility
  useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const timelineHeight = window.innerHeight * 3.0;
      const progress = Math.min(1.0, Math.max(0.0, currentScroll / timelineHeight));
      const opacity = Math.max(0, 1 - progress * 6.6);

      if (heroEl) {
        heroEl.style.opacity = String(opacity);
        heroEl.style.visibility = opacity > 0.001 ? "visible" : "hidden";
      }

      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Providers>
      <div className="relative min-h-screen bg-background w-full text-foreground">
        {/* ================= STRUCTURED JSON-LD DATA FOR SEO ================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://hemanath-afk.vercel.app/#person",
                  "name": "Hemanath S",
                  "alternateName": "Hemanath AFK",
                  "jobTitle": "Full Stack Developer",
                  "email": "hemanathkalai29@gmail.com",
                  "telephone": "+91 8778246378",
                  "url": "https://hemanath-afk.vercel.app",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Puducherry",
                    "addressCountry": "India"
                  },
                  "sameAs": [
                    "https://github.com/HEMANATH-AFK",
                    "https://www.linkedin.com/in/hemanath-afk"
                  ],
                  "knowsAbout": [
                    "Full Stack Development",
                    "MERN Stack",
                    "Next.js",
                    "React.js",
                    "Three.js",
                    "WebGL",
                    "TypeScript",
                    "Artificial Intelligence",
                    "REST APIs",
                    "Software Engineering",
                    "Creative Development",
                    "Frontend Engineering",
                    "Cinematic Web Design"
                  ],
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Rajiv Gandhi College"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://hemanath-afk.vercel.app/#website",
                  "url": "https://hemanath-afk.vercel.app",
                  "name": "Hemanath S | Full Stack Developer | React, Next.js, Node.js & AI Applications",
                  "description": "Premium interactive developer portfolio showcasing full stack engineering, AI-powered applications, and cinematic 3D web experiences.",
                  "publisher": {
                    "@id": "https://hemanath-afk.vercel.app/#person"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://hemanath-afk.vercel.app/?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://hemanath-afk.vercel.app/#webpage",
                  "url": "https://hemanath-afk.vercel.app",
                  "name": "Hemanath S | Full Stack Developer | React, Next.js, Node.js & AI Applications",
                  "isPartOf": {
                    "@id": "https://hemanath-afk.vercel.app/#website"
                  },
                  "about": {
                    "@id": "https://hemanath-afk.vercel.app/#person"
                  }
                },
                {
                  "@type": "ScholarlyArticle",
                  "headline": "AI-Powered Smart Recruitment System for Intelligent Candidate Evaluation and Hiring Optimization",
                  "description": "This research explores the development of an AI-powered smart recruitment platform capable of improving candidate evaluation workflows, intelligent hiring optimization, and scalable recruitment interaction systems.",
                  "url": "https://rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2605325",
                  "sameAs": [
                    "https://drive.google.com/file/d/1gxamD6-yzWnMuF9EjgyKGcftZ0PVswPI/view",
                    "https://drive.google.com/file/d/1PI0_iMvEe9n6RplGCgz68-ihsdUjNN-s/view"
                  ],
                  "author": {
                    "@id": "https://hemanath-afk.vercel.app/#person"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Research Journal of Wave",
                    "url": "https://rjwave.org"
                  }
                },
                ...[
                  { slug: "quantumcart", name: "QuantumCart" },
                  { slug: "hireafk", name: "HireAFK" },
                  { slug: "projectforge", name: "ProjectForge" },
                  { slug: "restroafk", name: "RestroAFK" },
                  { slug: "indjcst-migration", name: "INDJCST Migration" },
                  { slug: "scirank", name: "SciRank" },
                  { slug: "railluxury", name: "RailLuxury" },
                  { slug: "afk-blogspace", name: "AFK BlogSpace" },
                  { slug: "eclipse-afk", name: "Eclipse AFK" }
                ].map((p) => ({
                  "@type": "CreativeWork",
                  "@id": `https://hemanath-afk.vercel.app/${p.slug}#creativework`,
                  "name": p.name,
                  "author": {
                    "@id": "https://hemanath-afk.vercel.app/#person"
                  },
                  "url": `https://hemanath-afk.vercel.app/${p.slug}`
                }))
              ]
            })
          }}
        />

        {/* 1. Background Cinematic Image Sequence */}
        <ImageSequencePlayer onLoadComplete={() => { }} />

        {/* 2. WebGL 3D Particle Parallax Overlay */}
        <ThreeCanvas>
          <Scene />
        </ThreeCanvas>

        {/* 3. Interactive Technology Grid Overlay */}
        <TechOverlayGrid />

        {/* ================= FIXED NAVBAR ================= */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 pointer-events-auto">
          <nav className="matte-card px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border border-white/40 shadow-sm overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setMenuOpen(false);
                }}
                className="text-sm font-black uppercase tracking-widest text-foreground hover:opacity-75 transition-opacity"
              >
                HEMANATH AFK
              </a>
              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex md:hidden p-1.5 rounded-lg text-accent hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Desktop Navbar Menu Links */}
            <div className="hidden md:flex items-center gap-6 md:gap-8 text-[11px] font-bold uppercase tracking-wider text-accent">
              <a href="#about" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <User size={12} />
                About
              </a>
              <a href="#projects" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Code size={12} />
                Projects
              </a>
              <a href="#journey" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Layers size={12} />
                Journey
              </a>
              <a href="#research" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <BookOpen size={12} />
                Research
              </a>
              <a href="#contact" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Mail size={12} />
                Contact
              </a>
            </div>

            {/* Mobile Dropdown Menu Links stack */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex md:hidden flex-col gap-4 text-xs font-bold uppercase tracking-wider text-accent border-t border-black/5 pt-4 w-full"
                >
                  <a
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-foreground transition-colors flex items-center gap-2.5 py-1"
                  >
                    <User size={14} />
                    About
                  </a>
                  <a
                    href="#projects"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-foreground transition-colors flex items-center gap-2.5 py-1"
                  >
                    <Code size={14} />
                    Projects
                  </a>
                  <a
                    href="#journey"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-foreground transition-colors flex items-center gap-2.5 py-1"
                  >
                    <Layers size={14} />
                    Journey
                  </a>
                  <a
                    href="#research"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-foreground transition-colors flex items-center gap-2.5 py-1"
                  >
                    <BookOpen size={14} />
                    Research
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-foreground transition-colors flex items-center gap-2.5 py-1"
                  >
                    <Mail size={14} />
                    Contact
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </header>

        {/* ================= INITIAL HERO OVERLAYS (0% to 15% scroll) ================= */}
        <motion.section 
          id="hero-section"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="fixed inset-0 w-full h-screen flex flex-col justify-between items-center py-20 px-6 md:px-16 lg:px-24 z-20 pointer-events-none transition-opacity duration-300 font-outfit"
          aria-label="Hero Introduction"
        >
            <div />

            {/* Asymmetrical Left-Aligned Hero Details */}
            <div className="w-full flex flex-col md:flex-row justify-end md:justify-between items-center md:items-center h-full pointer-events-none">
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-lg mb-16 md:mb-0 pointer-events-auto w-full md:w-auto"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-surface/95 px-3 py-1.5 rounded-full border border-white/50 shadow-sm w-fit">
                  MERN Stack Web Developer
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white md:text-foreground leading-none font-outfit uppercase hero-title-shadow">
                  HEMANATH AFK
                </h1>
                <p className="text-[16px] md:text-s text-white md:text-foreground/75 leading-relaxed max-w-[420px] font-normal hero-body-shadow">
                  Building immersive digital experiences through scalable engineering, cinematic interfaces, intelligent systems, and interactive 3D environments.
                </p>
              </motion.div>

            </div>

            {/* Left Bottom Scroll indicator */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.6, duration: 1.0 } }
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-16 lg:left-24 md:translate-x-0 flex items-center gap-3 w-fit z-20"
            >
              <div className="w-5 h-8 rounded-full border border-accent/40 flex justify-center p-1.5">
                <div className="w-1 h-1.5 bg-accent rounded-full animate-bounce" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-accent">
                Scroll to Experience
              </span>
            </motion.div>

            {/* Right Bottom Premium Pebble Buttons */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-16 lg:right-24 md:translate-x-0 flex items-center gap-2.5 md:gap-4 pointer-events-auto w-fit z-20"
            >
              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.linkedin.com/in/hemanath-afk"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                LinkedIn
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://github.com/hemanath-afk"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                GitHub
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://drive.google.com/file/d/1OBsu5YqI-MtM9_mYjAG5v7hZ-swcxQGF/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                Resume
              </motion.a>
            </motion.div>
        </motion.section>

        {/* ================= SCROLLING DOM CONTENT ================= */}
        {/* Renders About Me, Projects, and Contact details scroll layers */}
        <HtmlOverlay />

        {/* Canvas root pointer-events helper */}
        <div id="canvas-root" className="absolute inset-0 z-0 pointer-events-none" />

        {/* ================= SCROLL TO TOP BUTTON (DOTTED ARROW) ================= */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 left-6 md:left-16 lg:left-24 w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/50 bg-surface/80 hover:bg-foreground hover:text-background text-foreground flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 pointer-events-auto z-50 cursor-pointer"
              title="Scroll to Top"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {/* Arrow Head (Dotted) */}
                <circle cx="12" cy="4" r="1.2" />
                <circle cx="10" cy="6" r="1.2" />
                <circle cx="14" cy="6" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="12" cy="8" r="1.2" />
                <circle cx="16" cy="8" r="1.2" />
                <circle cx="6" cy="10" r="1.2" />
                <circle cx="18" cy="10" r="1.2" />
                {/* Stem (Dotted) */}
                <circle cx="12" cy="11.5" r="1.2" />
                <circle cx="12" cy="15" r="1.2" />
                <circle cx="12" cy="18.5" r="1.2" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Providers>
  );
}
