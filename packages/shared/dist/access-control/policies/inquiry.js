"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquiryPolicies = void 0;
const utils_1 = require("../../utils");
exports.inquiryPolicies = {
    inquiries: {
        list(authClaim) {
            if (authClaim.claim !== "admin")
                return false;
            return true;
        },
        read(authClaim) {
            if (authClaim.claim !== "admin")
                return false;
            return true;
        },
        create(authClaim) {
            if (authClaim.claim === "admin")
                return false;
            return true;
        },
        update() {
            return false;
        },
        delete(authClaim) {
            if (authClaim.claim !== "admin")
                return false;
            const executiveDepartment = authClaim.user.departments?.find((dpt) => dpt.name === utils_1.department.Executive);
            if (!executiveDepartment)
                return false;
            return ((0, utils_1.isInDepartment)(authClaim.user, [utils_1.department.Executive]) &&
                authClaim.user.adminId === executiveDepartment.leadId);
        },
    },
};
