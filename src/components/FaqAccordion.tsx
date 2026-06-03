"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FaqAccordion() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who is Hemanath S?",
      a: "Hemanath S is a Full Stack Developer, MERN Stack Developer, Frontend Engineer, and AI Integration enthusiast based in Puducherry, India. He holds a B.Tech in Information Technology from Rajiv Gandhi College (2023–2027) with a CGPA of 7.2. He specialises in building performant 3D WebGL interfaces, V8 server runtimes, and natural language processing pipelines."
    },
    {
      q: "What technologies does Hemanath use?",
      a: "Hemanath's core stack includes React.js, Next.js, Node.js, Express.js, and MongoDB (the MERN Stack). For creative frontends and animations, he uses TypeScript, Three.js, React Three Fiber, GSAP, and Framer Motion. He also integrates OpenAI and Google Gemini APIs for intelligent candidate evaluation and recruitment workflows."
    },
    {
      q: "What projects has Hemanath built?",
      a: "Hemanath has developed multiple production-grade web systems including: QuantumCart (a MERN e-commerce platform), HireAFK (an AI recruitment matchmaking platform), ProjectForge (a collaborative workspace with WebSockets), RestroAFK (POS e-restaurant pipeline), SciRank (analytics tables), RailLuxury (seating reservation), AFK BlogSpace (markdown publishing), and Eclipse AFK (a scroll-driven WebGL portfolio)."
    },
    {
      q: "What is QuantumCart?",
      a: "QuantumCart is a MERN stack e-commerce web client. It features a custom admin console for live inventory price changes, Redux Toolkit state persistence in local caches, Cloudinary asset pipelines, and security encryption middlewares (JWT & Bcrypt)."
    },
    {
      q: "What is HireAFK?",
      a: "HireAFK is an AI-powered developer matchmaking and recruitment site. It leverages Google Gemini APIs to parse candidate resume parameters into structured JSON tokens, calculate job matching scores, and output responsive recruiter dashboards and interactive skill maps."
    },
    {
      q: "What is ProjectForge?",
      a: "ProjectForge is a team collaboration workspace. It connects multiple active browser instances using Socket.io WebSockets, pushing status updates instantly to all team members and avoiding double-drag collisions on Kanban boards."
    },
    {
      q: "What research publications has Hemanath published?",
      a: "Hemanath published a journal paper titled \"AI-Powered Smart Recruitment System for Intelligent Candidate Evaluation and Hiring Optimization\" in the Research Journal of Wave (JAAFR Index, Paper Code: JAAFR2605325). The paper presents NLP-based profile parsing models and API designs."
    },
    {
      q: "How can I contact Hemanath?",
      a: "You can reach Hemanath S via email at hemanathkalai29@gmail.com or call him directly at +91 8778246378. You can also submit an instant message using the contact form on his portfolio, or connect via LinkedIn (linkedin.com/in/hemanath-afk) and GitHub (github.com/HEMANATH-AFK)."
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-white/30">
        <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
          <Sparkles size={14} className="text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Knowledge Base</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Frequently Asked Questions</h1>
        <p className="text-sm font-bold text-accent">Answer Engine Optimization (FAQ) & Structured Info Queries</p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div
              key={idx}
              className="matte-card overflow-hidden border border-white/50 transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground hover:bg-white/30 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  size={16}
                  className={`text-accent transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-48 border-t border-black/5 opacity-100 p-5 bg-white/10" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-xs text-foreground/80 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
