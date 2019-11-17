module.exports = {
    preset: 'jest-puppeteer',
	testMatch: ["**/?(*.)+(spec|test).[t]s"],
	testPathIgnorePatterns: ['/node_modules/', 'dist'], // 
	setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
	transform: {
		"^.+\\.ts?$": "ts-jest"
	},
	globalSetup: './tests/jest.global-setup.ts', // will be called once before all tests are executed
	globalTeardown: './tests/jest.global-teardown.ts' // will be called once after all tests are executed
}