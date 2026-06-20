import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import CommandCenter from "@/components/CommandCenter";
import SEO from "@/components/SEO";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hemanath-afk.vercel.app"),
  title: "Hemanath S | Full Stack Developer & AI Engineer",
  description: "Official portfolio of Hemanath S (Hemanath AFK). Explore interactive 3D WebGL scenes, full stack MERN systems, and AI applications.",
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
    title: "Hemanath S | Full Stack Developer & AI Engineer",
    description: "Official portfolio of Hemanath S (Hemanath AFK). Explore interactive 3D WebGL scenes, full stack MERN systems, and AI applications.",
    siteName: "Hemanath S Portfolio",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Hemanath S | Full Stack Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemanath S | Full Stack Developer & AI Engineer",
    description: "Official portfolio of Hemanath S (Hemanath AFK). Explore interactive 3D WebGL scenes, full stack MERN systems, and AI applications.",
    images: ["/icon.png"],
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
        <SEO />
        <CustomCursor />
        <CommandCenter />
        {children}
      </body>
    </html>
  );
}

