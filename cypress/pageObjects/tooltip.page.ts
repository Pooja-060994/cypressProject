
export default class ToolTipPage {
  /**
  * Added locators as private variables
  */
  private toolTipButton = "#toolTipButton";
  private tooltipText='[class="tooltip-inner"]'

  /**
  * Method to verify tooltip
  */
  verifyToolTip(tooltipText) {
    cy.get(this.toolTipButton).trigger('mouseover')
    cy.get(this.tooltipText).should('have.text', tooltipText)
  }
}
