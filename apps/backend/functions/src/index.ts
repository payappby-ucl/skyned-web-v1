/**
 * @author Beantech Designs <info@beantech.co>
 */

// eslint-disable-next-line space-before-function-paren
(BigInt.prototype as any).toJSON = function () {
  return Number.parseInt(this.toString()) ?? this.toString();
};

import { onRequest } from "firebase-functions/https";
import { app } from "./app";
import { SkynedUtils } from "./utils";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onMessagePublished } from "firebase-functions/v2/pubsub";
import { cronJobs } from "./cron-jobs";
import { EventsEnum } from "./enum";
import { subscriber } from "./subscribers";

SkynedUtils.initializeFirebaseApp();

// * APP
exports.api = onRequest({ timeoutSeconds: 3600, memory: "1GiB" }, app.getApp());

// * CRON JOBS
exports.midNightCronJobs = onSchedule(
  {
    schedule: "every day 00:00",
    retryCount: 1,
  },
  cronJobs.midNightCronJobs,
);

exports.fiveMinPastMidNightCronJobs = onSchedule(
  {
    schedule: "5 0 * * *",
    memory: "1GiB",
    retryCount: 3,
  },
  cronJobs.fiveMinPastMidNight,
);

// * PUB/SUBs
exports.sendMailSubscriber = onMessagePublished(
  EventsEnum.SEND_EMAIL_EVENT,
  subscriber.sendMail,
);

exports.marketingSubscriber = onMessagePublished(
  EventsEnum.CREATE_MARKETING_CONTACT_EVENT,
  subscriber.createContactForMarketing,
);

exports.activityLogSubscriber = onMessagePublished(
  EventsEnum.CREATE_ACTIVITY_LOG,
  subscriber.createActivityLog,
);
