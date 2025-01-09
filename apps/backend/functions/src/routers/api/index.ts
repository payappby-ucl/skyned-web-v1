import express from "express";
import { v1Router } from "./v1";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { IRouter } from "../../interface";

interface Dependencies {
  v1Router: IRouter;
}
export class ApiRouter implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(v1Router: IRouter) {
    this.router.use("/v1", v1Router.router);
  }

  static factory(dependencies: Dependencies) {
    if (!ApiRouter.instance) {
      const { v1Router } = dependencies;
      ApiRouter.instance = new ApiRouter(v1Router);
    }

    return ApiRouter.instance;
  }
}

export const apiRouter = SkynedRegistry.getSingleton(
  RegistryKeysEnum.API_ROUTER,
  () => ApiRouter.factory({ v1Router }),
);
