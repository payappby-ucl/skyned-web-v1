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
exports.accessControl = exports.AccessControl = void 0;
const policies_1 = require("./policies");
__exportStar(require("./interfaces"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./policies"), exports);
class AccessControl {
    static instance = null;
    policies = policies_1.policies;
    constructor() { }
    static factory() {
        if (!AccessControl.instance) {
            AccessControl.instance = new AccessControl();
        }
        return AccessControl.instance;
    }
    role = (claims, authClaim) => {
        return claims.includes(authClaim.claim);
    };
    attribute = (auth, resourceName, action, ...args) => {
        const data = args[0];
        if (!resourceName ||
            !action ||
            !auth ||
            (!["list"].includes(action) && !data)) {
            return false;
        }
        const actionPolicy = this.policies?.[resourceName]?.[action];
        if (!actionPolicy)
            return false;
        if (typeof actionPolicy === "boolean")
            return actionPolicy;
        if (action === "create") {
            return actionPolicy(auth, data);
        }
        if (action === "list") {
            return actionPolicy(auth);
        }
        return actionPolicy(auth, data);
    };
}
exports.AccessControl = AccessControl;
exports.accessControl = AccessControl.factory();
