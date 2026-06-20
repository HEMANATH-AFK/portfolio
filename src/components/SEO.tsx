import React from "react";
import { PROJECTS_SEO } from "@/data/seoContent";

export default function SEO() {
  const baseUrl = "https://hemanath-afk.vercel.app";

  // 1. Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Hemanath S",
    "alternateName": "Hemanath AFK",
    "jobTitle": "Full Stack Developer",
    "gender": "Male",
    "email": "hemanathkalai29@gmail.com",
    "telephone": "+91 8778246378",
    "url": baseUrl,
    "image": `${baseUrl}/icon.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Puducherry",
      "addressRegion": "Puducherry",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://github.com/HEMANATH-AFK",
      "https://www.linkedin.com/in/hemanath-afk"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "MERN Stack",
      "Next.js",
      "React.js",
      "Three.js",
      "WebGL",
      "TypeScript",
      "Artificial Intelligence",
      "REST APIs",
      "Software Engineering",
      "Creative Development",
      "Frontend Engineering",
      "Cinematic Web Design"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Rajiv Gandhi College of Engineering and Technology",
      "url": "http://www.rgcet.edu.in"
    }
  };

  // 2. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Hemanath S | Full Stack Developer Portfolio",
    "description": "Interactive developer portfolio showcasing full stack MERN, WebGL 3D, and AI applications.",
    "publisher": {
      "@id": `${baseUrl}/#person`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 3. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Hemanath AFK Tech",
    "url": baseUrl,
    "logo": `${baseUrl}/icon.png`,
    "founder": {
      "@id": `${baseUrl}/#person`
    },
    "sameAs": [
      "https://github.com/HEMANATH-AFK",
      "https://www.linkedin.com/in/hemanath-afk"
    ]
  };

  // 4. Portfolio (ProfilePage) Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#portfolio`,
    "url": baseUrl,
    "name": "Hemanath S Professional Developer Portfolio",
    "mainEntity": {
      "@id": `${baseUrl}/#person`
    }
  };

  // 5. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${baseUrl}/#projects`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Research",
        "item": `${baseUrl}/#research`
      }
    ]
  };

  // 6. Project Schemas
  const projectSchemas = Object.values(PROJECTS_SEO).map((proj) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/${proj.slug}#project`,
    "name": proj.name,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. WebGL enabled browser required for 3D components.",
    "downloadUrl": proj.githubUrl,
    "featureList": proj.features,
    "description": proj.overview,
    "softwareVersion": "1.0.0",
    "author": {
      "@id": `${baseUrl}/#person`
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {projectSchemas.map((projSchema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projSchema) }}
        />
      ))}
    </>
  );
}
