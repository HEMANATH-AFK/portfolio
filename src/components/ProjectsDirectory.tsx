import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Layers, Code, Terminal, Database, ChevronRight } from "lucide-react";

export default function ProjectsDirectory() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-white/30">
        <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
          <Code size={14} className="text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Projects Index</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Projects Directory</h1>
        <p className="text-sm font-bold text-accent">Complete Index of Full Stack, AI & Immersive Web Applications</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((proj) => {
          const slug = proj.name.toLowerCase().replace(/ /g, "-");
          const ProjectIcon = {
            Layers,
            Code,
            Terminal,
            Database
          }[proj.iconName] || Layers;
          return (
            <div
              key={proj.name}
              className="matte-card p-5 border border-white/50 hover:bg-white/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{proj.metadata.platform}</span>
                  <ProjectIcon size={14} className="text-accent/60 group-hover:text-accent transition-colors" />
                </div>
                <h4 className="text-base font-extrabold text-foreground group-hover:text-accent transition-colors">{proj.name}</h4>
                <p className="text-[11px] text-foreground/80 leading-relaxed line-clamp-3">{proj.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-black/5">
                <Link
                  href={`/${slug}`}
                  className="text-[10px] font-bold uppercase tracking-wider text-foreground hover:underline flex items-center gap-1 group-hover:text-accent transition-colors"
                >
                  View Case Study
                  <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold uppercase tracking-wider text-accent hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
