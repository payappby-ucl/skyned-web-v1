"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandApi = void 0;
const http_1 = require("./http");
const error_1 = require("./error");
const utils_1 = require("./utils");
const { toast } = require("@workspace/ui/lib/sonner");
class BrandApi {
    static instance = null;
    constructor() { }
    static factory() {
        if (!BrandApi.instance) {
            BrandApi.instance = new BrandApi();
        }
        return BrandApi.instance;
    }
    httpClient = new http_1.HTTPClientV1();
    toast = toast;
    error = new error_1.BrandError(this.toast);
    utils = new utils_1.Utils();
}
exports.BrandApi = BrandApi;
