import "@cypress-audit/lighthouse/commands"

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.Commands.add('login', (username, password) => {
  cy.wait(500)
  cy.clearCookies()
  cy.get('[data-cy=email-input]').type(username)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('#onetrust-button-group #onetrust-accept-btn-handler').click()
  cy.get('[data-cy=login-button]').click()
})
