"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import {
  User,
  MapPin,
  GraduationCap,
  Sparkles,
  Mail,
  Phone,
  Send,
  Code,
  Layers,
  Database,
  Terminal,
  Compass
} from "lucide-react";

export default function HtmlOverlay({ fadeOutProgress }: { fadeOutProgress: number }) {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"features" | "stack" | "breakdown">("features");
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setErrorMsg("All fields are required.");
      return;
    }
    
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setErrorMsg(null);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Transmission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Transmission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="relative w-full z-10 select-none">
      {/* Spacer to push content down after the 3D scroll sequence */}
      <div className="h-[400vh] w-full pointer-events-none" />

      {/* Main DOM scroll sections container */}
      <main
        className="w-full max-w-6xl mx-auto px-6 py-20 flex flex-col gap-32 md:gap-48 bg-transparent"
        style={{ opacity: fadeOutProgress }}
      >

        {/* ================= ABOUT ME SECTION ================= */}
        <section id="about" className="scroll-mt-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Title / Summary (Left column) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <User size={14} className="text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">About Me</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Crafting Immersive <br />
                <span className="text-accent font-light italic">Digital Ecosystems</span>
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed max-w-md">
                Passionate Full Stack Developer focused on creating beautiful, high-performance 3D web experiences, scalable backend applications, and smart AI integrations.
              </p>

              {/* Personal Info Badges */}
              <div className="flex flex-col gap-3 mt-4 text-xs font-medium text-foreground">
                <div className="flex items-center gap-3 bg-surface/60 p-3 rounded-xl border border-white/40">
                  <MapPin size={16} className="text-accent" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider">Location</span>
                    Puducherry, India
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface/60 p-3 rounded-xl border border-white/40">
                  <GraduationCap size={16} className="text-accent" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider">Education</span>
                    B.Tech Information Technology • Rajiv Gandhi College (2023–2027)
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface/60 p-3 rounded-xl border border-white/40">
                  <Sparkles size={16} className="text-accent" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider">Academic Record</span>
                    Cumulative CGPA: 7.2
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Focus List (Right column, Matte Cards) */}
            <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6">
              <div className="matte-card p-6 md:p-8 flex flex-col gap-6">
                <h3 className="text-lg font-bold text-foreground border-b border-black/5 pb-3">
                  Current Engineering Focus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Advanced Frontend", desc: "Structuring component libraries, dynamic layouts, and performant state systems." },
                    { title: "AI-Powered Apps", desc: "Integrating multimodal LLMs, prompt validation layers, and smart agents." },
                    { title: "Cinematic Experiences", desc: "Linking scroll positions to real-time 3D camera animations and transitions." },
                    { title: "Three.js & R3F", desc: "Writing optimized WebGL shaders, volumetric lighting, and particle loops." },
                    { title: "Performance Tuning", desc: "Reducing GPU drawing bottlenecks, lazy-loading, and routing optimization." },
                    { title: "Interactive UI Systems", desc: "Creating Apple-style physical UI models, soft neumorphic depth, and glassmorphism." }
                  ].map((focus, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-surface/40 border border-white/50 rounded-xl hover:bg-white/40 transition-all duration-300 group"
                    >
                      <h4 className="font-bold text-xs text-foreground flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                        {focus.title}
                      </h4>
                      <p className="text-[11px] text-foreground/80 leading-relaxed">
                        {focus.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= FEATURED PROJECTS SECTION ================= */}
        <section id="projects" className="scroll-mt-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-10"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                  <Code size={14} className="text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Portfolio Showcase</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  Featured Project Launches
                </h2>
              </div>
              <p className="text-xs text-accent max-w-xs font-medium md:text-right">
                Explore a premium product launch breakdown detailing production features, tech stack stacks, and highlights.
              </p>
            </motion.div>

            {/* Project Selector Navigation Tab Bar */}
            <motion.div variants={itemVariants} className="w-full flex flex-wrap gap-2 md:gap-3 bg-surface/30 p-2 rounded-2xl border border-white/30 backdrop-blur-md overflow-x-auto scrollbar-none">
              {PROJECTS.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={proj.name}
                    onClick={() => {
                      setActiveProjectIdx(idx);
                      setActiveTab("features");
                    }}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-foreground text-background shadow-md"
                        : "text-accent hover:text-foreground hover:bg-surface/50"
                    }`}
                  >
                    {proj.name}
                  </button>
                );
              })}
            </motion.div>

            {/* Project Launcher Card */}
            <motion.div variants={itemVariants} className="w-full">
              {(() => {
                const activeProj = PROJECTS[activeProjectIdx];
                const ProjectIcon = {
                  Layers,
                  Code,
                  Terminal,
                  Database
                }[activeProj.iconName] || Layers;

                return (
                  <motion.div 
                    key={activeProjectIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="matte-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-white/60"
                  >
                    {/* Visual / Branding Sidebar (Left 4 cols) */}
                    <div className="lg:col-span-4 bg-accent/10 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/5 relative group">
                      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <ProjectIcon size={140} className="text-accent" />
                      </div>

                      <div className="flex flex-col gap-6">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                          Featured Project • Active Spec
                        </span>
                        <div>
                          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{activeProj.name}</h3>
                          <p className="text-xs font-medium text-accent mt-1">{activeProj.sub}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 mt-12 lg:mt-0">
                        <p className="text-[11px] text-foreground/80 leading-relaxed">
                          {activeProj.desc}
                        </p>
                        <div className="flex gap-2">
                          <a
                            href={activeProj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-surface border border-black/5 text-foreground px-4 py-2 rounded-lg hover:bg-white hover:border-black/15 transition-all duration-300"
                          >
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Tabbed Spec Details (Right 8 cols) */}
                    <div className="lg:col-span-8 p-8 md:p-10 flex flex-col gap-6 bg-white/30 backdrop-blur-sm">
                      {/* Tab Selector buttons */}
                      <div className="flex border-b border-black/5 pb-2 gap-4">
                        {([
                          { id: "features", label: "Core Features", icon: Layers },
                          { id: "stack", label: "Technology Stack", icon: Database },
                          { id: "breakdown", label: "Developer Breakdown", icon: Terminal }
                        ] as const).map((tab) => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-1.5 pb-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${isActive
                                  ? "border-foreground text-foreground"
                                  : "border-transparent text-accent hover:text-foreground"
                                }`}
                            >
                              <Icon size={13} />
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Tab Contents */}
                      <div className="min-h-[220px] flex flex-col justify-between">
                        {activeTab === "features" && (
                          <div className="flex flex-col gap-4">
                            <p className="text-xs text-foreground/80 leading-relaxed">
                              {activeProj.name} was built with usability and transactional integrity in mind. The primary operational highlights include:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-foreground">
                              {activeProj.features.map((item, i) => (
                                <li key={i} className="flex gap-2.5 bg-surface/50 p-3 rounded-lg border border-white/30">
                                  <span className="font-bold text-accent text-xs">0{i + 1}.</span>
                                  <div>
                                    <span className="font-bold block text-xs mb-0.5">{item.title}</span>
                                    <span className="text-[10px] text-foreground/80 block leading-snug">{item.desc}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activeTab === "stack" && (
                          <div className="flex flex-col gap-4">
                            <p className="text-xs text-foreground/80 leading-relaxed">
                              The tech stack stack is optimized for scalable client operations and low server latency:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                              {activeProj.stack.map((stack, i) => (
                                <div key={i} className="bg-surface/50 p-4 rounded-xl border border-white/30 flex flex-col items-center justify-between group hover:bg-white/60 transition-colors">
                                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider mb-1">{stack.cat}</span>
                                  <span className="font-bold text-xs text-foreground mb-0.5">{stack.name}</span>
                                  <span className="text-[9px] text-foreground/80 block leading-tight">{stack.role}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === "breakdown" && (
                          <div className="flex flex-col gap-3">
                            <pre className="bg-foreground text-background font-mono text-[10px] p-4 rounded-xl shadow-inner border border-black/10 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                              <code>{activeProj.breakdown.code}</code>
                            </pre>
                            <p className="text-[10px] text-accent italic mt-1 text-right">
                              {activeProj.breakdown.comment}
                            </p>
                          </div>
                        )}

                        {/* Metadata indicators footer */}
                        <div className="flex justify-between items-center border-t border-black/5 pt-4 mt-6 text-[10px] font-bold uppercase tracking-wider text-accent">
                          <span>Platform: {activeProj.metadata.platform}</span>
                          <span>Target: {activeProj.metadata.target}</span>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })()}
            </motion.div>
          </motion.div>
        </section>

        {/* ================= JOURNEY SECTION ================= */}
        <section id="journey" className="scroll-mt-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-10"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <Compass size={14} className="text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Journey</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                The Road So Far
              </h2>
            </motion.div>

            {/* Timeline Wrapper */}
            <motion.div variants={itemVariants} className="relative pl-6 md:pl-8 flex flex-col gap-12">
              {/* Vertical timeline connector line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[9px] md:left-[11px] top-2 bottom-2 w-[2px] bg-accent/20 origin-top"
              />

              {[
                {
                  year: "2023",
                  stage: "BEGINNING",
                  title: "First Lines of Code",
                  desc: "Started with HTML, CSS, and vanilla JavaScript. Built small projects to understand how the web works — from simple landing pages to interactive UI experiments. The spark was lit."
                },
                {
                  year: "2024",
                  stage: "GROWTH",
                  title: "Entering the MERN Stack",
                  desc: "Dove deep into React.js, Node.js, Express, and MongoDB. Built my first full-stack applications — a chat app, a task manager, and a basic e-commerce platform. Started understanding real-world architecture."
                },
                {
                  year: "2025",
                  stage: "EXPANSION",
                  title: "TypeScript, AI & 3D Web",
                  desc: "Leveled up to TypeScript and Next.js. Began experimenting with AI integrations using Google Gemini API. Discovered Three.js and React Three Fiber — building immersive 3D web experiences became a passion."
                },
                {
                  year: "2026",
                  stage: "NOW",
                  title: "Production-Grade Engineering",
                  desc: "Focusing on production-ready systems — performance optimization, scalable architecture, advanced motion design, and building AI-powered products that deliver real user value."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="relative flex gap-6 md:gap-8 group"
                >
                  {/* Bullet Node */}
                  <div className="absolute -left-[19px] md:-left-[26px] top-1.5 flex items-center justify-center z-10">
                    <motion.div 
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.4 }}
                      className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-background border-2 border-accent flex items-center justify-center"
                    >
                      <div className="w-[4px] h-[4px] rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-widest text-accent uppercase font-mono">
                      {item.year} — {item.stage}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/80 leading-relaxed max-w-2xl mt-1">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="scroll-mt-24 mb-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Contact details text (Left 5 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <Mail size={14} className="text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Contact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Let&apos;s Build <br />
                <span className="text-accent font-light italic">Something Real</span>
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed max-w-sm">
                Have a project idea, want to collaborate on a 3D web experience, or simply chat about AI integrations? Drop a message!
              </p>

              {/* Direct Details Contact List */}
              <div className="flex flex-col gap-3 mt-4 text-xs font-bold text-foreground">
                <a
                  href="mailto:hemanathkalai29@gmail.com"
                  className="flex items-center gap-3 bg-surface/60 hover:bg-surface/90 p-4 rounded-xl border border-white/40 transition-colors"
                >
                  <Mail size={16} className="text-accent" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-semibold">Email Direct</span>
                    hemanathkalai29@gmail.com
                  </div>
                </a>

                <a
                  href="tel:8778246378"
                  className="flex items-center gap-3 bg-surface/60 hover:bg-surface/90 p-4 rounded-xl border border-white/40 transition-colors"
                >
                  <Phone size={16} className="text-accent" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-semibold">Phone Call</span>
                    +91 8778246378
                  </div>
                </a>

                <div className="flex gap-2 w-full">
                  <a
                    href="https://www.linkedin.com/in/hemanath-afk"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-surface/60 hover:bg-surface/90 p-3 rounded-xl border border-white/40 transition-colors text-center font-bold text-xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-[#0077B5]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/hemanath-afk"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-surface/60 hover:bg-surface/90 p-3 rounded-xl border border-white/40 transition-colors text-center font-bold text-xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    GitHub Repository
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Tactile Pebble Form Card (Right 7 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-7 w-full">
              <div className="matte-card p-6 md:p-8 border border-white/60 relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
                      <Send size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Transmission successful.</h3>
                    <p className="text-xs text-foreground/80 max-w-xs mt-1.5 leading-relaxed">
                      Your message has been received.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-lg font-bold text-foreground border-b border-black/5 pb-2">
                      Send an Instant Message
                    </h3>

                    {/* Inline Error Indicator */}
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 text-xs text-red-800 bg-red-100/80 border border-red-200/50 rounded-xl"
                      >
                        {errorMsg}
                      </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Name input */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          placeholder="e.g. John Doe"
                          className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                          placeholder="e.g. name@example.com"
                          className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        placeholder="e.g. Project Collaboration Inquiry"
                        className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                        Project Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        rows={5}
                        placeholder="Explain your project details, schedule, or ideas here..."
                        className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none resize-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-foreground text-background font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                        loading
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:bg-black hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]"
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Transmit Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-surface/60 border-t border-white/50 py-10 px-6 mt-16 text-center backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium text-accent">
          <p>© {new Date().getFullYear()} HEMANATH AFK. All rights reserved.</p>
          <p className="italic">
            Built from scratch using React, Three.js, and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}
