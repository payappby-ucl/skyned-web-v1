"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.ContactUsSchema = common_1.CommonSchema.pick({
    email: true,
    phoneNumber: true,
}).extend({
    message: zod_1.z.string().trim().nonempty("Required"),
    name: zod_1.z.string().trim().nonempty("Required"),
    subject: zod_1.z.string().trim().nonempty("Required"),
});
