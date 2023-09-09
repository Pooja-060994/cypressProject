import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";
import PracticeFormPage from "../pageObjects/practiceForm.page";

describe("GM Assignment :: Forms", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();
  const practiceFormObj = new PracticeFormPage();

  before(() => {
    cy.visit('/')
    landingObj.clickElementsCard();
  });

  let testdata: any;
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.fixture("test-data").then((data) => (testdata = data));
  });

  it("Verify user can submit the form", () => {
    elementsObj.clickPracticeFormsTab();
    practiceFormObj.fillForm(testdata["formData"]);
    practiceFormObj.verifyFormData(testdata["expectedFormData"]);
    practiceFormObj.closeTableModal();
  });
});
