import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    testIsolation: false,

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    }
}

  },
})
