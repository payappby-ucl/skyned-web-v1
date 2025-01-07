import express from "express";
export interface IApp {
  getApp(): express.Application;
}
