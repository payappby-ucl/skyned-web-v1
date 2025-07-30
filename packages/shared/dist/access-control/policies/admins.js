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
            return (0, utils_1.isInDepartment)(user, [
                utils_1.department.Executive,
                utils_1.department.Human_Resource,
            ]);
        },
        read(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            if (!data)
                return false;
            return (0, utils_1.isInDepartment)(user, [
                utils_1.department.Executive,
                utils_1.department.Human_Resource,
            ]);
        },
        update(authClaim, data, beneficiary) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            if (!(0, utils_1.isInDepartment)(user, [utils_1.department.Human_Resource, utils_1.department.Executive])) {
                return false;
            }
            if ((0, utils_1.isInDepartment)(beneficiary, [utils_1.department.Executive])) {
                const executiveDepartment = beneficiary.departments?.find((dep) => dep.name === utils_1.department.Executive);
                if (!(0, utils_1.isInDepartment)(user, [utils_1.department.Executive]))
                    return false;
                if (executiveDepartment?.leadId !== user.adminId)
                    return false;
            }
            else {
                if ((0, utils_1.isInDepartment)(beneficiary, [utils_1.department.Human_Resource])) {
                    if (user.adminId === beneficiary.adminId)
                        return false;
                    if ((0, utils_1.isInDepartment)(user, [utils_1.department.Human_Resource]) &&
                        beneficiary.departments?.find((dep) => dep.name === utils_1.department.Human_Resource)?.leadId !== user.adminId) {
                        return false;
                    }
                }
            }
            // TODO: Work here on data been sent
            return true;
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
        deactivate(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
        activate(authClaim, data) {
            if (!authClaim)
                return false;
            const { claim, user } = authClaim;
            if (claim !== "admin")
                return false;
            return true;
        },
    },
};
