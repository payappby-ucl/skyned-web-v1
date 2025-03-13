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
exports.BrandClientApi = void 0;
const auth_1 = require("./auth");
const utils_1 = require("./utils");
const http_1 = require("./http");
__exportStar(require("./interface"), exports);
class BrandClientApi {
    static instance = null;
    auth;
    utils;
    httpClient;
    constructor(auth, toast, environment) {
        this.auth = new auth_1.Auth(auth);
        this.utils = new utils_1.Utils(toast);
        this.httpClient = new http_1.ClientHttp(this.auth, environment);
    }
    static factory({ auth, toast, environment }) {
        if (!BrandClientApi.instance) {
            BrandClientApi.instance = new BrandClientApi(auth, toast, environment);
        }
        return BrandClientApi.instance;
    }
}
exports.BrandClientApi = BrandClientApi;
