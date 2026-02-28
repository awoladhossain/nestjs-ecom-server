# Ecommerce NestJS API

This is a RESTful API built with NestJS, a framework for building efficient, scalable Node.js server-side applications.

## Endpoints

### Users

* `POST /users`: Create a new user
* `GET /users`: Get all users
* `GET /users/:id`: Get a user by id
* `PUT /users/:id`: Update a user
* `DELETE /users/:id`: Delete a user

### Categories

* `POST /categories`: Create a new category
* `GET /categories`: Get all categories
* `GET /categories/:id`: Get a category by id
* `PUT /categories/:id`: Update a category
* `DELETE /categories/:id`: Delete a category

### Products

* `POST /products`: Create a new product
* `GET /products`: Get all products
* `GET /products/:id`: Get a product by id
* `PUT /products/:id`: Update a product
* `DELETE /products/:id`: Delete a product

### Orders

* `POST /orders`: Create a new order
* `GET /orders`: Get all orders
* `GET /orders/:id`: Get an order by id
* `PUT /orders/:id`: Update an order
* `DELETE /orders/:id`: Delete an order

### Payments

* `POST /payments`: Create a new payment
* `GET /payments`: Get all payments
* `GET /payments/:id`: Get a payment by id
* `PUT /payments/:id`: Update a payment
* `DELETE /payments/:id`: Delete a payment

### Dependencies Analysis

The project uses the following dependencies:

* `@nestjs/common`: 11.0.1
* `@nestjs/config`: 4.0.3
* `@nestjs/core`: 11.0.1
* `@nestjs/jwt`: 11.0.2
* `@nestjs/mongoose`: 11.0.4
* `@nestjs/passport`: 11.0.5
* `bcryptjs`: 3.0.3
* `class-transformer`: 0.5.1
* `class-validator`: 0.14.3
* `cloudinary`: 2.9.0
* `cookie-parser`: 1.4.7
* `mongoose`: 9.2.1
* `nodemailer`: 8.0.1
* `passport`: 0.7.0
* `passport-jwt`: 4.0.1
* `reflect-metadata`: 0.2.2
* `rxjs`: 7.8.1
* `stripe`: 20.3.1

The project also uses the following dev dependencies:

* `@nestjs/schematics`: 2.1.0
* `@nestjs/testing`: 11.0.1
* `@types/mongoose`: 5.5.2
* `@types/node`: 15.5.0
* `eslint`: 8.5.0
* `jest`: 29.3.1
* `prettier`: 2.6.1
* `ts-jest`: 29.3.1
* `ts-node`: 10.8.1
* `typescript`: 4.9.5
