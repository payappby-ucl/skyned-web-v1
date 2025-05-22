"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intakePolicies = void 0;
exports.intakePolicies = {
    intakes: {
        list() {
            return true;
        },
        read() {
            return true;
        },
        create(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
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
