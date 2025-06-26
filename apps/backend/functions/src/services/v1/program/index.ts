/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import { AuthClaim, IProgram } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { IProgramService, IQueryConstruct } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";
import {
  CreateProgramServiceSchema,
  CreateProgramsServiceSchema,
  UpdateProgramServiceSchema,
  UpdateProgramsServiceSchema,
} from "./schema";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { Prisma } from "../../../infrastructure/repository/prisma-client";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";

const generalData: (keyof IProgram)[] = [
  "applicationFee",
  "applicationFeeDiscount",
  "degreeType",
  "faculty",
  "name",
  "overview",
  "pgwp",
  "slug",
];

const authData: (keyof IProgram)[] = [
  ...generalData,
  "description",
  "minimumEducationDegree",
  "minimumEducationDegree",
  "minimumEducationLevel",
  "minimumEligibilityGpa",
  "englishProficiency",
  "minimumEnglishProficiencyScore",
  "timeframe",
  "duration",
  "tuitionFee",
  "tuitionFeeType",
];

const adminData: (keyof IProgram)[] = [
  ...authData,
  "id",
  "programId",
  "updatedAt",
  "createdAt",
  "createdById",
  "schoolId",
  "active",
];

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

  _constructWhereQuery(
    query: Partial<IQueryConstruct<IProgram>["where"]>,
    authUser?: AuthClaim,
  ) {
    const where: Prisma.ProgramWhereInput | undefined = {};
    const equalInput: (keyof typeof query)[] = [
      "schoolId",
      "degreeType",
      "pgwp",
      "slug",
      "timeframe",
      "englishProficiency",
      "minimumEducationLevel",
      "tuitionFeeType",
    ];

    const numberGreaterInput: (keyof typeof query)[] = [
      "applicationFeeDiscount",
      "minimumEligibilityGpa",
      "minimumEducationDegree",
      "minimumEnglishProficiencyScore",
    ];

    const numberLessInput: (keyof typeof query)[] = [
      "applicationFee",
      "tuitionFee",
      "duration",
    ];

    if (!authUser || authUser.claim !== "admin") {
      where.active = true;
    }

    if (query.name) {
      where.OR = [
        { name: { equals: query.name } },
        { name: { contains: query.name } },
      ];
    }

    if (query.faculty) {
      if (where.OR) {
        where.OR = [
          ...where.OR,
          { faculty: { equals: query.faculty } },
          { faculty: { contains: query.faculty } },
        ];
      } else {
        where.OR = [
          { faculty: { equals: query.faculty } },
          { faculty: { contains: query.faculty } },
        ];
      }
    }

    const queryKeys = Object.keys(query) as (keyof typeof query)[];

    const equalsKeys = queryKeys.filter((key) => equalInput.includes(key));
    if (equalsKeys.length) {
      queryKeys.forEach((key) => {
        where[key] = query[key];
      });
    }

    const greaterKeys = queryKeys.filter((key) =>
      numberGreaterInput.includes(key),
    );
    if (greaterKeys.length) {
      queryKeys.forEach((key) => {
        where[key] = {
          gte: query[key],
        };
      });
    }

    const lesserKeys = queryKeys.filter((key) => numberLessInput.includes(key));
    if (lesserKeys.length) {
      queryKeys.forEach((key) => {
        where[key] = {
          lte: query[key],
        };
      });
    }

    return where;
  }

  createSingleProgram: IProgramService["createSingleProgram"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    let {
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

    d = SkynedUtils.formatDecimal(d);

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

    return this.deserialize(program);
  };

  updateSingleProgram: IProgramService["updateSingleProgram"] = async (
    schoolId,
    slug,
    data,
  ) => {
    let {
      schoolId: sid,
      slug: slg,
      data: d,
    } = this.validationUtility.validateInput({
      schema: UpdateProgramServiceSchema,
      inputData: {
        data,
        schoolId,
        slug,
      },
    });

    d = SkynedUtils.formatDecimal(d);

    const program = await this.repository.db.program.update({
      where: {
        schoolId_slug: {
          schoolId: sid,
          slug: slg,
        },
      },
      data: {
        ...SkynedUtils.exclude(d, ["intakes"]),
        intakes: d.intakes?.length
          ? {
              connect: d.intakes.map((id) => ({ id, schoolId: sid })),
            }
          : undefined,
      },
    });

    return this.deserialize(program);
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
      d.map((d) => {
        d = SkynedUtils.formatDecimal(d);
        return this.repository.db.program.create({
          data: {
            schoolId: sid,
            createdById: aid,
            ...SkynedUtils.exclude(d, ["intakes"]),
            intakes: {
              connect: d.intakes.map((id) => ({ id, schoolId: sid })),
            },
          },
        });
      }),
    );

    return txResponse.length;
  };

  updateBulkProgram: IProgramService["updateBulkProgram"] = async (
    schoolId,
    data,
  ) => {
    const { schoolId: sid, data: d } = this.validationUtility.validateInput({
      schema: UpdateProgramsServiceSchema,
      inputData: {
        data,
        schoolId,
      },
    });

    const txResponse = await this.repository.db.$transaction(
      d.map((d) => {
        d.data = SkynedUtils.formatDecimal(d.data);

        return this.repository.db.program.update({
          where: {
            schoolId_slug: {
              schoolId: sid,
              slug: d.programSlug,
            },
          },
          data: {
            ...SkynedUtils.exclude(d.data, ["intakes", "name", "slug"]),
            intakes: d.data.intakes?.length
              ? {
                  connect: d.data.intakes.map((id) => ({ id, schoolId: sid })),
                }
              : undefined,
          },
        });
      }),
    );

    return txResponse.length;
  };

  count: IProgramService["count"] = async ({ where, from, to }, authUser) => {
    const whereConstruct = this._constructWhereQuery(
      where || { active: true },
      authUser,
    );

    const count = await this.repository.db.program.count({
      where: {
        ...whereConstruct,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
    });

    return count;
  };

  listPrograms: IProgramService["listPrograms"] = async (
    { skip, take, from, to, order, where },
    authUser,
  ) => {
    const whereConstruct = this._constructWhereQuery(
      where || { active: true },
      authUser,
    );

    const programs = await this.repository.db.program.findMany({
      skip,
      take,
      where: {
        ...whereConstruct,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      select: {
        ...SkynedUtils.select<
          Prisma.ProgramSelect<DefaultArgs>,
          keyof Prisma.ProgramSelect<DefaultArgs>
        >(
          !authUser
            ? generalData
            : authUser.claim === "admin"
              ? adminData
              : authData,
        ),

        school: {
          select: {
            slug: true,
            name: true,
            country: true,
            state: true,
            city: true,
            currency: true,
            logo: true,
          },
        },

        intakes:
          !authUser || authUser.claim !== "admin"
            ? {
                where: {
                  deadline: {
                    gte: new Date(),
                  },
                },
                select: SkynedUtils.select(["intake", "deadline", "startDate"]),
              }
            : {
                include: {
                  _count: true,
                },
              },

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,
      },
    });

    return programs.map((program) => this.deserialize(program));
  };

  findProgramBySlugAndSchoolId: IProgramService["findProgramBySlugAndSchoolId"] =
    async (schoolId, slug, authUser) => {
      const program = await this.repository.db.program.findUnique({
        where: {
          schoolId_slug: {
            schoolId,
            slug,
          },
        },
        select: {
          ...SkynedUtils.select<
            Prisma.ProgramSelect<DefaultArgs>,
            keyof Prisma.ProgramSelect<DefaultArgs>
          >(
            !authUser
              ? generalData
              : authUser.claim === "admin"
                ? adminData
                : authData,
          ),

          school: {
            select: {
              slug: true,
              name: true,
              country: true,
              state: true,
              city: true,
              currency: true,
              logo: true,
            },
          },

          intakes: {
            where:
              !authUser || authUser.claim !== "admin"
                ? {
                    deadline: {
                      gte: new Date(),
                    },
                  }
                : undefined,
            select:
              !authUser || authUser.claim !== "admin"
                ? SkynedUtils.select(["intake", "deadline", "startDate"])
                : undefined,
          },

          createdBy:
            authUser?.claim === "admin"
              ? {
                  select: SkynedUtils.select(adminProfileKeys),
                }
              : undefined,
        },
      });

      if (!program) return null;

      return this.deserialize(program);
    };
}

/** Concrete instance of {ProgramService} */
export const programService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PROGRAM_SERVICE,
  () => ProgramService.factory(),
);
