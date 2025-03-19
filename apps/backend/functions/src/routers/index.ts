import express from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import SkynedRegistry from "../registry";
import { RegistryKeysEnum } from "../enum";
import { IRouter } from "../interface";
import { healthRouter } from "./health";
import { apiRouter } from "./api";
import definition from "../swagger";

/**
 * Represents the all dependencies for creating the base router
 */
export interface Dependencies {
  /** API Base Router */
  apiRouter: IRouter;

  /** Health Base Router */
  healthRouter: IRouter;
}

/**
 * Represents the Base Router
 * @class
 */
export class BaseRouter implements IRouter {
  private static instance: IRouter | null = null;

  /**
   * Represents the base router
   */
  router = express.Router();

  private constructor(apiRouter: IRouter, healthRouter: IRouter) {
    this.router.get("", (req, res) => {
      res.send("Welcome to Skyned Consults.");
    });

    this.router.use("/health", healthRouter.router);
    this.router.use("/api", apiRouter.router);

    // * API Documentation Route
    this.router.use("/api-docs", swaggerUI.serve);
    this.router.get(
      "/api-docs",
      swaggerUI.setup(
        swaggerJSDoc({
          definition,
          apis: ["src/swagger/**/*.yaml"],
        }),
      ),
    );

    // * Test Coverage Report
    this.router.use(
      "/coverage",
      express.static(path.resolve(__dirname, "../../public/coverage")),
    );

    // * Code Documentation
    this.router.use(
      "/code-docs",
      express.static(path.resolve(__dirname, "../../public/doc")),
    );
  }

  /**
   * Creates base router instance
   *
   * @param {Dependencies} dependencies
   * @returns {IRouter} The base router instance
   */

  static factory({ apiRouter, healthRouter }: Dependencies) {
    if (!BaseRouter.instance) {
      BaseRouter.instance = new BaseRouter(apiRouter, healthRouter);
    }

    return BaseRouter.instance;
  }
}

/** Creates/Gets the base router instance */
export const baseRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BASE_ROUTER,
  () => BaseRouter.factory({ apiRouter, healthRouter }),
);
