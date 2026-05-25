import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.khumug.mn",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}