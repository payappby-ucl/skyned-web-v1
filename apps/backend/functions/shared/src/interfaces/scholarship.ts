import { AdminProfile } from "./admin";
import { IObject, ITimestamps } from "./utils";

export interface IScholarship extends ITimestamps {
  id: number;
  scholarshipId: string;

  title: string;
  slug: string;
  subtitle: string;
  banner: IObject;
  overview: string;
  description: string;
  category: string;
  featured: boolean;
  eligibilityRequirements: string[];
  active: boolean;

  createdById: string;
  createdBy: AdminProfile;
}
