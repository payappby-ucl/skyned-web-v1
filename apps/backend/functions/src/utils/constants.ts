/* eslint-disable max-len */

/** Email domains users are not supposed to use because it belongs to internal staff */
export const PROHIBITED_USER_EMAIL_DOMAINS = [
  "skynedconsults.com",
  "unicollegelink.com",
];

/** Allowed time in minute, a generated token should be valid */
export const TOKEN_EXPIRY_IN_MINUTE = 10; // 10 Minute
