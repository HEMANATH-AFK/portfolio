"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ShieldAlert, Cpu, Terminal, Compass, RefreshCw, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface RouteItem {
  name: string;
  path: string;
  category: "core" | "case-study";
  desc: string;
}

export default function CommandCenter() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "directory" | "terminal">("directory");
  
  // Diagnostics State
  const [cpuLoad, setCpuLoad] = useState(24);
  const [ramUsage, setRamUsage] = useState(5.2);
  const [ping, setPing] = useState(14);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>([
    "SYS_INIT: Standby mode active.",
    "Ready for user input command."
  ]);

  // Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "AFK SYSTEM CORE v2.6.5",
    "Type 'help' to view available system commands.",
    ""
  ]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Available routes directory
  const routes: RouteItem[] = [
    { name: "Home Portfolio", path: "/", category: "core", desc: "Cinematic 3D WebGL showcase" },
    { name: "About Profile", path: "/about", category: "core", desc: "Credentials, education, and stack" },
    { name: "Projects Index", path: "/projects", category: "core", desc: "Complete repository index table" },
    { name: "Research Journal", path: "/research-publication", category: "core", desc: "AI smart recruitment publication" },
    { name: "FAQ Desk", path: "/faq", category: "core", desc: "Answer-Engine Optimized inquiries" },
    { name: "Contact Direct", path: "/contact", category: "core", desc: "Secure instant message node" },
    { name: "QuantumCart", path: "/quantumcart", category: "case-study", desc: "Full-Stack MERN E-Commerce platform" },
    { name: "HireAFK", path: "/hireafk", category: "case-study", desc: "AI hiring & skill profiling platform" },
    { name: "ProjectForge", path: "/projectforge", category: "case-study", desc: "Real-time socket workflow board" },
    { name: "RestroAFK", path: "/restroafk", category: "case-study", desc: "Smart POS & culinary ordering system" },
    { name: "INDJCST Migration", path: "/indjcst-migration", category: "case-study", desc: "Laravel-to-React frontend modernization" },
    { name: "SciRank", path: "/scirank", category: "case-study", desc: "Virtual DOM academic ranking grid" },
    { name: "RailLuxury", path: "/railluxury", category: "case-study", desc: "SQL-indexed booking seat engine" },
    { name: "AFK BlogSpace", path: "/afk-blogspace", category: "case-study", desc: "Markdown publishing & content platform" },
    { name: "Eclipse AFK", path: "/eclipse-afk", category: "case-study", desc: "Cinematic scroll-choreographed portfolio" },
    { name: "AFK Motion", path: "/afk-motion", category: "case-study", desc: "Published lightweight motion library" }
  ];

  // 1. Keyboard Listener for "AFK" Sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input fields
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      setTypedBuffer((prev) => {
        const next = [...prev, key].slice(-3);
        if (next.join("") === "afk") {
          setIsOpen(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // 2. Fluctuating Diagnostic Stats Simulation
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(10, Math.min(85, prev + delta));
      });
      setRamUsage((prev) => {
        const delta = Number((Math.random() * 0.4 - 0.2).toFixed(2));
        return Math.max(4.2, Math.min(7.8, Number((prev + delta).toFixed(2))));
      });
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(60, prev + delta));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  // 3. Scan Diagnostics Trigger
  const triggerDiagnosticsScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs(["[+] INITIALIZING FULL DIAGNOSTIC SCAN..."]);

    const logs = [
      "[*] Mounting virtual DOM filesystem nodes...",
      "[*] Fetching sitemap route entries (16 paths discovered)...",
      "[*] Pinging Node.js local environment (RTT: 12ms)...",
      "[*] Resolving Three.js asset bundles & particle arrays...",
      "[*] Testing Contact Form API endpoints (HTTP 200 OK)...",
      "[*] Verifying @hemanath-afk/afk-motion registry index...",
      "[*] Scan results aggregated: All system services operational."
    ];

    let currentLogIndex = 0;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setIsScanning(false);
        setScanLogs((prevLogs) => [...prevLogs, "[✓] CORE DIAGNOSTIC CHECK COMPLETED. SYSTEM OPTIMAL."]);
      } else {
        setScanProgress(progress);
        if (progress % 15 === 0 && currentLogIndex < logs.length) {
          const logToAppend = logs[currentLogIndex];
          setScanLogs((prevLogs) => [...prevLogs, logToAppend]);
          currentLogIndex++;
        }
      }
    }, 150);
  };

  // 4. Matrix Rain Canvas Simulation
  useEffect(() => {
    if (!isOpen || !matrixRain) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%+=-*";
    const charArr = chars.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#39FF14";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isOpen, matrixRain]);

  // Scroll to terminal bottom on updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalOutput]);

  // 5. Terminal Executable Commands Handler
  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    setTerminalOutput((prev) => [...prev, `Guest@AFK-Core:~$ ${terminalInput}`]);
    setTerminalInput("");

    setTimeout(() => {
      switch (cmd) {
        case "help":
          setTerminalOutput((prev) => [
            ...prev,
            "Available commands:",
            "  help      - List system codes",
            "  clear     - Wipe console history",
            "  matrix    - Toggle green code rain visual background overlay",
            "  glitch    - Trigger display visual malfunction simulator",
            "  scan      - Execute system route diagnosis check",
            "  goto <p>  - Route to a specific path (e.g., 'goto about', 'goto projects')",
            ""
          ]);
          break;
        case "clear":
          setTerminalOutput([]);
          break;
        case "matrix":
          setMatrixRain((prev) => {
            const next = !prev;
            setTerminalOutput((prevLogs) => [
              ...prevLogs,
              `Matrix rain overlay: ${next ? "ACTIVATED" : "DEACTIVATED"}`
            ]);
            return next;
          });
          break;
        case "glitch":
          setIsGlitching(true);
          setTerminalOutput((prev) => [...prev, "Simulating visual matrix disruption...", ""]);
          setTimeout(() => setIsGlitching(false), 2000);
          break;
        case "scan":
          setActiveTab("diagnostics");
          triggerDiagnosticsScan();
          setTerminalOutput((prev) => [...prev, "Redirecting to Diagnostic pipeline...", ""]);
          break;
        default:
          if (cmd.startsWith("goto ")) {
            const target = cmd.substring(5).trim();
            const route = routes.find(
              (r) => r.path === target || r.path === `/${target}` || r.name.toLowerCase().includes(target)
            );
            if (route) {
              setTerminalOutput((prev) => [...prev, `Routing connection to: ${route.path}...`, ""]);
              setTimeout(() => {
                setIsOpen(false);
                router.push(route.path);
              }, 800);
            } else {
              setTerminalOutput((prev) => [
                ...prev,
                `ERR: Directory node '${target}' not found. Type 'goto about' or list directory.`,
                ""
              ]);
            }
          } else {
            setTerminalOutput((prev) => [
              ...prev,
              `ERR: Command '${cmd}' unrecognized. Type 'help' for directory parameters.`,
              ""
            ]);
          }
      }
    }, 100);
  };

  const handleRouteClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Floating activation hint (Subtle, only visible when code is typed halfway or for guide) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 font-mono select-none"
          >
            {/* Holographic Matrix background rain */}
            {matrixRain && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
              />
            )}

            {/* Core Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                boxShadow: "0 0 50px rgba(57, 255, 20, 0.15)"
              }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-full max-w-4xl bg-[#080808]/95 border-2 border-accent/60 rounded-3xl overflow-hidden relative ${
                isGlitching ? "animate-pulse border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.25)]" : ""
              }`}
            >
              {/* Scanline overlay for retro CRT look */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0)+95%,rgba(0,0,0,0.15)+95%)] bg-[length:100%_4px] opacity-10" />

              {/* Console Header */}
              <div className="bg-[#121212] border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className={`text-[11px] font-black uppercase tracking-widest ${
                    isGlitching ? "text-red-500" : "text-[#39FF14]"
                  }`}>
                    AFK System CommandCenter v2.6
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-accent hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close Terminal (ESC)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Console Dashboard Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
                {/* Side controller links (4 cols) */}
                <div className="md:col-span-3 bg-[#0d0d0d] border-r border-white/5 p-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-accent block mb-2">System Sections</span>
                    {[
                      { id: "directory", label: "Directory Index", icon: Compass },
                      { id: "diagnostics", label: "Diagnostics Scan", icon: Cpu },
                      { id: "terminal", label: "Developer Shell", icon: Terminal }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left cursor-pointer border ${
                            isActive
                              ? "bg-foreground/5 border-white/10 text-white shadow-sm"
                              : "border-transparent text-accent hover:text-foreground hover:bg-white/5"
                          }`}
                        >
                          <Icon size={14} className={isActive ? "text-[#39FF14]" : ""} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Core stats block */}
                  <div className="flex flex-col gap-3.5 border-t border-white/5 pt-5 mt-5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-accent uppercase">CPU LOAD:</span>
                      <span className="text-[#39FF14] font-bold">{cpuLoad}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#39FF14] h-full transition-all duration-1000" style={{ width: `${cpuLoad}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-accent uppercase">RAM IN USE:</span>
                      <span className="text-[#39FF14] font-bold">{ramUsage} GB</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#39FF14] h-full transition-all duration-1000" style={{ width: `${(ramUsage / 8) * 100}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-[10px] mt-1">
                      <span className="text-accent uppercase">PING LATENCY:</span>
                      <span className="text-[#39FF14] font-bold">{ping}ms</span>
                    </div>
                  </div>
                </div>

                {/* Main panel displays (9 cols) */}
                <div className="md:col-span-9 p-6 flex flex-col justify-between">
                  {/* TAB 1: Route Directory */}
                  {activeTab === "directory" && (
                    <div className="flex flex-col gap-4 h-full">
                      <div>
                        <h4 className="text-[#39FF14] text-xs font-bold uppercase tracking-wider mb-1">Application Route Directory</h4>
                        <p className="text-[10px] text-accent">Select a target coordinate node below to override navigation and route directly:</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-2 scrollbar-thin">
                        {routes.map((route) => (
                          <button
                            key={route.path}
                            onClick={() => handleRouteClick(route.path)}
                            className="p-3 bg-white/5 hover:bg-foreground/5 border border-white/10 hover:border-[#39FF14]/40 rounded-xl transition-all duration-300 text-left flex items-center justify-between group cursor-pointer"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                                  route.category === "core" ? "bg-white/10 text-white" : "bg-[#39FF14]/15 text-[#39FF14]"
                                }`}>
                                  {route.category}
                                </span>
                                <span className="text-xs font-bold text-white group-hover:text-[#39FF14] transition-colors">{route.name}</span>
                              </div>
                              <span className="text-[10px] text-accent mt-1 block font-sans">{route.desc}</span>
                            </div>
                            <span className="p-1 rounded bg-white/5 text-accent group-hover:bg-[#39FF14]/10 group-hover:text-[#39FF14] transition-all">
                              <Eye size={12} className="group-hover:scale-110 transition-transform" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Diagnostics */}
                  {activeTab === "diagnostics" && (
                    <div className="flex flex-col gap-5 h-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[#39FF14] text-xs font-bold uppercase tracking-wider mb-1">System Health Diagnostic scan</h4>
                          <p className="text-[10px] text-accent">Verify application integrity, endpoint response rates, and file structures:</p>
                        </div>
                        <button
                          onClick={triggerDiagnosticsScan}
                          disabled={isScanning}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#39FF14] hover:bg-[#39FF14]/10 transition-all cursor-pointer ${
                            isScanning ? "opacity-40 cursor-not-allowed" : ""
                          }`}
                        >
                          <RefreshCw size={11} className={isScanning ? "animate-spin" : ""} />
                          Run Diagnostic Check
                        </button>
                      </div>

                      {/* Diagnostic output */}
                      <div className="flex-1 flex flex-col gap-4">
                        {/* Progress */}
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] text-accent uppercase font-mono">Progress: {scanProgress}%</span>
                          <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#39FF14] h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                          </div>
                        </div>

                        {/* Logs */}
                        <div className="flex-1 bg-black/60 border border-white/5 p-4 rounded-xl font-mono text-[10px] overflow-y-auto max-h-[220px] flex flex-col gap-1.5 text-accent">
                          {scanLogs.map((log, idx) => (
                            <div key={idx} className={log && log.includes("[✓]") ? "text-[#39FF14] font-bold" : log && log.includes("[+]") ? "text-white" : ""}>
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Developer Shell */}
                  {activeTab === "terminal" && (
                    <div className="flex flex-col gap-4 h-full">
                      <div>
                        <h4 className="text-[#39FF14] text-xs font-bold uppercase tracking-wider mb-1">Interactive System Command shell</h4>
                        <p className="text-[10px] text-accent">Execute direct commands to manipulate layout overlays or search available nodes:</p>
                      </div>

                      {/* Command output */}
                      <div className="flex-1 bg-black/60 border border-white/5 p-4 rounded-xl font-mono text-[10px] overflow-y-auto max-h-[230px] flex flex-col gap-1.5 text-[#39FF14] leading-relaxed">
                        {terminalOutput.map((out, idx) => (
                          <div key={idx} className={out.startsWith("Guest@AFK-Core:") ? "text-white" : out.startsWith("ERR:") ? "text-red-500" : ""}>
                            {out}
                          </div>
                        ))}
                        <div ref={terminalEndRef} />
                      </div>

                      {/* Command input form */}
                      <form onSubmit={executeCommand} className="flex gap-2">
                        <span className="font-mono text-xs text-white flex items-center">Guest@AFK-Core:~$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="type 'help' or commands here..."
                          className="flex-1 bg-black/60 border border-white/10 hover:border-white/20 focus:border-[#39FF14]/40 rounded-lg p-2 font-mono text-xs outline-none text-[#39FF14] caret-[#39FF14] placeholder:text-accent/30 shadow-inner"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-[#39FF14]/15 hover:bg-[#39FF14]/25 border border-[#39FF14]/40 text-[#39FF14] font-bold text-[10px] px-4 rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Execute
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Console footer indicators */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4 text-[9px] uppercase tracking-wider text-accent font-bold">
                    <span>Active Port: Web Socket 8080</span>
                    <span className="flex items-center gap-1">
                      <ShieldAlert size={10} className="text-[#39FF14] animate-pulse" />
                      Link Secured - RSA 4096 Encryption
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
