import { RequestHandler } from "express";
import { IValidationData } from "./interface";

export * from "./interface";

/**
 * Concrete implementation for request validation middleware
 *
 * @class
 */
export class RequestValidationMiddleware {
  private constructor() {
    // * Private
  }

  /**
   * Validates the request
   */

  static validate(data: IValidationData): RequestHandler {
    return async (req, res, next) => {
      try {
        if (data.body) {
          req.body = await data.body.parseAsync(req.body);
        }
        if (data.query) {
          req.query = await data.query.parseAsync(req.query);
        }
        if (data.params) {
          req.params = await data.params.parseAsync(req.params);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
