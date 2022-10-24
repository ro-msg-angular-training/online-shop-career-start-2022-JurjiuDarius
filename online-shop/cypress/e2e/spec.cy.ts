describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Acasa');
    cy.contains('Acasa');
    cy.contains('Acasa');
  });
});
