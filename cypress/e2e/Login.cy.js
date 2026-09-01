describe('Login Test', () => {
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').should('exist').type('jonalumuk@gmail.com', { force: true });
    cy.get('input[name="password"]').should('exist').type('12345678', { force: true });
    cy.get('button[type="submit"]').should('exist').click({ force: true });
    cy.url().should('include', '/'); // Ensure this is the correct path
  });
});
