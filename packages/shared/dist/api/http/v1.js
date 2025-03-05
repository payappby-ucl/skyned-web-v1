"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClientV1 = void 0;
const axios_1 = __importDefault(require("axios"));
const lib_1 = require("../../lib");
const baseURL = `${process.env.API_URL}/v1`;
const publicBaseURL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosHTTPClientV1 = axios_1.default.create({
    baseURL,
});
class HTTPClientV1 {
    axios = { v1: axiosHTTPClientV1 };
    handleFetchResponse = async (response) => {
        if (!response.ok) {
            const statusCode = response.status;
            const statusText = response.statusText;
            let errorMessage = response.statusText;
            try {
                errorMessage = await response.text();
            }
            catch (_) { }
            let error = new lib_1.Exception(errorMessage, statusCode, statusText);
            throw error;
        }
    };
    fetch = {
        v1: {
            get: async (url, options) => {
                const request = new Request(`${publicBaseURL}${url}`, {
                    method: "GET",
                    cache: "no-store",
                    ...options,
                });
                const response = await fetch(request);
                await this.handleFetchResponse(response);
                const data = (await response.json());
                return data;
            },
            post: async (url, options) => {
                const request = new Request(`${publicBaseURL}${url}`, {
                    method: "POST",
                    cache: "no-store",
                    ...options,
                });
                const response = await fetch(request);
                await this.handleFetchResponse(response);
                const data = (await response.json());
                return data;
            },
            put: async (url, options) => {
                const request = new Request(`${publicBaseURL}${url}`, {
                    method: "PUT",
                    cache: "no-store",
                    ...options,
                });
                const response = await fetch(request);
                await this.handleFetchResponse(response);
                const data = (await response.json());
                return data;
            },
            delete: async (url, options) => {
                const request = new Request(`${publicBaseURL}${url}`, {
                    method: "DELETE",
                    cache: "no-store",
                    ...options,
                });
                const response = await fetch(request);
                await this.handleFetchResponse(response);
                const data = (await response.json());
                return data;
            },
        },
    };
}
exports.HTTPClientV1 = HTTPClientV1;
