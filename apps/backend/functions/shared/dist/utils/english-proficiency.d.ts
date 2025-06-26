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
export declare abstract class EnglishProficiency {
    static examinations: readonly [{
        readonly name: "ielts";
        readonly total: 9;
        readonly max: 9;
        readonly min: 1;
        readonly steps: 0.5;
    }, {
        readonly name: "toefl";
        readonly total: 120;
        readonly max: 30;
        readonly min: 0;
        readonly steps: 1;
    }, {
        readonly name: "duolingo";
        readonly total: 160;
        readonly max: 160;
        readonly min: 10;
        readonly steps: 1;
    }, {
        readonly name: "pte";
        readonly total: 90;
        readonly max: 90;
        readonly min: 10;
        readonly steps: 1;
    }];
    static getCefr(name: (typeof EnglishProficiency.examinations)[number]["name"], totalScore: number): {
        readonly name: "A1";
        readonly tags: readonly ["English Basic User", "Beginner"];
        readonly classNames: "bg-red-200 text-red-600";
        readonly scores: {
            readonly ielts: readonly [1, 2.5];
            readonly toefl: readonly [0, 31];
            readonly pte: readonly [10, 29];
            readonly duolingo: readonly [10, 40];
        };
    } | {
        readonly name: "A2";
        readonly tags: readonly ["English Basic User", "Elementary English"];
        readonly classNames: "bg-red-200 text-red-600";
        readonly scores: {
            readonly ielts: readonly [3, 3.5];
            readonly toefl: readonly [32, 41];
            readonly pte: readonly [30, 42];
            readonly duolingo: readonly [45, 60];
        };
    } | {
        readonly name: "B1";
        readonly tags: readonly ["English Independent User", "Intermediate English"];
        readonly classNames: "bg-amber-200 text-amber-600";
        readonly scores: {
            readonly ielts: readonly [4, 5];
            readonly toefl: readonly [42, 71];
            readonly pte: readonly [43, 58];
            readonly duolingo: readonly [65, 90];
        };
    } | {
        readonly name: "B2";
        readonly tags: readonly ["English Independent User", "Upper-Intermediate English"];
        readonly classNames: "bg-amber-200 text-amber-600";
        readonly scores: {
            readonly ielts: readonly [5.5, 6.5];
            readonly toefl: readonly [72, 94];
            readonly pte: readonly [59, 75];
            readonly duolingo: readonly [95, 120];
        };
    } | {
        readonly name: "C1";
        readonly tags: readonly ["Proficient English User", "Advanced English"];
        readonly classNames: "bg-lime-200 text-lime-600";
        readonly scores: {
            readonly ielts: readonly [7, 8];
            readonly toefl: readonly [95, 114];
            readonly pte: readonly [76, 84];
            readonly duolingo: readonly [125, 140];
        };
    } | {
        readonly name: "C2";
        readonly tags: readonly ["Proficient English User", "Proficiency"];
        readonly classNames: "bg-lime-200 text-lime-600";
        readonly scores: {
            readonly ielts: readonly [8.5, 9];
            readonly toefl: readonly [115, 120];
            readonly pte: readonly [85, 90];
            readonly duolingo: readonly [145, 160];
        };
    };
    static computeExaminationScore(input: TestInput): {
        total: number;
        cefr: {
            readonly name: "A1";
            readonly tags: readonly ["English Basic User", "Beginner"];
            readonly classNames: "bg-red-200 text-red-600";
            readonly scores: {
                readonly ielts: readonly [1, 2.5];
                readonly toefl: readonly [0, 31];
                readonly pte: readonly [10, 29];
                readonly duolingo: readonly [10, 40];
            };
        } | {
            readonly name: "A2";
            readonly tags: readonly ["English Basic User", "Elementary English"];
            readonly classNames: "bg-red-200 text-red-600";
            readonly scores: {
                readonly ielts: readonly [3, 3.5];
                readonly toefl: readonly [32, 41];
                readonly pte: readonly [30, 42];
                readonly duolingo: readonly [45, 60];
            };
        } | {
            readonly name: "B1";
            readonly tags: readonly ["English Independent User", "Intermediate English"];
            readonly classNames: "bg-amber-200 text-amber-600";
            readonly scores: {
                readonly ielts: readonly [4, 5];
                readonly toefl: readonly [42, 71];
                readonly pte: readonly [43, 58];
                readonly duolingo: readonly [65, 90];
            };
        } | {
            readonly name: "B2";
            readonly tags: readonly ["English Independent User", "Upper-Intermediate English"];
            readonly classNames: "bg-amber-200 text-amber-600";
            readonly scores: {
                readonly ielts: readonly [5.5, 6.5];
                readonly toefl: readonly [72, 94];
                readonly pte: readonly [59, 75];
                readonly duolingo: readonly [95, 120];
            };
        } | {
            readonly name: "C1";
            readonly tags: readonly ["Proficient English User", "Advanced English"];
            readonly classNames: "bg-lime-200 text-lime-600";
            readonly scores: {
                readonly ielts: readonly [7, 8];
                readonly toefl: readonly [95, 114];
                readonly pte: readonly [76, 84];
                readonly duolingo: readonly [125, 140];
            };
        } | {
            readonly name: "C2";
            readonly tags: readonly ["Proficient English User", "Proficiency"];
            readonly classNames: "bg-lime-200 text-lime-600";
            readonly scores: {
                readonly ielts: readonly [8.5, 9];
                readonly toefl: readonly [115, 120];
                readonly pte: readonly [85, 90];
                readonly duolingo: readonly [145, 160];
            };
        };
    };
}
export {};
