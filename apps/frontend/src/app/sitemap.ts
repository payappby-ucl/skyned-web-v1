import { MetadataRoute } from "next";
import { env } from "../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.client.baseUrl,
      lastModified: new Date("2025-03-25"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
