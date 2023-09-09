export default class DragAndDropPage {
  /**
  * Added locators as private variables
  */
  private draggable = "#draggable";
  private droppable = "#droppable";

    /**
    * Method to verify drag and drop func.
    */
      verifyDragAndDrop() {
          cy.get(this.draggable).trigger('mousedown', { which: 1 });
          cy.get(this.droppable).trigger('mousemove');
          cy.get(this.draggable).trigger('mouseup', { force: true });
          cy.get(this.draggable).next().first().should('have.attr','id','droppable')
      }
}
