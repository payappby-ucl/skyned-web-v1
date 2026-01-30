import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/contact`,
      lastModified: new Date("2025-04-08"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];
}
