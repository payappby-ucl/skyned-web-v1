import { IProgram, ProgramSchema } from "@workspace/shared";

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
}
