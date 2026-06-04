export interface OpenSourceFeature {
  title: string;
  desc: string;
}

export interface OpenSourceImpact {
  package: string;
  category: string;
  platform: string;
  description: string;
}

export interface OpenSourceContribution {
  name: string;
  sub: string;
  desc: string[];
  features: OpenSourceFeature[];
  stack: string[];
  impact: OpenSourceImpact;
  breakdown: {
    intro: string;
    tasks: string[];
    outro: string;
  };
  links: {
    viewPackage: string;
    npmRegistry: string;
    documentation: string;
    github: string;
  };
  stats: {
    title: string;
    lines: string[];
  };
  timelineEntry: {
    year: string;
    stage: string;
    title: string;
    desc: string;
  };
}

export const OPEN_SOURCE: OpenSourceContribution = {
  name: "AFK Motion",
  sub: "Lightweight JavaScript Animation Library",
  desc: [
    "AFK Motion is an open-source npm package designed to simplify the implementation of smooth UI interactions and reusable motion effects in modern web applications.",
    "Originally created while developing personal and freelance projects, the library was built to eliminate repetitive animation logic and provide developers with a simple, reusable motion toolkit."
  ],
  features: [
    {
      title: "Reusable Motion Utilities",
      desc: "Pre-built animation helpers designed to reduce boilerplate code and accelerate UI development."
    },
    {
      title: "JavaScript First",
      desc: "Built with accessibility and adoption in mind, making integration straightforward for JavaScript-based projects."
    },
    {
      title: "Lightweight Architecture",
      desc: "Focused on performance and simplicity without introducing unnecessary complexity."
    },
    {
      title: "Developer Experience",
      desc: "Easy installation, clean APIs, and straightforward integration patterns for modern frontend applications."
    }
  ],
  stack: ["JavaScript", "Node.js", "npm", "ES Modules", "React Compatible"],
  impact: {
    package: "@hemanath-afk/afk-motion",
    category: "Open Source / Developer Tools",
    platform: "npm Registry",
    description: "Published on npm and available for the developer community to install, explore, and contribute to."
  },
  breakdown: {
    intro: "AFK Motion represents my transition from solely consuming open-source software to actively contributing tools back to the developer ecosystem.",
    tasks: [
      "Package architecture design",
      "JavaScript module development",
      "npm publishing workflows",
      "Documentation writing",
      "Version management",
      "Open-source distribution practices"
    ],
    outro: "Beyond the technical implementation, the project provided practical experience in maintaining software intended for public consumption and future community adoption."
  },
  links: {
    viewPackage: "https://www.npmjs.com/package/@hemanath-afk/afk-motion",
    npmRegistry: "https://www.npmjs.com/package/@hemanath-afk/afk-motion",
    documentation: "https://github.com/HEMANATH-AFK/afk-motion#readme",
    github: "https://github.com/HEMANATH-AFK/afk-motion"
  },
  stats: {
    title: "Open Source Contributions",
    lines: [
      "01 Published npm Package",
      "1.0.0 Initial Release",
      "JavaScript Animation Library",
      "Available on npm Registry"
    ]
  },
  timelineEntry: {
    year: "2026",
    stage: "PUBLISHED AFK MOTION",
    title: "Published AFK Motion Library",
    desc: "Successfully designed, developed, documented, and published the open-source package @hemanath-afk/afk-motion, making reusable animation utilities available to the JavaScript developer community."
  }
};
