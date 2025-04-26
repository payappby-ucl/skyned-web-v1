"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
// import { PROHIBITED_USER_EMAIL_DOMAINS } from "../utils";
exports.ContactUsSchema = common_1.CommonSchema.pick({
    phoneNumber: true,
}).extend({
    email: common_1.CommonSchema.shape.email,
    // .refine(
    //   (val) =>
    //     !PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) =>
    //       val.endsWith(emailDomain),
    //     ),
    //   "This email is not accepted.",
    // ),
    message: zod_1.z.string().trim().nonempty("Required"),
    name: zod_1.z.string().trim().nonempty("Required"),
    subject: zod_1.z.string().trim().nonempty("Required"),
});
