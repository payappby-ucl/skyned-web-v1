import { AccessControlType } from "../../access-control/types";
import { accommodationPolicies } from "./accommodations";
import { adminPolicies } from "./admins";
import { departmentPolicies } from "./department";
import { faqPolicies } from "./faq";
import { inquiryPolicies } from "./inquiry";
import { intakePolicies } from "./intakes";
import { schoolPolicies } from "./schools";

export const policies: AccessControlType = {
  ...departmentPolicies,
  ...faqPolicies,
  ...inquiryPolicies,
  ...adminPolicies,
  ...schoolPolicies,
  ...accommodationPolicies,
  ...intakePolicies,
};
