"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

interface ThreeCanvasProps {
  children: React.ReactNode;
}

export default function ThreeCanvas({ children }: ThreeCanvasProps) {
  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-0">
      <Canvas
        shadows="soft"
        camera={{ position: [0, 0.5, 6], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.5]} // Capping DPR at 1.5 for performance on retina displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        eventSource={typeof document !== "undefined" ? document.getElementById("canvas-root") || undefined : undefined}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
