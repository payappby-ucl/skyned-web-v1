import { AuthClaim, CreateIntakeSchema, IIntake } from "@workspace/shared";
import { IQueryConstruct } from "..";
import { IntakeQuery } from "../../zod-schemas";

/** Represents intake service */
export interface IIntakeService {
  /** Creates an intake */
  createIntake(
    adminId: string,
    schoolId: string,
    data: CreateIntakeSchema,
  ): Promise<IIntake>;

  /** Creates many intakes */
  createManyIntakes(
    adminId: string,
    schoolId: string,
    data: CreateIntakeSchema[],
  ): Promise<number>;

  /** list intakes */
  listIntakes(
    query: Partial<IQueryConstruct<IIntake> & IntakeQuery>,
    authUser?: AuthClaim,
  ): Promise<IIntake[]>;

  /** list school intakes */
  listSchoolIntakes(
    query: Partial<IQueryConstruct<IIntake> & IntakeQuery>,
    schoolId: string,
    authUser?: AuthClaim,
  ): Promise<IIntake[]>;

  /** find Intake */
  findIntake(id: number, schoolId: string): Promise<IIntake | null>;

  /** Count Intake */
  count(
    query?: Partial<Pick<IQueryConstruct<IIntake>, "where">>,
  ): Promise<number>;

  /** update intake */
  updateIntake(id: number, data: CreateIntakeSchema): Promise<IIntake>;

  /** Finds all intakes due to close */
  findAllIntakesDueForClosure(): Promise<IIntake[]>;

  /** Close Intakes */
  closeIntakes(ids: number[]): Promise<void>;
}
