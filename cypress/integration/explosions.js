describe("explosion tests", () => {
  it("landing", () => {
    cy.visit("/");
    cy.get("header").children().its("length").should("be.gte", 0);
    cy.get("main").children().its("length").should("be.gte", 0);
    cy.get("footer").children().its("length").should("be.gte", 0);
  });
  it("routes for signed in user", () => {
    cy.visit("/settings");
    cy.visit("/platform");
    cy.visit("/posts");
    cy.visit("/my-courses");
  });
});
