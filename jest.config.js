export default {
  transform: {},
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  moduleNameMapper: {
    "^py-range$": "<rootDir>/src/index.js",
  },
};
