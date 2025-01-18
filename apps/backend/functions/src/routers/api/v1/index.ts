import express from "express";
import { IRouter } from "../../../interface";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";

export class V1Router implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor() {
    //  * Private
  }

  static factory() {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router();
    }

    return V1Router.instance;
  }
}

export const v1Router = SkynedRegistry.getSingleton(
  RegistryKeysEnum.V1_ROUTER,
  V1Router.factory,
);
