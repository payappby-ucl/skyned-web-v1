"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandError = void 0;
const axios_1 = __importDefault(require("axios"));
__exportStar(require("./interface"), exports);
class BrandError {
    toast;
    constructor(toast) {
        this.toast = toast;
    }
    handleError = (error) => {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                const data = error.response.data;
                const statusCode = error.response.status || data.statusCode;
                return {
                    statusCode,
                    message: data.data.message,
                };
            }
            else if (error.request) {
                return {
                    statusCode: 503,
                    message: "Network error. Check your internet.",
                };
            }
            else if (error.code === "ECONNABORTED") {
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
    alertError = (error, header) => {
        const { message } = this.handleError(error);
        if (header) {
            this.toast.error(header, {
                description: message,
            });
        }
        else {
            this.toast.error(message);
        }
    };
}
exports.BrandError = BrandError;
