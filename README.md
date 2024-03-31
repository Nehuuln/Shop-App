# Welcome to the Shopping Application

## To set up correctly the project you need to :  

- Open your POSTMAN in a POST Method and write ``localhost:8000/products`` and in the body you need to write :  
      1.    {
                  "name": "Shoes",
                  "price": 100,
            }
      2.    {
                  "name": "Sunglasses",
                  "price": 30,
            }
      3.    {
                  "name": "Sweat",
                  "price": 60,
            }
            
## In the client you need to install :

The framework that i'm using is Vite with React using JavaScript :  

``npm create vite@latest``  

``npm i axios react-hot-toast react-router-dom``  

## If the node_modules are not in the server directory you need to install :  

``npm i bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose nodemon``

### To proper run the project you need to :

- In the client directory :
      ``npm run dev``
- In the server directory :
      ``npm start``

In the package.json on the ./server you should integrate : 
``start "nodemon index.js"`` (take a look to the screenshot)
![image](https://github.com/Nehuuln/Shop-App/assets/113974530/43edb30e-7249-41b3-89d5-6322e08f8b2c)


This project was carried by William TRUGET and me (Maxime YE)  
With the help of youtube
