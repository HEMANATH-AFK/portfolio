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
  title: "HEMANATH AFK | Premium 3D Developer Portfolio",
  description: "Interactive 3D developer portfolio of HEMANATH AFK - Full Stack Developer, AI Enthusiast, and 3D Web Experience Builder. Exploring MERN apps, Three.js, and Gemini integrations.",
  keywords: ["HEMANATH AFK", "Developer Portfolio", "Full Stack Developer", "3D Web", "Three.js", "React Three Fiber", "MERN Stack", "Puducherry"],
  authors: [{ name: "HEMANATH AFK" }],
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

