/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import { gender } from "@workspace/shared";
import { idGeneratorService } from "../services";
import { SkynedUtils } from "../utils";

export const adminPassword = SkynedUtils.isEnvironment(["test"])
  ? "12345678"
  : idGeneratorService.id(10);

export const admin = {
  adminId: "",
  email: SkynedUtils.isEnvironment(["dev", "test"])
    ? "admin@skynedconsults.com"
    : "info@skynedconsults.com",
  firstName: "Chinedu",
  lastName: "Okoronkwo",
  gender: gender.Male,
  nationality: "NG",
  countryOfResidence: "CA",
  jobTitle: "CEO/CO-founder",
};
