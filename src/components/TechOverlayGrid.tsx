"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_STACK } from "@/data/techStack";

interface TechOverlayGridProps {
  scrollProgress: number; // 0.0 to 1.0
  fadeOutProgress: number; // 0.0 to 1.0
}

export default function TechOverlayGrid({ scrollProgress, fadeOutProgress }: TechOverlayGridProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [layout, setLayout] = useState({ width: 0, height: 0, left: 0, top: 0 });

  // Calculate the exact size and position of the canvas cover image dynamically
  useEffect(() => {
    const updateLayout = () => {
      const imgWidth = 1280; // Reference frame resolution width
      const imgHeight = 720;  // Reference frame resolution height
      const imgRatio = imgWidth / imgHeight;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let left = 0;
      let top = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (height is cover-cropped)
        drawHeight = width / imgRatio;
        top = (height - drawHeight) / 2;
      } else {
        // Canvas is taller than image (width is cover-cropped)
        drawWidth = height * imgRatio;
        left = (width - drawWidth) / 2;
      }

      setLayout({ width: drawWidth, height: drawHeight, left, top });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Grid is active past 72% scroll timeline
  const isActive = scrollProgress >= 0.72;
  const baseOpacity = isActive ? Math.min(1, (scrollProgress - 0.72) / 0.06) : 0;
  
  // Fade out alongside background player when user scrolls past 300vh
  const opacity = baseOpacity * (1 - fadeOutProgress);

  if (opacity <= 0.005) return null;

  return (
    <div 
      style={{ 
        opacity,
        pointerEvents: opacity > 0.1 ? "auto" : "none"
      }}
      className="fixed inset-0 w-full h-screen z-60 pointer-events-none transition-opacity duration-200 hidden md:flex items-center justify-center"
    >
      {/* 
        Container matching the exact bounding box of the drawn image on screen.
        Dashboard dimensions match the pre-rendered panel size inside ezgif-frame-300.jpg.
      */}
      <div 
        style={{ 
          width: layout.width, 
          height: layout.height, 
          left: layout.left, 
          top: layout.top,
          position: "absolute" 
        }}
        className="pointer-events-none"
      >
        {/* Bounding Box for the entire dashboard panel */}
        <div className="absolute left-[9.375%] top-[13.54%] w-[77.54%] h-[67.01%] pointer-events-none">
          
          {/* ================= ROWS 1-3 GRID (18 HOTSPOTS) ================= */}
          <div className="absolute left-[7.93%] top-[19.17%] w-[86.65%] h-[58.29%] grid grid-cols-6 grid-rows-3 gap-[0.4%] pointer-events-auto">
            {TECH_STACK.slice(0, 18).map((tech, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div 
                  key={tech.name} 
                  className="relative w-full h-full"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* 
                    Transparent Interactive Hotspot. 
                    Aligned exactly over the pre-rendered card, completely invisible on hover.
                  */}
                  <motion.div
                    className="w-full h-full bg-transparent cursor-pointer"
                  />

                  {/* Floating Detail Panel explaining usage */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-64 md:w-72 p-4 bg-surface border border-white/20 rounded-[24px] z-50 pointer-events-auto shadow-2xl"
                      >
                        <div className="flex items-center justify-between border-b border-black/5 pb-2 mb-2">
                          <h4 className="font-bold text-xs md:text-sm text-foreground">{tech.name}</h4>
                          <span
                            className="text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${tech.color}30`,
                              backgroundColor: `${tech.color}15`,
                              color: tech.color === "#000000" ? "#000000" : tech.color,
                            }}
                          >
                            {tech.category}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] text-foreground/80 mb-2 leading-relaxed">
                          {tech.description}
                        </p>
                        <div className="text-[9px] md:text-[10px] text-foreground bg-background/60 p-2 rounded-lg mb-2">
                          <span className="font-bold block text-[8px] md:text-[9px] text-accent uppercase tracking-wider mb-0.5">
                            How I used this tech
                          </span>
                          {tech.usage}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tech.highlights.slice(0, 2).map((hl) => (
                            <span key={hl} className="text-[8px] md:text-[9px] bg-white/70 px-1.5 py-0.5 rounded border border-black/5 text-foreground/80">
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ================= ROW 4 (TOOLS, 5 HOTSPOTS) ================= */}
          <div className="absolute left-[14.36%] top-[87.56%] w-[71.79%] h-[15.54%] flex justify-center gap-[0.4%] pointer-events-auto">
            {TECH_STACK.slice(18).map((tech, idx) => {
              const listIdx = idx + 18;
              const isHovered = hoveredIdx === listIdx;
              return (
                <div 
                  key={tech.name} 
                  style={{ width: "18.8%" }}
                  className="relative h-full"
                  onMouseEnter={() => setHoveredIdx(listIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Transparent Interactive Hotspot */}
                  <motion.div
                    className="w-full h-full bg-transparent cursor-pointer"
                  />

                  {/* Floating Detail Panel */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-64 md:w-72 p-4 bg-surface border border-white/20 rounded-[24px] z-50 pointer-events-auto shadow-2xl"
                      >
                        <div className="flex items-center justify-between border-b border-black/5 pb-2 mb-2">
                          <h4 className="font-bold text-xs md:text-sm text-foreground">{tech.name}</h4>
                          <span
                            className="text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${tech.color}30`,
                              backgroundColor: `${tech.color}15`,
                              color: tech.color === "#000000" ? "#000000" : tech.color,
                            }}
                          >
                            {tech.category}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] text-foreground/80 mb-2 leading-relaxed">
                          {tech.description}
                        </p>
                        <div className="text-[9px] md:text-[10px] text-foreground bg-background/60 p-2 rounded-lg mb-2">
                          <span className="font-bold block text-[8px] md:text-[9px] text-accent uppercase tracking-wider mb-0.5">
                            How I used this tech
                          </span>
                          {tech.usage}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tech.highlights.slice(0, 2).map((hl) => (
                            <span key={hl} className="text-[8px] md:text-[9px] bg-white/70 px-1.5 py-0.5 rounded border border-black/5 text-foreground/80">
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
