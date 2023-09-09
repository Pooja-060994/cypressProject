import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";
import ToolTipPage from "../pageObjects/tooltip.page";

describe("GM Assignment :: Tool Tip", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();
  const tooltipObj = new ToolTipPage();

  before(() => {
    cy.visit('/')
    landingObj.clickElementsCard();
  });

  it("Verify tool-tip", () => {
    elementsObj.clickTooltipTab();
    tooltipObj.verifyToolTip("You hovered over the Button");
  });
});
