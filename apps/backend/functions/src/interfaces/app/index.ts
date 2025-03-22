import express, { Router } from "express";

/**
 * Represents the interface for which app class is programed
 */
export interface IApp {
  /**
   * Get server instance
   */
  getApp(): express.Application;
}

/**
 * Represents interface for which all routers are programmed to
 */
export interface IRouter {
  /** The router instance */
  router: Router;
}

export * from "./token";
