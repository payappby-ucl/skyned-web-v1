import { MetadataRoute } from "next";
import { env } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/privacy`,
      lastModified: new Date("2025-05-04"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];
}
