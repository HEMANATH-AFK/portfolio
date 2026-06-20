import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hemanath S | Full Stack Developer",
    short_name: "Hemanath AFK",
    description: "Official portfolio of Hemanath S (Hemanath AFK), showcasing MERN stack, WebGL, and AI projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
