/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testPathIgnorePatterns: ["./__tests__/helpers", "./lib", "./shared"],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "./src/infrastructure/repository/prisma-client",
    "./shared",
    "./lib",
    "./__tests__",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "json", "lcov", "text", "html"],
  coverageProvider: "v8",
  transformIgnorePatterns: ["/node_modules/"],
  workerIdleMemoryLimit: "1GB",
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
