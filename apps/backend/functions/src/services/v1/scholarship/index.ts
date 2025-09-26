/* eslint-disable brace-style */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { AuthClaim, IScholarship } from "@workspace/shared";
import { RegistryKeysEnum } from "../../../enum";
import { Prisma } from "../../../infrastructure/repository/prisma-client";
import { DefaultArgs } from "../../../infrastructure/repository/prisma-client/runtime/library";
import { IScholarshipService, IQueryConstruct } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { adminProfileKeys, SkynedUtils } from "../../../utils";
import { IdSchema, ScholarshipQuerySchema } from "../../../zod-schemas";
import { ServiceUtils } from "../utils";

const otherUsersData: (keyof IScholarship)[] = [
  "banner",
  "title",
  "subtitle",
  "overview",
  "description",
  "featured",
  "eligibilityRequirements",
  "slug",
  "banner",
];

const adminUserData: (keyof IScholarship)[] = [
  ...otherUsersData,
  "id",
  "scholarshipId",
  "active",
  "createdAt",
  "updatedAt",
  "createdById",
];

/** Concrete implementation of IScholarshipService */

export class ScholarshipService
  extends ServiceUtils
  implements IScholarshipService
{
  private static instance: IScholarshipService | null = null;
  private constructor() {
    super();
  }

  static factory() {
    if (!ScholarshipService.instance) {
      ScholarshipService.instance = new ScholarshipService();
    }

    return ScholarshipService.instance;
  }

  private _constructQuery(
    query: IQueryConstruct<
      Pick<ScholarshipQuerySchema, "category" | "featured">
    >["where"],
    authUser?: AuthClaim,
  ) {
    const where: Prisma.ScholarshipWhereInput = {};

    if (!authUser || authUser.claim !== "admin") {
      where.active = true;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured) {
      where.featured = true;
    }

    return where;
  }

  findBySlug: IScholarshipService["findBySlug"] = async (slug, authUser) => {
    const scholarship = await this.repository.db.scholarship.findUnique({
      where: {
        slug,
      },

      select: {
        ...SkynedUtils.select<
          Prisma.ScholarshipSelect<DefaultArgs>,
          keyof Prisma.ScholarshipSelect<DefaultArgs>
        >(authUser?.claim === "admin" ? adminUserData : otherUsersData),

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,
      },
    });

    if (!scholarship) return null;
    return this.deserialize(scholarship);
  };

  create: IScholarshipService["create"] = async (data, authUser) => {
    const scholarship = await this.repository.db.scholarship.create({
      data: {
        ...data,
        createdById: authUser.user.adminId,
        banner: {
          ...data.banner,
        },
      },
      select: {
        ...SkynedUtils.select<
          Prisma.ScholarshipSelect<DefaultArgs>,
          keyof Prisma.ScholarshipSelect<DefaultArgs>
        >(authUser?.claim === "admin" ? adminUserData : otherUsersData),

        createdBy: {
          select: SkynedUtils.select(adminProfileKeys),
        },
      },
    });

    return this.deserialize(scholarship);
  };

  count: IScholarshipService["count"] = async (
    { where, from, to },
    authUser,
  ) => {
    const whereConstruct = this._constructQuery(where || {}, authUser);

    const count = await this.repository.db.scholarship.count({
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

  listScholarships: IScholarshipService["listScholarships"] = async (
    { skip, take, from, to, where },
    authUser,
  ) => {
    const whereConstruct = this._constructQuery(where || {}, authUser);

    const scholarships = await this.repository.db.scholarship.findMany({
      skip,
      take,
      where: {
        ...whereConstruct,
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      orderBy:
        from && to
          ? {
              createdAt: "desc",
            }
          : {
              updatedAt: "desc",
            },

      select: {
        ...SkynedUtils.select<
          Prisma.ScholarshipSelect<DefaultArgs>,
          keyof Prisma.ScholarshipSelect<DefaultArgs>
        >(authUser?.claim === "admin" ? adminUserData : otherUsersData),

        createdBy:
          authUser?.claim === "admin"
            ? {
                select: SkynedUtils.select(adminProfileKeys),
              }
            : undefined,
      },
    });

    return scholarships.map((scholarship) => this.deserialize(scholarship));
  };

  // deleteScholarship: IScholarshipService["deleteScholarship"] = async (id) => {
  //   const { id: scholarshipId } = this.validationUtility.validateInput({
  //     schema: IdSchema,
  //     inputData: {
  //       id,
  //     },
  //   });

  //   const scholarship = await this.repository.db.scholarship.delete({
  //     where: {
  //       id: scholarshipId,
  //     },
  //   });

  //   return this.deserialize(scholarship);
  // };

  // deleteScholarships: IScholarshipService["deleteScholarships"] = async (
  //   ids,
  // ) => {
  //   const { data } = this.validationUtility.validateInput({
  //     schema: DeleteScholarshipsSchema,
  //     inputData: {
  //       data: ids.map((id) => ({ id })),
  //     },
  //   });

  //   await this.repository.db.scholarship.deleteMany({
  //     where: {
  //       id: {
  //         in: data.map(({ id }) => id),
  //       },
  //     },
  //   });
  // };

  // getAllScholarships: IScholarshipService["getAllScholarships"] = async (
  //   query,
  //   authUser,
  // ) => {
  //   const where = this._constructQuery(query || {});
  //   const scholarships = await this.repository.db.scholarship.findMany({
  //     where,
  //     select: {
  //       ...SkynedUtils.select<
  //         Prisma.ScholarshipSelect<DefaultArgs>,
  //         keyof Prisma.ScholarshipSelect<DefaultArgs>
  //       >(
  //         authUser?.claim === "admin"
  //           ? ["name", "id", "createdById", "updatedAt", "createdAt"]
  //           : ["name"],
  //       ),

  //       createdBy:
  //         authUser?.claim === "admin"
  //           ? {
  //               select: SkynedUtils.select(adminProfileKeys),
  //             }
  //           : undefined,

  //       _count: {
  //         select: {
  //           posts: true,
  //         },
  //       },
  //     },
  //   });

  //   return scholarships.map((c) => this.deserialize(c));
  // };

  // count: IScholarshipService["count"] = async ({ from, to, where }) => {
  //   const whereQuery = this._constructQuery(where || {});

  //   const count = await this.repository.db.scholarship.count({
  //     where: {
  //       ...whereQuery,
  //       createdAt: {
  //         gte: from,
  //         lte: to,
  //       },
  //     },
  //   });

  //   return count;
  // };

  // findScholarships: IScholarshipService["findScholarships"] = async (
  //   { from, to, order, where, take, skip },
  //   authUser,
  // ) => {
  //   const whereConstruct = this._constructQuery(where || {});
  //   const scholarships = await this.repository.db.scholarship.findMany({
  //     skip,
  //     take,
  //     where: {
  //       ...whereConstruct,
  //       createdAt: {
  //         gte: from,
  //         lte: to,
  //       },
  //     },

  //     orderBy: {
  //       [`${order?.orderBy || "createdAt"}`]: order?.order || "desc",
  //     },

  //     select: {
  //       ...SkynedUtils.select<
  //         Prisma.CategorySelect<DefaultArgs>,
  //         keyof Prisma.CategorySelect<DefaultArgs>
  //       >(
  //         authUser?.claim === "admin"
  //           ? ["name", "id", "createdById", "updatedAt", "createdAt"]
  //           : ["name"],
  //       ),

  //       createdBy:
  //         authUser?.claim === "admin"
  //           ? {
  //               select: SkynedUtils.select(adminProfileKeys),
  //             }
  //           : undefined,

  //       _count: {
  //         select: {
  //           posts: true,
  //         },
  //       },
  //     },
  //   });

  //   return scholarships.map((scholarship) => this.deserialize(scholarship));
  // };

  // findById: IScholarshipService["findById"] = async (id) => {
  //   const { id: scholarshipId } = this.validationUtility.validateInput({
  //     schema: IdSchema,
  //     inputData: {
  //       id,
  //     },
  //   });

  //   const scholarship = await this.repository.db.scholarship.findUnique({
  //     where: {
  //       id: scholarshipId,
  //     },
  //   });

  //   if (!scholarship) return null;
  //   return this.deserialize(scholarship);
  // };
}

/** Concrete instance of ScholarshipService */
export const scholarshipService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOLARSHIP_SERVICE,
  () => ScholarshipService.factory(),
);
