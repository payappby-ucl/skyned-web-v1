"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagPolicies = void 0;
exports.tagPolicies = {
    tags: {
        list(authClaim) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
        delete(authClaim, school) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
    },
};
