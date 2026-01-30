import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/search`,
      lastModified: new Date("2025-08-22"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
