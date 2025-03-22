import swaggerJsDoc from "swagger-jsdoc";
import { version } from "../../package.json";
import { env } from "../config";

/**
 * API (Swagger) documentation configuration
 */
const definition: swaggerJsDoc.Options["swaggerDefinition"] = {
  /** Swagger version */
  openapi: "3.1.1",
  /** Info about the documentation */
  info: {
    /** Documentation title */
    title: "Skyned Consults",
    /** Summary of the the documentation is about */
    summary: "API Documentation",
    /** Description of the the documentation is about */
    description: "This is the official API documentation for Skyned Consults",
    /** The API Version number (SEMVEC) */
    version,
    /** Terms of service using the api (for external use) */
    termsOfService: "https://skynedconsults.com/",
    /** Documentation provider contact */
    contact: {
      name: "Skyned Consults",
      url: "https://skynedconsults.com/",
      email: "info@skynedconsults.com",
    },
  },

  /** Servers hosting the documentation */
  servers: [
    {
      url: `${env.domains.baseUrl}/api/{version}`,
      description: `The ${env.environment} API server`,
      variables: {
        version: {
          description: "Endpoint versions",
          default: "v1",
          enum: ["v1", "v2"],
        },
      },
    },
  ],

  /** Tags for grouping documentation */
  tags: [
    {
      name: "Auth",
      description: "Routes handling authentication for users",
    },
  ],
};

export default definition;
