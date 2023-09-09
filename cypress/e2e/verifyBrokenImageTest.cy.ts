import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";
import BrokenImagePage from "../pageObjects/brokenImage.page";

describe("GM Assignment :: Broken Images", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();
  const brokenImgObj = new BrokenImagePage();

  before(() => {
    cy.visit('/')
    landingObj.clickElementsCard();
  });

  it("Verify broken image", () => {
    elementsObj.clickBrokenLinksTab();
    brokenImgObj.verifyBrokenImages();
  });

});
