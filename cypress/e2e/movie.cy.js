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
    cy.get('#movieIdInput').clear().type('1731983610108878', { force: true });
    cy.get('button[onclick="editMovie()"]').click();
    // // Update resource details
    cy.get('#editImage').clear().type('Updated Resource', { force: true });
    cy.get('#editTitle').clear().type('Updated Location', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editDirector').clear().type('Updated Directors', { force: true });
    cy.get('#editWriter').clear().type('Updated Writers', { force: true });
    cy.get('#editStar').clear().type('Updated Stars', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();
    // Verify the resource is updated in the table
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Movie updated successfully');
    });

  });

  it('All fields require input', () => {
    cy.visit(baseUrl);
    // Click the edit button for the resource
    cy.get('#movieIdInput').clear().type('1731983610108878', { force: true });
    cy.get('button[onclick="editMovie()"]').click();
    // // Update resource details
    cy.get('#editImage').clear().type('Updated Resource', { force: true });
    cy.get('#editTitle').clear();
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editDirector').clear().type('Updated Directors', { force: true });
    cy.get('#editWriter').clear().type('Updated Writers', { force: true });
    cy.get('#editStar').clear().type('Updated Stars', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();

    cy.get('#editMessage').contains('All fields are required!').should('exist');
  });

  it('All fields require input', () => {
    cy.visit(baseUrl);
    // Click the edit button for the resource
    cy.get('#movieIdInput').clear().type('1731983610108878', { force: true });
    cy.get('button[onclick="editMovie()"]').click();
    // // Update resource details
    cy.get('#editImage').clear().type('Updated Resource', { force: true });
    cy.get('#editTitle').clear().type(' ', { force: true });
    cy.get('#editDescription').clear().type('Updated Description', { force: true });
    cy.get('#editDirector').clear().type('Updated Directors', { force: true });
    cy.get('#editWriter').clear().type('Updated Writers', { force: true });
    cy.get('#editStar').clear().type('Updated Stars', { force: true });
    // Click the update resource button
    cy.get('#updateButton').click();

    cy.get('#editMessage').contains('Movie title cannot be just whitespace.').should('exist');
  });
});