"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccommodationSchema = void 0;
const zod_1 = require("zod");
exports.CreateAccommodationSchema = zod_1.z.object({
    description: zod_1.z.string().trim().nonempty("Required"),
});
