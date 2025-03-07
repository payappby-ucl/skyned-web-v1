import express from "express";
import { IRouter } from "../../../interface";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { emailService, IEmailService } from "../../../services";

interface Dependencies {
  emailService: IEmailService;
}
export class V1Router implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor(emailService: IEmailService) {
    this.router.route("/test").get(async (req, res, next) => {
      try {
        // await emailService.send({
        //   to: ["bobslegend795@gmail.com"],
        //   subject: "Test Subject",
        //   template: {
        //     type: "verify",
        //     data: {
        //       tokenId: "22334",
        //     },
        //   },
        // });

        res.json({ name: "Alabi Emmanuel" });
      } catch (error) {
        next(error);
      }
    });
  }

  static factory({ emailService }: Dependencies) {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router(emailService);
    }

    return V1Router.instance;
  }
}

export const v1Router = SkynedRegistry.getSingleton(
  RegistryKeysEnum.V1_ROUTER,
  () =>
    V1Router.factory({
      emailService,
    }),
);
