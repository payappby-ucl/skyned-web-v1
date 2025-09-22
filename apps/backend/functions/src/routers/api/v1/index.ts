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
import { ourTeamRouter } from "./our-team";
import { schoolRouter } from "./school";
import { accommodationRouter } from "./accommodation";
import { blogRouter } from "./blog-post";
import { categoryRouter } from "./categories";
import { tagRouter } from "./tag";
import { programRouter } from "./program";
import { leadRouter } from "./lead";

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
  /** Handles our team */
  ourTeamRouter: IRouter;
  /** Handles School */
  schoolRouter: IRouter;
  /** Handles Programs */
  programRouter: IRouter;
  /** Handles Accommodation */
  accommodationRouter: IRouter;
  /** Handles Blog */
  blogRouter: IRouter;
  /** Handles Category */
  categoryRouter: IRouter;
  /** Handles Tag */
  tagRouter: IRouter;
  /** Handles Leads collection */
  leadRouter: IRouter;
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
    ourTeamRouter: IRouter,
    schoolRouter: IRouter,
    accommodationRouter: IRouter,
    blogRouter: IRouter,
    categoryRouter: IRouter,
    tagRouter: IRouter,
    programRouter: IRouter,
    leadRouter: IRouter,
  ) {
    this.router.use("/auth", authRouter.router);
    this.router.use("/admins", adminRouter.router);
    this.router.use("/contacts", contactRouter.router);
    this.router.use("/faqs", faqRouter.router);
    this.router.use("/newsletters", newsletterRouter.router);
    this.router.use("/departments", departmentRouter.router);
    this.router.use("/our-team", ourTeamRouter.router);
    this.router.use("/schools", schoolRouter.router);
    this.router.use("/accommodations", accommodationRouter.router);
    this.router.use("/blogs", blogRouter.router);
    this.router.use("/categories", categoryRouter.router);
    this.router.use("/tags", tagRouter.router);
    this.router.use("/programs", programRouter.router);
    this.router.use("/leads", leadRouter.router);
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
    ourTeamRouter,
    schoolRouter,
    accommodationRouter,
    blogRouter,
    categoryRouter,
    tagRouter,
    programRouter,
    leadRouter,
  }: V1RouterDependencies) {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router(
        authRouter,
        adminRouter,
        contactRouter,
        faqRouter,
        newsletterRouter,
        departmentRouter,
        ourTeamRouter,
        schoolRouter,
        accommodationRouter,
        blogRouter,
        categoryRouter,
        tagRouter,
        programRouter,
        leadRouter,
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
      ourTeamRouter,
      schoolRouter,
      accommodationRouter,
      blogRouter,
      categoryRouter,
      tagRouter,
      programRouter,
      leadRouter,
    }),
);
