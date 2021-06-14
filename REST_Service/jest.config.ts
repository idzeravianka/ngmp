export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testMatch: [
        '**/__tests__/**/*.[t]s?(x)',
        '**/?(*.)+(spec|test).[t]s?(x)'
    ],
    setupFiles: [
        'dotenv/config'
    ],
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    }
};
