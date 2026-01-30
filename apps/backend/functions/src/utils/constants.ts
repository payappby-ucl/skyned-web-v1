/* eslint-disable max-len */

import { IAdmin } from "@workspace/shared";

/** Email domains users are not supposed to use because it belongs to internal staff */
export const PROHIBITED_USER_EMAIL_DOMAINS = [
  "skynedconsults.com",
  "unicollegelink.com",
];

/** Allowed time in minute, a generated token should be valid */
export const TOKEN_EXPIRY_IN_MINUTE = 10; // 10 Minute

/** Default rate limit time in minute */
export const DEFAULT_RATE_LIMIT_MINUTE = 15;

/** Default requests per default rate limit minute */
export const REQUESTS_PER_DEFAULT_RATE_LIMIT_MINUTE = 5;

/** Query limit */
export const DEFAULT_QUERY_LIMIT = 100;

/** Admin Profile Keys */
export const adminProfileKeys: (keyof IAdmin)[] = [
  "adminId",
  "firstName",
  "lastName",
  "email",
  "jobTitle",
  "primaryImage",
  "phoneNumber",
  "gender",
];
