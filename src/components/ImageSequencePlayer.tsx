"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ImageSequencePlayerProps {
  scrollProgress: number; // 0.0 to 1.0
  fadeOutProgress: number; // 0.0 to 1.0
  onLoadComplete: () => void;
}

export default function ImageSequencePlayer({ scrollProgress, fadeOutProgress, onLoadComplete }: ImageSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [totalFrames, setTotalFrames] = useState(300);

  // Detect mobile size on mount and set total frames to load (215 for mobile, 300 for desktop)
  useEffect(() => {
    setTotalFrames(window.innerWidth < 768 ? 215 : 300);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName && typeof window !== "undefined") {
      console.warn("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined. Falling back to local assets.");
    }

    // Helper to format frame numbers: e.g. 1 -> "001", 12 -> "012", 100 -> "100"
    const formatFrameNumber = (num: number) => {
      return String(num).padStart(3, "0");
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Deliver optimized formats (WebP/AVIF) and cache via Cloudinary if cloudName is set, otherwise fall back to local assets
      img.src = cloudName
        ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/portfolio/animation-pics/ezgif-frame-${formatFrameNumber(i)}.jpg`
        : `/animation-pics/ezgif-frame-${formatFrameNumber(i)}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          setIsLoaded(true);
          onLoadComplete();
        }
      };
      img.onerror = () => {
        // Fallback or retry on error
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          setIsLoaded(true);
          onLoadComplete();
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      // Clean up references
      imagesRef.current = [];
    };
  }, [totalFrames, onLoadComplete]);

  // Handle canvas drawing on resize and scroll
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = () => {
      // Map scroll progress (0.0 - 1.0) to frame index (0 - totalFrames - 1)
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
      );

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      // Set canvas display size
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Draw the full image without cropping
      const cropLeft = 0;
      const cropRight = 0;
      const cropTop = 0;
      const cropBottom = 0;

      const sx = 0;
      const sy = 0;
      const sWidth = img.width;
      const sHeight = img.height;

      const imgRatio = sWidth / sHeight;
      const canvasRatio = width / height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than cropped image
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        // Canvas is taller than cropped image
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, sx, sy, sWidth, sHeight, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Draw initial frame and set up resize handler
    drawFrame();
    window.addEventListener("resize", drawFrame);

    // Redraw whenever scrollProgress changes
    drawFrame();

    return () => {
      window.removeEventListener("resize", drawFrame);
    };
  }, [isLoaded, scrollProgress, totalFrames]);

  const progressPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div 
      className="fixed inset-0 w-full h-screen z-0 bg-background pointer-events-none"
      style={{ opacity: 1 - fadeOutProgress }}
    >
      {/* Hidden SVG Sharpen Filter to enhance details and resolution edges */}
      <svg className="hidden">
        <defs>
          <filter id="sharpen-filter">
            <feConvolveMatrix 
              order="3" 
              kernelMatrix="
                 0 -0.8  0 
               -0.8  4.2 -0.8 
                 0 -0.8  0" 
              preserveAlpha="true"
            />
          </filter>
        </defs>
      </svg>

      {/* Cinematic Image Sequence Canvas with high-end color grading and sharpen matrix */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ filter: "url(#sharpen-filter) contrast(1.03) saturate(1.02) brightness(0.82)" }}
      />

      {/* Cinematic Fine Film Grain Overlay to mask compression and make sequence feel tactile */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-[0.038] bg-noise" />


      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                  Choreographing Experience
                </span>
                <span className="text-2xl font-extrabold text-foreground font-mono">
                  {progressPercent}%
                </span>
              </div>
              
              {/* Minimal Progress Bar */}
              <div className="w-48 h-1 bg-accent/10 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
