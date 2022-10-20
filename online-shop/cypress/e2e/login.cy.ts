describe('Log in works properly', () => {
  it('Gets redirected properly', () => {
    cy.visit('/products/add');
    cy.contains('Acasa');
  });
  it('Logs in as admin properly', () => {
    cy.visit('/login');
    let username = cy.get('#username');
    let password = cy.get('#password');
    let submit = cy.get('#login-submit');
    username.type('blackj');
    password.type('12345678');
    submit.click();
    cy.contains('Adaugati un produs nou');
  });
});
