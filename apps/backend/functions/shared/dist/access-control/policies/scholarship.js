"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scholarshipPolicies = void 0;
const utils_1 = require("../../utils");
exports.scholarshipPolicies = {
    scholarships: {
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
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Marketing]);
        },
        update(authClaim, data, scholarship) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Marketing]);
        },
        delete(authClaim, scholarship) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Marketing]);
        },
        activate(authClaim, scholarship) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Marketing]);
        },
        deactivate(authClaim, scholarship) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return (0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Marketing]);
        },
    },
};
