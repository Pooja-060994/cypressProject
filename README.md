## Project Info

```sh
"Test cases are written under cypress/e2e folder",
"apiTests.cy.ts contains API test cases",
"<feature>.cy.ts contains UI test cases"
```
```sh
"Test data is placed under fixture inside test-data.json file",
"also placed image file under fixture which is used in tests"
```
```sh
"All page files are placed inside pageObjects -> Created different files for different pages",
"Also added apiMethods.ts(Contains API CRUD operations methods) under pageObjects"
```
```sh
"Reports will be created under cypress/reports",
"Can be viewed by opening .html files in browser"
```


## Install

* cd project_folder

```sh
npm install
```

## Open Cypress Test Runner

```sh
npx cypress open
```

## Run Cypress Tests in Headless Mode and generate reports

```sh
npx cypress run --reporter mochawesome
```
