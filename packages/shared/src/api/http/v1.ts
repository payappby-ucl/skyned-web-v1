import axios from "axios";
import { IHTTPClient } from "./interface";
import { ISuccessResponse } from "../../interfaces";
import { Exception } from "../../lib";

const baseURL = `${process.env.API_URL}/v1`;
const publicBaseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosHTTPClientV1 = axios.create({
  baseURL,
});

export class HTTPClientV1 implements IHTTPClient {
  axios = { v1: axiosHTTPClientV1 };

  private readonly handleFetchResponse = async (response: Response) => {
    if (!response.ok) {
      const statusCode = response.status;
      const statusText = response.statusText;
      let errorMessage = response.statusText;
      try {
        errorMessage = await response.text();
      } catch (_) {}

      let error = new Exception(errorMessage, statusCode, statusText);
      throw error;
    }
  };

  fetch = {
    v1: {
      get: async <T>(
        url: Parameters<IHTTPClient["fetch"]["v1"]["get"]>["0"],
        options: Parameters<IHTTPClient["fetch"]["v1"]["get"]>["1"],
      ) => {
        const request = new Request(`${publicBaseURL}${url}`, {
          method: "GET",
          cache: "no-store",
          ...options,
        });

        const response = await fetch(request);
        await this.handleFetchResponse(response);
        const data = (await response.json()) as ISuccessResponse<T>;
        return data;
      },

      post: async <T>(
        url: Parameters<IHTTPClient["fetch"]["v1"]["post"]>["0"],
        options: Parameters<IHTTPClient["fetch"]["v1"]["post"]>["1"],
      ) => {
        const request = new Request(`${publicBaseURL}${url}`, {
          method: "POST",
          cache: "no-store",
          ...options,
        });

        const response = await fetch(request);
        await this.handleFetchResponse(response);
        const data = (await response.json()) as ISuccessResponse<T>;
        return data;
      },

      put: async <T>(
        url: Parameters<IHTTPClient["fetch"]["v1"]["put"]>["0"],
        options: Parameters<IHTTPClient["fetch"]["v1"]["put"]>["1"],
      ) => {
        const request = new Request(`${publicBaseURL}${url}`, {
          method: "PUT",
          cache: "no-store",
          ...options,
        });

        const response = await fetch(request);
        await this.handleFetchResponse(response);
        const data = (await response.json()) as ISuccessResponse<T>;
        return data;
      },

      delete: async <T>(
        url: Parameters<IHTTPClient["fetch"]["v1"]["delete"]>["0"],
        options: Parameters<IHTTPClient["fetch"]["v1"]["delete"]>["1"],
      ) => {
        const request = new Request(`${publicBaseURL}${url}`, {
          method: "DELETE",
          cache: "no-store",
          ...options,
        });

        const response = await fetch(request);
        await this.handleFetchResponse(response);
        const data = (await response.json()) as ISuccessResponse<T>;
        return data;
      },
    },
  };
}
