
export default class LandingPage {
  /**
  * Added locators as private variables
  */
  private elementsCard = "Elements";

  /**
  * Method to click elements card
  */
  clickElementsCard() {
    cy.contains(this.elementsCard).should('be.visible').click();
  }
}
