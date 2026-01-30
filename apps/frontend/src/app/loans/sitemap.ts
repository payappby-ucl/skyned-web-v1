import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/loans`,
      lastModified: new Date("2025-09-27"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
