"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentPolicies = void 0;
const utils_1 = require("../../utils");
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
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            const department = user.departments?.find((department) => department.name === data.name);
            if ((0, utils_1.isInDepartment)(user, ["Executive", "Human_Resource"]))
                return true;
            if (department?.leadId === user.adminId)
                return true;
            return false;
        },
        create() {
            return false;
        },
        update() {
            return false;
        },
        delete() {
            return false;
        },
    },
};
