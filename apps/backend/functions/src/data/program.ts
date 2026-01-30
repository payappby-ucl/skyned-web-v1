/* eslint-disable max-len */
import { degreeTypes, timeframe, tuitionFeeType } from "@workspace/shared";

export const programData = {
  name: "Bachelor of Art in Fine Arts",
  slug: "bachelor-of-art-in-fine-arts",
  faculty: "Fine Art",
  degreeType: degreeTypes[0],
  overview:
    "The B.F.A. in Art is considered the professional undergraduate degree in studio art and is designed to provide students with a thorough grounding in fundamental principles and techniques with opportunities for emphasis in one or more specific studio art areas.",
  description: "<h1>Bachelor of Art in Fine Arts</h1>",
  applicationFee: 100,
  applicationFeeDiscount: 0,

  financialAids: [],

  tuitionFee: 32345.92,
  tuitionFeeType: tuitionFeeType[0],

  timeframe: timeframe[2],
  duration: 10,

  minimumEducationLevel: "primary" as const,
  minimumEducationDegree: 1,
  minimumEligibilityGpa: 80,

  proficiencies: [
    {
      test: "ielts" as any,
      score: 8,
    },
  ],

  pgwp: false,
};
