describe("Login page", () => {
  before(() => {
    cy.log(`Visiting https://company.tld`);
    cy.visit("/api/auth/signin");
  });
  it("Login with Github", () => {
    const username = Cypress.env("GITHUB_USER");
    const password = Cypress.env("GITHUB_PASSWORD");
    const loginUrl = `${Cypress.env("SITE_NAME")}/api/auth/signin`;
    const cookieName = Cypress.env("COOKIE_NAME");

    const selector = `[action="${Cypress.env(
      "SITE_NAME"
    )}/api/auth/signin/github"]`;

    console.log(`[${selector}]`);
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: false,
      logs: true,
      args: ["--no-sandbox"],
      screenshotOnError: true,
      loginSelector: `${selector}`,
      postLoginSelector: ".signed-in",
    };

    return cy
      .task("GitHubSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies();

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop();
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          });

          Cypress.Cookies.defaults({
            preserve: cookieName,
          });
        }
        cy.visit("/");
        cy.get(".signed-in");
      });
  });
});
