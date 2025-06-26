"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeframe = exports.tuitionFeeType = exports.currencies = exports.ownershipType = exports.institutionType = exports.socialMedia = exports.department = exports.gender = exports.DEFAULT_COUNTRY_CODE = exports.DEFAULT_PHONE_NUMBER_COUNTRY_CODE = exports.PROHIBITED_USER_EMAIL_DOMAINS = void 0;
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
/** Institution Type */
exports.institutionType = {
    university: "university",
    college: "college",
};
/** Ownership Type */
exports.ownershipType = {
    private: "private",
    public: "public",
};
/** Currency */
exports.currencies = {
    USD: "USD",
    CAD: "CAD",
    AUD: "AUD",
    NGN: "NGN",
    EUR: "EUR",
    GBP: "GBP",
};
/** Tuition Fee Type */
exports.tuitionFeeType = ["per_year", "per_semester", "full"];
/** Program timeframe */
exports.timeframe = ["day", "week", "month", "year"];
