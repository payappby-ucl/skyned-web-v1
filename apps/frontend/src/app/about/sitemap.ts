import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/about`,
      lastModified: new Date("2025-04-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
