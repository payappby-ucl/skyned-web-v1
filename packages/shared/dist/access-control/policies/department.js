"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentPolicies = void 0;
exports.departmentPolicies = {
    departments: {
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
        create(authClaim, data) {
            return true;
        },
    },
};
