import express from "express";
import { IRouter } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { authRouter } from "./auth";
import { adminRouter } from "./admin";
import { contactRouter } from "./contact";

/** Dependencies required to create v1 router */
export interface V1RouterDependencies {
  /** Router handling authentication */
  authRouter: IRouter;
  /** handle admin */
  adminRouter: IRouter;
  /** handle contact */
  contactRouter: IRouter;
}
export class V1Router implements IRouter {
  private static instance: IRouter | null = null;

  /**
   * Version one router
   */
  router = express.Router();

  private constructor(
    authRouter: IRouter,
    adminRouter: IRouter,
    contactRouter: IRouter,
  ) {
    this.router.use("/auth", authRouter.router);
    this.router.use("/admin", adminRouter.router);
    this.router.use("/contact", contactRouter.router);
  }

  /**
   * Creates version one router instance
   */

  static factory({
    authRouter,
    adminRouter,
    contactRouter,
  }: V1RouterDependencies) {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router(authRouter, adminRouter, contactRouter);
    }

    return V1Router.instance;
  }
}

/** The Version one router instance */
export const v1Router = SkynedRegistry.getSingleton(
  RegistryKeysEnum.V1_ROUTER,
  () => V1Router.factory({ authRouter, adminRouter, contactRouter }),
);
