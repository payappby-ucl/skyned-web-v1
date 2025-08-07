/* eslint-disable max-len */
/* eslint-disable brace-style */
import dayjs from "dayjs";
import { RegistryKeysEnum } from "../../../enum";
import { IAnalyticsService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { ServiceUtils } from "../utils";

/** Concrete implementation of IAnalyticsService */

export class AnalyticsService
  extends ServiceUtils
  implements IAnalyticsService
{
  private static instance: IAnalyticsService | null = null;
  private constructor() {
    super();
  }

  static factory() {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }

    return AnalyticsService.instance;
  }

  private _computeGrowth(curr: number, prev: number) {
    const growth = ((curr - prev) / (prev || 1)) * 100;
    return growth;
  }

  computeKpis: IAnalyticsService["computeKpis"] = async (
    date = dayjs().subtract(1, "d").toDate(),
  ) => {
    const startOfCurrentDay = dayjs(date).startOf("day").toDate();
    const endOfCurrentDay = dayjs(startOfCurrentDay).endOf("day").toDate();

    const startOfDayBefore = dayjs(startOfCurrentDay)
      .subtract(1, "day")
      .startOf("day")
      .toDate();

    // * Get previous day kpi
    const dayBeforeKPI = await this.repository.db.dailyStats.findUnique({
      where: {
        date: startOfDayBefore,
      },
    });

    // * Schools Computation
    const [
      currentDayTotalSchools,
      currentDayActiveSchools,
      currentDayNewSchools,
    ] = await Promise.all([
      this.repository.db.school.count({
        where: {
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.school.count({
        where: {
          active: true,
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.school.count({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lte: endOfCurrentDay,
          },
        },
      }),
    ]);

    const prevDayNewSchools = dayBeforeKPI?.newSchools ?? 0;

    const currentDaySchoolsGrowth = this._computeGrowth(
      currentDayNewSchools,
      prevDayNewSchools,
    );

    // * programs Computation
    const [
      currentDayTotalPrograms,
      currentDayActivePrograms,
      currentDayNewPrograms,
    ] = await Promise.all([
      this.repository.db.program.count({
        where: {
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.program.count({
        where: {
          active: true,
          school: {
            active: true,
          },
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.program.count({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lte: endOfCurrentDay,
          },
        },
      }),
    ]);

    const prevDayNewPrograms = dayBeforeKPI?.newPrograms ?? 0;

    const currentDayProgramsGrowth = this._computeGrowth(
      currentDayNewPrograms,
      prevDayNewPrograms,
    );

    // * Admins Computation
    const [currentDayTotalAdmins, currentDayActiveAdmins, currentDayNewAdmins] =
      await Promise.all([
        this.repository.db.admin.count({
          where: {
            createdAt: {
              lte: endOfCurrentDay,
            },
          },
        }),
        this.repository.db.admin.count({
          where: {
            accountSuspended: false,
            createdAt: {
              lte: endOfCurrentDay,
            },
          },
        }),
        this.repository.db.admin.count({
          where: {
            createdAt: {
              gte: startOfCurrentDay,
              lte: endOfCurrentDay,
            },
          },
        }),
      ]);

    const currentDayAdminsGrowth = this._computeGrowth(
      currentDayNewAdmins,
      dayBeforeKPI?.newAdmins ?? 0,
    );

    // * FaQ Computation
    const [currentDayTotalFaqs, currentDayNewFaqs] = await Promise.all([
      this.repository.db.faq.count({
        where: {
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.faq.count({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lte: endOfCurrentDay,
          },
        },
      }),
    ]);

    const currentDayFaqsGrowth = this._computeGrowth(
      currentDayNewFaqs,
      dayBeforeKPI?.newFaqs ?? 0,
    );

    // * Inquiries Computation
    const [currentDayTotalInquires, currentDayNewInquires] = await Promise.all([
      this.repository.db.inquiry.count({
        where: {
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.inquiry.count({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lte: endOfCurrentDay,
          },
        },
      }),
    ]);

    const currentDayInquiresGrowth = this._computeGrowth(
      currentDayNewInquires,
      dayBeforeKPI?.newInquiries ?? 0,
    );

    // * Blog Posts Computation

    const [
      currentDayTotalPosts,
      currentDayNewPosts,
      currentDayPublishedPosts,
      currentDayScheduledPosts,
      currentDayDraftedPosts,
      currentDayUnpublishedPosts,
    ] = await Promise.all([
      this.repository.db.blogPost.count({
        where: {
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.blogPost.count({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.blogPost.count({
        where: {
          status: "published",
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.blogPost.count({
        where: {
          status: "scheduled",
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.blogPost.count({
        where: {
          status: "draft",
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
      this.repository.db.blogPost.count({
        where: {
          status: "unpublished",
          createdAt: {
            lte: endOfCurrentDay,
          },
        },
      }),
    ]);

    const currentDayPostsGrowth = this._computeGrowth(
      currentDayNewPosts,
      dayBeforeKPI?.newPosts ?? 0,
    );

    const data = {
      totalSchools: currentDayTotalSchools,
      newSchools: currentDayNewSchools,
      activeSchools: currentDayActiveSchools,
      schoolGrowth: currentDaySchoolsGrowth,

      totalPrograms: currentDayTotalPrograms,
      newPrograms: currentDayNewPrograms,
      activePrograms: currentDayActivePrograms,
      programGrowth: currentDayProgramsGrowth,

      totalAdmins: currentDayTotalAdmins,
      newAdmins: currentDayNewAdmins,
      activeAdmins: currentDayActiveAdmins,
      adminGrowth: currentDayAdminsGrowth,

      totalFaqs: currentDayTotalFaqs,
      newFaqs: currentDayNewFaqs,
      faqGrowth: currentDayFaqsGrowth,

      totalInquiries: currentDayTotalInquires,
      newInquiries: currentDayNewInquires,
      inquiryGrowth: currentDayInquiresGrowth,

      totalPosts: currentDayTotalPosts,
      publishedPosts: currentDayPublishedPosts,
      scheduledPosts: currentDayScheduledPosts,
      draftPosts: currentDayDraftedPosts,
      newPosts: currentDayNewPosts,
      postGrowth: currentDayPostsGrowth,
      unpublishedPosts: currentDayUnpublishedPosts,
    };

    await this.repository.db.dailyStats.upsert({
      where: {
        date: startOfCurrentDay,
      },

      create: {
        date: startOfCurrentDay,
        ...data,
      },

      update: {
        ...data,
      },
    });

    // END
  };

  getAdminKPIs: IAnalyticsService["getAdminKPIs"] = async (authUser) => {
    const [kpis] = await this.repository.db.dailyStats.findMany({
      take: 1,
      omit: {
        id: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (!kpis) return null;

    return this.deserialize(kpis);
  };
}

/** Concrete instance of AnalyticsService */
export const analyticsService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ANALYTICS_SERVICE,
  () => AnalyticsService.factory(),
);
