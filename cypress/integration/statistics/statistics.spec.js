context("statistics side", () => {
  beforeEach(() => {
    cy.login();
  });

  it("something", () => {
    cy.visit("/statistics/clients");
    cy.get("body").find("button").click();
  });
});
