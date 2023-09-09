export default class ElementsPage {
    /**
    * Added locators as private variables
    */
    private webTablesTab = "Web Tables";
    private brokenLinksTab="Broken Links - Images"
    private formsTab="Forms"
    private practiceFormsTab="Practice Form"
    private widgetsTab="Widgets"
    private progressBarTab="Progress Bar"
    private tooltipTab="Tool Tips"
    private interactionsTab="Interactions"
    private droppableTab="Droppable"
    private addButton="#addNewRecordButton";
    private firstNameField="#firstName";
    private lastNameField="#lastName";
    private emailField="#userEmail";
    private ageField="#age";
    private salaryField="#salary";
    private depttField="#department";
    private submitButton="#submit";
    private tableHeader='[role="columnheader"] div[class$=header-content]';
    private rowsData='.rt-tr-group>div>div:not(:has(span))';
    private nameData=".rt-tr-group>div>div:first-of-type";
    private regFormTitle='[id="registration-form-modal"]';

    /**
    * Method to click webtables tab
    */
    clickWebTablesTab() {
        cy.contains(this.webTablesTab).should('be.visible').click();
    }

    /**
    * Method to click broken links tab
    */
    clickBrokenLinksTab() {
        cy.contains(this.brokenLinksTab).should('be.visible').click();
    }

    /**
    * Method to click practice forms tab
    */
    clickPracticeFormsTab() {
        cy.contains(this.formsTab).should('be.visible').click();
        cy.contains(this.practiceFormsTab).should('be.visible').click();
    }

    /**
    * Method to click tables add button
    */
    clickAddButton() {
        cy.get(this.addButton).should('be.visible').click();
    }

    /**
    * Method to click progress bar tab
    */
    clickProgressBarTab() {
        cy.contains(this.widgetsTab).should('be.visible').click();
        cy.contains(this.progressBarTab).should('be.visible').click();
    }
    /**
    * Method to click tooltips tab
    */
    clickTooltipTab() {
        cy.contains(this.widgetsTab).should('be.visible').click();
        cy.contains(this.tooltipTab).should('be.visible').click();
    }

    /**
    * Method to click droppable tab
    */
    clickDroppableTab() {
        cy.contains(this.interactionsTab).should('be.visible').click();
        cy.contains(this.droppableTab).should('be.visible').click();
    }

    /**
    * Method to enter first name in table
    */
    setFirstNameField(fName: string){
        cy.get(this.firstNameField).should('be.visible').clear().type(fName);
    }

    /**
    * Method to enter last name in table
    */
    setLastNameField(lName: string) {
        cy.get(this.lastNameField).should('be.visible').clear().type(lName);
    }

    /**
    * Method to enter email in table
    */
    setEmailField(email: string) {
        cy.get(this.emailField).should('be.visible').clear().type(email);
    }

    /**
    * Method to enter age in table
    */
    setAgeField(age: number) {
        cy.get(this.ageField).should('be.visible').clear().type(age);
    }

    /**
    * Method to enter salary in table
    */
    setSalaryField(salary: number) {
        cy.get(this.salaryField).should('be.visible').clear().type(salary);
    }

    /**
    * Method to enter department in table
    */
    setDepttField(deptt: string) {
        cy.get(this.depttField).should('be.visible').clear().type(deptt);
    }

    /**
    * Method to click submit button
    */
    clickSubmitButton() {
        cy.get(this.submitButton).should('be.visible').click({force:true});
    }

    /**
    * Method to fill table registration form
    */
    fillRegistrationForm(details){
        this.setFirstNameField(details["First Name"]);
        this.setLastNameField(details["Last Name"]);
        this.setEmailField(details["Email"]);
        this.setAgeField(details["Age"]);
        this.setSalaryField(details["Salary"]);
        this.setDepttField(details["Department"]);
        this.clickSubmitButton();
    }

    /**
    * Method to verify table registration form data
    */
    verifyRegisteredData(expected){
      const headers: string[] = [];
      cy.get(this.tableHeader).each(($el) => {
        const columnName = $el.text();
        headers.push(columnName);
      })
      const items: string[] = [];
      cy.get(this.rowsData).each(($el) => {
        const data = String($el.text());
        if(data!=" "){
          items.push(data);
        }
      }).then(()=>{
        const allData = [];
        for (let i = 0; i < items.length; i += headers.length-1) {
          const chunk = items.slice(i, i + headers.length-1);
          const obj = {};
          for (let j = 0; j < headers.length-1; j++) {
            obj[headers[j]] = chunk[j];
          }
          allData.push(obj);
        }
        expect(allData).to.deep.include(expected)
      })
    }

    /**
    * Method to click table edit button of specific record
    */
    clickEditButton(fName) {
      const names=[]
      cy.get(this.nameData).each(($el) => {
        const data = String($el.text());
        names.push(data)
      }).then(()=>{
        for (let j = 0; j < names.length-1; j++) {
          if(names[j]===fName){
            cy.get(`[id="edit-record-${j+1}"]`).click()
            break;
          }
        }
      })
    }

    /**
    * Method to verify registration dialogue title
    */
    verifyRegistrationFormTitle(){
      cy.get(this.regFormTitle).should('have.text',"Registration Form")

    }
}
