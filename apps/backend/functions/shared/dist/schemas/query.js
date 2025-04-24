"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageQuerySchema = void 0;
const zod_1 = require("zod");
exports.PageQuerySchema = zod_1.z.object({
    limit: zod_1.z
        .number()
        .int()
        .positive()
        .min(1, "A minimum of 1")
        .max(100, "A maximum of 100")
        .optional(),
    page: zod_1.z.number().int().positive().optional(),
});
