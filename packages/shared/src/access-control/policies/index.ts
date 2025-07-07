import { AccessControlType } from "../../access-control/types";
import { accommodationPolicies } from "./accommodations";
import { adminPolicies } from "./admins";
import { blogPolicies } from "./blog";
import { departmentPolicies } from "./department";
import { faqPolicies } from "./faq";
import { inquiryPolicies } from "./inquiry";
import { intakePolicies } from "./intakes";
import { programPolicies } from "./programs";
import { schoolPolicies } from "./schools";

export const policies: AccessControlType = {
  ...departmentPolicies,
  ...faqPolicies,
  ...inquiryPolicies,
  ...adminPolicies,
  ...schoolPolicies,
  ...accommodationPolicies,
  ...intakePolicies,
  ...programPolicies,
  ...blogPolicies,
};
