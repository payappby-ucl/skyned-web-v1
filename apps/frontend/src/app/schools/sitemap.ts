import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/schools`,
      lastModified: new Date("2025-08-21"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
