import { MetadataRoute } from "next";
import { env } from "../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.client.baseUrl,
      lastModified: new Date("25/03/2025"),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
