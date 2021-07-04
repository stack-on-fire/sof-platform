describe("explosion tests", () => {
  it("landing", () => {
    cy.visit("/");
    cy.get("header").children().its("length").should("be.gte", 0);
    cy.get("main").children().its("length").should("be.gte", 0);
    cy.get("footer").children().its("length").should("be.gte", 0);
  });
});
