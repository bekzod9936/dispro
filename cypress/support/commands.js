// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const apiServer = Cypress.env("api_server");
const { CREDENTIAL_FILE_PATH } = require("../support/constants");

Cypress.Commands.add("login", () => {
  cy.readFile(CREDENTIAL_FILE_PATH).then(({ phoneNumber, userType }) => {
    return cy
      .request({
        method: "POST",
        url: `${apiServer}/auth/signup`,
        body: {
          // eslint-disable-next-line no-undef
          telNumber: phoneNumber,
          userType: userType,
        },
        headers: {
          langId: 1,
          vers: "0.0.1",
        },
      })
      .then(() => {
        return cy.request({
          method: "POST",
          url: `${apiServer}/auth/login`,
          body: {
            // eslint-disable-next-line no-undef
            smsCode: "1234",
            telNumber: phoneNumber,
            userType: userType,
          },
          headers: {
            langId: 1,
            vers: "0.0.1",
          },
        });
      })
      .then((res) => {
        localStorage.setItem("partner_access_token", res.body.data.accessToken);
        localStorage.setItem(
          "partner_refresh_token",
          res.body.data.refreshToken
        );
        return cy.request({
          method: "PUT",
          url: `${apiServer}/auth/update-token`,
          body: {
            // eslint-disable-next-line no-undef
            companyId: 18,
            companyType: 1,
          },
          headers: {
            langid: 1,
            vers: "0.0.1",
            authorization: `Bearer ${res.body.data.accessToken}`,
          },
        });
      })
      .then((res) => {
        localStorage.setItem("companyToken", res.body.data.accessToken);
      });
  });
});
