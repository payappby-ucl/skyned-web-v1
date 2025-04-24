"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqPolicies = void 0;
const utils_1 = require("../../utils");
exports.faqPolicies = {
    faqs: {
        list() {
            return true;
        },
        read(authClaim) {
            if (authClaim.claim !== "admin")
                return false;
            return true;
        },
        create(authClaim, data) {
            if (authClaim.claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(authClaim.user, [utils_1.department.Executive]);
        },
        update(authClaim, data) {
            if (authClaim.claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(authClaim.user, [utils_1.department.Executive]);
        },
        delete(authClaim, data) {
            if (authClaim.claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(authClaim.user, [utils_1.department.Executive]);
        },
    },
};
