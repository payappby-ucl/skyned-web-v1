import "dotenv/config";

/** Environment configuration */
export const env = {
  /** All domains related internally to Skyned */
  domains: {
    /** Domain on which the server is hosted */
    baseUrl: process.env.BASE_URL || "",
  },
  /** What environment is the server running on */
  environment: process.env.SKYNED_ENVIRONMENT,
  /** Token */
  token: {
    /** Secret for signing JWT */
    secret: process.env.TOKEN_SECRET as string,
  },
  /** Emails used for sending */
  emails: {
    test: "test@skynedconsults.com",
    admin: "admin@skynedconsults.com",
    support: "support@skynedconsults.com",
    admissions: "admissions@skynedconsults.com",
    notifications: "notifications@skynedconsults.com",
    noreply: "noreply@skynedconsults.com",
  },
};
