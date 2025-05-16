"use client";
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
exports.Utils = void 0;
__exportStar(require("./interface"), exports);
class Utils {
    constructor(toast) {
        this.toast = toast;
    }
    toast;
    handleError = (error) => {
        if (error?.name === "FirebaseError") {
            switch (error.code) {
                // * Auth Errors
                case "auth/email-already-exists":
                    return "Email address already exist.";
                case "auth/insufficient-permission":
                    return "Permission Denied";
                case "auth/invalid-email":
                    return "Invalid email address";
                case "auth/invalid-password":
                    return "Password must be at least 6 charaters";
                case "auth/user-not-found":
                case "auth/wrong-password":
                    return "Email / password not correct.";
                case "auth/invalid-login-credentials":
                    return "Email / password not correct.";
                case "auth/invalid-credential":
                    return "Email / password not correct.";
                case "auth/user-disabled":
                    return "Error: Your account may have been suspended. Please contact support";
                case "auth/too-many-requests":
                    return "Access to this account has been temporarily disabled due to many failed login attempts.";
                case "auth/network-request-failed":
                    return "A network error has occurred, please try again.";
                case "auth/internal-error":
                    return "Please verify your email address";
                default:
                    return "Oops! something went wrong please try again.";
            }
        }
        return (error?.data?.message ||
            error?.message ||
            "Oops! something went wrong please try again.");
    };
    alertError = (err) => {
        this.toast.error(this.handleError(err));
    };
    handleServerActionResponse = (data) => {
        if (data.success === false) {
            throw new Error(data.message);
        }
        return data.data;
    };
    pick = (data, properties) => {
        const entries = Object.entries(data);
        const result = Object.fromEntries(entries.filter(([key]) => properties.includes(key)));
        return result;
    };
    exclude = (data, properties) => {
        const entries = Object.entries(data);
        const result = Object.fromEntries(entries.filter(([key]) => !properties.includes(key)));
        return result;
    };
    copyToClipboard = (text, alertMessage) => {
        navigator.clipboard.writeText(text);
        this.toast.info(`${alertMessage || text} copied to clipboard.`);
    };
}
exports.Utils = Utils;
