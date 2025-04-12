import { MetadataRoute } from "next";
import { env } from "../../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${env.client.baseUrl}/consultation/visa-consultation`,
      lastModified: new Date("2025-04-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
