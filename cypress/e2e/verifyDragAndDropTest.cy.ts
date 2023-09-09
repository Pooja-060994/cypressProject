import LandingPage from "../pageObjects/landing.page";
import ElementsPage from "../pageObjects/elements.page";
import DragAndDropPage from "../pageObjects/dragAndDrop.page";

describe("GM Assignment :: Drag And Drop", () => {
  const landingObj = new LandingPage();
  const elementsObj = new ElementsPage();
  const dragAndDropObj = new DragAndDropPage();

  before(() => {
    cy.visit('/')
    landingObj.clickElementsCard();
  });

  it("Verify user can drag and drop", () => {
    elementsObj.clickDroppableTab();
    dragAndDropObj.verifyDragAndDrop();
  });
});
