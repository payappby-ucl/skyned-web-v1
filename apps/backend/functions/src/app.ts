import { IApp } from "./interface";
import express from "express";
import cors from "cors";
import SkynedRegistry from "./registry";
import { RegistryKeysEnum } from "./enum";

class App implements IApp {
  private static instance: IApp | null = null;
  private app = express();
  private constructor() {
    this.app.use(cors());
    this.app.get("/", (req, res) => {
      res.send("Working Skyned");
    });
  }
  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  getApp: IApp["getApp"] = () => this.app;
}

export const app = SkynedRegistry.getSingleton(
  RegistryKeysEnum.APP,
  App.getInstance,
);
