export declare const averages: {
    readonly scaleA1F9: readonly [{
        readonly label: "A1";
        readonly value: 9;
    }, {
        readonly label: "B2";
        readonly value: 8;
    }, {
        readonly label: "B3";
        readonly value: 7;
    }, {
        readonly label: "C4";
        readonly value: 6;
    }, {
        readonly label: "C5";
        readonly value: 5;
    }, {
        readonly label: "C6";
        readonly value: 4;
    }, {
        readonly label: "D7";
        readonly value: 3;
    }, {
        readonly label: "E8";
        readonly value: 2;
    }, {
        readonly label: "F9";
        readonly value: 1;
    }];
    readonly division: readonly [{
        readonly label: "First class";
        readonly value: 4;
    }, {
        readonly label: "Second Class - Upper Credit/Division";
        readonly value: 3;
    }, {
        readonly label: "Second Class - Lower Credit/Division";
        readonly value: 2;
    }, {
        readonly label: "Third Class";
        readonly value: 1;
    }];
};
export declare const schemes: {
    readonly percentage: {
        readonly name: "Higher Education Percentage Scale : 0-100";
        readonly max: 100;
        readonly min: 0;
        readonly step: 0.1;
        readonly averages: null;
        readonly key: "percentage";
        readonly computeCGPA: (val: number) => number;
    };
    readonly "5_diploma": {
        readonly name: "National Diploma/Higher National Diploma 5.0 Scale";
        readonly max: 5;
        readonly min: 0;
        readonly step: 0.1;
        readonly averages: null;
        readonly key: "5_diploma";
        readonly computeCGPA: (val: number) => number;
    };
    readonly "4_diploma": {
        readonly name: "National Diploma/Higher National Diploma 4.0 Scale";
        readonly max: 4;
        readonly min: 0;
        readonly step: 0.1;
        readonly averages: null;
        readonly key: "4_diploma";
        readonly computeCGPA: (val: number) => number;
    };
    readonly division: {
        readonly name: "Higher Education Division Scale";
        readonly max: 4;
        readonly min: 1;
        readonly step: 1;
        readonly averages: readonly [{
            readonly label: "First class";
            readonly value: 4;
        }, {
            readonly label: "Second Class - Upper Credit/Division";
            readonly value: 3;
        }, {
            readonly label: "Second Class - Lower Credit/Division";
            readonly value: 2;
        }, {
            readonly label: "Third Class";
            readonly value: 1;
        }];
        readonly key: "division";
        readonly computeCGPA: (val: number) => number;
    };
    readonly education: {
        readonly name: "Higher Education 5.0 Scale";
        readonly max: 5;
        readonly min: 0;
        readonly step: 0.1;
        readonly averages: null;
        readonly key: "education";
        readonly computeCGPA: (val: number) => number;
    };
    readonly waec: {
        readonly name: "West African Examinations Council (WAEC) -  Scale A1-F9";
        readonly max: 9;
        readonly min: 1;
        readonly step: 1;
        readonly averages: readonly [{
            readonly label: "A1";
            readonly value: 9;
        }, {
            readonly label: "B2";
            readonly value: 8;
        }, {
            readonly label: "B3";
            readonly value: 7;
        }, {
            readonly label: "C4";
            readonly value: 6;
        }, {
            readonly label: "C5";
            readonly value: 5;
        }, {
            readonly label: "C6";
            readonly value: 4;
        }, {
            readonly label: "D7";
            readonly value: 3;
        }, {
            readonly label: "E8";
            readonly value: 2;
        }, {
            readonly label: "F9";
            readonly value: 1;
        }];
        readonly key: "waec";
        readonly computeCGPA: (val: number) => number;
    };
    readonly neco: {
        readonly name: "National Examinations Council (NECO) -  Scale A1-F9";
        readonly max: 9;
        readonly min: 1;
        readonly step: 1;
        readonly averages: readonly [{
            readonly label: "A1";
            readonly value: 9;
        }, {
            readonly label: "B2";
            readonly value: 8;
        }, {
            readonly label: "B3";
            readonly value: 7;
        }, {
            readonly label: "C4";
            readonly value: 6;
        }, {
            readonly label: "C5";
            readonly value: 5;
        }, {
            readonly label: "C6";
            readonly value: 4;
        }, {
            readonly label: "D7";
            readonly value: 3;
        }, {
            readonly label: "E8";
            readonly value: 2;
        }, {
            readonly label: "F9";
            readonly value: 1;
        }];
        readonly key: "neco";
        readonly computeCGPA: (val: number) => number;
    };
};
export declare const educationLevels: {
    readonly primary: readonly [{
        readonly level: "Grade 1";
        readonly schemes: null;
        readonly levelValue: 1;
    }, {
        readonly level: "Grade 2";
        readonly schemes: null;
        readonly levelValue: 2;
    }, {
        readonly level: "Grade 3";
        readonly schemes: null;
        readonly levelValue: 3;
    }, {
        readonly level: "Grade 4";
        readonly schemes: null;
        readonly levelValue: 4;
    }, {
        readonly level: "Grade 5";
        readonly schemes: null;
        readonly levelValue: 5;
    }, {
        readonly level: "Grade 6";
        readonly schemes: null;
        readonly levelValue: 6;
    }, {
        readonly level: "Grade 7";
        readonly schemes: null;
        readonly levelValue: 7;
    }, {
        readonly level: "Grade 8";
        readonly schemes: null;
        readonly levelValue: 8;
    }];
    readonly secondary: readonly [{
        readonly level: "Grade 9";
        readonly schemes: null;
        readonly levelValue: 9;
    }, {
        readonly level: "Grade 10";
        readonly schemes: null;
        readonly levelValue: 10;
    }, {
        readonly level: "Grade 11";
        readonly schemes: null;
        readonly levelValue: 11;
    }, {
        readonly level: "Grade 12 / High School";
        readonly schemes: readonly [{
            readonly name: "West African Examinations Council (WAEC) -  Scale A1-F9";
            readonly max: 9;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "A1";
                readonly value: 9;
            }, {
                readonly label: "B2";
                readonly value: 8;
            }, {
                readonly label: "B3";
                readonly value: 7;
            }, {
                readonly label: "C4";
                readonly value: 6;
            }, {
                readonly label: "C5";
                readonly value: 5;
            }, {
                readonly label: "C6";
                readonly value: 4;
            }, {
                readonly label: "D7";
                readonly value: 3;
            }, {
                readonly label: "E8";
                readonly value: 2;
            }, {
                readonly label: "F9";
                readonly value: 1;
            }];
            readonly key: "waec";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Examinations Council (NECO) -  Scale A1-F9";
            readonly max: 9;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "A1";
                readonly value: 9;
            }, {
                readonly label: "B2";
                readonly value: 8;
            }, {
                readonly label: "B3";
                readonly value: 7;
            }, {
                readonly label: "C4";
                readonly value: 6;
            }, {
                readonly label: "C5";
                readonly value: 5;
            }, {
                readonly label: "C6";
                readonly value: 4;
            }, {
                readonly label: "D7";
                readonly value: 3;
            }, {
                readonly label: "E8";
                readonly value: 2;
            }, {
                readonly label: "F9";
                readonly value: 1;
            }];
            readonly key: "neco";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 12;
    }];
    readonly undergraduate: readonly [{
        readonly level: "1-Year Post Secondary Certificate";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 5.0 Scale";
            readonly max: 5;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "5_diploma";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 4.0 Scale";
            readonly max: 4;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "4_diploma";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 13;
    }, {
        readonly level: "2-Year Undergratuate Diploma";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 5.0 Scale";
            readonly max: 5;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "5_diploma";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 4.0 Scale";
            readonly max: 4;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "4_diploma";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 14;
    }, {
        readonly level: "3-Year Undergratuate Advanced Diploma";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 5.0 Scale";
            readonly max: 5;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "5_diploma";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "National Diploma/Higher National Diploma 4.0 Scale";
            readonly max: 4;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "4_diploma";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 15;
    }, {
        readonly level: "3-Year Bachelors Degree";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 16;
    }, {
        readonly level: "4-Year Bachelors Degree";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education 5.0 Scale";
            readonly max: 5;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "education";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 17;
    }, {
        readonly level: "5-Year Bachelors Degree";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education 5.0 Scale";
            readonly max: 5;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "education";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 18;
    }];
    readonly postgraduate: readonly [{
        readonly level: "Postgraduate Certificate/Diploma";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 19;
    }, {
        readonly level: "Masters Degree";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 20;
    }, {
        readonly level: "Doctoral Degree (Phd, M.D., ...)";
        readonly schemes: readonly [{
            readonly name: "Higher Education Percentage Scale : 0-100";
            readonly max: 100;
            readonly min: 0;
            readonly step: 0.1;
            readonly averages: null;
            readonly key: "percentage";
            readonly computeCGPA: (val: number) => number;
        }, {
            readonly name: "Higher Education Division Scale";
            readonly max: 4;
            readonly min: 1;
            readonly step: 1;
            readonly averages: readonly [{
                readonly label: "First class";
                readonly value: 4;
            }, {
                readonly label: "Second Class - Upper Credit/Division";
                readonly value: 3;
            }, {
                readonly label: "Second Class - Lower Credit/Division";
                readonly value: 2;
            }, {
                readonly label: "Third Class";
                readonly value: 1;
            }];
            readonly key: "division";
            readonly computeCGPA: (val: number) => number;
        }];
        readonly levelValue: 21;
    }];
};
