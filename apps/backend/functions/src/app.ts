import { IApp, IRouter } from "./interface";
import express from "express";
import cors from "cors";
import SkynedRegistry from "./registry";
import { RegistryKeysEnum } from "./enum";
import helmet from "helmet";
import { BinderMiddleware } from "./middleware";
import { baseRouter } from "./routers";
import { exceptionController, IExceptionController } from "./controllers";

interface Dependencies {
  exceptionController: IExceptionController;
  baseRouter: IRouter;
}
class App implements IApp {
  private static instance: IApp | null = null;
  private app = express();

  private constructor(
    exceptionController: IExceptionController,
    baseRouter: IRouter,
  ) {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.disable("x-powered-by");
    this.app.set("trust proxy", 1);
    this.app.use(express.json());

    // * Response Binder
    this.app.use(BinderMiddleware.responseBinder);

    // * Router
    this.app.use("/", baseRouter.router);

    // * Exceptions
    this.app.use(exceptionController.handle404);
    this.app.use(exceptionController.handleAllPossibleErrors);
  }
  static getInstance(dependencies: Dependencies) {
    if (!App.instance) {
      const { exceptionController, baseRouter } = dependencies;
      App.instance = new App(exceptionController, baseRouter);
    }

    return App.instance;
  }

  getApp: IApp["getApp"] = () => this.app;
}

export const app = SkynedRegistry.getSingleton(RegistryKeysEnum.APP, () =>
  App.getInstance({
    exceptionController,
    baseRouter,
  }),
);
