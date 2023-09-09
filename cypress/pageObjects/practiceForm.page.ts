import ElementsPage from "../pageObjects/elements.page";
export default class PracticeFormPage {
  /**
  * Imported class ElementsPage to use its methods in this class
  */
  private elementsPageInstance: ElementsPage;
  /**
  * Added locators as private variables
  */
  private mobileNumber='#userNumber';
  private month='[class$=month-select]'
  private year='[class$=year-select]'
  private day='[class*=datepicker__day]'
  private datePicker='#dateOfBirthInput'
  private subjectField='#subjectsContainer'
  private addressField='#currentAddress'
  private stateField='#state'
  private cityField='#city'
  private tableLabels='tbody>tr>td:first-child'
  private tableValues='tbody>tr>td:last-child'
  private closeModal='#closeLargeModal'

    /**
    * Created constructors to ceate reference of ElementsPage to use its methods
    */
    constructor() {
      this.elementsPageInstance = new ElementsPage();
    }

    /**
    * Method to select date of birth
    */
    selectDate(dateOfBirth){
      cy.get(this.datePicker).click()
      const date: string = dateOfBirth;
      const regex = /^(\d{1,2})\w{2}\s(\w+)\s(\d{4})$/;
      const match = date.match(regex);
      if (match) {
        const day = match[1]; // "15"
        const month = match[2]; // "January"
        const year = match[3]; // "1990"
        cy.get(this.month).select(month)
        cy.get(this.year).select(year)
        cy.get(this.day).contains(day).click()
      }
    }
    /**
    * Method to select state and city
    */
    selectStateAndCity(stateAndCity){
      const [state, city]: string[] = stateAndCity.split(', ');
      cy.get(this.stateField).click()
      cy.contains(state).click()
      cy.get(this.cityField).click()
      cy.contains(city).click()
    }

    /**
    * Method to fill form
    */
    fillForm(data){
      this.elementsPageInstance.setFirstNameField(data["First Name"]);
      this.elementsPageInstance.setLastNameField(data["Last Name"]);
      this.elementsPageInstance.setEmailField(data["Email"]);
      cy.get(`[value="${data["Gender"]}"]`).check({force:true});
      cy.get(this.mobileNumber).clear().type(data["Mobile"]);
      this.selectDate(data['Date of Birth'])
      this.selectStateAndCity(data["State and City"])
      cy.get(this.subjectField).type(data["Subjects"])
      cy.contains(data["Hobbies"]).prev().check({force:true});
      cy.get('input[type=file]').selectFile(`cypress/fixtures/${data["image"]}`)
      cy.get(this.addressField).type(data["Current Address"])
      this.elementsPageInstance.clickSubmitButton()

    }

    /**
    * Method to verify form data
    * Getting all labels and values in separate array
    * Merging them in an object to get key-value pair
    * Verifying using deep equal
    */
    verifyFormData(expectedFormData) {
      const keys: string[] =[]
      const values: string[] =[]
      cy.get(this.tableLabels).each(($labels)=>{
        keys.push($labels.text())
      }).then(()=>{
        cy.get(this.tableValues).each(($values)=>{
          values.push($values.text())
        }).then(()=>{
          var finalData = {};
          keys.forEach((key, i) => finalData[key] = values[i]);
          expect(expectedFormData).to.deep.eq(finalData)
        })
      })
    }
    /**
    * Method to close table modal
    */
    closeTableModal(){
      cy.get(this.closeModal).click()
    }
}
