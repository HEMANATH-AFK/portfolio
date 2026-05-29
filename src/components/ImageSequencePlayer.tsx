"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ImageSequencePlayerProps {
  onLoadComplete: () => void;
}

export default function ImageSequencePlayer({ onLoadComplete }: ImageSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [totalFrames, setTotalFrames] = useState(300);
  const scrollProgressRef = useRef(0);

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
      imagesRef.current = [];
    };
  }, [totalFrames, onLoadComplete]);

  // Frame drawing function (only draws, does not resize)
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * (totalFrames - 1)))
    );

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle canvas sizing and resizing
  useEffect(() => {
    if (!isLoaded) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(scrollProgressRef.current);
    };

    resizeCanvas();
    drawFrame(scrollProgressRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, totalFrames]);

  // Handle drawing on scroll
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const timelineHeight = window.innerHeight * 3.0;
      const progress = Math.min(1.0, Math.max(0.0, currentScroll / timelineHeight));
      scrollProgressRef.current = progress;

      let fade = 0;
      if (window.innerWidth < 768) {
        const mobileFadeStart = window.innerHeight * 0.3;
        const mobileFadeEnd = window.innerHeight * 0.9;
        fade = Math.min(1.0, Math.max(0.0, (currentScroll - mobileFadeStart) / (mobileFadeEnd - mobileFadeStart)));
      } else {
        const fadeStart = timelineHeight;
        const fadeEnd = timelineHeight + window.innerHeight * 0.4;
        fade = Math.min(1.0, Math.max(0.0, (currentScroll - fadeStart) / (fadeEnd - fadeStart)));
      }

      drawFrame(progress);

      const container = containerRef.current;
      if (container) {
        container.style.opacity = String(1 - fade);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoaded, totalFrames]);

  const progressPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen z-0 bg-background pointer-events-none transition-opacity duration-100"
    >
      {/* Cinematic Image Sequence Canvas with high-end color grading (sharpen matrix removed for scroll performance) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ filter: "contrast(1.03) saturate(1.02) brightness(0.82)" }}
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
                  Crafting Digital Experiences
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
