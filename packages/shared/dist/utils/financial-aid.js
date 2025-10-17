"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFinancialAidEligibility = void 0;
const inEligibleCitizenship = new Set([
    "IR", // Iran
    "SS", // South Sudan
    "SY", // Syria
    "CA", // Canada
]);
const mPowerInEligibleCitizenship = new Set([
    "CU", // Cuba
]);
const passageInEligibleCitizenship = new Set([
    "AF", // Afghanistan
    "BY", // Belarus
    "CF", // Central African Republic
    "CN", // China
    "ER", // Eritrea
    "HT", // Haiti
    "IQ", // Iraq
    "LB", // Lebanon
    "LY", // Libya
    "MD", // Moldova
    "MM", // Myanmar
    "KP", // North Korea
    "RU", // Russia
    "SO", // Somalia
    "SD", // Sudan
    "CD", // Democratic Republic of the Congo
    "UA", // Ukraine
    "VE", // Venezuela
    "YE", // Yemen
    // Europe Countries
    "AL", // Albania
    "AD", // Andorra
    "AM", // Armenia
    "AT", // Austria
    "AZ", // Azerbaijan
    "BY", // Belarus
    "BE", // Belgium
    "BA", // Bosnia and Herzegovina
    "BG", // Bulgaria
    "HR", // Croatia
    "CY", // Cyprus
    "CZ", // Czechia (Czech Republic)
    "DK", // Denmark
    "EE", // Estonia
    "FI", // Finland
    "FR", // France
    "GE", // Georgia
    "DE", // Germany
    "GR", // Greece
    "HU", // Hungary
    "IS", // Iceland
    "IE", // Ireland
    "IT", // Italy
    "KZ", // Kazakhstan*
    "XK", // Kosovo
    "LV", // Latvia
    "LI", // Liechtenstein
    "LT", // Lithuania
    "LU", // Luxembourg
    "MT", // Malta
    "MD", // Moldova
    "MC", // Monaco
    "ME", // Montenegro
    "NL", // Netherlands
    "MK", // North Macedonia
    "NO", // Norway
    "PL", // Poland
    "PT", // Portugal
    "RO", // Romania
    "RU", // Russia
    "SM", // San Marino
    "RS", // Serbia
    "SK", // Slovakia
    "SI", // Slovenia
    "ES", // Spain
    "SE", // Sweden
    "CH", // Switzerland
    "TR", // Türkiye (Turkey)
    "UA", // Ukraine
    "GB", // United Kingdom
    "VA", // Vatican City (Holy See)
]);
const inEligibilityResponse = {
    isEligible: false,
    message: "Unfortunately, based on your current details, you're not eligible for a loan from either MPOWER or Passage. This may be due to your country of origin, school, or program eligibility. Please contact our team for alternate support options.",
};
const computeFinancialAidEligibility = (program, data) => {
    let supportedPartners = [
        "mpower",
        "passage",
    ];
    // * Validate by program financial aid support
    if (!program.financialAids?.length ||
        inEligibleCitizenship.has(data.citizenship) ||
        data.canadianResident === "yes") {
        return inEligibilityResponse;
    }
    supportedPartners = supportedPartners.filter((partner) => program.financialAids.includes(partner));
    //   * Filter out passage and mpower ineligible citizenship
    if (passageInEligibleCitizenship.has(data.citizenship)) {
        supportedPartners = supportedPartners.filter((partner) => partner !== "passage");
    }
    if (mPowerInEligibleCitizenship.has(data.citizenship)) {
        supportedPartners = supportedPartners.filter((partner) => partner !== "mpower");
    }
    // * Mpower specific
    if (supportedPartners.includes("mpower")) {
        if (data.programStarted === "yes" && (!data.gpa || data.gpa < 2.5)) {
            supportedPartners = supportedPartners.filter((partner) => partner !== "mpower");
        }
        if (data.programStarted === "no" &&
            (!data.nextSchoolTerm ||
                data.nextSchoolTerm - Date.now() > 60 * 60 * 24 * 365 * 1000)) {
            supportedPartners = supportedPartners.filter((partner) => partner !== "mpower");
        }
    }
    // * Passage Specific
    if (supportedPartners.includes("passage")) {
        if (!program.pgwp) {
            supportedPartners = supportedPartners.filter((partner) => partner !== "passage");
        }
        if (data.loanType === "tuition" && data.livingExpensesCoverage === "no") {
            supportedPartners = supportedPartners.filter((partner) => partner !== "passage");
        }
    }
    // * Partner check
    if (!supportedPartners.length)
        return inEligibilityResponse;
    //  * Compute recommendation
    let recommendation = null;
    if (supportedPartners.length > 1) {
        if (!program.pgwp) {
            recommendation = "mpower";
        }
        else if (data.loanType === "tuition + living expenses") {
            recommendation = "passage";
        }
        else {
            recommendation === "mpower";
        }
    }
    return {
        isEligible: true,
        partners: supportedPartners,
        recommendation,
    };
};
exports.computeFinancialAidEligibility = computeFinancialAidEligibility;
