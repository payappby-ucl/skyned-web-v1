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
exports.Auth = void 0;
const auth_1 = require("firebase/auth");
const enums_1 = require("../../enums");
__exportStar(require("./interface"), exports);
class Auth {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    handleStateChange = (cb) => {
        this.auth.onAuthStateChanged((user) => cb(user), (error) => cb(null, error));
    };
    signInWithProvider = async (provider) => {
        switch (provider) {
            case enums_1.SignInProviderEnum.google:
                const provider = new auth_1.GoogleAuthProvider();
                (0, auth_1.signInWithPopup)(this.auth, provider);
                break;
            default:
                throw new Error("Provider is required");
        }
    };
    logout = async () => await (0, auth_1.signOut)(this.auth);
    getIdToken = async () => {
        const idToken = (await this.auth.currentUser?.getIdToken()) || null;
        return idToken;
    };
    login = async (email, password) => {
        await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
    };
}
exports.Auth = Auth;
