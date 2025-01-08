import { IApp } from "./interface";
import express from "express";
import cors from "cors";
import SkynedRegistry from "./registry";
import { RegistryKeysEnum } from "./enum";
import helmet from "helmet";
import { BinderMiddleware } from "./middleware";
import { exceptionController, IExceptionController } from "./controllers";

interface Dependencies {
  exceptionController: IExceptionController;
}
class App implements IApp {
  private static instance: IApp | null = null;
  private app = express();

  private constructor(
    private readonly exceptionController: IExceptionController,
  ) {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.disable("x-powered-by");
    this.app.set("trust proxy", 1);
    this.app.use(express.json());

    // * Response Binder
    this.app.use(BinderMiddleware.responseBinder);

    this.app.get("/", (req, res) => {
      res.send("Working Skyned");
    });

    this.app.use("*", this.exceptionController.handle404);
    this.app.use(this.exceptionController.handleAllPossibleErrors);
  }
  static getInstance(dependencies: Dependencies) {
    if (!App.instance) {
      const { exceptionController } = dependencies;
      App.instance = new App(exceptionController);
    }

    return App.instance;
  }

  getApp: IApp["getApp"] = () => this.app;
}

export const app = SkynedRegistry.getSingleton(RegistryKeysEnum.APP, () =>
  App.getInstance({
    exceptionController,
  }),
);
