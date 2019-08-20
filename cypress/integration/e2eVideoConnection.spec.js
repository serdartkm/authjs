/* eslint-disable no-undef */
describe('Testing end to end video client connection', function() {
  it('E2E connection established', function() {
    cy.visit('/'); // change URL to match your dev URL
    cy.wait(2000)  
    cy.get('.caller')
      .find('.call')
      .click();
    cy.wait(2000)  
    cy.get('.callee')
      .find('.answer')
      .click();
  });
});
