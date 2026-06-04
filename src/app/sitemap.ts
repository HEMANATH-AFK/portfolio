import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hemanath-afk.vercel.app";
  const lastModified = new Date();

  const projectSlugs = [
    "quantumcart",
    "hireafk",
    "projectforge",
    "restroafk",
    "indjcst-migration",
    "scirank",
    "railluxury",
    "afk-blogspace",
    "eclipse-afk",
    "afk-motion",
  ];

  const utilitySlugs = ["about", "contact", "research-publication", "faq", "projects"];

  const projectsSitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const utilitiesSitemap = utilitySlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...projectsSitemap,
    ...utilitiesSitemap,
  ];
}
