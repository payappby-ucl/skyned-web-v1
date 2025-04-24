"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPolicies = void 0;
const utils_1 = require("../../utils");
exports.adminPolicies = {
    admins: {
        list(authClaim) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive]);
        },
        read(authClaim, data) {
            return true;
        },
        update(authClaim, data) {
            return true;
        },
        create(authClaim, data) {
            return true;
        },
        delete() {
            return false;
        },
    },
};
