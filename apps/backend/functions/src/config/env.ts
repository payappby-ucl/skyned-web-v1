import "dotenv/config";
export const env = {
  domains: {
    baseUrl: process.env.BASE_URL || "",
  },
  environment: process.env.ENVIRONMENT,
};
