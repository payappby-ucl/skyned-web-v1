/**
 * @author Beantech Designs <info@beantech.co>
 */

import { onRequest } from "firebase-functions/https";
import { app } from "./app";
import { SkynedUtils } from "./utils";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { cronJobs } from "./cron-jobs";

SkynedUtils.initializeFirebaseApp();

exports.api = onRequest({ timeoutSeconds: 3600, memory: "1GiB" }, app.getApp());
exports.midNightCronJobs = onSchedule(
  "every day 00:00",
  cronJobs.midNightCronJobs,
);
