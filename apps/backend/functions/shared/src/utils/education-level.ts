export const averages = {
  scaleA1F9: [
    {
      label: "A1",
      value: 9,
    },
    {
      label: "B2",
      value: 8,
    },
    {
      label: "B3",
      value: 7,
    },
    {
      label: "C4",
      value: 6,
    },
    {
      label: "C5",
      value: 5,
    },
    {
      label: "C6",
      value: 4,
    },
    {
      label: "D7",
      value: 3,
    },
    {
      label: "E8",
      value: 2,
    },
    {
      label: "F9",
      value: 1,
    },
  ],

  division: [
    {
      label: "First class",
      value: 4,
    },
    {
      label: "Second Class - Upper Credit/Division",
      value: 3,
    },
    {
      label: "Second Class - Lower Credit/Division",
      value: 2,
    },
    {
      label: "Third Class",
      value: 1,
    },
  ],
} as const;

export const schemes = {
  percentage: {
    name: "Higher Education Percentage Scale : 0-100",
    max: 100,
    min: 0,
    step: 0.1,
    averages: null,
    key: "percentage",
    computeCGPA: (val: number) => val,
  },
  "5_diploma": {
    name: "National Diploma/Higher National Diploma 5.0 Scale",
    max: 5,
    min: 0,
    step: 0.1,
    averages: null,
    key: "5_diploma",
    computeCGPA: (val: number) => (val / 5) * 100,
  },
  "4_diploma": {
    name: "National Diploma/Higher National Diploma 4.0 Scale",
    max: 4,
    min: 0,
    step: 0.1,
    averages: null,
    key: "4_diploma",
    computeCGPA: (val: number) => (val / 4) * 100,
  },
  division: {
    name: "Higher Education Division Scale",
    max: 4,
    min: 1,
    step: 1,
    averages: averages["division"],
    key: "division",
    computeCGPA: (val: number) => (val / 4) * 100,
  },
  education: {
    name: "Higher Education 5.0 Scale",
    max: 5,
    min: 0,
    step: 0.1,
    averages: null,
    key: "education",
    computeCGPA: (val: number) => (val / 5) * 100,
  },
  waec: {
    name: "West African Examinations Council (WAEC) -  Scale A1-F9",
    max: 9,
    min: 1,
    step: 1,
    averages: averages["scaleA1F9"],
    key: "waec",
    computeCGPA: (val: number) => (val / 9) * 100,
  },
  neco: {
    name: "National Examinations Council (NECO) -  Scale A1-F9",
    max: 9,
    min: 1,
    step: 1,
    averages: averages["scaleA1F9"],
    key: "neco",
    computeCGPA: (val: number) => (val / 9) * 100,
  },
} as const;

export const educationLevels = {
  primary: [
    {
      level: "Grade 1",
      schemes: null,
      levelValue: 1,
    },
    {
      level: "Grade 2",
      schemes: null,
      levelValue: 2,
    },
    {
      level: "Grade 3",
      schemes: null,
      levelValue: 3,
    },
    {
      level: "Grade 4",
      schemes: null,
      levelValue: 4,
    },
    {
      level: "Grade 5",
      schemes: null,
      levelValue: 5,
    },
    {
      level: "Grade 6",
      schemes: null,
      levelValue: 6,
    },
    {
      level: "Grade 7",
      schemes: null,
      levelValue: 7,
    },
    {
      level: "Grade 8",
      schemes: null,
      levelValue: 8,
    },
  ],

  secondary: [
    {
      level: "Grade 9",
      schemes: null,
      levelValue: 9,
    },
    {
      level: "Grade 10",
      schemes: null,
      levelValue: 10,
    },
    {
      level: "Grade 11",
      schemes: null,
      levelValue: 11,
    },

    {
      level: "Grade 12 / High School",
      schemes: [schemes["waec"], schemes["neco"]],
      levelValue: 12,
    },
  ],

  undergraduate: [
    {
      level: "1-Year Post Secondary Certificate",
      schemes: [
        schemes["percentage"],
        schemes["5_diploma"],
        schemes["4_diploma"],
      ],
      levelValue: 13,
    },
    {
      level: "2-Year Undergratuate Diploma",
      schemes: [
        schemes["percentage"],
        schemes["5_diploma"],
        schemes["4_diploma"],
      ],
      levelValue: 14,
    },
    {
      level: "3-Year Undergratuate Advanced Diploma",
      schemes: [
        schemes["percentage"],
        schemes["5_diploma"],
        schemes["4_diploma"],
      ],
      levelValue: 15,
    },
    {
      level: "3-Year Bachelors Degree",
      schemes: [schemes["percentage"], schemes["division"]],
      levelValue: 16,
    },
    {
      level: "4-Year Bachelors Degree",
      schemes: [
        schemes["percentage"],
        schemes["division"],
        schemes["education"],
      ],
      levelValue: 17,
    },
    {
      level: "5-Year Bachelors Degree",
      schemes: [
        schemes["percentage"],
        schemes["division"],
        schemes["education"],
      ],
      levelValue: 18,
    },
  ],

  postgraduate: [
    {
      level: "Postgraduate Certificate/Diploma",
      schemes: [schemes["percentage"], schemes["division"]],
      levelValue: 19,
    },
    {
      level: "Masters Degree",
      schemes: [schemes["percentage"], schemes["division"]],
      levelValue: 20,
    },
    {
      level: "Doctoral Degree (PhD / MD / equivalent)",
      schemes: [schemes["percentage"], schemes["division"]],
      levelValue: 21,
    },
  ],
} as const;
