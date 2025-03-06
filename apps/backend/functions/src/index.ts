import "dotenv";
import { onRequest } from "firebase-functions/https";
import { app } from "./app";
import { SkynedUtils } from "./utils";

SkynedUtils.initializeFirebaseApp();

exports.api = onRequest({ timeoutSeconds: 3600 }, app.getApp());
