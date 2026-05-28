export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface ProjectStack {
  name: string;
  role: string;
  cat: string;
  color: string;
}

export interface Project {
  name: string;
  sub: string;
  desc: string;
  linkText: string;
  linkUrl: string;
  githubUrl: string;
  iconName: "Layers" | "Code" | "Terminal" | "Database";
  features: ProjectFeature[];
  stack: ProjectStack[];
  breakdown: {
    code: string;
    comment: string;
  };
  metadata: {
    platform: string;
    target: string;
    status: string;
  };
}

export const PROJECTS: Project[] = [
  {
    name: "QuantumCart",
    sub: "Full-Stack MERN E-Commerce Platform",
    desc: "QuantumCart is a production-ready, highly scalable MERN stack e-commerce platform. Engineered for maximum search discoverability, it utilizes React routing to coordinate seamless REST API communications, secure session verifications, and an optimized, responsive checkout flow.",
    linkText: "Live Demo",
    linkUrl: "#contact",
    githubUrl: "https://github.com/HEMANATH-AFK/quantum",
    iconName: "Layers",
    features: [
      { title: "Product Inventory Systems", desc: "Dynamic admin control panels for real-time inventory management, Cloudinary asset uploads, and database price mutations." },
      { title: "Optimized Cart Operations", desc: "Redux client-state slice synchronization, instant checkout calculations, and persistent storage caching." },
      { title: "Secure Authentication Pipeline", desc: "Encryption workflows utilizing Bcrypt hashing, secure session tokens, and route-guarding middleware." },
      { title: "Scalable Full-Stack Backbone", desc: "Modular architecture separating client and server layers with robust Express routing." }
    ],
    stack: [
      { name: "React.js", role: "UI Componenting", cat: "Frontend", color: "#61DAFB" },
      { name: "Redux", role: "State Slices Syncing", cat: "State", color: "#764ABC" },
      { name: "Node.js", role: "V8 Server Runtime", cat: "Server", color: "#47A248" },
      { name: "Express.js", role: "REST Endpoints", cat: "API", color: "#333333" },
      { name: "MongoDB", role: "Flexible BSON Storage", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Responsive Styling", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// Setup state slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addToCart: (state, action) => { /* ... */ },
    removeFromCart: (state, action) => { /* ... */ }
  }
});`,
      comment: "Example showing dynamic client cart sync using Redux Toolkit."
    },
    metadata: {
      platform: "MERN Stack",
      target: "Scalable Web Clients",
      status: "Launched"
    }
  },
  {
    name: "HireAFK",
    sub: "AI-Powered Developer Hiring & Portfolio Intelligence Platform",
    desc: "HireAFK is an AI-powered developer recruitment ecosystem and portfolio intelligence platform. Designed for modern recruitment operations, it combines full stack engineering with natural language processing pipelines, scalable database queries, and interactive skill mapping dashboards.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/HEMANATH-AFK/hire-afk",
    iconName: "Code",
    features: [
      { title: "Developer Profile Intelligence", desc: "Built dynamic profile showcasing models, interactive skill visualizations, and responsive developer portfolio dashboards." },
      { title: "AI Candidate Matching", desc: "Integrated intelligent filtering and recommendation algorithms utilizing LLMs for matching skills and project specifications." },
      { title: "Responsive Frontend Interaction", desc: "Immersive client interface with high-performance animations, fluid responsive layouts, and dynamic component rendering." },
      { title: "Scalable Backend Pipeline", desc: "Developed modular API endpoints supporting secure authentication, relational database updates, and async background tasks." }
    ],
    stack: [
      { name: "React.js", role: "Component Layer", cat: "Frontend", color: "#61DAFB" },
      { name: "Next.js", role: "SSR & Router", cat: "Framework", color: "#000000" },
      { name: "Node.js", role: "API Middleware", cat: "Backend", color: "#47A248" },
      { name: "Express.js", role: "Router Pipeline", cat: "Server", color: "#333333" },
      { name: "MongoDB", role: "Recruiter Data", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Pebble Style", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// AI-Assisted Recommendation Engine API
router.post('/recommend', authMiddleware, async (req, res) => {
  const { requiredSkills, projectCategory } = req.body;
  const recommendations = await generateAIProfileMatches(requiredSkills, projectCategory);
  res.json({ success: true, matches: recommendations });
});`,
      comment: "API wrapper endpoint communicating with AI discovery agents."
    },
    metadata: {
      platform: "AI-POWERED HIRING ECOSYSTEM",
      target: "DEVELOPER DISCOVERY & RECRUITMENT",
      status: "SCALABLE PLATFORM ARCHITECTURE"
    }
  },
  {
    name: "ProjectForge",
    sub: "Full-Stack Project Collaboration & Workflow Platform",
    desc: "ProjectForge is a collaborative workflow and real-time project management platform. Featuring full stack JavaScript architecture, it connects teams via secure WebSocket pipelines, responsive Kanban boards, and a highly scalable MongoDB database schema.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/HEMANATH-AFK/D/tree/main/projectforge-ai",
    iconName: "Terminal",
    features: [
      { title: "Dynamic Project Workspaces", desc: "Structured workflow spaces enabling multi-user project creations, folder hierarchies, and progress analytics dashboards." },
      { title: "Real-Time Socket Syncing", desc: "Bidirectional client-server communication channels for instantaneous task tracking and state updates across active browser instances." },
      { title: "Optimized Task Architecture", desc: "Engineered modular database models supporting task classification, priority handling, deadlines, and notification triggers." },
      { title: "REST API & Component Architecture", desc: "Decoupled architecture using clean RESTful endpoints, reusable React component rendering, and type-safe data transfers." }
    ],
    stack: [
      { name: "React.js", role: "State Synchronization", cat: "Frontend", color: "#61DAFB" },
      { name: "Node.js", role: "WebSocket Engine", cat: "Backend", color: "#47A248" },
      { name: "Express.js", role: "Routing Pipeline", cat: "API", color: "#333333" },
      { name: "MongoDB", role: "Workspace Storage", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Neumorphic Depth", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// Synchronized Task update pipeline via Socket.io
io.on('connection', (socket) => {
  socket.on('task:update', async (taskData) => {
    const updated = await Task.findByIdAndUpdate(taskData.id, taskData, { new: true });
    socket.broadcast.emit('task:sync', updated);
  });
});`,
      comment: "Real-time task state synchronization across multiple client instances."
    },
    metadata: {
      platform: "PROJECT MANAGEMENT ECOSYSTEM",
      target: "COLLABORATIVE PRODUCTIVITY WORKFLOWS",
      status: "FULL-STACK DEVELOPMENT"
    }
  },
  {
    name: "RestroAFK",
    sub: "Smart Restaurant Management & Ordering Platform",
    desc: "RestroAFK is a full-stack digital restaurant ordering ecosystem and operational management system. This application streamlines culinary ordering experiences through high-performance menus, real-time inventory synchronization, and responsive restaurant dashboard controllers.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/hemanath-afk/restro-afk",
    iconName: "Database",
    features: [
      { title: "Interactive Menu Client", desc: "Dynamic client menus with category filtering, real-time item availability states, and cart calculations." },
      { title: "Dashboard Management Console", desc: "Secure manager interfaces for tracking active order pipelines, adjusting menu item prices, and editing database stock quantities." },
      { title: "Responsive Customer Layouts", desc: "Mobile-first layouts designed to streamline touch interactions, checkout operations, and order status tracking." },
      { title: "Scalable Database Operations", desc: "Engineered transactional database queries in Node.js to ensure stock level consistency and prevent order concurrency errors." }
    ],
    stack: [
      { name: "React.js", role: "Interactive Menu", cat: "Frontend", color: "#61DAFB" },
      { name: "Node.js", role: "Async Queue Manager", cat: "Backend", color: "#47A248" },
      { name: "Express.js", role: "Operational Routes", cat: "API", color: "#333333" },
      { name: "MongoDB", role: "Inventory Records", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Mobile Layout", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// Atomic Order Processing & DB Sync
const processOrder = async (orderItems, paymentDetails) => {
  const session = await db.startSession();
  session.startTransaction();
  try {
    const order = await Order.create(orderItems, { session });
    await Inventory.adjustStock(orderItems, { session });
    await session.commitTransaction();
    return order;
  } catch (err) {
    await session.abortTransaction();
  }
};`,
      comment: "Database transactional safety handling cart checkouts and stocks updates."
    },
    metadata: {
      platform: "DIGITAL RESTAURANT ECOSYSTEM",
      target: "SMART FOOD ORDERING & MANAGEMENT",
      status: "SCALABLE FULL-STACK PLATFORM"
    }
  },
  {
    name: "INDJCST Migration",
    sub: "Enterprise Laravel-to-React Frontend Modernization",
    desc: "INDJCST Migration was a large-scale enterprise frontend modernization project, migrating legacy Laravel Blade interfaces into a scalable React-based client architecture. The project focused on modular UI development, REST API continuous updates, and high-performance Webpack bundling.",
    linkText: "Case Study",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/hemanath-afk",
    iconName: "Code",
    features: [
      { title: "Legacy System Modernization", desc: "Decoupled server rendering and shifted legacy templates into reusable React client components and dynamic SPA layouts." },
      { title: "Modular UI Architecture", desc: "Designed scalable CSS styling systems, fluid grid layouts, and reusable components to optimize code maintainability." },
      { title: "Responsive Performance Tuning", desc: "Optimized bundle sizes, reduced layout shifts, and improved First Contentful Paint metrics across desktop and mobile browsers." },
      { title: "Backend API Integration", desc: "Re-engineered secure HTTP communication layers between the new React front-end and the existing Laravel REST backend endpoints." }
    ],
    stack: [
      { name: "React.js", role: "Frontend Engine", cat: "Frontend", color: "#61DAFB" },
      { name: "Laravel", role: "Robust Backend API", cat: "Framework", color: "#FF2D20" },
      { name: "JavaScript", role: "ES6+ Migration Script", cat: "Language", color: "#F7DF1E" },
      { name: "Tailwind CSS", role: "Fluid Styling Layout", cat: "Style", color: "#38BDF8" },
      { name: "REST APIs", role: "Hybrid Communication", cat: "Protocol", color: "#009688" }
    ],
    breakdown: {
      code: `// Hybrid Laravel API communication module
export const fetchLaravelContext = async (endpoint, token) => {
  const response = await fetch(\`/api/v1/migration/\${endpoint}\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Accept': 'application/json'
    }
  });
  return response.json();
};`,
      comment: "React API bridge communicating with existing Laravel backend controllers."
    },
    metadata: {
      platform: "ENTERPRISE FRONTEND MODERNIZATION",
      target: "LEGACY SYSTEM MIGRATION",
      status: "ACTIVE MIGRATION ARCHITECTURE"
    }
  },
  {
    name: "SciRank",
    sub: "Modern Academic Ranking & Analytics Frontend Platform",
    desc: "SciRank is a modern academic analytics and data visualization frontend platform. Built for scientific datasets, it features a scalable component-driven UI architecture, high-performance data sorting grids, and responsive charts optimized for crawlability and discoverability.",
    linkText: "Live Platform",
    linkUrl: "https://github.com/HEMANATH-AFK",
    githubUrl: "https://github.com/HEMANATH-AFK",
    iconName: "Layers",
    features: [
      { title: "Dynamic Ranking Grids", desc: "Built responsive visualization tables supporting real-time sorting, category filtering, and institution comparisons." },
      { title: "Semantic Data Interface", desc: "Designed accessible markup interfaces for readability, search engine crawling, and smooth client transitions." },
      { title: "Component-Driven Frontend", desc: "Created modular, reusable UI components using Tailwind CSS utility tokens and optimized React workflows." },
      { title: "High-Performance Rendering", desc: "Minimized layout shifts and rendering bottlenecks during large dataset mutations and layout calculations." }
    ],
    stack: [
      { name: "React.js", role: "Frontend Engine", cat: "Frontend", color: "#61DAFB" },
      { name: "Next.js", role: "Framework Layer", cat: "Framework", color: "#000000" },
      { name: "Tailwind CSS", role: "Responsive Styling", cat: "Style", color: "#38BDF8" },
      { name: "JavaScript", role: "Interactivity Logic", cat: "Language", color: "#F7DF1E" },
      { name: "REST APIs", role: "Data Integration", cat: "Protocol", color: "#009688" }
    ],
    breakdown: {
      code: `// Sort and filter institutions dynamically
export const filterRankings = (institutions, category, sortBy) => {
  return institutions
    .filter(inst => inst.category === category)
    .sort((a, b) => b[sortBy] - a[sortBy]);
};`,
      comment: "Dynamic filtering and sorting engine for academic ranks."
    },
    metadata: {
      platform: "ACADEMIC ANALYTICS FRONTEND",
      target: "SCALABLE DATA VISUALIZATION",
      status: "FRONTEND ENGINEERING"
    }
  },
  {
    name: "RailLuxury",
    sub: "Smart Railway Ticket Booking & Travel Management System",
    desc: "RailLuxury is a full-stack smart railway reservation ecosystem and travel management system. Engineered for high-throughput booking traffic, it connects a responsive React-based client with an Express API backend, secure payment routing, and MongoDB document indexing.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/HEMANATH-AFK",
    githubUrl: "https://github.com/HEMANATH-AFK/railluxury",
    iconName: "Terminal",
    features: [
      { title: "Intelligent Booking Workflows", desc: "Dynamic reservation flows enabling seat availability checking, journey scheduling, and real-time fare calculations." },
      { title: "Passenger Management Systems", desc: "Scalable database models storing booking histories, passenger credentials, and journey tracking states." },
      { title: "Immersive Booking Client", desc: "Designed custom glassmorphic components, fluid transitions, and responsive mobile-first page layouts." },
      { title: "Scalable Node.js Backend", desc: "Engineered database query caching, route-guard middleware, and secure payment-ready API endpoints." }
    ],
    stack: [
      { name: "React.js", role: "Interactive Client", cat: "Frontend", color: "#61DAFB" },
      { name: "Node.js", role: "V8 Backend Runtime", cat: "Backend", color: "#47A248" },
      { name: "Express.js", role: "REST Endpoints", cat: "API", color: "#333333" },
      { name: "MongoDB", role: "BSON Document Store", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Fluid Styling Layout", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// Express API endpoint for seat availability checking
router.get('/seats/availability', async (req, res) => {
  const { trainId, date, classType } = req.query;
  const available = await Train.checkSeats(trainId, date, classType);
  res.json({ availableSeats: available });
});`,
      comment: "Express API endpoint for real-time seat availability verification."
    },
    metadata: {
      platform: "SMART TICKETING ECOSYSTEM",
      target: "DIGITAL TRAVEL OPERATIONS",
      status: "FULL-STACK APPLICATION"
    }
  },
  {
    name: "AFK BlogSpace",
    sub: "Full-Stack Modern Publishing & Content Platform",
    desc: "AFK BlogSpace is a full-stack modern publishing and content management platform. Engineered for SEO and speed, it features dynamic Markdown rendering, secure author authentication pipelines, and structured schemas optimized for article indexability.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/HEMANATH-AFK",
    githubUrl: "https://github.com/HEMANATH-AFK",
    iconName: "Code",
    features: [
      { title: "Dynamic Article Rendering", desc: "Scalable publishing workflows with rich Markdown parsing, media embedding, and tag categorization." },
      { title: "Content Management Workflows", desc: "Built secure administrator controls for posting, updating, or deleting database articles via REST APIs." },
      { title: "SEO-Optimized Reader Layouts", desc: "Designed readable typographies, clean semantic HTML hierarchy, and lightweight responsive templates to minimize loading times." },
      { title: "Secure MongoDB Backend", desc: "Developed Express endpoints utilizing secure hashing, user route guards, and relational data bindings." }
    ],
    stack: [
      { name: "React.js", role: "Markdown Client", cat: "Frontend", color: "#61DAFB" },
      { name: "Node.js", role: "Content API Runtime", cat: "Backend", color: "#47A248" },
      { name: "Express.js", role: "Publishing Routes", cat: "API", color: "#333333" },
      { name: "MongoDB", role: "Article Database", cat: "Database", color: "#47A248" },
      { name: "Tailwind CSS", role: "Typography Styling", cat: "Style", color: "#38BDF8" }
    ],
    breakdown: {
      code: `// React client rendering markdown content with responsive prose
import ReactMarkdown from 'react-markdown';
export const ArticleContent = ({ source }) => {
  return <ReactMarkdown className="prose prose-invert">{source}</ReactMarkdown>;
};`,
      comment: "React client rendering markdown content with responsive prose typography."
    },
    metadata: {
      platform: "DIGITAL PUBLISHING ECOSYSTEM",
      target: "MODERN CONTENT MANAGEMENT",
      status: "FULL-STACK DEVELOPMENT"
    }
  },
  {
    name: "Eclipse AFK",
    sub: "Cinematic Interactive 3D Developer Portfolio Experience",
    desc: "Eclipse AFK is a cinematic interactive 3D developer portfolio experience. Built on Next.js, TypeScript, and Three.js, it unites high-performance WebGL rendering, React Three Fiber components, and GSAP scrolling choreography into an SEO-optimized creative web showcase.",
    linkText: "Interactive Experience",
    linkUrl: "https://github.com/HEMANATH-AFK",
    githubUrl: "https://github.com/HEMANATH-AFK/portfolio",
    iconName: "Terminal",
    features: [
      { title: "Scroll-Driven 3D Choreography", desc: "Fully synchronized scroll timeline driving camera vectors, mesh rotations, and volumetric lighting changes." },
      { title: "WebGL Spatial Environments", desc: "Procedural 3D scenes, particle fields, and custom GLSL shaders optimized for GPU drawing cycles." },
      { title: "Semantic Portfolio Content", desc: "Mirrored WebGL states with a crawlable DOM overlay to ensure total search engine accessibility and indexing." },
      { title: "Tactile Pebble UI Systems", desc: "Tactile interaction components styled with neumorphic depth, Framer Motion transitions, and smooth scroll behaviors." }
    ],
    stack: [
      { name: "Next.js", role: "App Framework", cat: "Framework", color: "#000000" },
      { name: "TypeScript", role: "Type-Safe Logic", cat: "Language", color: "#3178C6" },
      { name: "Three.js", role: "WebGL 3D Core", cat: "WebGL", color: "#080808" },
      { name: "React Three Fiber", role: "3D React Wrapper", cat: "3D Component", color: "#61DAFB" },
      { name: "GSAP", role: "Choreography Engine", cat: "Motion", color: "#88CE02" },
      { name: "Framer Motion", role: "UI Transition Layer", cat: "Motion", color: "#F024B6" }
    ],
    breakdown: {
      code: `// Camera motion interpolation synchronized with scroll
useFrame((state) => {
  const targetZ = scrollProgress * -100;
  state.camera.position.z = THREE.MathUtils.lerp(
    state.camera.position.z, 
    targetZ, 
    0.05
  );
});`,
      comment: "Lerping the camera Z position synchronized with global scroll progress."
    },
    metadata: {
      platform: "CINEMATIC 3D WEB EXPERIENCE",
      target: "IMMERSIVE INTERACTIVE STORYTELLING",
      status: "ADVANCED CREATIVE ENGINEERING"
    }
  }
];
