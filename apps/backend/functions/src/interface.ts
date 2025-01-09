import express, { Router } from "express";
export interface IApp {
  getApp(): express.Application;
}

export interface IRouter {
  router: Router;
}
