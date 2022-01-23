const selector = {
  form: {
    staffRole: "[name=role]",
    phoneNumber: "input[name=phoneNumber]",
    smsCode: "input[name=smsCode]",
  },
  button: {
    signUp: '[data-cy="sign-up"]',
    login: '[data-cy="login"]',
  },
};

context("Login test", () => {
  //login for administrator
  beforeEach(() => {
    cy.visit("/");
  });

  it("login succes for admin", () => {
    cy.intercept(`POST`, "**/auth/signup").as("login");
    // cy.get(selector.button.login).click();
    cy.get(".css-319lph-ValueContainer")
      .click()
      .find("input")
      .focus()
      .get("#react-select-3-option-0")
      .click();
    // cy.contains("Администратор").click({ force: true });
    cy.get(selector.form.phoneNumber).type("998577840");
    cy.get(selector.button.signUp).click();

    cy.wait(`@login`).then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.get(selector.form.smsCode).type("1234");
    cy.get(selector.button.login).click();
  });

  it("login success for manager", () => {
    cy.intercept(`POST`, "**/auth/signup").as("login");
    // cy.get(selector.button.login).click();
    cy.get(".css-319lph-ValueContainer")
      .click()
      .find("input")
      .focus()
      .get("#react-select-3-option-1")
      .click();
    // cy.contains("Администратор").click({ force: true });
    cy.get(selector.form.phoneNumber).type("998577840");
    cy.get(selector.button.signUp).click();

    cy.wait(`@login`).then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });

    cy.get(selector.form.smsCode).type("1234");
    cy.get(selector.button.login).click();
    cy.location("pathname").should("eq", "/partner/company");
  });
});
