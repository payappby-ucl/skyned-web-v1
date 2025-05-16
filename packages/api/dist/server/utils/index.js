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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUtils = void 0;
__exportStar(require("./interface"), exports);
class ServerUtils {
    createServerActionError = (error) => {
        return {
            success: false,
            message: error?.data?.message ||
                "Something went wrong, Please check your connection and try again.",
        };
        // return new Error(error?.data?.message || "", {
        //   cause: {
        //     statusCode: error.statusCode,
        //     success: false,
        //     data: error.data,
        //   },
        // });
    };
    constructQuery = (data) => {
        const queries = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                queries.append(key, value);
            }
        });
        return queries;
    };
    constructTags = (data, base) => {
        Object.entries(data).forEach(([key, { value, prefix }]) => {
            if (value) {
                base.push(`${prefix}-${value}`);
            }
        });
        return base;
    };
}
exports.ServerUtils = ServerUtils;
