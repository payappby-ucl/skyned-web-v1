"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIntakeSchema = void 0;
const zod_1 = require("zod");
exports.CreateIntakeSchema = zod_1.z.object({
    intake: zod_1.z.coerce.number().positive().int(),
    startDate: zod_1.z.coerce.number().positive().int(),
    deadline: zod_1.z.coerce.number().positive().int(),
});
