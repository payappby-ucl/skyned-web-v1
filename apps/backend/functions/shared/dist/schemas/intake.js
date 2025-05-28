"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIntakeSchema = void 0;
const zod_1 = require("zod");
exports.CreateIntakeSchema = zod_1.z.object({
    intake: zod_1.z
        .string()
        .nonempty("Required")
        .refine((val) => !!val.match(/\b(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s\d{4}\b/g), "Enter a valid intake"),
    startDate: zod_1.z.coerce.number().positive().int(),
    deadline: zod_1.z.coerce.number().positive().int(),
});
