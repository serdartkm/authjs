/* eslint-disable no-undef */
describe('@webrtc-signaling', function() {
  this.beforeEach(function() {
    cy.visit('/nodejssingnaling');
    cy.wait(2000)  
  });
  it('video offer is received', function() {
    cy.get('.caller').contains('connected');
    cy.get('.callee').contains('connected');
    cy.get('.caller')
      .find('.offerBtn')
      .should('be.enabled');
    cy.get('.caller')
      .find('.offerBtn')
      .click();
    cy.get('.callee')
      .find('.offer-video')
      .contains('video-offer from clientOne');
  });

  it('video answer is received', function() {
    cy.get('.caller').contains('connected');
    cy.get('.callee').contains('connected');
    cy.get('.callee')
      .find('.answerBtn')
      .should('be.enabled');
    cy.get('.callee')
      .find('.answerBtn')
      .click();
    cy.get('.caller').contains('video-answer from clientTwo');
  });
  it('video candidate from clientOne received', function() {
    cy.get('.caller').contains('connected');
    cy.get('.callee').contains('connected');
    cy.get('.caller')
      .find('.candidateBtn')
      .should('be.enabled');
    cy.get('.caller')
      .find('.candidateBtn')
      .click();
    cy.get('.callee').contains('candidate from clientOne');
  });
  it('video candidate from clientTwo received', function() {
    cy.get('.caller').contains('connected');
    cy.get('.callee').contains('connected');
    cy.get('.callee')
      .find('.candidateBtn')
      .should('be.enabled');
    cy.get('.callee')
      .find('.candidateBtn')
      .click();
    cy.get('.caller').contains('candidate from clientTwo');
  });

  it('clientOne closes connection', function() {
    cy.get('.caller').contains('connected');
    cy.get('.callee').contains('connected');
    cy.get('.caller')
      .find('.closeBtn')
      .should('be.enabled');
    cy.get('.caller')
      .find('.closeBtn')
      .click();
    cy.get('.callee').contains('disconnected');
    cy.get('.caller').contains('disconnected');
  });
});
