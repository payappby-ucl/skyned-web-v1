/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testPathIgnorePatterns: ["./__tests__/helpers", "./lib"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "json", "lcov", "text", "html"],
  coverageProvider: "v8",
  // coverageThreshold: {
  //   // eslint-disable-next-line quote-props
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  //   "./src/components/": {
  //     branches: 40,
  //     statements: 40,
  //   },
  //   "./src/reducers/**/*.js": {
  //     statements: 90,
  //   },
  //   "./src/api/very-important-module.js": {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
};
