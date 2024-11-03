// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: { "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub" },
};
