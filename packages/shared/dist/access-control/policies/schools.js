"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolPolicies = void 0;
exports.schoolPolicies = {
    schools: {
        list(authClaim) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
        read(authClaim, data) {
            return true;
        },
        create() {
            return true;
        },
        update() {
            return true;
        },
        delete() {
            return true;
        },
    },
};
