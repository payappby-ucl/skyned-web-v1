import "dotenv/config";

/** Environment configuration */
export const env = {
  /** All domains related internally to Skyned */
  domains: {
    /** Domain on which the server is hosted */
    baseUrl: process.env.BASE_URL || "",
    /** Public facing frontend domain */
    frontendDomain: process.env.PUBLIC_DOMAIN_URL || "",
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
    test: "tobi@skynedconsults.com",
    account: "account@skynedconsults.com",
    admissions: "admissions@skynedconsults.com",
    info: "info@skynedconsults.com",
    application: "applications@skynedconsults.com",
    marketing: "marketing@skynedconsults.com",
    noreply: "no-reply@skynedconsults.com",
    complaints: "complaints@skynedconsults.com",
  },
  marketing: {
    systemIo: {
      apiKey: process.env.SYSTEM_IO_API_KEY || "",
    },
  },
};
