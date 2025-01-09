import "dotenv";
import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/https";
import { app } from "./app";
admin.initializeApp();

exports.api = onRequest({ timeoutSeconds: 3600 }, app.getApp());
