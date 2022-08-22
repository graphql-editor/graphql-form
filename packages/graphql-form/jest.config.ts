import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        '@/(.*)': ['<rootDir>/src/'],
    },
    testMatch: ['**/*.spec.(ts|tsx)'],
    watchPathIgnorePatterns: ['node_modules'],
    watchman: false,
};
export default config;
