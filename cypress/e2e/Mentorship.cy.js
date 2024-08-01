describe('Booking Mentor Sessions Test', () => {
    it('should access the mentors page and book a session', () => {
      // Visit the mentors page
      cy.visit('http://localhost:3000/mentorship');
  
      // Check that the mentors page contains expected elements
      cy.get('h1').contains('Career Mentorship').should('exist');
      cy.get('.card').should('exist');
  
      // Fill out booking form and submit
      cy.get('input[name="name"]').should('exist').type('John Doe');
      cy.get('input[name="email"]').should('exist').type('johndoe@example.com');
      cy.get('input[name="date"]').should('exist').type('2024-08-02');
      cy.get('select[name="mentor"]').should('exist').select('Robert Wilson');
      cy.get('button[type="submit"]').should('exist').click();
  
      // Check for booking confirmation alert
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Booking request sent!');
      });
    });
  });
  