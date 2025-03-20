/* eslint-disable max-len */
import express from "express";
import cors from "cors";
import SkynedRegistry from "./registry";
import { RegistryKeysEnum } from "./enum";
import helmet from "helmet";
import { BinderMiddleware } from "./middleware";
import { baseRouter } from "./routers";
import { exceptionController } from "./controllers";
import { IApp, IExceptionController, IRouter } from "./interfaces";

/**
 * Represents all instances the app class depends on for initialization
 * @interface
 */
export interface Dependencies {
  /**
   * The exception controller
   *
   * @type {IExceptionController}
   */
  exceptionController: IExceptionController;

  /**
   * The base router
   *
   * @type {IRouter}
   */
  baseRouter: IRouter;
}

/**
 * Represents the App server
 * @class
 * */
export class App implements IApp {
  /**
   * The App instance
   *
   * @private
   * @type {IApp | null}
   */
  private static instance: IApp | null = null;

  /**
   * Tha app server
   *
   * @private
   * @type {Express}
   */
  private app = express();

  /**
   * Creates the app instance
   *
   * @private
   * @param {IExceptionController} exceptionController - The controller to handle all exceptions
   * @param {IRouter} baseRouter - The base router
   */
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

  /**
   * Creates the app instance
   *
   * @param {AppDependencies} dependencies
   * @returns {IApp} The app instance
   */

  static getInstance(dependencies: Dependencies) {
    if (!App.instance) {
      const { exceptionController, baseRouter } = dependencies;
      App.instance = new App(exceptionController, baseRouter);
    }

    return App.instance;
  }

  /**
   * Gets the application instance
   *
   * @return {IApp} - The App instance
   */
  getApp: IApp["getApp"] = () => this.app;
}

export const app = SkynedRegistry.getSingleton(RegistryKeysEnum.APP, () =>
  App.getInstance({
    exceptionController,
    baseRouter,
  }),
);
