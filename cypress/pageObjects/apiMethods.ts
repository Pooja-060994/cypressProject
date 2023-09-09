export default class ApiTests {

  /**
  * Method to create an account using API
  */
  createAccount(baseUrl,data){
    return cy.request({
      method: 'POST',
      url: `${baseUrl}Account/v1/User`,
      body: data,
      timeout: 100000,
      failOnStatusCode: false
    })
  }

  /**
  * Method to verify invalid create accunt
  */
  verifyInvalidPostAccountResponse(baseUrl,data,status,errorMessage){
    cy.request({
      method: 'POST',
      url: `${baseUrl}Account/v1/User`,
      body: data,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(status);
      expect(response["body"]["message"]).to.eq(errorMessage);
    });
  }

    /**
    * Method to generate token
    */
    generateToken(baseUrl,requestBody){
      return cy.request({
        method: 'POST',
        url: `${baseUrl}Account/v1/GenerateToken`,
        body: requestBody,
        timeout: 100000,
        failOnStatusCode: false
      })
    };

    /**
    * Method to add books
    */
    addBook(baseUrl,token,bookDetails){
      return cy.request({
        method: 'POST',
        url: `${baseUrl}BookStore/v1/Books`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: bookDetails,
        timeout: 100000,
        failOnStatusCode: false
      })
    }

    /**
    * Method to delete a book
    */
    deleteBook(baseUrl,token,bookDetails){
      return cy.request({
        method: 'DELETE',
        url: `${baseUrl}BookStore/v1/Book`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: bookDetails,
        timeout: 100000,
        failOnStatusCode: false
      })
    }
  }
