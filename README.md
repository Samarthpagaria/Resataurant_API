Food Ordering API
Description
This project is a Food Ordering API built with Node.js, Express, and MongoDB. It provides endpoints for managing food items and placing orders. The API includes features for creating, retrieving, updating, and deleting food items, as well as placing and managing orders.

Features
Food Management: Create, read, update, and delete food items.
Order Management: Place orders, update order statuses.
Authentication: Middleware to protect routes and ensure proper access controls.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for building the API.
MongoDB: NoSQL database for storing food and order data.
Mongoose: ODM library for MongoDB and Node.js.
Installation
Clone the Repository.
Install Dependencies:

>node install

Set Up Environment Variables:
>>(Create a .env file in the root directory and add your MongoDB connection string: ,also add jwt token )


Run the Application:
>nodemon server.js
>
The API will start on http://localhost:3000 by default.

API Endpoints
Food Endpoints
Create Food Item: POST /api/food/create

Requires authentication.
Body parameters: title, description, price, imageURL, foodTags, category, code, isAvailabe, restaurant, rating.
Get All Food Items: GET /api/food/getAll

Publicly accessible.
Get Single Food Item: GET /api/food/get/:id

Requires authentication.
URL parameter: id (food item ID).
Update Food Item: PUT /api/food/update/:id

Requires authentication.
URL parameter: id (food item ID).
Body parameters: Fields to update.
Delete Food Item: DELETE /api/food/delete/:id

Requires authentication.
URL parameter: id (food item ID).
Order Endpoints
Place Order: POST /api/order/placeorder

Requires authentication.
Body parameters: cart (array of food items), payment, id (buyer ID).
Update Order Status: POST /api/order/orderstatus/:id

Requires admin and authentication middleware.
URL parameter: id (order ID).
Body parameter: status (new status for the order).
Middleware
authMiddleware: Ensures the user is authenticated before accessing protected routes.
adminMiddleware: Ensures the user has admin privileges before accessing admin routes.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.










