export interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "AI & 3D" | "Tools";
  color: string;
  description: string;
  usage: string;
  projects: string[];
  highlights: string[];
}

export const TECH_STACK: TechItem[] = [
  // Frontend
  {
    name: "React.js",
    category: "Frontend",
    color: "#61DAFB",
    description: "Component-based UI library for crafting highly interactive user interfaces.",
    usage: "Core frontend architecture for multi-page client portals and interactive modules.",
    projects: ["QuantumCart", "Developer Portfolio"],
    highlights: ["State Management", "Reusable Component Architecture", "Virtual DOM Optimization"]
  },
  {
    name: "Next.js",
    category: "Frontend",
    color: "#000000",
    description: "React framework for production-ready server-side rendering and static generation.",
    usage: "App Router integration, server components, and API routing for high-performance deployment.",
    projects: ["Developer Portfolio", "QuantumCart v2"],
    highlights: ["Server-Side Rendering (SSR)", "Route Optimization", "SEO & Core Web Vitals Optimization"]
  },
  {
    name: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    description: "Typed superset of JavaScript adding type safety and improved IDE intelligence.",
    usage: "Maintaining robust codebases with complex typed props, interfaces, and state structures.",
    projects: ["QuantumCart", "Developer Portfolio", "AI integration tools"],
    highlights: ["Strict Type Checking", "Interface & Generics Modeling", "Reduced Runtime Failures"]
  },
  {
    name: "JavaScript",
    category: "Frontend",
    color: "#F7DF1E",
    description: "Standard web scripting language powering client-side interaction.",
    usage: "Dynamic scripting, DOM manipulation, asynchronous flow handlers, and promise logic.",
    projects: ["QuantumCart", "HTML5 Landing Pages"],
    highlights: ["Asynchronous Event Loop", "ES6+ Modern Syntax", "DOM APIs"]
  },
  {
    name: "REST APIs",
    category: "Backend",
    color: "#009688",
    description: "Architectural style for designing networked applications and API communication.",
    usage: "Designing structured endpoints for frontend integration and state syncing.",
    projects: ["QuantumCart", "AI Chat Integration"],
    highlights: ["HTTP Methods Architecture", "JWT Token Authentication", "REST API Schema Design"]
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    color: "#7952B3",
    description: "CSS framework for rapid responsive page layouts and UI styling.",
    usage: "Rapid UI prototyping and grid structure setup in earlier legacy portfolios.",
    projects: ["College Projects", "Responsive UI Prototypes"],
    highlights: ["12-Column Grid", "Responsive Flexbox Layouts", "Utility CSS Classing"]
  },
  {
    name: "HTML5",
    category: "Frontend",
    color: "#E34F26",
    description: "Standard markup language defining the structure of web documents.",
    usage: "Semantic HTML layout, accessible DOM hierarchy, and SEO optimization structure.",
    projects: ["QuantumCart", "Developer Portfolio", "HTML Landing Pages"],
    highlights: ["Semantic Elements", "ARIA Accessibility Roles", "SEO Best Practices"]
  },
  {
    name: "Express.js",
    category: "Backend",
    color: "#333333",
    description: "Minimalist web framework for Node.js backends and API endpoints.",
    usage: "Building routing architecture, secure middleware validation, and session managers.",
    projects: ["QuantumCart Backend", "AI Prompt API Wrapper"],
    highlights: ["Middleware Pipeline", "Robust Error Handling", "Performance Optimization"]
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#38BDF8",
    description: "Utility-first CSS framework for custom, high-speed layout design.",
    usage: "Modern responsive interfaces, smooth micro-interactions, and custom Pebble UI styling.",
    projects: ["Developer Portfolio", "QuantumCart Frontends"],
    highlights: ["Utility Class Styling", "Responsive Layouts (sm, md, lg)", "Tailwind v4 Integration"]
  },
  {
    name: "MongoDB",
    category: "Backend",
    color: "#47A248",
    description: "NoSQL document-oriented database utilizing JSON-like documents.",
    usage: "Data persistence, complex schema design, indexing, and aggregate lookups.",
    projects: ["QuantumCart Database"],
    highlights: ["Mongoose Schema Design", "Aggregation Frameworks", "Database Indexing"]
  },
  {
    name: "MySQL",
    category: "Backend",
    color: "#4479A1",
    description: "Relational Database Management System based on Structured Query Language.",
    usage: "Relational data structuring, query logic, joining data tables, and normalization.",
    projects: ["College Database Systems", "Inventory Modules"],
    highlights: ["SQL Query Tuning", "Relational Keys & Normalization", "Transactions Processing"]
  },
  {
    name: "Redux",
    category: "Frontend",
    color: "#764ABC",
    description: "State container for managing predictable global state in Javascript apps.",
    usage: "Consolidating cart actions, login verification status, and global user settings.",
    projects: ["QuantumCart State Flow"],
    highlights: ["Redux Toolkit (RTK)", "Global State Slices", "Async Thunk Actions"]
  },

  // AI & 3D
  {
    name: "Gemini API",
    category: "AI & 3D",
    color: "#8E75C2",
    description: "Google's developer API for interacting with Gemini multimodal models.",
    usage: "Smart prompt processors, chat completion integration, and dynamic assistant logic.",
    projects: ["AI Assistant", "Developer Portfolio integrations"],
    highlights: ["Multimodal Prompt Execution", "Structured JSON Outputs", "Streaming Completions"]
  },
  {
    name: "AI Integration",
    category: "AI & 3D",
    color: "#00E5FF",
    description: "Embedding Artificial Intelligence services dynamically into web environments.",
    usage: "Orchestrating server-side AI prompt pipelines and semantic content loaders.",
    projects: ["AI Integration Suite", "QuantumCart Smart Recommendations"],
    highlights: ["Semantic Search", "Prompt Pipeline Orchestration", "Dynamic Model Fallbacks"]
  },
  {
    name: "Prompt Engineering",
    category: "AI & 3D",
    color: "#FF9100",
    description: "Designing targeted input formats to optimize LLM outputs and responses.",
    usage: "System prompts structure, few-shot conditioning, and chain-of-thought prompt triggers.",
    projects: ["LLM Agents System", "AI Chat Module"],
    highlights: ["Few-Shot Conditioning", "Role Prompt Formulation", "Temperature Regulation"]
  },
  {
    name: "Three.js",
    category: "AI & 3D",
    color: "#000000",
    description: "Core WebGL library for creating high-performance 3D scenes in the browser.",
    usage: "Volumetric fog, custom shaders, camera paths, light projections, and shadow controls.",
    projects: ["Cinematic Portfolio Hero", "Procedural 3D Elements"],
    highlights: ["WebGL Geometry Systems", "BufferAttribute Optimizations", "Matrix Camera Manipulation"]
  },
  {
    name: "React Three Fiber",
    category: "AI & 3D",
    color: "#61DAFB",
    description: "React renderer wrapper for Three.js, mapping declarative React elements to 3D meshes.",
    usage: "Modular 3D object rendering, canvas raycasting, state loops, and scroll timelines.",
    projects: ["Cinematic Portfolio Hero"],
    highlights: ["State Frame Handlers (useFrame)", "Raycast Interactions", "React Component Lifecycle in 3D"]
  },
  {
    name: "Lenis Scroll",
    category: "AI & 3D",
    color: "#8A8178",
    description: "Ultra-smooth scrolling engine optimizing scroll-driven animation controls.",
    usage: "Overriding standard browser scrolling mechanics for seamless GSAP timelines integrations.",
    projects: ["Cinematic Portfolio Hero", "Scroll Sections Transitions"],
    highlights: ["Consistent Cross-Platform Physics", "RequestAnimationFrame Alignment", "GSAP ScrollTrigger Bridging"]
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    color: "#F05032",
    description: "Distributed version control system for tracking source code changes.",
    usage: "Version branching, collaborative merge resolutions, and snapshot logs tracking.",
    projects: ["QuantumCart", "Developer Portfolio"],
    highlights: ["Branch Merging & Rebase", "Commit Log Versioning", "Collaborative Git Flows"]
  },
  {
    name: "GitHub",
    category: "Tools",
    color: "#181717",
    description: "Hosting platform for Git version control repositories and CI/CD actions.",
    usage: "Deploying code storage, action flows integration, and team repository sharing.",
    projects: ["All Open-Source Work"],
    highlights: ["GitHub Actions Workflow", "Pull Request Reviews", "Release Deployment Integration"]
  },
  {
    name: "VS Code",
    category: "Tools",
    color: "#007ACC",
    description: "Streamlined code editor with debugging, extensions, and git controls.",
    usage: "Primary IDE workspace for development, refactoring, and code compilation.",
    projects: ["Developer Workstation"],
    highlights: ["Debugging Pipelines", "Extension Integration", "Terminal Command Line Workflows"]
  },
  {
    name: "Postman",
    category: "Tools",
    color: "#FF6C37",
    description: "API platform for building, testing, and documentation of backend endpoints.",
    usage: "Mocking routes, verifying auth headers, testing API performance, and documenting.",
    projects: ["QuantumCart Backend testing"],
    highlights: ["API Collection Validation", "Auth Header Testing", "Pre-request Scripts Setup"]
  },
  {
    name: "MongoDB Compass",
    category: "Tools",
    color: "#4DB33D",
    description: "GUI client interface for querying and managing MongoDB instances.",
    usage: "Visual indexing management, aggregation visual testing, and document inspection.",
    projects: ["QuantumCart Database Validation"],
    highlights: ["Query Filter Pipeline Builders", "Index Operations Inspections", "Collection Exporting"]
  }
];
