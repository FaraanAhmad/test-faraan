describe('Movie Management Frontend', () => {
  let baseUrl;
  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url; // Store the base URL
      cy.visit(baseUrl);
    });
  });
  after(() => {
    return cy.task('stopServer'); // Stop the server after the report is done
  });


  it('should update an existing resource', () => {
    cy.visit(baseUrl);
    // Click the edit button for the resource
    cy.get('button.btn-warning').filter(':contains("Edit")').last().click();
    // // Update resource details
    cy.get('#editImage').clear().type('Updated Resource', { force: true });
    cy.get('#editTitle').clear().type('Updated Location', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editDirectors').clear().type('Updated Directors', { force: true });
    cy.get('#editWriters').clear().type('Updated Writers', { force: true });
    cy.get('#editStars').clear().type('Updated Stars', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();
    // Verify the resource is updated in the table
    cy.get('#tableContent').contains('Updated Resource').should('exist');
    cy.get('#tableContent').contains('Test Resource').should('not.exist');
  });
});