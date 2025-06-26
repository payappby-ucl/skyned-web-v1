import { AuthClaim, IProgram, ProgramSchema } from "@workspace/shared";
import { IQueryConstruct } from "../utils";

/** Represents program service */
export interface IProgramService {
  /** Create single program */
  createSingleProgram(
    adminId: string,
    schoolId: string,
    data: ProgramSchema,
  ): Promise<IProgram>;

  /** Create Bulk Programs */
  createBulkProgram(
    adminId: string,
    schoolId: string,
    data: ProgramSchema[],
  ): Promise<number>;

  /** Count Programs */
  count(
    query: Partial<IQueryConstruct<IProgram>>,
    authUser?: AuthClaim,
  ): Promise<number>;

  /** List programs */
  listPrograms(
    query: Partial<IQueryConstruct<IProgram>>,
    authUser?: AuthClaim,
  ): Promise<Partial<IProgram>[]>;

  /** Find unique program */
  findProgramBySlugAndSchoolId(
    schoolId: string,
    slug: string,
    authUser?: AuthClaim,
  ): Promise<IProgram | null>;
}
