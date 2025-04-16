"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentPolicies = void 0;
exports.departmentPolicies = {
    departments: {
        list({ claim, user }) {
            if (claim === "student")
                return false;
            return true;
        },
        read({ claim, user }, data) {
            return true;
        },
        create({ claim, user }, data) {
            return true;
        },
    },
};
