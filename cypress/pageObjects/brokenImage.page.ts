export default class BrokenImagePage {

    /**
    * Method to verify broken images
    */
      verifyBrokenImages(){
        cy.contains('Broken image').next().then(($el) => {
          cy.wrap($el).should('have.prop', 'naturalWidth').and('to.be.eq', 0);
        });
    }
}
