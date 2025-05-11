import express from "express";
import { IRouter } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { authRouter } from "./auth";
import { adminRouter } from "./admin";
import { contactRouter } from "./contact";
import { faqRouter } from "./faq";
import { newsletterRouter } from "./newsletter";
import { departmentRouter } from "./department";

/** Dependencies required to create v1 router */
export interface V1RouterDependencies {
  /** Router handling authentication */
  authRouter: IRouter;
  /** handle admin */
  adminRouter: IRouter;
  /** handle contact */
  contactRouter: IRouter;
  /** handle FAQ */
  faqRouter: IRouter;
  /** Handles newsletter */
  newsletterRouter: IRouter;
  /** Handles department */
  departmentRouter: IRouter;
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
    faqRouter: IRouter,
    newsletterRouter: IRouter,
    departmentRouter: IRouter,
  ) {
    this.router.use("/auth", authRouter.router);
    this.router.use("/admins", adminRouter.router);
    this.router.use("/contacts", contactRouter.router);
    this.router.use("/faqs", faqRouter.router);
    this.router.use("/newsletters", newsletterRouter.router);
    this.router.use("/departments", departmentRouter.router);
  }

  /**
   * Creates version one router instance
   */

  static factory({
    authRouter,
    adminRouter,
    contactRouter,
    faqRouter,
    newsletterRouter,
    departmentRouter,
  }: V1RouterDependencies) {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router(
        authRouter,
        adminRouter,
        contactRouter,
        faqRouter,
        newsletterRouter,
        departmentRouter,
      );
    }

    return V1Router.instance;
  }
}

/** The Version one router instance */
export const v1Router = SkynedRegistry.getSingleton(
  RegistryKeysEnum.V1_ROUTER,
  () =>
    V1Router.factory({
      authRouter,
      adminRouter,
      contactRouter,
      faqRouter,
      newsletterRouter,
      departmentRouter,
    }),
);
