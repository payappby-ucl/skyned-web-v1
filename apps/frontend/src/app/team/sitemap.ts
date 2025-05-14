import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/team`,
      lastModified: new Date("2025-05-14"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
