import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@/components/(.*)$": "<rootDir>/_components/$1",
    "^@/actions/(.*)$": "<rootDir>/_actions/$1",
    "^@/services/(.*)$": "<rootDir>/_services/$1",
    "^@/providers/(.*)$": "<rootDir>/_providers/$1",
  },
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  clearMocks: true,
  coverageProvider: "v8",
};

export default config;
