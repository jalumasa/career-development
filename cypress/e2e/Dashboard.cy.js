describe('Dashboard Test', () => {
    it('should display statistics correctly on the dashboard', () => {
      // Visit the dashboard page
      cy.visit('http://localhost:3000/dashboard');
  
      // Check that the dashboard page contains expected elements
      cy.get('h1').contains('Admin Dashboard').should('exist');
  
      // Check for statistics
      cy.get('.stat-item').contains('Active Users:').should('exist');
      cy.get('.stat-item').contains('Resource Views:').should('exist');
      cy.get('.stat-item').contains('Mentor Bookings:').should('exist');
  
      // Verify that the chart is rendered correctly
      cy.get('canvas').should('exist');
    });
  });
  