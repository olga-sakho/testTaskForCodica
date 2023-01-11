How to run the application:

  1. Copy all variables from the .env.example file and paste to .env file

  2. Install packages: npm install

  3. Run command: npm run start

The app is ready)

How to run the application with docker:

  1. Run the following command

       docker-compose up


The app is ready)

endpoints:

POST http://localhost:9000/bank 
GET http://localhost:9000/bank/:id
GET http://localhost:9000/banks
PUT http://localhost:9000/bank/:id
DELETE http://localhost:9000/bank/:id

POST http://localhost:9000/category
GET http://localhost:9000/category/:id
GET http://localhost:9000/category
PUT http://localhost:9000/category/:id
DELETE http://localhost:9000/category/:id

POST http://localhost:9000/transaction
GET http://localhost:9000/transaction?limit=number&offset=number
DELETE http://localhost:9000/transaction/:id

GET http://localhost:9000/statistics?bankId=ID&fromPeriod=DATE&toPeriod=DATE
