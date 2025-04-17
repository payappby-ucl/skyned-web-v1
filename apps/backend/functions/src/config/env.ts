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
    account: process.env.ACCOUNT_EMAIL as string,
    admissions: process.env.ADMISSIONS_EMAIL as string,
    info: process.env.INFO_EMAIL as string,
    application: process.env.APPLICATION_EMAIL as string,
    marketing: process.env.MARKETING_EMAIL as string,
    noreply: process.env.NOREPLY_EMAIL as string,
    complaints: process.env.COMPLAINTS_EMAIL as string,
  },
  marketing: {
    systemIo: {
      apiKey: process.env.SYSTEM_IO_API_KEY || "",
    },
  },
};
