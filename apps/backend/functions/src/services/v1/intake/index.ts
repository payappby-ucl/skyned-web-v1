/* eslint-disable operator-linebreak */
import { RegistryKeysEnum } from "../../../enum";
import { IIntakeService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";
import {
  CreateIntakeServiceSchema,
  CreateManyIntakeServiceSchema,
} from "./schema";

/** Concrete implementation */

export class IntakeService extends ServiceUtils implements IIntakeService {
  private static instance: IIntakeService | null = null;
  private constructor() {
    super();
  }

  /** Factory for instance creation */

  static factory() {
    if (!IntakeService.instance) {
      IntakeService.instance = new IntakeService();
    }

    return IntakeService.instance;
  }

  createIntake: IIntakeService["createIntake"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    const {
      adminId: aid,
      schoolId: sid,
      data: input,
    } = this.validationUtility.validateInput({
      schema: CreateIntakeServiceSchema,
      inputData: {
        adminId,
        schoolId,
        data,
      },
    });

    const intake = await this.repository.intake.create({
      data: {
        createdById: aid,
        schoolId: sid,
        intake: input.intake,
        startDate: new Date(input.startDate),
        deadline: new Date(input.deadline),
      },
    });

    return intake;
  };

  createManyIntakes: IIntakeService["createManyIntakes"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    const {
      adminId: aid,
      schoolId: sid,
      data: input,
    } = this.validationUtility.validateInput({
      schema: CreateManyIntakeServiceSchema,
      inputData: {
        adminId,
        schoolId,
        data,
      },
    });

    const res = await this.repository.intake.createMany({
      data: input.map((input) => ({
        createdById: aid,
        schoolId: sid,
        intake: input.intake,
        startDate: new Date(input.startDate),
        deadline: new Date(input.deadline),
      })),
      skipDuplicates: true,
    });

    return res.count;
  };

  findIntake: IIntakeService["findIntake"] = async (id, schoolId) => {
    const validatedData = this.validationUtility.validateInput({
      schema: CreateIntakeServiceSchema.pick({
        schoolId: true,
      }).merge(IdSchema),
      inputData: {
        id,
        schoolId,
      },
    });

    const intake = await this.repository.intake.findUnique({
      where: {
        id: validatedData.id,
        schoolId: validatedData.schoolId,
      },
    });

    return intake;
  };

  count: IIntakeService["count"] = async (query) => {
    const count = await this.repository.intake.count({
      where: query?.where || undefined,
    });

    return count;
  };

  listIntakes: IIntakeService["listIntakes"] = async (
    { skip, take, from, to, order, where, status },
    authUser,
  ) => {
    const intakes = await this.repository.intake.findMany({
      skip,
      take,
      where: status
        ? {
            deadline: {
              gte: new Date(),
            },
          }
        : {
            createdAt: {
              gte: from,
              lte: to,
            },
          },
      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      include:
        authUser?.claim === "admin"
          ? {
              school: {
                select: SkynedUtils.select([
                  "slug",
                  "name",
                  "country",
                  "state",
                  "logo",
                  "schoolImage",
                ]),
              },

              createdBy: {
                select: SkynedUtils.select(adminProfileKeys),
              },

              programs: {
                select: {
                  _count: true,
                },
              },
            }
          : undefined,

      select:
        authUser?.claim !== "admin"
          ? {
              ...SkynedUtils.select(["intake", "deadline", "startDate"]),
            }
          : undefined,
    });

    return intakes.map((intake) => this.deserialize(intake));
  };

  listSchoolIntakes: IIntakeService["listSchoolIntakes"] = async (
    { skip, take, from, to, order, where, status },
    schoolId,
    authUser,
  ) => {
    const intakes = await this.repository.intake.findMany({
      skip,
      take,
      where: status
        ? {
            schoolId,
            deadline: {
              gte: new Date(),
            },
          }
        : {
            schoolId,
            createdAt: {
              gte: from,
              lte: to,
            },
          },
      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      include:
        authUser?.claim === "admin"
          ? {
              school: {
                select: SkynedUtils.select([
                  "slug",
                  "name",
                  "country",
                  "state",
                  "logo",
                  "schoolImage",
                ]),
              },

              createdBy: {
                select: SkynedUtils.select(adminProfileKeys),
              },
            }
          : undefined,

      select:
        authUser?.claim !== "admin"
          ? {
              ...SkynedUtils.select(["intake", "deadline", "startDate"]),
            }
          : undefined,
    });

    return intakes.map((intake) => this.deserialize(intake));
  };

  updateIntake: IIntakeService["updateIntake"] = async (id, data) => {
    const { id: iid, data: input } = this.validationUtility.validateInput({
      schema: CreateIntakeServiceSchema.pick({
        data: true,
      }).merge(IdSchema),
      inputData: {
        id,
        data,
      },
    });

    const intake = await this.repository.intake.update({
      where: {
        id: iid,
      },
      data: {
        intake: input.intake,
        startDate: new Date(input.startDate),
        deadline: new Date(input.deadline),
      },
    });

    return intake;
  };
}

/** Concrete instance of {IntakeService} */
export const intakeService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.INTAKE_SERVICE,
  () => IntakeService.factory(),
);
