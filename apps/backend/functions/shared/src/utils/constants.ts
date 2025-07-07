/** Email domains users are not supposed to use because it belongs to internal staff */
export const PROHIBITED_USER_EMAIL_DOMAINS = [
  "skynedconsults.com",
  "unicollegelink.com",
];

export const DEFAULT_PHONE_NUMBER_COUNTRY_CODE = "+234";
export const DEFAULT_COUNTRY_CODE = "NG";

/** Gender */
export const gender = {
  Male: "Male",
  Female: "Female",
  Others: "Others",
} as const;

/** Departments */
export const department = {
  Executive: "Executive",
  Marketing: "Marketing",
  Admissions: "Admissions",
  Communications: "Communications",
  Technical: "Technical",
  Human_Resource: "Human_Resource",
  Quality_Assurance: "Quality_Assurance",
} as const;

/** Social Media */
export const socialMedia = {
  facebook: "facebook",
  instagram: "instagram",
  linkedin: "linkedin",
  x: "x",
  tiktok: "tiktok",
  pinterest: "pinterest",
} as const;

/** Institution Type */
export const institutionType = {
  university: "university",
  college: "college",
} as const;

/** Ownership Type */
export const ownershipType = {
  private: "private",
  public: "public",
} as const;

/** Currency */
export const currencies = {
  USD: "USD",
  CAD: "CAD",
  AUD: "AUD",
  NGN: "NGN",
  EUR: "EUR",
  GBP: "GBP",
} as const;

/** Tuition Fee Type */
export const tuitionFeeType = ["per_year", "per_semester", "full"] as const;

/** Program timeframe */
export const timeframe = ["day", "week", "month", "year"] as const;

/** Intake Status */
export const intakeStatus = ["open", "closed", "likely_open"] as const;

/** Blog Post Status */
export const blogPostStatus = [
  "draft",
  "scheduled",
  "published",
  "unpublished",
] as const;
