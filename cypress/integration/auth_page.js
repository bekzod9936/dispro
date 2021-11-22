describe("auth_check", () => {
  it("renders auth page", () => {
    beforeEach(cy.visit("/"));
    cy.get("[data-cy]=number");
  });
});
