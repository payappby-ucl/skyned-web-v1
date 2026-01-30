"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInDepartment = void 0;
__exportStar(require("./constants"), exports);
__exportStar(require("./education-level"), exports);
__exportStar(require("./degree-types"), exports);
__exportStar(require("./english-proficiency"), exports);
__exportStar(require("./financial-aid"), exports);
const isInDepartment = (admin, departments) => {
    return (admin.departments?.some((department) => departments.includes(department.name)) || false);
};
exports.isInDepartment = isInDepartment;
