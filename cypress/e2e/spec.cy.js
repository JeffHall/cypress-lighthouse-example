/// <reference types="@cypress-audit/lighthouse" />


describe('Performance: login and initial map load', () => {

  const username = Cypress.env('test_user_username')
  const password = Cypress.env('test_user_password')
  const outputFile = 'test-results/cypress_ui_performance_test_results.csv'
  const now = new Date();
  const today = now.toISOString().substring(0, 10);

  before(() => {
    cy.visit('/login?captcha=false')
    cy.login(username, password)
  })

  it('C162049: should load initial map within Lighthouse threshold', () => {

    const thresholds = {
      // 'performance' is the Lighthouse score itself.
      performance: 30,
    }

    const opts = {
      formFactor: "desktop",
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
    }

    cy.url()
      .then((url) => {
        cy.task('lighthouse', {
          url,
          thresholds,
          opts,
        })
      })
      .then((report) => {
        const { errors, results, txt } = report
        cy.log(report.txt)
        const logString = today + ',' + 'initialMapLoad,'
        cy.writeFile(outputFile, logString + report.txt)
      })
  })
})
