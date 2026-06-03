import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hemanath-afk.vercel.app"),
  title: "Hemanath S | Full Stack Developer | React, Next.js, Node.js & AI Applications",
  description: "Official developer portfolio of Hemanath S (Hemanath AFK), a Full Stack MERN Developer, Frontend Engineer, and AI Integration Enthusiast in Puducherry, India. Discover production-grade web systems like QuantumCart, AI-assisted tools like HireAFK, published academic research, and immersive WebGL environments.",
  keywords: [
    "Hemanath S", "Hemanath AFK", "Full Stack Developer", "MERN Stack Developer", "React Developer", 
    "Next.js Developer", "Node.js Developer", "MongoDB Developer", "Frontend Developer India", 
    "Portfolio Developer", "Software Developer Portfolio", "AI Integration Developer", "React Three Fiber Developer",
    "Three.js Developer", "AI Engineer", "Cinematic Portfolio", "Interactive Developer Portfolio", "TypeScript Engineer"
  ],
  authors: [{ name: "HEMANATH S" }],
  creator: "HEMANATH S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hemanath-afk.vercel.app",
    title: "Hemanath S | Full Stack Developer | React, Next.js, Node.js & AI Applications",
    description: "Official developer portfolio of Hemanath S (Hemanath AFK). Discover MERN stack systems, AI-powered applications, academic publications, and interactive 3D web experiences.",
    siteName: "Hemanath S Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Hemanath S | Full Stack Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemanath S | Full Stack Developer | React, Next.js, Node.js & AI Applications",
    description: "Official developer portfolio of Hemanath S (Hemanath AFK). Discover MERN stack systems, AI-powered applications, academic publications, and interactive 3D web experiences.",
    images: ["/twitter-image.png"],
    creator: "@hemanath_afk"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://hemanath-afk.vercel.app"
  },
  verification: {
    google: "RuZB8p5yrlWkM5oE_SZQUaDj47JCTd73RPLemOcG6KY"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased bg-background">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

