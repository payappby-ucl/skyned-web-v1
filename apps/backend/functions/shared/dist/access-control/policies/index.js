"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policies = void 0;
const department_1 = require("./department");
const faq_1 = require("./faq");
exports.policies = {
    ...department_1.departmentPolicies,
    ...faq_1.faqPolicies,
};
