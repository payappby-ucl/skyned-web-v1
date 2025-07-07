import {
  AuthClaim,
  IProgram,
  ProgramSchema,
  UpdateBulkProgramSchema,
} from "@workspace/shared";
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

  /** Update single program  */
  updateSingleProgram(
    schoolId: string,
    slug: string,
    programId: string,
    data: Partial<ProgramSchema>,
  ): Promise<IProgram>;

  /** Update bulk program */
  updateBulkProgram(
    schoolId: string,
    data: UpdateBulkProgramSchema["data"],
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

  /** Disconnect intakes */
  disconnectIntakes(
    schoolId: string,
    slug: string,
    intakes: number[],
  ): Promise<IProgram>;

  /** Connect intakes */
  connectIntakes(
    schoolId: string,
    slug: string,
    intakes: number[],
  ): Promise<IProgram>;
}
