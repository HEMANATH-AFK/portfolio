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
    desc: "QuantumCart is a production-ready, highly scalable e-commerce application engineered with the MERN stack. It features modern state synchronization, user session verification, and a responsive custom checkout interface.",
    linkText: "Live Demo",
    linkUrl: "#contact",
    githubUrl: "https://github.com/HEMANATH-AFK/quantum",
    iconName: "Layers",
    features: [
      { title: "Product Management", desc: "Dynamic admin dashboards for inventory edits, uploads, and pricing models." },
      { title: "Complex Cart Operations", desc: "Instant visual updates, quantity recalculations, and checkout caching." },
      { title: "Secure Authentication", desc: "Bcrypt hash checks, cookie encryption, and token routing guard middleware." },
      { title: "Scalable MERN Backbone", desc: "Separate client and server layers with robust API routers." }
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
    desc: "HireAFK was designed as a modern intelligent recruitment ecosystem focused on developer discovery, portfolio evaluation, and AI-assisted talent interaction workflows.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/HEMANATH-AFK/hire-afk",
    iconName: "Code",
    features: [
      { title: "Intelligent Developer Profiles", desc: "Built dynamic developer profile systems supporting showcases, skill visualization, technology mapping, project breakdowns, and responsive dashboards." },
      { title: "AI-Assisted Talent Discovery", desc: "Integrated intelligent filtering systems enabling skill-based discovery, smart profile recommendations, and developer categorization." },
      { title: "Modern Frontend Interaction", desc: "Implemented immersive frontend experiences with smooth UI transitions, responsive layouts, dynamic component rendering, and scalable state." },
      { title: "Scalable Backend Infrastructure", desc: "Developed modular backend systems supporting secure authentication, API-driven workflows, scalable DB, and data pipelines." }
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
    desc: "ProjectForge was built as a collaborative project management ecosystem focused on team workflows, task coordination, and scalable productivity architecture.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/HEMANATH-AFK/D/tree/main/projectforge-ai",
    iconName: "Terminal",
    features: [
      { title: "Dynamic Project Workspaces", desc: "Implemented scalable workspace systems allowing project creation, task organization, workflow structuring, and progress tracking." },
      { title: "Real-Time Coordination", desc: "Built synchronized interaction pipelines supporting live task updates, workflow synchronization, and dynamic state rendering." },
      { title: "Scalable Task Engine", desc: "Designed modular task systems with task categorization, priority handling, status tracking, and deadline workflows." },
      { title: "Modern Full-Stack Architecture", desc: "Developed clean frontend/backend separation with modular API systems, reusable React components, and optimized schemas." }
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
    desc: "RestroAFK was engineered as a modern digital restaurant ecosystem focused on seamless ordering experiences, operational management, and responsive customer interaction systems.",
    linkText: "Live Demo",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/hemanath-afk/restro-afk",
    iconName: "Database",
    features: [
      { title: "Interactive Food Ordering System", desc: "Built dynamic ordering workflows supporting live menu browsing, category filtering, quantity edits, and cart updates." },
      { title: "Dashboard Infrastructure", desc: "Implemented restaurant management systems allowing menu management, order tracking, pricing, and inventory monitoring." },
      { title: "Responsive Customer Experience", desc: "Created immersive customer experiences with mobile-first layouts, responsive interactions, and dynamic rendering." },
      { title: "Scalable Backend Operations", desc: "Developed modular backend systems supporting order processing, DB synchronization, and API operations." }
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
    desc: "INDJCST Frontend Migration was a large-scale frontend modernization project focused on migrating legacy Laravel Blade interfaces into a scalable React-based architecture.",
    linkText: "Case Study",
    linkUrl: "https://github.com/hemanath-afk",
    githubUrl: "https://github.com/hemanath-afk",
    iconName: "Code",
    features: [
      { title: "Legacy Frontend Modernization", desc: "Transformed traditional Blade-rendered pages into reusable React components, dynamic modules, and client rendering." },
      { title: "Component Architecture", desc: "Implemented structured component systems enabling reusable UI patterns and modular page composition." },
      { title: "UX Optimization", desc: "Enhanced frontend responsiveness using optimized rendering strategies, cleaner layouts, and smoother navigation." },
      { title: "Backend Integration Continuity", desc: "Maintained compatibility between Laravel backend services, existing APIs, DB workflows, and authentication." }
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
  }
];
