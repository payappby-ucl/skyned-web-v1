import { AuthClaim, IScholarship } from "@workspace/shared";

export interface IScholarshipService {
  /** Find scholarship by slug */
  findBySlug(slug: string, authUser?: AuthClaim): Promise<IScholarship | null>;

  /** Creates a scholarship */
  create(
    data: Pick<
      IScholarship,
      | "banner"
      | "category"
      | "title"
      | "slug"
      | "subtitle"
      | "description"
      | "featured"
      | "eligibilityRequirements"
      | "overview"
    >,
    authUser: Extract<AuthClaim, { claim: "admin" }>,
  ): Promise<IScholarship>;
}
