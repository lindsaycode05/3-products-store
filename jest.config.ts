import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.js$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', __dirname],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      '<rootDir>/fileMock.js',
  },
  coverageProvider: 'babel',
};

export default config;
