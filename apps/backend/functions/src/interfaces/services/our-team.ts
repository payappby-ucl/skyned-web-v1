import { IAdmin } from "@workspace/shared";
/** Represents Our team service */
export interface IOurTeamService {
  /** Gets all team members info */
  getOurTeam(
    limit?: number,
  ): Promise<
    Pick<
      IAdmin,
      | "primaryImage"
      | "secondaryImage"
      | "firstName"
      | "lastName"
      | "jobTitle"
      | "socials"
      | "about"
      | "email"
    >[]
  >;
}
