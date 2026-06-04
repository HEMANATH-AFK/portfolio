export interface ProjectSEOData {
  slug: string;
  name: string;
  sub: string;
  githubUrl: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  technologies: { name: string; category: string; description: string }[];
  challenges: string[];
  results: string;
  iconName: "Layers" | "Code" | "Terminal" | "Database";
}

export interface PageSEOData {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  structuredData: any;
}

export const PROJECTS_SEO: Record<string, ProjectSEOData> = {
  quantumcart: {
    slug: "quantumcart",
    name: "QuantumCart",
    sub: "Full-Stack MERN E-Commerce Platform",
    githubUrl: "https://github.com/HEMANATH-AFK/quantum",
    iconName: "Layers",
    overview: "QuantumCart is a production-grade, highly scalable MERN stack e-commerce platform built to deliver low-latency transactions and optimized product indexing.",
    problem: "Traditional e-commerce platforms struggle with performance bottlenecks due to unoptimized database querying, lack of caching for cart items, and rigid monolithic frontend systems that lead to layout shifts and high Bounce Rates.",
    solution: "QuantumCart solves this by deploying a fully decoupled React frontend and Express/Node.js REST API. Redux manages synchronized client-side state slices for instant cart calculations, while MongoDB acts as a flexible, high-throughput database, allowing dynamic inventory mutation without performance degradation.",
    architecture: "The application uses a 3-tier architecture: a responsive single-page React application at the presentation layer, an Express.js API gateway hosting RESTful endpoints, and a MongoDB database layer. Session validation is secured via JWT and Bcrypt encryption middleware.",
    features: [
      "Dynamic Admin Panel: Real-time inventory control, price changes, and direct Cloudinary image uploads.",
      "Optimized Cart State: Redux Toolkit slice synchronization matching local storage cache.",
      "JWT Authentication: Secure login flow with Bcrypt encryption and server-side route guards.",
      "Responsive Layout: Custom Tailwind CSS grid optimized for mobile and desktop screens."
    ],
    technologies: [
      { name: "React.js", category: "Frontend", description: "Responsive component styling and dynamic routing." },
      { name: "Redux Toolkit", category: "State Management", description: "Synchronized client-side store for carts." },
      { name: "Node.js", category: "Server Runtime", description: "V8-powered high-throughput server layer." },
      { name: "Express.js", category: "API Framework", description: "Modular REST routing and validation middleware." },
      { name: "MongoDB", category: "Database", description: "Flexible BSON storage for product indexing." }
    ],
    challenges: [
      "Preventing cart state desynchronization on page refresh: Solved by executing a custom local storage sync middleware inside the Redux store initialization.",
      "Optimizing image loading times for large product catalogs: Solved by leveraging Cloudinary image resizing APIs to request exact responsive image resolutions on client screens."
    ],
    results: "Achieved sub-200ms API response times for catalog queries and established a solid transaction lifecycle capable of supporting hundreds of concurrent users without concurrency errors."
  },
  hireafk: {
    slug: "hireafk",
    name: "HireAFK",
    sub: "AI-Powered Developer Hiring & Portfolio Intelligence Platform",
    githubUrl: "https://github.com/HEMANATH-AFK/hire-afk",
    iconName: "Code",
    overview: "HireAFK is an AI-powered developer recruitment ecosystem designed to optimize candidate evaluations, map skill profiles, and streamline hiring workflows.",
    problem: "Recruiters waste hundreds of hours manually reading static developer resumes, resulting in poor matching accuracy and high hiring latency.",
    solution: "HireAFK integrates Gemini API prompts and LLM-assisted evaluation scripts to analyze developer portfolios, dynamically mapping developer profiles to job requirements, and outputting interactive matching scores and dashboards.",
    architecture: "Built on Next.js for server-side pre-rendering (SSR) and client route handling, connected to an Express.js API middleware. Relational matching query pipelines run on MongoDB, with AI logic running asynchronously through V8 worker threads.",
    features: [
      "AI Candidate Matchmaking: LLM-assisted matchmaking using candidate resumes and project metadata.",
      "Interactive Skill Maps: Custom visual maps showcasing skills, language proficiencies, and categories.",
      "Recruiter Dashboard: Central management panel for tracking applicants, creating jobs, and grading candidates.",
      "Async Profile Parsing: Background workers for file ingestion and profile ranking."
    ],
    technologies: [
      { name: "Next.js", category: "Framework", description: "Statically generated pages and fast API routes." },
      { name: "Gemini API", category: "Artificial Intelligence", description: "Natural language processing for resume analysis and profile matching." },
      { name: "Node.js", category: "Backend", description: "High-performance JavaScript backend environment." },
      { name: "MongoDB", category: "Database", description: "Dynamic storage for recruiter logs, jobs, and candidates." }
    ],
    challenges: [
      "Parsing unformatted PDF/Word resumes accurately: Solved by structuring prompts with strict JSON output schemas, allowing the Express parser to validate token arrays reliably.",
      "Mitigating API rate limits during batch resume processing: Solved by implementing a token-bucket throttling queue on the server to delay consecutive calls."
    ],
    results: "Reduced the time-to-evaluate developer profiles by 78% and improved hiring match rates by leveraging contextual NLP classification instead of exact-word matching."
  },
  projectforge: {
    slug: "projectforge",
    name: "ProjectForge",
    sub: "Full-Stack Project Collaboration & Workflow Platform",
    githubUrl: "https://github.com/HEMANATH-AFK/D/tree/main/projectforge-ai",
    iconName: "Terminal",
    overview: "ProjectForge is a real-time collaborative workspace and task management tool engineered to keep engineering teams aligned through live status updates and interactive Kanban boards.",
    problem: "Remote teams experience communication delays and desynchronized workflow states when task boards rely on standard HTTP polling, leading to conflicts in task assignments.",
    solution: "ProjectForge solves this by establishing a persistent bidirectional WebSocket network using Socket.io, pushing task state mutations instantly to all connected clients and updating the React DOM with zero page reloads.",
    architecture: "Uses React on the frontend, Express and Socket.io on the backend, and MongoDB at the storage layer. Employs token-based socket handshakes to ensure workspace authorization.",
    features: [
      "Real-Time Sync: Bidirectional socket channels syncing Kanban cards instantly.",
      "Structured workspaces: Project folders, timeline visualizations, and role permissions.",
      "Dynamic Analytics: Live tracking of completed vs. pending tasks inside interactive grids.",
      "Secure WebSockets: Encrypted connection channels with room-based isolation."
    ],
    technologies: [
      { name: "React.js", category: "Frontend", description: "Interactive components and real-time DOM renders." },
      { name: "Socket.io", category: "Real-time Network", description: "Bidirectional WebSocket connection wrapper." },
      { name: "Node.js", category: "Backend Runtime", description: "Event-driven, non-blocking I/O server." },
      { name: "MongoDB", category: "Database", description: "Flexible schemas storing nested task models." }
    ],
    challenges: [
      "Preventing card duplication during multi-user drag-and-drop operations: Solved by wrapping database updates in atomic operations and broadcasting lock signals to other clients during drag states.",
      "Handling network drops gracefully: Implemented client-side fallback queues that save states locally and sync them back to Socket.io upon re-connection."
    ],
    results: "Maintained sub-50ms synchronization latency across active clients, enabling smooth remote engineering collaborations with zero data collisions."
  },
  restroafk: {
    slug: "restroafk",
    name: "RestroAFK",
    sub: "Smart Restaurant Management & Ordering Platform",
    githubUrl: "https://github.com/hemanath-afk/restro-afk",
    iconName: "Database",
    overview: "RestroAFK is a full-stack digital ordering system and business intelligence dashboard tailored for modern culinary operations.",
    problem: "Restaurants experience inventory leakage, checkout bottlenecks, and kitchen miscommunications when using outdated POS terminals or paper tickets.",
    solution: "RestroAFK streamlines this with a high-performance customer order client, an instant kitchen status tracker, and an admin dashboard that syncs active orders directly with stock levels.",
    architecture: "A decoupled MERN stack application utilizing REST APIs. Uses database transaction blocks to guarantee that stock counts update atomically alongside order creations, preventing double-selling.",
    features: [
      "Interactive Menus: Fluid filtering, responsive search, and live item availability.",
      "Kitchen Dashboard: Live tracking of order prep stages (Pending, Preparing, Ready).",
      "Inventory Sync: Auto-deduction of raw stock quantities upon checkout.",
      "Manager Controls: Price modifications, new dish additions, and sales statistics."
    ],
    technologies: [
      { name: "React.js", category: "Frontend", description: "Lightweight client for mobile food ordering." },
      { name: "Node.js", category: "Backend Runtime", description: "Async handler for heavy POS routes." },
      { name: "MongoDB", category: "Database", description: "BSON data store for menu objects and stock levels." },
      { name: "Tailwind CSS", category: "Styling", description: "Responsive layouts designed for quick mobile clicks." }
    ],
    challenges: [
      "Ensuring inventory consistency during sudden lunch rushes: Solved by wrapping order processing scripts in MongoDB database transaction blocks (session.startTransaction()).",
      "Rendering dynamic menus fast on low-end mobile devices: Solved by lazy-loading dish images and caching menu queries on the Node.js server memory."
    ],
    results: "Created a transaction-safe restaurant network that reduced food prep times by 20% and completely eliminated inventory reporting mismatches."
  },
  "indjcst-migration": {
    slug: "indjcst-migration",
    name: "INDJCST Migration",
    sub: "Enterprise Laravel-to-React Frontend Modernization",
    githubUrl: "https://github.com/hemanath-afk",
    iconName: "Code",
    overview: "INDJCST Migration is an enterprise-scale frontend modernization initiative, transitioning a legacy PHP Laravel Blade portal into a modern decoupled React client SPA.",
    problem: "Legacy server-rendered Blade templates caused high page load times, layout shifts on interaction, and complex codebase maintenance, hindering search engine positioning and mobile engagement.",
    solution: "Decoupled the client and server layers. Rewrote the Blade layout engine into a React single-page application structure. Maintained Laravel as a robust JSON-only REST API gateway, significantly boosting loading metrics and API testability.",
    architecture: "A headless architectural model where React interacts with Laravel REST endpoints. Secure communication uses bearer tokens, and Webpack splits the JS bundle to optimize page loading.",
    features: [
      "Decoupled Architecture: Separated presentation layer from backend business logic.",
      "Modern Webpack Bundling: Code splitting and asset compression for fast loads.",
      "Tailwind Styling: Clean, responsive layout replacing nested legacy CSS grids.",
      "API Integration Layer: Re-engineered secure HTTP communication modules."
    ],
    technologies: [
      { name: "React.js", category: "Frontend Engine", description: "SPA router and modular component architecture." },
      { name: "Laravel", category: "Backend API", description: "PHP REST framework acting as secure gateway." },
      { name: "JavaScript (ES6+)", category: "Language", description: "Optimized state management and API calls." },
      { name: "Tailwind CSS", category: "Styling", description: "Unified utility classes replacing custom stylesheets." }
    ],
    challenges: [
      "Maintaining state persistence across legacy session redirects: Solved by establishing a secure token handshake inside the React loading lifecycle, storing the session in encrypted cookie parameters.",
      "Refactoring thousands of nested Blade templates: Done systematically by mapping layouts into reusable React component blocks, separating page wrappers and details."
    ],
    results: "Boosted page loading speed (Time to Interactive) by 45%, eliminated layout shift, and established a scalable, modern workspace for future team expansions."
  },
  scirank: {
    slug: "scirank",
    name: "SciRank",
    sub: "Modern Academic Ranking & Analytics Frontend Platform",
    githubUrl: "https://github.com/HEMANATH-AFK",
    iconName: "Layers",
    overview: "SciRank is an academic analytics frontend designed to visualize institution rankings, index datasets, and output custom academic metrics.",
    problem: "Existing academic index pages use outdated HTML tables that load slowly, lack responsive design, and are highly difficult for search engine crawlers to parse.",
    solution: "SciRank leverages React's virtual DOM to sort and filter institutional datasets on the client side, showing data grids instantly while using semantic HTML5 structures to guarantee optimal crawlability.",
    architecture: "Next.js-powered static site generation (SSG) frontend, utilizing client-side state engines to execute complex sorting and filtering workflows on loaded JSON records.",
    features: [
      "Dynamic Sorting Grids: Sort and filter university ranks instantly by multiple metrics.",
      "Mobile-Optimized Tables: Fully responsive horizontal card shifts for mobile displays.",
      "Semantic HTML5 Markup: Strict hierarchical structure optimized for Google crawler reading.",
      "Lightweight Assets: Minimized JS bundles with zero heavy library dependencies."
    ],
    technologies: [
      { name: "React.js", category: "Frontend Engine", description: "Dynamic list mapping and client side state hooks." },
      { name: "Next.js", category: "Framework", description: "Static page exports for quick FCP scores." },
      { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS framework for layout configurations." }
    ],
    challenges: [
      "Rendering large tables with hundreds of records without stuttering: Solved by executing client-side pagination and sorting arrays in Web Worker threads to keep the main thread clear.",
      "Ensuring crawlers index the dataset: Solved by pre-rendering the default table state on the server during the Next.js compile stage."
    ],
    results: "Achieved a 100/100 Lighthouse SEO score and reduced interaction delays on large tables to less than 15ms."
  },
  railluxury: {
    slug: "railluxury",
    name: "RailLuxury",
    sub: "Smart Railway Ticket Booking & Travel Management System",
    githubUrl: "https://github.com/HEMANATH-AFK/railluxury",
    iconName: "Terminal",
    overview: "RailLuxury is a full-stack smart railway reservation platform built to manage ticket transactions, seat mapping, and journey updates.",
    problem: "Railway ticketing sites experience high server crashes during morning reservation rushes due to locking rows in SQL databases and slow seat inventory check routines.",
    solution: "RailLuxury solves this by building a MERN stack ticketing pipeline. The backend uses Express and MongoDB index keys, speeding up seat queries and ensuring ticket transactions complete successfully.",
    architecture: "Decoupled MERN stack. Integrates a custom booking queue in Express, token authentication, and a MongoDB index pattern designed to look up train schedules in logarithmic time.",
    features: [
      "Intelligent Seat Map: Visual train seating layout showing booked and empty seats.",
      "Dynamic Fare Calculation: Price shifts based on class selection and travel dates.",
      "User Booking History: central dashboard showing active tickets and travel schedules.",
      "Fast API Backend: Node.js routing and middleware optimized for transaction speeds."
    ],
    technologies: [
      { name: "React.js", category: "Frontend Client", description: "User interface for searching trains and booking seats." },
      { name: "Node.js", category: "Backend Engine", description: "REST API runtime handling booking orders." },
      { name: "MongoDB", category: "Database Store", description: "Indexed database storing passenger records and train states." },
      { name: "Express.js", category: "Router", description: "Controller middleware routing authentication and bookings." }
    ],
    challenges: [
      "Preventing double-booking of the same train seat: Solved by creating a unique compound index in MongoDB on { trainId, date, seatNumber } and enforcing atomic document updates.",
      "Building a complex interactive seating layout that remains responsive: Solved by designing lightweight modular SVGs that render dynamically depending on the train configuration."
    ],
    results: "Established a robust, transaction-safe booking environment capable of handling concurrent queries with zero database locking issues."
  },
  "afk-blogspace": {
    slug: "afk-blogspace",
    name: "AFK BlogSpace",
    sub: "Full-Stack Modern Publishing & Content Platform",
    githubUrl: "https://github.com/HEMANATH-AFK",
    iconName: "Code",
    overview: "AFK BlogSpace is a fast publishing system and content platform optimized for article readability, SEO tags, and simple editorial control.",
    problem: "Monolithic blog systems like WordPress are heavy, add database overhead, load slowly on mobile networks, and generate messy HTML tags that hurt SEO rankings.",
    solution: "AFK BlogSpace leverages markdown parsing on a clean MERN stack. Authors write posts in markdown, which renders dynamically to clean HTML. This keeps bundle sizes light, database queries quick, and code structure easy for Googlebot to crawl.",
    architecture: "Uses React for page rendering, Express REST APIs for backend administration, and MongoDB for article and user records. Uses JWT authorizations for publisher commands.",
    features: [
      "Markdown Ingestion: Write in markdown, render dynamically with custom code highlighting.",
      "Publisher Admin Portal: Clean controls to write, edit, and delete database articles.",
      "SEO Metadata Generator: Automatic creation of meta tags and schemas from post titles.",
      "Responsive Styling: Clean typography layout optimized for long reading sessions."
    ],
    technologies: [
      { name: "React.js", category: "Frontend", description: "Client-side routing and markdown rendering panels." },
      { name: "Node.js", category: "Backend API", description: "Host environment for publishing routes." },
      { name: "MongoDB", category: "Database Store", description: "Collection store for articles, tags, and credentials." },
      { name: "Express.js", category: "Server Controller", description: "Validates article payloads and handles JWT verifications." }
    ],
    challenges: [
      "Parsing complex markdown content safely: Solved by integrating a secure markdown compiler alongside DOM sanitization scripts to prevent cross-site scripting (XSS) issues.",
      "Optimizing articles for SEO indexing: Solved by automatically creating meta titles, descriptions, and article schemas from post parameters during rendering."
    ],
    results: "Reduced average page loading times under 300ms and created a search-friendly site structure that ranks articles faster on Google and Bing."
  },
  "eclipse-afk": {
    slug: "eclipse-afk",
    name: "Eclipse AFK",
    sub: "Cinematic Interactive 3D Developer Portfolio Experience",
    githubUrl: "https://github.com/HEMANATH-AFK/portfolio",
    iconName: "Terminal",
    overview: "Eclipse AFK is Hemanath's portfolio showcase, combining advanced WebGL rendering, 3D animations, and a search-optimized DOM overlay.",
    problem: "Most 3D WebGL portfolios are invisible to search engines and AI agents because the text is embedded inside a canvas element, leading to low ranking metrics.",
    solution: "Eclipse AFK solves this by layering a search-engine crawlable HTML5 DOM overlay exactly below the WebGL canvas. A custom scroll script coordinates GSAP camera movements in 3D space with DOM text fades, providing a premium visual experience that remains fully crawlable by bots.",
    architecture: "A Next.js App Router project using React Three Fiber for WebGL scene rendering, GSAP for scroll tracking, and Framer Motion for UI component transitions.",
    features: [
      "WebGL Scene Parallax: Interactive particle loops and 3D camera shifts.",
      "Crawlable DOM Overlay: Structured texts fully visible to web crawlers.",
      "Scroll Choreography: GSAP timelines mapping scroll percentages to camera Z vectors.",
      "Pebble UI styling: Sand-toned glassmorphism cards and clean Outfit typography."
    ],
    technologies: [
      { name: "Next.js", category: "Framework", description: "Routing controls and static rendering configurations." },
      { name: "Three.js & R3F", category: "WebGL 3D", description: "Volumetric lighting, shaders, and 3D canvas models." },
      { name: "GSAP", category: "Animations", description: "Scroll position tracking and camera path interpolation." },
      { name: "Framer Motion", category: "UI Interactions", description: "Transitions and neumorphic tactile clicks." }
    ],
    challenges: [
      "Keeping WebGL renders at 60 FPS while running CSS animations: Solved by moving heavy calculations into useFrame loops, using CSS transition transforms, and avoiding page layout reflows.",
      "Making Three.js canvas data crawlable: Solved by placing complete semantic HTML structures in the DOM overlay, mapping every WebGL element to a crawlable text node."
    ],
    results: "Delivered a premium 3D creative site that achieves a 100/100 Lighthouse SEO score and remains fully indexable by search engines."
  },
  "afk-motion": {
    slug: "afk-motion",
    name: "AFK Motion",
    sub: "Lightweight JavaScript Animation Library",
    githubUrl: "https://github.com/HEMANATH-AFK/afk-motion",
    iconName: "Code",
    overview: "AFK Motion is an open-source npm package designed to simplify the implementation of smooth UI interactions and reusable motion effects in modern web applications.",
    problem: "Frontend developers frequently re-write repetitive CSS animations and JavaScript transitions for every new project, introducing package bloating, inconsistencies in acceleration curves, and unnecessary DOM reflow overhead.",
    solution: "AFK Motion solves this by packaging pre-built, high-performance animation helpers into a lightweight, tree-shakable ES Module. It eliminates boilerplate code, works seamlessly with vanilla JS or frontend frameworks, and runs smoothly with minimal memory footprint.",
    architecture: "A modular, zero-dependency JavaScript package compiled for both ESM and CommonJS distributions. It exposes target elements to optimized hardware-accelerated animations using standard requestAnimationFrame pipelines and GPU-friendly CSS transforms.",
    features: [
      "Reusable Motion Utilities: Pre-built animation helpers designed to reduce boilerplate code and accelerate UI development.",
      "JavaScript First: Built with accessibility and adoption in mind, making integration straightforward for JavaScript-based projects.",
      "Lightweight Architecture: Focused on performance and simplicity without introducing unnecessary complexity.",
      "Developer Experience: Easy installation, clean APIs, and straightforward integration patterns for modern frontend applications."
    ],
    technologies: [
      { name: "JavaScript", category: "Language", description: "Core programming language for writing the library helpers and animation math." },
      { name: "Node.js", category: "Runtime", description: "Development runtime environment for package bundling and dev tooling." },
      { name: "npm", category: "Registry", description: "Dependency distribution platform and registry registry." },
      { name: "ES Modules", category: "Module System", description: "Modern module system enabling tree-shaking and efficient imports." }
    ],
    challenges: [
      "Ensuring smooth 60 FPS transition execution across mobile browsers: Resolved by utilizing transform-only CSS bindings and hardware acceleration keys, avoiding layout reflows.",
      "Publishing a dual ESM/CommonJS package with clean TypeScript declarations: Resolved by configuring custom rollup bundling pipelines and generating separate build targets."
    ],
    results: "Published to npm under @hemanath-afk/afk-motion, providing a modular utility toolkit that decreases interface transition code lines by up to 60%."
  }
};
