# Product Inventory Management System (Backend)

A professional RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage product inventories. This version includes a full **Authentication & Authorization** system using **JWT** and **Bcrypt**.

## 🚀 Key Features

* **User Authentication:** Secure Registration and Login system.
* **Password Hashing:** Uses `bcryptjs` to encrypt passwords before saving to the database.
* **JWT Security:** Protects routes using JSON Web Tokens (JWT).
* **Authorization Middleware:** Custom guard to verify tokens and identify users.
* **Full CRUD Operations:** Create, Read, Update, and Delete products.
* **Smart Search & Filter:** Search by title and filter by category with case-insensitive logic.
* **Advanced Pagination:** Optimized for large datasets.
* **Clean Architecture:** Modular folder structure for scalability.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (NoSQL)
* **Security:** JWT (JSON Web Tokens) & Bcrypt
* **ODM:** Mongoose

## 📁 Project Structure

```text
src/
├── config/          # Database connection (db.js)
├── controllers/     # Auth & Product logic
├── middlewares/     # Authentication guards (authMiddleware.js)
├── models/          # User & Product Mongoose Schemas
├── routes/          # Public & Protected API Routes
├── .env             # Environment variables (JWT_SECRET, MONGO_URI)
├── app.js           # App entry point
└── .gitignore       # Git exclusion rules
```

## ⚙️ Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-link>
   cd Product-Backend-Authentication
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key_123
   ```

4. **Run the server:**
   ```bash
   npm start # or nodemon app.js
   ```

## 📡 API Documentation

### 🔐 Authentication Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login user & get JWT Token |

### 📦 Product Routes (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Get all products (Public/Protected) |
| **POST** | `/api/products` | Create a product (Requires Token) |
| **PUT** | `/api/products/:id` | Update a product (Requires Token) |
| **DELETE** | `/api/products/:id` | Delete a product (Requires Token) |

> **Note:** For protected routes, add the token in the request header:  
> `Authorization: Bearer <your_jwt_token>`

## 🔍 Search & Sort Examples:

* **Search:** `/api/products?title=phone`
* **Filter:** `/api/products?category=tech`
* **Pagination:** `/api/products?page=1&limit=10`

---
**Developed by Muhammad Qasim**

---
