"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const common_1 = require("./common");
/** Schema for user registration */
exports.RegisterSchema = common_1.CommonSchema.pick({
    email: true,
});
