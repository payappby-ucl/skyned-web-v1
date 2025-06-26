/* eslint-disable operator-linebreak */
import { ISchool } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { ISchoolService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { ServiceUtils } from "../utils";
import { CreateSchoolServiceSchema } from "./schema";
import { GeneralSchema } from "../../../zod-schemas";

const generalSchoolData: (keyof ISchool)[] = [
  "name",
  "slug",
  "country",
  "state",
  "address",
  "city",
  "institutionType",
  "ownershipType",
  "currency",
  "link",
  "logo",
  "schoolImage",
  "overview",
];

const adminSchoolData: (keyof ISchool)[] = [
  ...generalSchoolData,
  "id",
  "schoolId",
  "createdAt",
  "updatedAt",
];

/** Concrete implementation of {ISchoolService} */

export class SchoolService extends ServiceUtils implements ISchoolService {
  private static instance: ISchoolService | null = null;
  private constructor() {
    super();
  }

  /** Factory for instance creation */

  static factory() {
    if (!SchoolService.instance) {
      SchoolService.instance = new SchoolService();
    }

    return SchoolService.instance;
  }

  createSchool: ISchoolService["createSchool"] = async (admin, data) => {
    data = this.validationUtility.validateInput({
      schema: CreateSchoolServiceSchema,
      inputData: data,
    });

    const school = await this.repository.school.create({
      data: {
        ...data,
        logo: {
          ...data.logo,
        },
        schoolImage: {
          ...data.schoolImage,
        },
        createdById: admin.adminId,
      },
    });

    return this.deserialize(school);
  };

  updateSchool: ISchoolService["updateSchool"] = async (schoolId, data) => {
    const { schoolId: id, ...rest } = this.validationUtility.validateInput({
      schema: CreateSchoolServiceSchema.partial({
        logo: true,
        schoolImage: true,
      }),
      inputData: {
        ...data,
        schoolId,
      },
    });

    const school = await this.repository.school.update({
      where: {
        schoolId: id,
      },

      data: {
        ...rest,
        logo: rest.logo
          ? {
              ...rest.logo,
            }
          : undefined,

        schoolImage: rest.schoolImage
          ? {
              ...rest.schoolImage,
            }
          : undefined,
      },
    });

    return this.deserialize(school);
  };

  findSchoolBySlug: ISchoolService["findSchoolBySlug"] = async (
    slug,
    authUser,
  ) => {
    const data = this.validationUtility.validateInput({
      schema: CreateSchoolServiceSchema.pick({
        slug: true,
      }),
      inputData: {
        slug,
      },
    });

    const school = await this.repository.school.findUnique({
      where: {
        slug: data.slug,
      },
      select: {
        ...SkynedUtils.select(
          authUser?.claim === "admin" ? adminSchoolData : generalSchoolData,
        ),

        accommodation: {
          select: {
            id: authUser?.claim === "admin" ? true : false,
            description: true,
            school: {
              select: {
                name: true,
                slug: true,
                country: true,
                state: true,
                logo: true,
                schoolImage: true,
              },
            },
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

    if (!school) return null;
    return this.deserialize(school);
  };

  findSchoolBySchoolId: ISchoolService["findSchoolBySchoolId"] = async (
    schoolId,
    authUser,
  ) => {
    const data = this.validationUtility.validateInput({
      schema: GeneralSchema.pick({
        schoolId: true,
      }),
      inputData: {
        schoolId,
      },
    });

    const school = await this.repository.school.findUnique({
      where: {
        schoolId: data.schoolId,
      },
      select: {
        ...SkynedUtils.select(
          authUser?.claim === "admin" ? adminSchoolData : generalSchoolData,
        ),

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,
      },
    });

    if (!school) return null;
    return this.deserialize(school);
  };

  count: ISchoolService["count"] = async () => {
    const count = await this.repository.school.count();
    return count;
  };

  listSchools: ISchoolService["listSchools"] = async (
    { skip, take, from, to, order, where },
    authUser,
  ) => {
    const schools = await this.repository.school.findMany({
      skip,
      take,
      where: {
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      orderBy: {
        [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
      },

      select: {
        ...SkynedUtils.select(
          authUser?.claim === "admin" ? adminSchoolData : generalSchoolData,
        ),
        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,
      },
    });

    return schools.map((school) => this.deserialize(school));
  };
}

/** Concrete instance of {SchoolService} */
export const schoolService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOOL_SERVICE,
  () => SchoolService.factory(),
);
