"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseClient = void 0;
const auth_1 = require("./auth");
class FirebaseClient {
    static instance = null;
    auth;
    constructor(auth) {
        this.auth = new auth_1.FirebaseClientAuth(auth);
    }
    static factory(auth) {
        if (!FirebaseClient.instance) {
            FirebaseClient.instance = new FirebaseClient(auth);
        }
        return FirebaseClient.instance;
    }
}
exports.FirebaseClient = FirebaseClient;
