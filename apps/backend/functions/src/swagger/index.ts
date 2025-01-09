import swaggerJsDoc from "swagger-jsdoc";
import { version } from "../../package.json";
import { env } from "../env";

const definition: swaggerJsDoc.Options["swaggerDefinition"] = {
  openapi: "3.1.1",
  info: {
    title: "Skyned Consults",
    summary: "API Documentation",
    description: "This is the official API documentation for Skyned Consults",
    version,
    termsOfService: "https://skynedconsults.com/",
    contact: {
      name: "Skyned Consults",
      url: "https://skynedconsults.com/",
      email: "info@skynedconsults.com",
    },
  },

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

  tags: [],
};

export default definition;
