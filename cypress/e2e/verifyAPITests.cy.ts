import apiMethods from "../pageObjects/ApiMethods.ts";

describe('Create account API test', () => {
  /**
  * Creating object of apiMethods.ts
  */
  const apiObj = new apiMethods();
  const baseUrl = Cypress.config().baseUrl;
  let userName,userId,token,testdata: any;

  beforeEach(() => {
    cy.fixture("test-data").then((data) => (testdata = data));
  });

  it('should create a new account', () => {
    const validData=testdata["createUserApiData"]["valid"];
    userName=`${validData["userName"]}${Math.random()}`
    const requestBody = {
      userName: userName,
      password: validData["password"],
      email: validData["email"],
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '+1234567890',
      userStatus: 1
    };
    apiObj.createAccount(baseUrl,requestBody).then((response) => {
      expect(response.status).to.eq(201);
      userId = response['body']['userID'];
    });
  });

  it('should not create a new account', () => {
    const invalidData=testdata["createUserApiData"]["invalid"]
    apiObj.verifyInvalidPostAccountResponse(baseUrl,invalidData,400,testdata["invalidPassMsg"])
  });

  it('add a book(valid)', () => {
   const requestBody = {
     userName: userName,
     password: testdata["createUserApiData"]["valid"]['password']
   }
    const bookDetails = {"userId": userId,"collectionOfIsbns": [{"isbn": "9781593275846"},{"isbn": "9781449325862"}]}
    apiObj.generateToken(baseUrl, requestBody).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      token=response['body']['token']
    }).then(()=>{
      apiObj.addBook(baseUrl,token,bookDetails).then((postRes)=>{
        expect(postRes.status).to.eq(201);
        expect(postRes.statusText).to.eq('Created');
        expect((postRes.body.books).length).to.eq(2);
        expect((postRes.body.books)).to.deep.eq(bookDetails["collectionOfIsbns"]);
      })
    })
  })

  it('add a book(invalid)', () => {
   const requestBody = {
     userName: userName,
     password: testdata["createUserApiData"]["valid"]['password']
   }
    const bookDetails = {"userId": userId,"collectionOfIsbns": [{"isbn": ""}]}
      apiObj.addBook(baseUrl,token,bookDetails).then((postRes)=>{
        expect(postRes.status).to.eq(400);
        expect(postRes["body"]["message"]).to.eq(testdata["emptyISBNmsg"]);
    })
  })

  it('delete a book(valid)', () => {
   const requestBody = {
     userName: userName,
     password: testdata["createUserApiData"]["valid"]['password']
   }
    const bookDetails = {"isbn": "9781593275846","userId": userId}
      apiObj.deleteBook(baseUrl,token,bookDetails).then((deleteRes)=>{
        expect(deleteRes.status).to.eq(204);
    })
  })

  it('delete a book(invalid)', () => {
   const requestBody = {
     userName: userName,
     password: testdata["createUserApiData"]["valid"]['password']
   }
    const bookDetails = {"isbn": "9781593","userId": userId}
      apiObj.deleteBook(baseUrl,token,bookDetails).then((deleteRes)=>{
        expect(deleteRes.status).to.eq(400);
        expect(deleteRes["body"]["message"]).to.eq(testdata["invalidISBNmsg"]);
    })
  })
});
