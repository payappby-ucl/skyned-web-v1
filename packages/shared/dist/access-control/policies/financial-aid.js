"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financialAidPolicies = void 0;
exports.financialAidPolicies = {
    loans: {
        list(authClaim) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
        read(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
        create(authClaim, data) {
            if (authClaim && authClaim.claim === "admin")
                return false;
            return true;
        },
        update(authClaim, data, school) {
            return false;
        },
        delete(authClaim, school) {
            return false;
        },
    },
};
