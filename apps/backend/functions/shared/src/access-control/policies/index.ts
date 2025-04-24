import { AccessControlType } from "../../access-control/types";
import { adminPolicies } from "./admins";
import { departmentPolicies } from "./department";
import { faqPolicies } from "./faq";
import { inquiryPolicies } from "./inquiry";

export const policies: AccessControlType = {
  ...departmentPolicies,
  ...faqPolicies,
  ...inquiryPolicies,
  ...adminPolicies,
};
