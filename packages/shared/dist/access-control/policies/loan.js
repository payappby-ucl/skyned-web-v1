"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanPolicies = void 0;
exports.loanPolicies = {
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
