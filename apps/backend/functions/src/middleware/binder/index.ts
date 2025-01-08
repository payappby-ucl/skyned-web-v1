/* eslint-disable no-invalid-this */
import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IFailedResponse,
  IMessageResponse,
  ISuccessResponse,
} from "@skyned/interfaces";

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

export function _failed(
  this: Response<IFailedResponse>,
  statusCode: StatusCodes,
  data: IMessageResponse,
) {
  this.status(statusCode).json({
    statusCode,
    success: false,
    data: null,
    ...data,
  });
}

export class BinderMiddleware {
  private constructor() {
    // * Private
  }

  static responseBinder: RequestHandler = (req, res, next) => {
    res._success = _success.bind(res);
    res._failed = _failed.bind(res);
    next();
  };
}
