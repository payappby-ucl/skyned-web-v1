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
  intakeOperationSchema,
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
  "requirements",
  "minimumEducationDegree",
  "minimumEducationLevel",
  "minimumEligibilityGpa",
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
    query: Partial<
      IQueryConstruct<Omit<IProgram, "_count" | "proficiencies">>["where"]
    >,
    authUser?: AuthClaim,
  ) {
    const where: Prisma.ProgramWhereInput | undefined = {};
    const equalInput: (keyof typeof query)[] = [
      "schoolId",
      "degreeType",
      "pgwp",
      "slug",
      "timeframe",
      "minimumEducationLevel",
      "tuitionFeeType",
    ];

    const numberGreaterInput: (keyof typeof query)[] = [
      "applicationFeeDiscount",
      "minimumEligibilityGpa",
      "minimumEducationDegree",
    ];

    const numberLessInput: (keyof typeof query)[] = [
      "applicationFee",
      "tuitionFee",
      "duration",
    ];

    if (!authUser || authUser.claim !== "admin") {
      where.active = true;
      where.school = {
        active: true,
      };
    }

    if (query.name) {
      where.OR = [
        { name: { equals: query.name, mode: "insensitive" } },
        { name: { contains: query.name, mode: "insensitive" } },
      ];
    }

    if (query.faculty) {
      if (where.OR) {
        where.OR = [
          ...where.OR,
          { faculty: { equals: query.faculty, mode: "insensitive" } },
          { faculty: { contains: query.faculty, mode: "insensitive" } },
        ];
      } else {
        where.OR = [
          { faculty: { equals: query.faculty, mode: "insensitive" } },
          { faculty: { contains: query.faculty, mode: "insensitive" } },
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
        ...SkynedUtils.exclude(d, ["intakes", "proficiencies"]),
        proficiencies: d.proficiencies.length
          ? {
              createMany: {
                data: d.proficiencies,
                skipDuplicates: true,
              },
            }
          : undefined,
        intakes: {
          connect: d.intakes.map((id) => ({ id, schoolId: sid })),
        },
      },
      include: {
        intakes: true,
        proficiencies: true,
      },
    });

    return this.deserialize(program);
  };

  updateSingleProgram: IProgramService["updateSingleProgram"] = async (
    schoolId,
    slug,
    programId,
    data,
  ) => {
    let {
      schoolId: sid,
      slug: slg,
      data: d,
      programId: pid,
    } = this.validationUtility.validateInput({
      schema: UpdateProgramServiceSchema,
      inputData: {
        data,
        schoolId,
        programId,
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
        ...SkynedUtils.exclude(d, ["intakes", "proficiencies"]),
        proficiencies: d.proficiencies?.length
          ? {
              deleteMany: d.proficiencies.length
                ? {
                    NOT: d.proficiencies.map((proficiency) => ({
                      programId: pid,
                      test: proficiency.test,
                    })),
                  }
                : undefined,
              upsert: d.proficiencies.map((proficiency) => ({
                where: {
                  proficiency: {
                    test: proficiency.test,
                    programId: pid,
                  },
                },
                update: proficiency,
                create: proficiency,
              })),
            }
          : undefined,
        intakes: d.intakes?.length
          ? {
              set: d.intakes.map((id) => ({ id, schoolId: sid })),
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

        return this.repository.db.program.upsert({
          where: {
            schoolId_slug: {
              schoolId: sid,
              slug: d.slug,
            },
          },

          create: {
            schoolId: sid,
            createdById: aid,
            ...SkynedUtils.exclude(d, ["intakes", "proficiencies"]),
            proficiencies: d.proficiencies.length
              ? {
                  createMany: {
                    data: d.proficiencies,
                    skipDuplicates: true,
                  },
                }
              : undefined,
            intakes: {
              connect: d.intakes.map((id) => ({ id, schoolId: sid })),
            },
          },

          update: {
            ...SkynedUtils.exclude(d, [
              "intakes",
              "name",
              "slug",
              "proficiencies",
            ]),
            proficiencies: d.proficiencies?.length
              ? {
                  deleteMany: d.proficiencies.length ? {} : undefined,
                  createMany: { data: d.proficiencies, skipDuplicates: true },
                }
              : undefined,
            intakes: d.intakes?.length
              ? {
                  set: d.intakes.map((id) => ({ id, schoolId: sid })),
                }
              : undefined,
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
            schoolId: sid,
            programId: d.programId,
          },
          data: {
            ...SkynedUtils.exclude(d.data, [
              "intakes",
              "name",
              "slug",
              "proficiencies",
            ]),
            proficiencies: d.data.proficiencies?.length
              ? {
                  deleteMany: d.data.proficiencies.length
                    ? {
                        NOT: d.data.proficiencies.map((proficiency) => ({
                          programId: d.programId,
                          test: proficiency.test,
                        })),
                      }
                    : undefined,
                  upsert: d.data.proficiencies.map((proficiency) => ({
                    where: {
                      proficiency: {
                        test: proficiency.test,
                        programId: d.programId,
                      },
                    },
                    update: proficiency,
                    create: proficiency,
                  })),
                }
              : undefined,
            intakes: d.data.intakes?.length
              ? {
                  set: d.data.intakes.map((id) => ({ id, schoolId: sid })),
                }
              : undefined,
          },
        });
      }),
    );

    return txResponse.length;
  };

  count: IProgramService["count"] = async ({ where, from, to }, authUser) => {
    const whereConstruct = this._constructWhereQuery(where || {}, authUser);

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
    const whereConstruct = this._constructWhereQuery(where || {}, authUser);

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

        proficiencies:
          authUser?.claim === "admin"
            ? true
            : {
                select: {
                  test: true,
                  score: true,
                },
              },

        school: {
          select: {
            slug: true,
            name: true,
            country: true,
            state: true,
            city: true,
            currency: true,
            logo: true,
            accommodation: true,
          },
        },

        intakes:
          !authUser || authUser.claim !== "admin"
            ? {
                where: {
                  status: {
                    in: ["likely_open", "open"],
                  },
                },
                select: SkynedUtils.select([
                  "intake",
                  "status",
                  "deadline",
                  "startDate",
                ]),
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
              accommodation: true,
              schoolImage: true,
            },
          },

          proficiencies:
            authUser?.claim === "admin"
              ? true
              : {
                  select: {
                    test: true,
                    score: true,
                  },
                },

          intakes: {
            where:
              !authUser || authUser.claim !== "admin"
                ? {
                    status: {
                      in: ["open", "likely_open"],
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

  connectIntakes: IProgramService["connectIntakes"] = async (
    schoolId,
    slug,
    intakes,
  ) => {
    const {
      schoolId: sid,
      slug: slg,
      intakes: itks,
    } = this.validationUtility.validateInput({
      schema: intakeOperationSchema,
      inputData: {
        schoolId,
        slug,
        intakes,
      },
    });

    const program = await this.repository.db.program.update({
      where: {
        schoolId_slug: {
          schoolId: sid,
          slug: slg,
        },
      },

      data: {
        intakes: {
          connect: itks.map((itk) => ({ id: itk, schoolId: sid })),
        },
      },
    });

    return this.deserialize(program);
  };

  disconnectIntakes: IProgramService["disconnectIntakes"] = async (
    schoolId,
    slug,
    intakes,
  ) => {
    const {
      schoolId: sid,
      slug: slg,
      intakes: itks,
    } = this.validationUtility.validateInput({
      schema: intakeOperationSchema,
      inputData: {
        schoolId,
        slug,
        intakes,
      },
    });

    const program = await this.repository.db.program.update({
      where: {
        schoolId_slug: {
          schoolId: sid,
          slug: slg,
        },
      },

      data: {
        intakes: {
          disconnect: itks.map((itk) => ({ id: itk, schoolId: sid })),
        },
      },
    });

    return this.deserialize(program);
  };
}

/** Concrete instance of {ProgramService} */
export const programService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PROGRAM_SERVICE,
  () => ProgramService.factory(),
);
