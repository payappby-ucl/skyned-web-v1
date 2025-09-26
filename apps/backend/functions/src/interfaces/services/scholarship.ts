import { AuthClaim, IScholarship } from "@workspace/shared";
import { ScholarshipQuerySchema } from "../../zod-schemas";
import { IQueryConstruct } from "../utils";
import { Prisma } from "../../infrastructure/repository/prisma-client";

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

  /** Count Scholarships */
  count(
    query: Partial<
      IQueryConstruct<Pick<ScholarshipQuerySchema, "category" | "featured">>
    >,
    authUser?: AuthClaim,
  ): Promise<number>;

  /** List Scholarships */
  listScholarships(
    query: Partial<
      IQueryConstruct<Pick<ScholarshipQuerySchema, "category" | "featured">>
    >,
    authUser?: AuthClaim,
  ): Promise<IScholarship[]>;

  /** Deletes Scholarship */
  delete(slug: string): Promise<IScholarship>;

  /** Update Scholarship */
  update(
    slug: string,
    data: Prisma.ScholarshipUpdateInput,
  ): Promise<IScholarship>;

  /** Get Summary */
  getSummary(): Promise<
    {
      category: string;
      _count: {
        _all: number;
      };
    }[]
  >;
}
