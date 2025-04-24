import { AccessControlType } from "../../access-control/types";
import { departmentPolicies } from "./department";
import { faqPolicies } from "./faq";

export const policies: AccessControlType = {
  ...departmentPolicies,
  ...faqPolicies,
};
