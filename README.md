# Welcome to the Shopping Application

## To set up correctly the project you need to :  

- Open your POSTMAN in a POST Method and write ``localhost:8000/products`` and in the body you need to write :  
      1.    {
                  "name": "Shoes",
                  "price": 100
            }  
      2.    {
                  "name": "Sunglasses",
                  "price": 30
            }  
      3.    {
                  "name": "Sweat",
                  "price": 60
            }

## In the ./client you need to install :

The framework that i'm using is Vite with React using JavaScript :  

``npm i``  to initialize the nodemodule

``npm i axios react-hot-toast react-router-dom @react-oauth/google jwt-decode``  

## In the ./server if the node_modules are not in the server directory you need to install :  

``npm i bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose nodemon``

### To proper run the project you need to :

- You MUST start MongoDB Compass to initialize the database locally
- In the client directory :
      ``npm run dev``
- In the server directory :
      ``npm start``

In the package.json on the ./server you should integrate : 
``start "nodemon index.js"`` (take a look to the screenshot)
![image](https://github.com/Nehuuln/Shop-App/assets/113974530/43edb30e-7249-41b3-89d5-6322e08f8b2c)

## To initialize the test you need to install :  
- `npm i jest`

### To run the test you need to be in the test directory:  
- For jest `npx jest register.test.js`
- For mocha `npx mocha login.test.js`
- For cypress `npx cypress run cartItem.test.js`


This project was carried by William TRUGET, Abdoul Hamid DIAW and me (Maxime YE)  
With the help of youtube
