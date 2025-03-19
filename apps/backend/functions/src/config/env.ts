import "dotenv/config";

/** Environment configuration */
export const env = {
  /** All domains related internally to Skyned */
  domains: {
    /** Domain on which the server is hosted */
    baseUrl: process.env.BASE_URL || "",
  },
  /** What environment is the server running on */
  environment: process.env.ENVIRONMENT,
};
