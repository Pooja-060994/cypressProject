import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";

describe("GM Assignment :: Tables", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();

  before(() => {
    cy.visit('/')
  });

  let testdata: any;
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.fixture("test-data").then((data) => (testdata = data));
  });

  it("Verify user can enter new data into the table", () => {
      landingObj.clickElementsCard();
      elementsObj.clickWebTablesTab();
      elementsObj.clickAddButton();
      elementsObj.fillRegistrationForm(testdata["originalData"]);
      elementsObj.verifyRegisteredData(testdata["originalData"]);
  });

  it("Verify user can edit the row in a table", () => {
    elementsObj.clickEditButton(testdata["originalData"]["First Name"]);
    elementsObj.verifyRegistrationFormTitle();
    elementsObj.setFirstNameField(testdata["updatedData"]["First Name"]);
    elementsObj.setLastNameField(testdata["updatedData"]["Last Name"]);
    elementsObj.clickSubmitButton();
    elementsObj.verifyRegisteredData(testdata["updatedData"]);
  });
});
