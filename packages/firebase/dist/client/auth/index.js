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
exports.FirebaseClientAuth = void 0;
const auth_1 = require("firebase/auth");
const shared_1 = require("@workspace/shared");
__exportStar(require("./interface"), exports);
class FirebaseClientAuth {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    listenForAuthStateChange = (cb) => {
        (0, auth_1.onAuthStateChanged)(this.auth, (user) => {
            cb(user);
        });
    };
    signInWithProvider = async (provider) => {
        switch (provider) {
            case shared_1.SignInProviderEnum.google:
                const provider = new auth_1.GoogleAuthProvider();
                (0, auth_1.signInWithPopup)(this.auth, provider);
                break;
            default:
                throw new Error("Provider is required");
        }
    };
    logout = async () => await (0, auth_1.signOut)(this.auth);
}
exports.FirebaseClientAuth = FirebaseClientAuth;
