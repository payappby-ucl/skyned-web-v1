import { rateLimit } from "express-rate-limit";
import {
  DEFAULT_RATE_LIMIT_MINUTE,
  REQUESTS_PER_DEFAULT_RATE_LIMIT_MINUTE,
} from "../utils";

/**
 * Handles Rate limiting to avoid API endpoint abuse
 *
 * @class
 */
export class RateLimiterMiddleware {
  /** The Limit middleware */

  static limit({
    minutes = DEFAULT_RATE_LIMIT_MINUTE,
    requestPerMinutes = REQUESTS_PER_DEFAULT_RATE_LIMIT_MINUTE,
  }: {
    minutes?: number;
    requestPerMinutes?: number;
  }) {
    return rateLimit({
      windowMs: minutes * 60 * 1000,
      limit: requestPerMinutes,
      legacyHeaders: false,
    });
  }
}
