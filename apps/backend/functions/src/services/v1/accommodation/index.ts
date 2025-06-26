/* eslint-disable max-len */
/* eslint-disable brace-style */
import { RegistryKeysEnum } from "../../../enum";
import { IAccommodationService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";
import {
  CreateAccommodationServiceSchema,
  DeleteAccommodationSchema,
} from "./schema";

/** Concrete implementation of {IAccommodationService} */

export class AccommodationService
  extends ServiceUtils
  implements IAccommodationService
{
  private static instance: IAccommodationService | null = null;
  private constructor() {
    super();
  }

  /** Factory for instance creation */

  static factory() {
    if (!AccommodationService.instance) {
      AccommodationService.instance = new AccommodationService();
    }

    return AccommodationService.instance;
  }

  createAccommodation: IAccommodationService["createAccommodation"] = async (
    adminId,
    schoolId,
    data,
  ) => {
    const {
      adminId: createdById,
      schoolId: sid,
      ...rest
    } = this.validationUtility.validateInput({
      schema: CreateAccommodationServiceSchema,
      inputData: {
        ...data,
        schoolId,
        adminId,
      },
    });

    const accommodation = await this.repository.accommodation.upsert({
      where: {
        schoolId: sid,
      },
      create: {
        schoolId: sid,
        createdById: createdById,
        ...rest,
      },
      update: {
        ...rest,
      },
    });

    return accommodation;
  };

  count: IAccommodationService["count"] = async () => {
    const count = await this.repository.accommodation.count();
    return count;
  };

  getAccommodations: IAccommodationService["getAccommodations"] = async (
    query,
  ) => {
    const accommodations = await this.repository.accommodation.findMany({
      skip: query?.skip,
      take: query?.take,
      orderBy: {
        updatedAt: "desc",
      },

      select: {
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
    });

    return accommodations.map((accommodation) =>
      this.deserialize(accommodation),
    );
  };

  deleteAccommodation: IAccommodationService["deleteAccommodation"] = async (
    accommodationId,
  ) => {
    const { id } = this.validationUtility.validateInput({
      schema: DeleteAccommodationSchema,
      inputData: {
        id: accommodationId,
      },
    });
    const accommodation = await this.repository.accommodation.delete({
      where: {
        id,
      },
    });

    return accommodation;
  };

  findAccommodationById: IAccommodationService["findAccommodationById"] =
    async (accommodationId) => {
      const { id } = this.validationUtility.validateInput({
        schema: DeleteAccommodationSchema,
        inputData: {
          id: accommodationId,
        },
      });

      const accommodation = await this.repository.accommodation.findUnique({
        where: {
          id,
        },
      });

      return accommodation;
    };
}

/** Concrete instance of {AccommodationService} */
export const accommodationService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ACCOMMODATION_SERVICE,
  () => AccommodationService.factory(),
);
