describe('Properly displays products', () => {
  it('Visits the initial project page', () => {
    cy.visit('/products');
    let products = cy.get('#all-products-div');
    console.log(products);
    cy.contains('Notebook Basic 15');
    cy.contains('Notebook Basic 17');
    cy.contains('Comfort Senior');
    let singleProduct = products.get('#product-card');
    let productRef = products.get('#product-link');
    productRef.click();
    cy.contains('Inapoi la produse');
  });
});
