# backend_test
`npm install`
`npm start` For running the server
`npx jest task.test.js` For runnin the tests

Added Task Model, Controller, and Routes
Added APIS.
Added jest.
created tests folder in src and write routes tests.

I added file for Backend_test.postman_collection.json
you can import this collection into postman and see the requests and their response.

The api was failing due to line no.79 and 80 in models/task.ts.
  because the slice method returns the extracted part that's why the error occur.

  //before It was
  //79 `const paginatedItems = array.slice(startIndex, endIndex)` 
  //80 `return paginatedItems`

  I changed it to
  //79 array.slice(startIndex, endIndex)
  //80 return array