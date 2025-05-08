"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialMedia = exports.department = exports.gender = exports.DEFAULT_COUNTRY_CODE = exports.DEFAULT_PHONE_NUMBER_COUNTRY_CODE = exports.PROHIBITED_USER_EMAIL_DOMAINS = void 0;
/** Email domains users are not supposed to use because it belongs to internal staff */
exports.PROHIBITED_USER_EMAIL_DOMAINS = [
    "skynedconsults.com",
    "unicollegelink.com",
];
exports.DEFAULT_PHONE_NUMBER_COUNTRY_CODE = "+234";
exports.DEFAULT_COUNTRY_CODE = "NG";
/** Gender */
exports.gender = {
    Male: "Male",
    Female: "Female",
    Others: "Others",
};
/** Departments */
exports.department = {
    Executive: "Executive",
    Marketing: "Marketing",
    Admissions: "Admissions",
    Communications: "Communications",
    Technical: "Technical",
    Human_Resource: "Human_Resource",
    Quality_Assurance: "Quality_Assurance",
};
/** Social Media */
exports.socialMedia = {
    facebook: "facebook",
    instagram: "instagram",
    linkedin: "linkedin",
    x: "x",
    tiktok: "tiktok",
    pinterest: "pinterest",
};
