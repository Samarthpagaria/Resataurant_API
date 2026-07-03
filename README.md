# Restaurant API 🍽️

A RESTful backend API for a food ordering platform, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, restaurant and menu management, food categories, and order placement — the core backend for an app like a mini Zomato/UberEats.

> **Status:** Backend only. No frontend/client is included in this repo yet.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Auth](#auth-restaurantauth)
  - [User](#user-restaurant)
  - [Restaurant](#restaurant-restaurant)
  - [Category](#category-category)
  - [Food & Orders](#food--orders-food)
- [Data Models](#data-models)
- [Authentication](#authentication)
- [Known Issues / Roadmap](#known-issues--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User authentication** — register/login with hashed passwords (bcrypt) and JWT-based sessions
- **User management** — fetch/update profile, reset password, delete account
- **Restaurant management** — create, list, fetch, and delete restaurants
- **Category management** — create, list, update, and delete food categories
- **Food management** — full CRUD for menu/food items
- **Order management** — place orders and update order status (admin-only status updates)
- **Role-based access** — `client`, `admin`, `vendor`, and `driver` user types, with admin-gated routes

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Runtime        | Node.js                              |
| Framework      | Express.js                           |
| Database       | MongoDB                              |
| ODM            | Mongoose                             |
| Auth           | JSON Web Tokens (`jsonwebtoken`)     |
| Password hashing | bcrypt                             |
| Logging        | Morgan (dev mode)                    |
| CORS           | cors                                 |
| Env config     | dotenv                               |

## Project Structure

```
Restaurant_API/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authControllers.js    # Register / login logic
│   ├── categoryController.js # Category CRUD
│   ├── foodController.js     # Food CRUD + order placement/status
│   ├── restaurantController.js
│   └── userController.js     # Profile, password reset, delete
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── adminMiddleware.js    # Admin role check
├── models/
│   ├── userModel.js
│   ├── restaurantModel.js
│   ├── CategoryModel.js
│   ├── foodModel.js
│   └── orderModel.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── restaurantRoutes.js
│   ├── categoryRoutes.js
│   └── foodRoutes.js
├── server.js                 # App entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Restaurant_API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** — see [Environment Variables](#environment-variables) below.

4. **Run the server**
   ```bash
   node server.js
   ```
   or, with auto-restart on file changes (requires `nodemon` installed globally or as a dev dependency):
   ```bash
   nodemon server.js
   ```

   By default the server runs on **`http://localhost:8000`** (or the port set in `PORT`).

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

| Variable     | Required | Description                                  |
|--------------|----------|-----------------------------------------------|
| `PORT`       | No       | Port the server listens on (defaults to 8000) |
| `MONGO_URL`  | Yes      | MongoDB connection string                     |
| `JWT_SECRET` | Yes      | Secret used to sign/verify JWTs               |

## API Reference

All endpoints are prefixed by the base URL, e.g. `http://localhost:8000`.

> 🔒 = requires `Authorization: Bearer <token>` header
> 🔒👑 = requires authentication **and** admin role

### Auth (`/restaurant`)

| Method | Endpoint              | Description         | Body                                                        |
|--------|------------------------|----------------------|-----------------------------------------------------------|
| POST   | `/restaurant/register` | Register a new user | `username, email, password, phone, address, answer`        |
| POST   | `/restaurant/login`    | Log in a user        | `email, password`                                          |

### User (`/restaurant`)

| Method | Endpoint                      | Description              | Body / Params            |
|--------|--------------------------------|---------------------------|----------------------------|
| GET    | `/restaurant/getUser` 🔒       | Get logged-in user profile | —                        |
| PUT    | `/restaurant/updateUser` 🔒    | Update profile            | `username, address, phone` |
| POST   | `/restaurant/resetpassword` 🔒 | Reset password             | `email, newPassword, answer` |
| DELETE | `/restaurant/deleteUser/:id` 🔒 | Delete user account       | `id` (URL param)          |

### Restaurant (`/restaurant`)

| Method | Endpoint                    | Description              | Body / Params                                                      |
|--------|-------------------------------|----------------------------|------------------------------------------------------------------------|
| POST   | `/restaurant/create` 🔒       | Create a restaurant       | `title, coords, imageUrl, rating, ratingCount, logoUrl, isOpen, delivery, pickUp, time, foods, code` |
| GET    | `/restaurant/getAll`          | List all restaurants      | —                                                                       |
| GET    | `/restaurant/get/:id`         | Get a single restaurant   | `id` (URL param)                                                        |
| DELETE | `/restaurant/delete/:id` 🔒   | Delete a restaurant       | `id` (URL param)                                                        |

### Category (`/category`)

| Method | Endpoint                  | Description         | Body / Params            |
|--------|-----------------------------|----------------------|----------------------------|
| POST   | `/category/create` 🔒       | Create a category   | `title, imageURL`          |
| GET    | `/category/getAll`          | List all categories | —                           |
| PUT    | `/category/update/:id` 🔒   | Update a category   | `title, imageURL`          |
| DELETE | `/category/delete/:id` 🔒   | Delete a category   | `id` (URL param)           |

### Food & Orders (`/food`)

| Method | Endpoint                        | Description             | Body / Params                                                                                  |
|--------|-----------------------------------|---------------------------|----------------------------------------------------------------------------------------------------|
| POST   | `/food/create` 🔒                 | Create a food item        | `title, description, price, restaurant` (required); `imageURL, foodTags, category, code, isAvailabe, rating` (optional) |
| GET    | `/food/getAll`                    | List all food items       | —                                                                                                    |
| GET    | `/food/get/:id` 🔒                | Get a single food item    | `id` (URL param)                                                                                     |
| PUT    | `/food/update/:id` 🔒             | Update a food item        | Fields to update                                                                                     |
| DELETE | `/food/delete/:id` 🔒             | Delete a food item        | `id` (URL param)                                                                                     |
| POST   | `/food/placeorder` 🔒             | Place an order            | `cart` (array of food items with `price`), `payment`                                                |
| POST   | `/food/orderstatus/:id` 🔒👑      | Update order status       | `status` (one of `preparing`, `prepared`, `on the way`, `delivered`)                                |

## Data Models

**User** — `username`, `email` (unique), `password` (hashed), `address[]`, `phone`, `userType` (`client` \| `admin` \| `vendor` \| `driver`), `profile`, `answer`

**Restaurant** — `title`, `imageUrl`, `logoUrl`, `foods[]`, `time`, `pickUp`, `delivery`, `isOpen`, `rating`, `ratingCount`, `code`, `coords` (lat/long/address)

**Category** — `title`, `imageURL`

**Food** — `title`, `description`, `price`, `imageURL`, `foodTags`, `category`, `code`, `isAvailabe`, `restaurant` (ref), `rating`, `ratingCount`

**Order** — `foods[]` (ref), `payment`, `buyer` (ref User), `status` (`preparing` \| `prepared` \| `on the way` \| `delivered`)

## Authentication

- Passwords are hashed with **bcrypt** before storage.
- On login, a **JWT** is issued (1 day expiry) and must be sent as `Authorization: Bearer <token>` on protected routes.
- `authMiddleware` verifies the token and attaches the decoded user `id` to the request.
- `adminMiddleware` additionally checks that the requesting user's role is `admin` (used for order status updates).

## Known Issues / Roadmap

- No frontend/client yet — this repo is backend-only.
- No automated tests are currently set up.
- `restaurantController.js` references an undefined `restaurantModel` — it should use the imported `Restaurant` model.
- Consider adding request validation (e.g. Joi/Zod) and centralized error handling.
- Consider adding pagination to `getAll` endpoints.

## Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a pull request.

## License

No license has been specified yet. Add a `LICENSE` file (e.g. MIT) if you intend this project to be open source.
