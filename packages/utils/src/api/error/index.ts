import axios from "axios";
import { IBrandApi } from "../interface";
import { IError } from "./interface";
import { IFailedResponse } from "../../interfaces";

export * from "./interface";
export class BrandError implements IError {
  constructor(private toast: IBrandApi["toast"]) {}

  handleError: IError["handleError"] = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const data = error.response.data as IFailedResponse;
        const statusCode = error.response.status || data.statusCode;

        return {
          statusCode,
          message: data.message,
        };
      } else if (error.request) {
        return {
          statusCode: 503,
          message: "Network error. Check your internet.",
        };
      } else if (error.code === "ECONNABORTED") {
        return {
          statusCode: 408,
          message: "Request timed out. Please try again.",
        };
      }
    }

    return {
      statusCode: 500,
      message: "Server Error",
    };
  };

  alertError: IError["alertError"] = (error, header) => {
    const { message } = this.handleError(error);
    if (header) {
      this.toast.error(header, {
        description: message,
      });
    } else {
      this.toast.error(message);
    }
  };
}
