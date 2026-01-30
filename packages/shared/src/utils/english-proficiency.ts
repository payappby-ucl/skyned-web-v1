interface IELTS {
  test: "ielts";
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

interface TOEFL {
  test: "toefl";
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
}

interface PTE {
  test: "pte";
  score: number;
}

interface Duolingo {
  test: "duolingo";
  score: number;
}

type TestInput = IELTS | TOEFL | PTE | Duolingo;

const scores = [
  {
    name: "A1",
    tags: ["Basic User", "Beginner"],
    scores: {
      ielts: [1.0, 2.5],
      toefl: [0, 31],
      pte: [10, 29],
      duolingo: [10, 40],
    },
  },
  {
    name: "A2",
    tags: ["Basic User", "Pre-Intermediate"],
    scores: {
      ielts: [3.0, 3.5],
      toefl: [32, 41],
      pte: [30, 42],
      duolingo: [45, 60],
    },
  },
  {
    name: "B1",
    tags: ["Independent User", "Intermediate"],
    scores: {
      ielts: [4.0, 5.0],
      toefl: [42, 71],
      pte: [43, 58],
      duolingo: [65, 90],
    },
  },
  {
    name: "B2",
    tags: ["Independent User", "Upper-Intermediate"],
    scores: {
      ielts: [5.5, 6.5],
      toefl: [72, 94],
      pte: [59, 75],
      duolingo: [95, 120],
    },
  },
  {
    name: "C1",
    tags: ["Proficient User", "Advanced"],
    scores: {
      ielts: [7.0, 8.0],
      toefl: [95, 114],
      pte: [76, 84],
      duolingo: [125, 140],
    },
  },
  {
    name: "C2",
    tags: ["Proficient User", "Mastery"],
    scores: {
      ielts: [8.5, 9.0],
      toefl: [115, 120],
      pte: [85, 90],
      duolingo: [145, 160],
    },
  },
] as const;

export abstract class EnglishProficiency {
  static examinations = [
    {
      name: "ielts",
      total: 9,
      max: 9,
      min: 1,
      steps: 0.5,
    },
    {
      name: "toefl",
      total: 120,
      max: 30,
      min: 0,
      steps: 1,
    },
    {
      name: "duolingo",
      total: 160,
      max: 160,
      min: 10,
      steps: 1,
    },
    {
      name: "pte",
      total: 90,
      max: 90,
      min: 10,
      steps: 1,
    },
  ] as const;

  static getCefr(
    name: (typeof EnglishProficiency.examinations)[number]["name"],
    totalScore: number,
  ) {
    const cefr = scores.find(
      (score) =>
        totalScore >= score.scores[name][0] &&
        totalScore <= score.scores[name][1],
    );

    if (!cefr) throw new Error("Invalid input for CEFR");

    return cefr;
  }

  static computeExaminationScore(input: TestInput) {
    switch (input.test) {
      case "ielts": {
        const average =
          (input.listening + input.reading + input.speaking + input.writing) /
          4;

        const total = Math.round(average * 2) / 2;
        const cefr = EnglishProficiency.getCefr(input.test, total);

        return {
          total,
          cefr,
        };
      }
      case "toefl": {
        const total =
          input.listening + input.reading + input.speaking + input.writing;

        const cefr = EnglishProficiency.getCefr(input.test, total);

        return {
          total,
          cefr,
        };
      }
      case "duolingo": {
        const cefr = EnglishProficiency.getCefr(input.test, input.score);

        return {
          total: input.score,
          cefr,
        };
      }
      case "pte": {
        const cefr = EnglishProficiency.getCefr(input.test, input.score);

        return {
          total: input.score,
          cefr,
        };
      }
      default:
        throw new Error("Invalid test scores");
    }
  }
}
