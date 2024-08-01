describe('Career Resources Test', () => {
  it('should access career resources and display them correctly', () => {
    cy.visit('http://localhost:3000/resources');

    // Check that the career resources page contains expected elements
    cy.get('h1').contains('Career Resources').should('exist'); // Ensure the page header is correct
    cy.get('.resource-item').should('have.length.greaterThan', 0); // Ensure there are resources listed

    // Optionally, verify specific resource content
    cy.get('.resource-item').first().should('contain', 'How to Write a Resume');
  });
});
