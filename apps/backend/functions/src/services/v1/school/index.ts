import { RegistryKeysEnum } from "../../../enum";
import { repository } from "../../../infrastructure";
import {
  ISchoolService,
  IRepository,
  IValidationUtility,
} from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { validationUtility } from "../../../utils";
import { ServiceUtils } from "../utils";
import { CreateSchoolServiceSchema } from "./schema";

/** Represents dependencies needed to instantiate  {SchoolService} */
export interface ISchoolServiceDependencies {
  repository: IRepository;
  validationUtility: IValidationUtility;
}

/** Concrete implementation of {ISchoolService} */

export class SchoolService extends ServiceUtils implements ISchoolService {
  private static instance: ISchoolService | null = null;
  private constructor(
    private readonly repository: IRepository,
    private readonly validationUtility: IValidationUtility,
  ) {
    super();
  }

  /** Factory for instance creation */

  static factory({
    repository,
    validationUtility,
  }: ISchoolServiceDependencies) {
    if (!SchoolService.instance) {
      SchoolService.instance = new SchoolService(repository, validationUtility);
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

  findSchoolBySlug: ISchoolService["findSchoolBySlug"] = async (slug) => {
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
    });

    if (!school) return null;
    return this.deserialize(school);
  };
}

/** Concrete instance of {SchoolService} */
export const schoolService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.SCHOOL_SERVICE,
  () =>
    SchoolService.factory({
      repository,
      validationUtility,
    }),
);
