import { IProgram } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { IProgramService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";
import {
  CreateProgramServiceSchema,
  CreateProgramsServiceSchema,
} from "./schema";
import { SkynedUtils } from "../../../utils";

// const generalData: (keyof IProgram)[] = [
//   "applicationFee",
//   "applicationFeeDiscount",
//   "degreeType",
//   "faculty",
//   "name",
//   "overview",
//   "tuitionFee",
//   "tuitionFeeType",
//   "slug",
//   "englishProficiency",
//   "minimumEnglishProficiencyScore",
//   "minimumEducationDegree",
//   "minimumEducationLevel",
// ];

// const authData: (keyof IProgram)[] = [];

// const adminData: (keyof IProgram)[] = [
//   ...generalData,
//   ...authData,
//   "id",
//   "programId",
// ];

/** Concrete implementation of IProgramService */

export class ProgramService extends ServiceUtils implements IProgramService {
  private static instance: IProgramService | null = null;
  private constructor() {
    super();
  }

  /** Factory for instance creation */

  static factory() {
    if (!ProgramService.instance) {
      ProgramService.instance = new ProgramService();
    }

    return ProgramService.instance;
  }

  createSingleProgram: IProgramService["createSingleProgram"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    const {
      adminId: aid,
      schoolId: sid,
      data: d,
    } = this.validationUtility.validateInput({
      schema: CreateProgramServiceSchema,
      inputData: {
        data,
        adminId,
        schoolId,
      },
    });

    const program = await this.repository.db.program.create({
      data: {
        schoolId: sid,
        createdById: aid,
        ...SkynedUtils.exclude(d, ["intakes"]),
        intakes: {
          connect: d.intakes.map((id) => ({ id, schoolId: sid })),
        },
      },
      include: {
        intakes: true,
      },
    });

    return program as unknown as IProgram;
  };

  createBulkProgram: IProgramService["createBulkProgram"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    const {
      adminId: aid,
      schoolId: sid,
      data: d,
    } = this.validationUtility.validateInput({
      schema: CreateProgramsServiceSchema,
      inputData: {
        data,
        adminId,
        schoolId,
      },
    });

    const txResponse = await this.repository.db.$transaction(
      d.map((d) =>
        this.repository.db.program.create({
          data: {
            schoolId: sid,
            createdById: aid,
            ...SkynedUtils.exclude(d, ["intakes"]),
            intakes: {
              connect: d.intakes.map((id) => ({ id, schoolId: sid })),
            },
          },
        }),
      ),
    );

    return txResponse.length;
  };
}

/** Concrete instance of {ProgramService} */
export const programService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PROGRAM_SERVICE,
  () => ProgramService.factory(),
);
