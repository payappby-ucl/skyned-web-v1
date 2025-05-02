"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCreationSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** Schema for user registration */
exports.RegisterSchema = common_1.CommonSchema.pick({
    email: true,
});
/** Schema for user account creation */
exports.AccountCreationSchema = common_1.CommonSchema.pick({
    email: true,
}).extend({
    password: zod_1.z.string().trim().min(8, "A minimum of 8 characters"),
});
