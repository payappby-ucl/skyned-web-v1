import express from "express";
import SkynedRegistry from "../registry";
import { RegistryKeysEnum } from "../enum";
import { IRouter } from "../interface";
import { healthRouter } from "./health";
import { apiRouter } from "./api";

interface Dependencies {
  apiRouter: IRouter;
  healthRouter: IRouter;
}
export class BaseRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(apiRouter: IRouter, healthRouter: IRouter) {
    this.router.get("", (req, res) => {
      res.send("Welcome to Skyned Consults.");
    });

    this.router.use("/health", healthRouter.router);
    this.router.use("/api", apiRouter.router);
  }

  static factory(dependencies: Dependencies) {
    if (!BaseRouter.instance) {
      const { apiRouter, healthRouter } = dependencies;
      BaseRouter.instance = new BaseRouter(apiRouter, healthRouter);
    }

    return BaseRouter.instance;
  }
}

export const baseRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BASE_ROUTER,
  () => BaseRouter.factory({ apiRouter, healthRouter }),
);
