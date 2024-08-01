describe('Networking Events Test', () => {
    it('should access networking events and display them correctly', () => {
      // Visit the networking events page
      cy.visit('http://localhost:3000/networking');
  
      // Check that the networking events page contains expected elements
      cy.get('h1').contains('Networking Events').should('exist');
      cy.get('.container').should('have.length.greaterThan', 0); // Ensure there are events listed
  
      // Verify specific event content with increased timeout
      cy.get('.container', { timeout: 10000 }).first().should('contain', 'Google I/O Extended Nairobi'); 
    });
  });
  