"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policies = void 0;
const accommodations_1 = require("./accommodations");
const admins_1 = require("./admins");
const blog_1 = require("./blog");
const category_1 = require("./category");
const department_1 = require("./department");
const faq_1 = require("./faq");
const inquiry_1 = require("./inquiry");
const intakes_1 = require("./intakes");
const programs_1 = require("./programs");
const scholarship_1 = require("./scholarship");
const schools_1 = require("./schools");
const tag_1 = require("./tag");
exports.policies = {
    ...department_1.departmentPolicies,
    ...faq_1.faqPolicies,
    ...inquiry_1.inquiryPolicies,
    ...admins_1.adminPolicies,
    ...schools_1.schoolPolicies,
    ...accommodations_1.accommodationPolicies,
    ...intakes_1.intakePolicies,
    ...programs_1.programPolicies,
    ...blog_1.blogPolicies,
    ...category_1.categoryPolicies,
    ...tag_1.tagPolicies,
    ...scholarship_1.scholarshipPolicies,
};
