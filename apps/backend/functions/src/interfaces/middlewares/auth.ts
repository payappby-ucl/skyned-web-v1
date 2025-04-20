import { AuthClaim } from "@workspace/shared";
import { RequestHandler } from "express";

/**
 * Represents Authentication Middleware
 */
export interface IAuthMiddleware {
  authenticate: RequestHandler;
  hasRole(roles: AuthClaim["claim"][]): RequestHandler;
}
