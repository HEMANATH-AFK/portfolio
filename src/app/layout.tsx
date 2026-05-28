import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hemanath-afk.vercel.app"),
  title: "HEMANATH AFK — Full Stack Developer & Cinematic 3D Web Engineer",
  description: "Premium interactive developer portfolio showcasing full stack engineering, AI-powered applications, immersive 3D web experiences, cinematic frontend systems, and scalable software architecture.",
  keywords: [
    "Hemanath AFK", "Full Stack Developer", "MERN Stack Developer", "React Developer", 
    "Three.js Developer", "AI Engineer", "Cinematic Portfolio", "Interactive Developer Portfolio", 
    "Next.js Developer", "TypeScript Engineer", "Creative Developer", "Frontend Engineer", 
    "Interactive Web Developer", "Cinematic Web Developer", "Software Engineer Portfolio", "3D Portfolio Website"
  ],
  authors: [{ name: "HEMANATH AFK" }],
  creator: "HEMANATH AFK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hemanath-afk.vercel.app",
    title: "HEMANATH AFK — Full Stack Developer & Cinematic 3D Web Engineer",
    description: "Premium interactive developer portfolio showcasing full stack engineering, AI-powered applications, immersive 3D web experiences, cinematic frontend systems, and scalable software architecture.",
    siteName: "HEMANATH AFK Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HEMANATH AFK — Full Stack Developer & Cinematic 3D Web Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HEMANATH AFK — Full Stack Developer & Cinematic 3D Web Engineer",
    description: "Premium interactive developer portfolio showcasing full stack engineering, AI-powered applications, immersive 3D web experiences, cinematic frontend systems, and scalable software architecture.",
    images: ["/og-image.png"],
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${outfit.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-background">
        {children}
      </body>
    </html>
  );
}

