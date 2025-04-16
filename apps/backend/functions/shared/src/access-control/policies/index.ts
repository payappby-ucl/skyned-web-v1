import { AccessControlType } from "../../access-control/types";
import { departmentPolicies } from "./department";

export const policies: AccessControlType = {
  ...departmentPolicies,
};
