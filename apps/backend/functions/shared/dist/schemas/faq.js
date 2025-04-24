"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqSchema = void 0;
const zod_1 = require("zod");
exports.CreateFaqSchema = zod_1.z.object({
    question: zod_1.z.string().trim().nonempty("Required"),
    answer: zod_1.z.string().trim().nonempty("Required"),
});
