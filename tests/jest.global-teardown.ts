import { GlobalConfig } from "@jest/types/build/Config"

// global-teardown.js
const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer')

module.exports = async function globalTeardown(globalConfig: GlobalConfig) {
  // Your global teardown
  await teardownPuppeteer(globalConfig)
}