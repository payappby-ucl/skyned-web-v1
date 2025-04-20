import express from "express";
import { IRouter } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { authRouter } from "./auth";
import { adminRouter } from "./admin";

/** Dependencies required to create v1 router */
export interface V1RouterDependencies {
  /** Router handling authentication */
  authRouter: IRouter;
  /** handle admin */
  adminRouter: IRouter;
}
export class V1Router implements IRouter {
  private static instance: IRouter | null = null;

  /**
   * Version one router
   */
  router = express.Router();

  private constructor(authRouter: IRouter, adminRouter: IRouter) {
    this.router.use("/auth", authRouter.router);
    this.router.use("/admin", adminRouter.router);
  }

  /**
   * Creates version one router instance
   */

  static factory({ authRouter, adminRouter }: V1RouterDependencies) {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router(authRouter, adminRouter);
    }

    return V1Router.instance;
  }
}

/** The Version one router instance */
export const v1Router = SkynedRegistry.getSingleton(
  RegistryKeysEnum.V1_ROUTER,
  () => V1Router.factory({ authRouter, adminRouter }),
);
