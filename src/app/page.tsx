"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Providers from "@/components/Providers";
import HtmlOverlay from "@/components/HtmlOverlay";
import { Code, Mail, User, Layers } from "lucide-react";

// Dynamically import client components to prevent SSR hydration errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
const ImageSequencePlayer = dynamic(() => import("@/components/ImageSequencePlayer"), { ssr: false });
const TechOverlayGrid = dynamic(() => import("@/components/TechOverlayGrid"), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fadeOutProgress, setFadeOutProgress] = useState(0);
  const [htmlFadeInProgress, setHtmlFadeInProgress] = useState(0);

  // Monitor scroll height to calculate normalized progression (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = window.scrollY;
      // Scroll timeline for cinematic sequence runs for the first 3 viewports (300vh distance)
      const timelineHeight = window.innerHeight * 3.0;

      const progress = Math.min(1.0, Math.max(0.0, currentScroll / timelineHeight));
      setScrollProgress(progress);

      // Fade out the pre-rendered frames past 300vh to reveal 3D pebbles and color background
      const fadeStart = timelineHeight;
      const fadeEnd = timelineHeight + window.innerHeight * 0.4; // fade over 40vh scroll
      const fade = Math.min(1.0, Math.max(0.0, (currentScroll - fadeStart) / (fadeEnd - fadeStart)));
      setFadeOutProgress(fade);

      // Fade in the HTML overlay sections past 400vh spacer (one laptop screen down)
      const htmlFadeStart = timelineHeight + window.innerHeight * 0.6; // starts at 360vh
      const htmlFadeEnd = timelineHeight + window.innerHeight * 1.0; // fully visible at 400vh
      const htmlFade = Math.min(1.0, Math.max(0.0, (currentScroll - htmlFadeStart) / (htmlFadeEnd - htmlFadeStart)));
      setHtmlFadeInProgress(htmlFade);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fades out the opening landing text overlays completely by 15% scroll
  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 6.6);

  return (
    <Providers>
      <div className="relative min-h-screen bg-background w-full text-foreground">

        {/* 1. Background Cinematic Image Sequence */}
        <ImageSequencePlayer
          scrollProgress={scrollProgress}
          fadeOutProgress={fadeOutProgress}
          onLoadComplete={() => { }}
        />

        {/* 2. WebGL 3D Particle Parallax Overlay */}
        <ThreeCanvas>
          <Scene scrollProgress={scrollProgress} />
        </ThreeCanvas>

        {/* 3. Interactive Technology Grid Overlay (Active at scroll > 72%, fades out past 300vh) */}
        <TechOverlayGrid scrollProgress={scrollProgress} fadeOutProgress={fadeOutProgress} />

        {/* ================= FIXED NAVBAR ================= */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 pointer-events-auto">
          <nav className="matte-card px-6 py-4 flex items-center justify-between border border-white/40 shadow-sm">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm font-black uppercase tracking-widest text-foreground hover:opacity-75 transition-opacity"
            >
              HEMANATH AFK
            </a>

            <div className="flex items-center gap-6 md:gap-8 text-[11px] font-bold uppercase tracking-wider text-accent">
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
              <a href="#contact" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                <Mail size={12} />
                Contact
              </a>
            </div>
          </nav>
        </header>

        {/* ================= INITIAL HERO OVERLAYS (0% to 15% scroll) ================= */}
        {heroTextOpacity > 0.001 && (
          <motion.div 
            style={{ opacity: heroTextOpacity }}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="fixed inset-0 w-full h-screen flex flex-col justify-between items-center py-20 px-6 md:px-16 lg:px-24 z-20 pointer-events-none transition-opacity duration-300 font-outfit"
          >
            <div />

            {/* Asymmetrical Left-Aligned Hero Details */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-center h-full pointer-events-none">
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-lg mt-20 md:mt-0 pointer-events-auto w-full md:w-auto"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-surface/95 px-3 py-1.5 rounded-full border border-white/50 shadow-sm w-fit">
                  MERN Stack Web Developer
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-none font-outfit uppercase">
                  HEMANATH AFK
                </h1>
                <p className="text-[11px] md:text-xs text-foreground/75 leading-relaxed max-w-[420px] font-normal">
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
                href="https://drive.google.com/file/d/1KuJpKYA6k_0Bt4PaScD68LFsB0g3cFB8/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}

        {/* ================= SCROLLING DOM CONTENT ================= */}
        {/* Renders About Me, Projects, and Contact details scroll layers */}
        <HtmlOverlay fadeOutProgress={htmlFadeInProgress} />

        {/* Canvas root pointer-events helper */}
        <div id="canvas-root" className="absolute inset-0 z-0 pointer-events-none" />
      </div>
    </Providers>
  );
}
