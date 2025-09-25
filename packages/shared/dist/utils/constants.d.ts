/** Email domains users are not supposed to use because it belongs to internal staff */
export declare const PROHIBITED_USER_EMAIL_DOMAINS: string[];
export declare const DEFAULT_PHONE_NUMBER_COUNTRY_CODE = "+234";
export declare const DEFAULT_COUNTRY_CODE = "NG";
/** Gender */
export declare const gender: {
    readonly Male: "Male";
    readonly Female: "Female";
    readonly Others: "Others";
};
/** Departments */
export declare const department: {
    readonly Executive: "Executive";
    readonly Marketing: "Marketing";
    readonly Admissions: "Admissions";
    readonly Communications: "Communications";
    readonly Technical: "Technical";
    readonly Human_Resource: "Human_Resource";
    readonly Quality_Assurance: "Quality_Assurance";
};
/** Social Media */
export declare const socialMedia: {
    readonly facebook: "facebook";
    readonly instagram: "instagram";
    readonly linkedin: "linkedin";
    readonly x: "x";
    readonly tiktok: "tiktok";
    readonly pinterest: "pinterest";
};
/** Institution Type */
export declare const institutionType: {
    readonly university: "university";
    readonly college: "college";
};
/** Ownership Type */
export declare const ownershipType: {
    readonly private: "private";
    readonly public: "public";
};
/** Currency */
export declare const currencies: {
    readonly USD: "USD";
    readonly CAD: "CAD";
    readonly AUD: "AUD";
    readonly NGN: "NGN";
    readonly EUR: "EUR";
    readonly GBP: "GBP";
};
/** Tuition Fee Type */
export declare const tuitionFeeType: readonly ["per_year", "per_semester", "full"];
/** Program timeframe */
export declare const timeframe: readonly ["day", "week", "month", "year"];
/** Intake Status */
export declare const intakeStatus: readonly ["open", "closed", "likely_open"];
/** Financial Aids */
export declare const financialAids: readonly ["mpower", "passage"];
/** Blog Post Status */
export declare const blogPostStatus: readonly ["draft", "scheduled", "published", "unpublished"];
/** Highest Level Of Education */
export declare const highestLevelOfEducation: readonly ["Bachelor's Degree", "Secondary School Diploma", "Master's Degree", "Highest National Diploma", "Ordinary National Diploma", "Others"];
