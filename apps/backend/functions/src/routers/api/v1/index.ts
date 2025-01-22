import express from "express";
import { IRouter } from "../../../interface";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { getFirestore } from "firebase-admin/firestore";

export class V1Router implements IRouter {
  private static instance: IRouter | null = null;
  router = express.Router();

  private constructor() {
    this.router.route("/test").get(async (req, res, next) => {
      try {
        const doc = await getFirestore().collection("test").add({
          name: "Alabi Emmanuel",
        });

        const snap = await getFirestore().collection("test").doc(doc.id).get();
        res.json(snap.data());
      } catch (error) {
        next(error);
      }
    });
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
