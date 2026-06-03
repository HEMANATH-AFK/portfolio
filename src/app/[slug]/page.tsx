import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS_SEO } from "@/data/seoContent";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import ProjectsDirectory from "@/components/ProjectsDirectory";
import {
  ArrowLeft,
  Layers,
  Code,
  Terminal,
  Database,
  User,
  Mail,
  BookOpen,
  MapPin,
  GraduationCap,
  Sparkles,
  Phone,
  FileText,
  Award,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Static Params for all 14 SEO URLs
export async function generateStaticParams() {
  const projectSlugs = Object.keys(PROJECTS_SEO);
  const utilitySlugs = ["about", "contact", "research-publication", "faq", "projects"];
  return [...projectSlugs, ...utilitySlugs].map((slug) => ({ slug }));
}

// 2. Generate Dynamic SEO Meta Metadata for all pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = "https://hemanath-afk.vercel.app";
  const canonicalUrl = `${baseUrl}/${slug}`;

  // About Metadata
  if (slug === "about") {
    return {
      title: "About Hemanath S | Full Stack Developer | Puducherry, India",
      description: "Learn more about Hemanath S, a MERN Stack Developer, Frontend Engineer, and AI enthusiast. Explore education credentials, B.Tech IT background, core technologies, and development philosophy.",
      keywords: ["About Hemanath S", "Hemanath AFK Biography", "Rajiv Gandhi College B.Tech IT", "MERN Stack Developer India", "Frontend Engineer Portfolio"],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "About Hemanath S | Full Stack Developer Portfolio",
        description: "Learn more about Hemanath S, a MERN Stack Developer, Frontend Engineer, and AI enthusiast.",
        url: canonicalUrl,
        type: "profile",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  // Contact Metadata
  if (slug === "contact") {
    return {
      title: "Contact Hemanath S | Full Stack Developer | Hire Hemanath AFK",
      description: "Get in touch with Hemanath S for project collaborations, software engineering roles, MERN stack developments, or interactive 3D WebGL experiences. Transmit messages instantly.",
      keywords: ["Contact Hemanath S", "Hire Hemanath AFK", "Email Hemanath Kalai", "Full Stack Developer Jobs Puducherry"],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "Contact Hemanath S | Full Stack Developer Portfolio",
        description: "Get in touch with Hemanath S for project collaborations, software engineering roles, and portfolio inquiries.",
        url: canonicalUrl,
        type: "website",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  // Research Metadata
  if (slug === "research-publication") {
    return {
      title: "AI Smart Recruitment Research & Publication | Hemanath S",
      description: "Read the published research paper by Hemanath S on AI-Powered Smart Recruitment Systems for Intelligent Candidate Evaluation and Hiring Optimization in the Research Journal of Wave.",
      keywords: ["Hemanath S Research", "AI Smart Recruitment Paper", "Scholarly Article Hemanath AFK", "JAAFR 2605325", "Candidate Matchmaking Algorithm"],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "AI Smart Recruitment Research & Publication | Hemanath S",
        description: "Read the published research paper by Hemanath S on AI-Powered Smart Recruitment Systems for Intelligent Candidate Evaluation.",
        url: canonicalUrl,
        type: "article",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  // FAQ Metadata
  if (slug === "faq") {
    return {
      title: "Frequently Asked Questions (FAQ) | Hemanath S",
      description: "Find answer engine optimized questions and answers about Hemanath S (Hemanath AFK), MERN Stack development, AI tools, publications, and contact routes.",
      keywords: ["Hemanath S FAQ", "Hemanath AFK questions", "QuantumCart info", "HireAFK details"],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "Frequently Asked Questions (FAQ) | Hemanath S Portfolio",
        description: "Find answer engine optimized questions and answers about Hemanath S (Hemanath AFK).",
        url: canonicalUrl,
        type: "website",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  // Projects Directory Metadata
  if (slug === "projects") {
    return {
      title: "Software Engineering & Full Stack Projects Portfolio | Hemanath S",
      description: "Explore the complete directory of software engineering projects, MERN stack web applications, AI integrations, and cinematic WebGL interfaces built by Hemanath S.",
      keywords: ["Hemanath S projects", "MERN stack portfolio", "software developer directory", "React projects India"],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "Software Engineering & Full Stack Projects Portfolio | Hemanath S",
        description: "Explore the complete directory of software engineering projects, MERN stack web applications, and AI integrations built by Hemanath S.",
        url: canonicalUrl,
        type: "website",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  // Project Metadata
  const project = PROJECTS_SEO[slug];
  if (project) {
    return {
      title: `${project.name} | ${project.sub} | Hemanath S`,
      description: `${project.overview} Engineered with ${project.technologies.map(t => t.name).join(", ")}. Learn about the problem, dynamic solution, system architecture, challenges, and results.`,
      keywords: [project.name, project.sub, "Hemanath S Project", "Full Stack Portfolio Product", ...project.technologies.map(t => t.name)],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${project.name} | ${project.sub} | Hemanath S`,
        description: project.overview,
        url: canonicalUrl,
        type: "website",
        images: [{ url: "/og-image.png" }],
      },
    };
  }

  notFound();
}

// 3. Dynamic Page Component
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const isProject = slug in PROJECTS_SEO;
  const isAbout = slug === "about";
  const isContact = slug === "contact";
  const isResearch = slug === "research-publication";
  const isFaq = slug === "faq";
  const isProjectsDir = slug === "projects";

  if (!isProject && !isAbout && !isContact && !isResearch && !isFaq && !isProjectsDir) {
    notFound();
  }

  // Structured Data definitions
  let structuredData: any = null;

  if (isAbout) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://hemanath-afk.vercel.app/about#webpage",
      "url": "https://hemanath-afk.vercel.app/about",
      "name": "About Hemanath S - Full Stack Developer",
      "description": "Information about Hemanath S: Education, B.Tech IT, Cumulative CGPA, Skills, and Core Development Focus.",
      "mainEntity": {
        "@type": "Person",
        "name": "Hemanath S",
        "jobTitle": "Full Stack Developer",
        "email": "hemanathkalai29@gmail.com",
        "location": {
          "@type": "Place",
          "name": "Puducherry, India"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Rajiv Gandhi College"
        }
      }
    };
  } else if (isContact) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://hemanath-afk.vercel.app/contact#webpage",
      "url": "https://hemanath-afk.vercel.app/contact",
      "name": "Contact Hemanath S - Full Stack Developer",
      "description": "Contact form, email addresses, phone coordinates, and social profiles for Hemanath S.",
      "mainEntity": {
        "@type": "Person",
        "name": "Hemanath S",
        "email": "hemanathkalai29@gmail.com",
        "telephone": "+91 8778246378",
        "jobTitle": "Full Stack Developer"
      }
    };
  } else if (isResearch) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://hemanath-afk.vercel.app/research-publication"
      },
      "headline": "AI-Powered Smart Recruitment System for Intelligent Candidate Evaluation and Hiring Optimization",
      "author": {
        "@type": "Person",
        "name": "Hemanath S"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Research Journal of Wave",
        "url": "https://rjwave.org"
      },
      "description": "This research explores the development of an AI-powered smart recruitment platform capable of improving candidate evaluation workflows, intelligent hiring optimization, and scalable recruitment interaction systems.",
      "url": "https://rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2605325"
    };
  } else if (isProject) {
    const project = PROJECTS_SEO[slug];
    structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.name,
      "headline": project.sub,
      "description": project.overview,
      "url": `https://hemanath-afk.vercel.app/${slug}`,
      "codeRepository": project.githubUrl,
      "author": {
        "@type": "Person",
        "name": "Hemanath S"
      },
      "creator": {
        "@type": "Person",
        "name": "Hemanath S"
      }
    };
  } else if (isFaq) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://hemanath-afk.vercel.app/faq#webpage",
      "url": "https://hemanath-afk.vercel.app/faq",
      "name": "Frequently Asked Questions (FAQ) - Hemanath S",
      "description": "Answers to common questions about Hemanath S, his skills, projects, and contact channels.",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Hemanath S?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hemanath S is a Full Stack Developer, MERN Stack Developer, Frontend Engineer, and AI Integration enthusiast based in Puducherry, India. He holds a B.Tech in Information Technology from Rajiv Gandhi College (2023–2027) with a CGPA of 7.2. He specialises in building performant 3D WebGL interfaces, V8 server runtimes, and natural language processing pipelines."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies does Hemanath use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hemanath's core stack includes React.js, Next.js, Node.js, Express.js, and MongoDB (the MERN Stack). For creative frontends and animations, he uses TypeScript, Three.js, React Three Fiber, GSAP, and Framer Motion. He also integrates OpenAI and Google Gemini APIs for intelligent candidate evaluation and recruitment workflows."
          }
        },
        {
          "@type": "Question",
          "name": "What projects has Hemanath built?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hemanath has developed multiple production-grade web systems including QuantumCart, HireAFK, ProjectForge, RestroAFK, INDJCST Migration, SciRank, RailLuxury, AFK BlogSpace, and Eclipse AFK."
          }
        },
        {
          "@type": "Question",
          "name": "What is QuantumCart?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "QuantumCart is a production-ready, highly scalable MERN stack e-commerce platform. Engineered for maximum search discoverability, it utilizes React routing to coordinate seamless REST API communications, secure session verifications, and an optimized, responsive checkout flow."
          }
        },
        {
          "@type": "Question",
          "name": "What is HireAFK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HireAFK is an AI-powered developer recruitment ecosystem and portfolio intelligence platform. Designed for modern recruitment operations, it combines full stack engineering with natural language processing pipelines, scalable database queries, and interactive skill mapping dashboards."
          }
        },
        {
          "@type": "Question",
          "name": "What is ProjectForge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ProjectForge is a collaborative workflow and real-time project management platform. Featuring full stack JavaScript architecture, it connects teams via secure WebSocket pipelines, responsive Kanban boards, and a highly scalable MongoDB database schema."
          }
        },
        {
          "@type": "Question",
          "name": "What research publications has Hemanath published?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hemanath published a journal paper titled 'AI-Powered Smart Recruitment System for Intelligent Candidate Evaluation and Hiring Optimization' in the Research Journal of Wave (JAAFR Index, Paper Code: JAAFR2605325)."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Hemanath?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Hemanath S via email at hemanathkalai29@gmail.com or call him directly at +91 8778246378. You can also connect via LinkedIn (linkedin.com/in/hemanath-afk) or GitHub (github.com/HEMANATH-AFK)."
          }
        }
      ]
    };
  } else if (isProjectsDir) {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://hemanath-afk.vercel.app/projects#webpage",
      "url": "https://hemanath-afk.vercel.app/projects",
      "name": "Projects Directory - Hemanath S",
      "description": "A collection of software engineering projects, e-commerce networks, collaboration hubs, and research interfaces built by Hemanath S.",
      "isPartOf": {
        "@id": "https://hemanath-afk.vercel.app/#website"
      },
      "about": {
        "@id": "https://hemanath-afk.vercel.app/#person"
      }
    };
  }

  // Related internal links logic (At least 3 internal links per page)
  const getRelatedLinks = () => {
    const allProjects = Object.keys(PROJECTS_SEO);
    if (isProject) {
      // Return 3 other projects
      const filtered = allProjects.filter((p) => p !== slug);
      return [
        { label: PROJECTS_SEO[filtered[0]].name, url: `/${filtered[0]}`, sub: PROJECTS_SEO[filtered[0]].sub },
        { label: PROJECTS_SEO[filtered[1]].name, url: `/${filtered[1]}`, sub: PROJECTS_SEO[filtered[1]].sub },
        { label: "About Hemanath", url: "/about", sub: "Core Skills & Education" }
      ];
    } else {
      // Return 3 featured projects
      return [
        { label: PROJECTS_SEO["quantumcart"].name, url: "/quantumcart", sub: PROJECTS_SEO["quantumcart"].sub },
        { label: PROJECTS_SEO["hireafk"].name, url: "/hireafk", sub: PROJECTS_SEO["hireafk"].sub },
        { label: PROJECTS_SEO["projectforge"].name, url: "/projectforge", sub: PROJECTS_SEO["projectforge"].sub }
      ];
    }
  };

  const relatedLinks = getRelatedLinks();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit relative">
      {/* Background aesthetic noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-0" />

      {/* JSON-LD Schema.org Scripts */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* HEADER NAVBAR */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-10 z-10">
        <nav className="matte-card px-6 py-4 flex items-center justify-between border border-white/40 shadow-sm">
          <Link href="/" className="text-xs font-black uppercase tracking-widest text-foreground hover:opacity-75 transition-opacity flex items-center gap-2">
            <ArrowLeft size={14} />
            Hemanath S
          </Link>
          <div className="flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-wider text-accent">
            <Link href="/about" className={`hover:text-foreground transition-colors ${slug === "about" ? "text-foreground underline decoration-2 underline-offset-4" : ""}`}>About</Link>
            <Link href="/research-publication" className={`hover:text-foreground transition-colors ${slug === "research-publication" ? "text-foreground underline decoration-2 underline-offset-4" : ""}`}>Research</Link>
            <Link href="/contact" className={`hover:text-foreground transition-colors ${slug === "contact" ? "text-foreground underline decoration-2 underline-offset-4" : ""}`}>Contact</Link>
          </div>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 z-10 flex flex-col gap-12 md:gap-16">
        
        {/* ================= PROJECT ROUTE RENDERING ================= */}
        {isProject && (() => {
          const project = PROJECTS_SEO[slug];
          const ProjectIcon = {
            Layers,
            Code,
            Terminal,
            Database
          }[project.iconName] || Layers;

          return (
            <article className="flex flex-col gap-10">
              
              {/* Project Hero Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/30">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                    <ProjectIcon size={14} className="text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Launch Specification</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">{project.name}</h1>
                  <p className="text-sm font-bold text-accent">{project.sub}</p>
                </div>
                
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-foreground hover:bg-black text-background hover:scale-103 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer w-fit"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  GitHub Repository
                </a>
              </div>

              {/* GEO Core Spec Grid (Overview, Problem, Solution) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Overview, Problem & Solution */}
                <div className="md:col-span-8 flex flex-col gap-8">
                  <section className="flex flex-col gap-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Overview</h2>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.overview}</p>
                  </section>

                  <section className="flex flex-col gap-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Problem Statement</h2>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.problem}</p>
                  </section>

                  <section className="flex flex-col gap-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Our Solution</h2>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
                  </section>
                </div>

                {/* Right side: Architecture Specs Panel */}
                <aside className="md:col-span-4 flex flex-col gap-6">
                  <div className="matte-card p-6 flex flex-col gap-4 border border-white/50">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-black/5 pb-2">Architecture</h3>
                    <p className="text-[11px] text-foreground/85 leading-relaxed">{project.architecture}</p>
                    <div className="flex flex-col gap-1.5 text-[9px] uppercase tracking-wider text-accent font-bold mt-2">
                      <span>• Serverless / API: Node.js REST API</span>
                      <span>• Database Layer: MongoDB BSON</span>
                      <span>• Presentation: React SPA</span>
                      <span>• State Pipeline: Redux / Next Sync</span>
                    </div>
                  </div>
                </aside>

              </div>

              {/* Technologies Grid */}
              <section className="flex flex-col gap-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Detailed Technology Stack</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.technologies.map((tech) => (
                    <div key={tech.name} className="matte-card p-5 border border-white/40 flex flex-col justify-between hover:bg-white/40 transition-colors">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-accent border border-accent/20 px-2 py-0.5 rounded-full bg-white/40">{tech.category}</span>
                        <h4 className="font-extrabold text-sm text-foreground mt-3">{tech.name}</h4>
                      </div>
                      <p className="text-[10px] text-foreground/80 leading-relaxed mt-2">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Features List */}
              <section className="flex flex-col gap-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Key Operational Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="bg-surface/40 p-4 rounded-xl border border-white/30 flex gap-3">
                      <span className="font-bold text-accent text-xs">0{idx + 1}.</span>
                      <p className="text-xs text-foreground/85 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Challenges and Solutions */}
              <section className="flex flex-col gap-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Engineering Challenges Solved</h2>
                <div className="flex flex-col gap-4">
                  {project.challenges.map((challenge, idx) => (
                    <div key={idx} className="matte-card p-5 border border-white/40 flex flex-col gap-1">
                      <span className="text-[9px] font-extrabold tracking-widest text-accent uppercase font-mono">Case Study #{idx + 1}</span>
                      <p className="text-xs text-foreground leading-relaxed font-semibold mt-1">{challenge}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Results */}
              <section className="matte-card p-6 md:p-8 border border-white/50 flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent">Outcome & Project Results</h2>
                <p className="text-sm font-bold text-foreground leading-relaxed italic">&ldquo; {project.results} &rdquo;</p>
              </section>

            </article>
          );
        })()}

        {/* ================= ABOUT ROUTE RENDERING ================= */}
        {isAbout && (
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 pb-6 border-b border-white/30">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <User size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Developer Profile</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">About Hemanath S</h1>
              <p className="text-sm font-bold text-accent">Full Stack Developer & AI Integration Specialist</p>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Biography */}
              <div className="md:col-span-7 flex flex-col gap-8">
                <section className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Personal Biography</h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Hemanath S is an ambitious software engineer and full stack web developer based in Puducherry, India. Deeply curious about artificial intelligence and immersive interface models, he builds cohesive digital environments, integrating advanced LLM services, scalable V8 servers, and high-performance WebGL frameworks like Three.js.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                    He believes in writing neat, self-documenting code systems that serve practical human utilities. Whether designing transactional database routes or synchronizing 3D particle positions with real-time browser scrolling, Hemanath maintains a high standard of architectural detail and search engine accessibility.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Development Philosophy</h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <strong>1. Performance Engineering:</strong> Optimization is not an afterthought. Reducing layout shifts, utilizing SSR pre-rendering, bundling static codes, and lazy loading heavy media elements are core design habits.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                    <strong>2. Decoupled Scalability:</strong> Creating clean, isolated presentation layers interacting with structured, secure API controllers ensures codebases can grow without inter-dependency blocks.
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                    <strong>3. Crawlable Innovation:</strong> New graphical and AI frameworks are amazing, but they must remain fully accessible. Maintaining semantic HTML layouts underneath complex models keeps websites discoverable.
                  </p>
                </section>
              </div>

              {/* Right Column: Credentials & Focus */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="matte-card p-6 flex flex-col gap-4 border border-white/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-black/5 pb-2">Academic & Location</h3>
                  
                  <div className="flex flex-col gap-4 text-xs font-medium text-foreground">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-accent mt-0.5" />
                      <div>
                        <span className="text-accent block text-[9px] uppercase tracking-wider font-bold">Location</span>
                        Puducherry, India
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <GraduationCap size={16} className="text-accent mt-0.5" />
                      <div>
                        <span className="text-accent block text-[9px] uppercase tracking-wider font-bold">Education</span>
                        B.Tech Information Technology<br />
                        Rajiv Gandhi College (2023–2027)
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Sparkles size={16} className="text-accent mt-0.5" />
                      <div>
                        <span className="text-accent block text-[9px] uppercase tracking-wider font-bold">Academic Status</span>
                        Cumulative CGPA: 7.2
                      </div>
                    </div>
                  </div>
                </div>

                <div className="matte-card p-6 flex flex-col gap-4 border border-white/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-black/5 pb-2">Technical Core</h3>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-foreground">
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">MERN Stack</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">Next.js 16</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">TypeScript</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">Three.js</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">React Three Fiber</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">Gemini LLM Prompting</span>
                    <span className="bg-surface/50 px-2.5 py-1 rounded-full border border-white/30">Tailwind CSS</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Comprehensive Skills Section */}
            <section className="flex flex-col gap-6 mt-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1">Skill Categorization</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Redux Toolkit"] },
                  { title: "Backend & Server", skills: ["Node.js", "Express.js", "REST APIs", "WebSocket Integration", "Authentication Guards"] },
                  { title: "AI & 3D WebGL", skills: ["Gemini API", "Prompt Engineering", "Three.js", "React Three Fiber", "GSAP Scroll Trigger"] },
                  { title: "Workflow & Tools", skills: ["Git & GitHub", "VS Code IDE", "Postman Client", "MongoDB Compass"] }
                ].map((category) => (
                  <div key={category.title} className="matte-card p-5 border border-white/40">
                    <h3 className="font-extrabold text-xs text-accent uppercase tracking-wider border-b border-black/5 pb-2 mb-3">{category.title}</h3>
                    <ul className="flex flex-col gap-1.5 text-xs text-foreground font-medium">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-accent" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </article>
        )}

        {/* ================= CONTACT ROUTE RENDERING ================= */}
        {isContact && (
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 pb-6 border-b border-white/30">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <Mail size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Transmission Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Contact Hemanath S</h1>
              <p className="text-sm font-bold text-accent">Open for Collaborations, Engineering Roles & Project Inquiries</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct coordinates */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent border-b border-black/5 pb-1 mb-2">Direct Coordinates</h2>
                
                <a href="mailto:hemanathkalai29@gmail.com" className="flex items-start gap-4 bg-surface/40 hover:bg-surface/75 p-4 rounded-xl border border-white/30 transition-colors">
                  <Mail size={18} className="text-accent mt-0.5" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-extrabold">Email Address</span>
                    <span className="text-xs font-bold text-foreground">hemanathkalai29@gmail.com</span>
                  </div>
                </a>

                <a href="tel:8778246378" className="flex items-start gap-4 bg-surface/40 hover:bg-surface/75 p-4 rounded-xl border border-white/30 transition-colors">
                  <Phone size={18} className="text-accent mt-0.5" />
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-extrabold">Phone Call</span>
                    <span className="text-xs font-bold text-foreground">+91 8778246378</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/hemanath-afk" target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-surface/40 hover:bg-surface/75 p-4 rounded-xl border border-white/30 transition-colors">
                  <svg className="w-[18px] h-[18px] fill-accent mt-0.5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-extrabold">LinkedIn Connection</span>
                    <span className="text-xs font-bold text-foreground">linkedin.com/in/hemanath-afk</span>
                  </div>
                </a>

                <a href="https://github.com/HEMANATH-AFK" target="_blank" rel="noreferrer" className="flex items-start gap-4 bg-surface/40 hover:bg-surface/75 p-4 rounded-xl border border-white/30 transition-colors">
                  <svg className="w-[18px] h-[18px] fill-accent mt-0.5" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  <div>
                    <span className="text-accent block text-[9px] uppercase tracking-wider font-extrabold">GitHub Codes</span>
                    <span className="text-xs font-bold text-foreground">github.com/HEMANATH-AFK</span>
                  </div>
                </a>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <ContactForm />
              </div>

            </div>
          </article>
        )}

        {/* ================= RESEARCH PUBLICATION ROUTE RENDERING ================= */}
        {isResearch && (
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 pb-6 border-b border-white/30">
              <div className="inline-flex items-center gap-2 bg-surface/80 px-3 py-1.5 rounded-full border border-white/50 w-fit">
                <BookOpen size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Academic Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Research & Publications</h1>
              <p className="text-sm font-bold text-accent">Featured Scholarly Publication in International Science Journals</p>
            </div>

            {/* Asymmetric Editorial Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Abstract & Focus */}
              <div className="md:col-span-7 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-extrabold tracking-widest text-accent uppercase font-mono">Research Title</span>
                  <h2 className="text-2xl font-bold text-foreground leading-tight tracking-tight uppercase">
                    AI-Powered Smart Recruitment System for Intelligent Candidate Evaluation and Hiring Optimization
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-bold mt-2">
                  <div className="bg-surface/50 border border-white/30 rounded-xl px-4 py-2 flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-accent font-extrabold">Journal Name</span>
                    <span className="text-foreground text-[10px]">Research Journal of Wave</span>
                  </div>
                  <div className="bg-surface/50 border border-white/30 rounded-xl px-4 py-2 flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-accent font-extrabold">Classification</span>
                    <span className="text-foreground text-[10px]">International Journal</span>
                  </div>
                  <div className="bg-surface/50 border border-white/30 rounded-xl px-4 py-2 flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-accent font-extrabold">Paper Code</span>
                    <span className="text-foreground text-[10px]">JAAFR-2605325</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Abstract</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    This research paper explores the design, technical integration, and development of an AI-powered Smart Recruitment Platform. The system utilizes Advanced Natural Language Processing (NLP) models, structured JSON prompting layers, and automated parsing pipelines to scan, rank, and match developer profile data to candidate specifications. It aims to reduce administrative hiring bottlenecks, increase matchmaking precision, and establish a secure, performant database tracking pipeline.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Research Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Artificial Intelligence", "Smart Recruitment Systems", "Intelligent Candidate Evaluation", "Full Stack Engineering", "Natural Language Processing"].map((word) => (
                      <span key={word} className="bg-surface/40 border border-white/35 rounded-full px-3 py-1 text-[10px] font-bold text-foreground">{word}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial metadata & Certificates */}
              <div className="md:col-span-5 flex flex-col gap-6 justify-between">
                
                {/* Archive details card */}
                <div className="matte-card p-6 border border-white/50 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-accent font-mono font-bold">Archive ID</span>
                      <span className="text-xs font-bold text-foreground font-mono">AR-2605325</span>
                    </div>
                    <span className="bg-surface/80 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-accent uppercase">Approved</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 text-[11px] leading-relaxed text-foreground/85">
                    <p><strong>Published Date:</strong> May 2026</p>
                    <p><strong>Peer Review:</strong> JAAFR Editorial Board Approved</p>
                    <p><strong>Methodology:</strong> Headless API analysis, NLP ranking arrays, and database locking operations.</p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href="https://rjwave.org/jaafr/viewpaperforall.php?paper=JAAFR2605325"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-5 py-3.5 bg-surface/80 hover:bg-foreground hover:text-background border border-white/60 hover:border-transparent text-foreground rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink size={13} />
                      View Journal Wave Portal
                    </span>
                    <ChevronRight size={12} />
                  </a>

                  <a
                    href="https://drive.google.com/file/d/1gxamD6-yzWnMuF9EjgyKGcftZ0PVswPI/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-5 py-3.5 bg-surface/80 hover:bg-foreground hover:text-background border border-white/60 hover:border-transparent text-foreground rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={13} />
                      Read Paper Document (PDF)
                    </span>
                    <ChevronRight size={12} />
                  </a>

                  <a
                    href="https://drive.google.com/file/d/1PI0_iMvEe9n6RplGCgz68-ihsdUjNN-s/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between px-5 py-3.5 bg-surface/80 hover:bg-foreground hover:text-background border border-white/60 hover:border-transparent text-foreground rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Award size={13} />
                      View Publication Certificate
                    </span>
                    <ChevronRight size={12} />
                  </a>
                </div>

              </div>

            </div>
          </article>
        )}

        {isFaq && (
          <article className="flex flex-col gap-10">
            <FaqAccordion />
          </article>
        )}

        {isProjectsDir && (
          <article className="flex flex-col gap-10">
            <ProjectsDirectory />
          </article>
        )}

        {/* INTERNAL LINKING / READ MORE SECTION */}
        <section className="mt-12 pt-10 border-t border-white/30 flex flex-col gap-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Related Portfolio Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="matte-card p-5 border border-white/40 flex flex-col justify-between hover:bg-foreground hover:text-background hover:border-transparent transition-all group shadow-sm hover:shadow-md"
              >
                <div>
                  <h4 className="font-extrabold text-xs text-foreground group-hover:text-background transition-colors">{link.label}</h4>
                  <p className="text-[10px] text-accent group-hover:text-background/80 transition-colors mt-1.5 leading-snug">{link.sub}</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-background transition-colors mt-4">
                  Explore Page
                  <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface/60 border-t border-white/50 py-10 px-6 mt-auto text-center backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium text-accent">
          <p>© {new Date().getFullYear()} HEMANATH AFK. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/research-publication" className="hover:underline">Research</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
