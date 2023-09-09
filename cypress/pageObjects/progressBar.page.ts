export default class ProgressBarPage {
  /**
  * Added locators as private variables
  */
  private startButton = "#startStopButton";
  private progressBar="[class^=progress-bar]"

  /**
  * Method to click start button
  */
  clickStartButton() {
    cy.get(this.startButton).should('be.visible').click();
  }

  /**
  * Method to verify progress bar
  */
  verifyProgressBar(){
    cy.wait(12000) //required to complete bar
    cy.get(this.progressBar).should('have.css', 'width').then((width) => {
      const parentWidth = Cypress.$('.progress').width()
      const widthPercentage = parseFloat(width) / parentWidth * 100
      expect(widthPercentage).to.equal(100)
    })
  }
}
