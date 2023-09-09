import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";
import ProgressBarPage from "../pageObjects/progressBar.page";

describe("GM Assignment :: Progress Bar", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();
  const progressBarObj = new ProgressBarPage();

  before(() => {
    cy.visit('/')
    landingObj.clickElementsCard();
  });

  it("Verify progress bar", () => {
    elementsObj.clickProgressBarTab();
    progressBarObj.clickStartButton();
    progressBarObj.verifyProgressBar();
  });
});
