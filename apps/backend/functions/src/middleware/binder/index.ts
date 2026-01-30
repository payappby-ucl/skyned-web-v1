/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IFailedResponse,
  IMessageResponse,
  ISuccessResponse,
} from "@workspace/shared";

/**
 * Custom function for successful response to request
 * This is much easier than res.status(200).json({}) and it also abstracts base interface for response object
 */

export function _success<T>(
  this: Response<ISuccessResponse<T>>,
  statusCode: StatusCodes,
  data: T,
) {
  this.status(statusCode).json({
    statusCode,
    success: true,
    data,
  });
}

/**
 * Custom function for failed response to request
 * This is much easier than res.status(400).json({}) and it also abstracts base interface for response object
 */

export function _failed(
  this: Response<IFailedResponse>,
  statusCode: StatusCodes,
  data: IMessageResponse,
) {
  this.status(statusCode).json({
    statusCode,
    success: false,
    data,
  });
}

/**
 * Concrete implementation for binding middleware to response object
 *
 * @class
 */

export class BinderMiddleware {
  private constructor() {
    // * Private
  }

  /** Binds response to custom functions */

  static responseBinder: RequestHandler = (req, res, next) => {
    res._success = _success.bind(res);
    res._failed = _failed.bind(res);
    next();
  };
}
