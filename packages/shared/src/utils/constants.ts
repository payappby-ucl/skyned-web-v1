/** Email domains users are not supposed to use because it belongs to internal staff */
export const PROHIBITED_USER_EMAIL_DOMAINS = [
  "skynedconsults.com",
  "unicollegelink.com",
];

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

/** Date and Time Default Format */
export const dateFormats = {
  dateAndTime: "MMM DD YYYY@hh:mma",
} as const;
