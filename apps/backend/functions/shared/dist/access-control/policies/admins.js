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
            return false;
        },
        update(authClaim, data) {
            return false;
        },
        create(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            const hasExecutiveDepartment = !!data?.departments?.find((dep) => dep.name === utils_1.department.Executive);
            const executiveDepartment = user.departments?.find((dep) => dep.name === utils_1.department.Executive);
            if (hasExecutiveDepartment &&
                (!executiveDepartment || executiveDepartment.leadId !== user.adminId)) {
                return false;
            }
            if (!(0, utils_1.isInDepartment)(user, [utils_1.department.Executive, utils_1.department.Human_Resource])) {
                return false;
            }
            return true;
        },
        delete() {
            return false;
        },
    },
};
