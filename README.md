# Express TypeScript Prisma API

## Project Overview

This project is a RESTful API built with Express.js, TypeScript, and Prisma ORM, using MongoDB as the database. It provides user authentication (signup/login) and blog management (CRUD) endpoints, with robust validation, error handling, and JWT-based authentication. The project is production-ready.

---

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
  - [Auth Routes](#auth-routes)
  - [Blog Routes](#blog-routes)
- [Authentication](#authentication)
- [Dependencies & Tools Used](#dependencies--tools-used)
- [File/Folder Structure Overview](#filefolder-structure-overview)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or with Bun (if installed)
   bun install
   ```
3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in required values (see below for required variables).

4. **Set up the database:**
   - Make sure MongoDB is running (locally or via Docker).
   - Update `DATABASE_URL` in `.env`.
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```
   - (Optional) Run migrations if you add them.

---

## Running the Project

### Development Mode

```bash
npm run dev
# or
bun run dev
```

- Uses `nodemon` and `ts-node` for hot-reloading.
- Default port: `3000` (configurable via `.env`)

### Production Build

```bash
npm run build
npm start
```

- Compiles TypeScript to `dist/` and runs with Node.js.

### Docker

```bash
docker-compose up --build
```

- Runs both the API and MongoDB in containers.

### Vercel Deployment

- The project is configured for Vercel serverless deployment. See `vercel.json` for build/output settings.

---

## API Documentation

All endpoints are prefixed with `/api/v1`.

### Auth Routes

#### Register (Sign Up)

- **POST** `/api/v1/signup`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - `201 Created`
  ```json
  {
    "data": {
      "signUpUserData": {
        "id": "...",
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "...",
        "updatedAt": "..."
      }
    },
    "message": "signup successful"
  }
  ```
- **Error Responses:**
  - `409 Conflict` – Email already exists
  - `422 Unprocessable Entity` – Validation errors

#### Login

- **POST** `/api/v1/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  - `200 OK`
  ```json
  {
    "data": {
      "accessToken": "<JWT_TOKEN>"
    },
    "message": "login successful"
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` – Invalid credentials
  - `422 Unprocessable Entity` – Validation errors

---

### Blog Routes

#### Get All Blogs

- **GET** `/api/v1/blog?page=1&limit=10`
- **Query Params:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Success Response:**
  - `200 OK`
  ```json
  {
    "data": [
      {
        "id": "...",
        "title": "...",
        "description": "...",
        "imgURL": "...",
        "authorId": "...",
        "author": { "name": "...", "email": "..." },
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    },
    "message": "Blogs retrieved successfully"
  }
  ```

#### Get Blog by ID

- **GET** `/api/v1/blog/:id`
- **Path Param:** `id` (blog ID)
- **Success Response:**
  - `200 OK` (see above for blog object)
- **Error Responses:**
  - `400 Bad Request` – Blog ID is required
  - `404 Not Found` – Blog not found

#### Create Blog

- **POST** `/api/v1/blog`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "title": "Blog Title",
    "description": "Blog content...",
    "imgURL": "https://...",
    "authorId": "<userId>"
  }
  ```
- **Success Response:**
  - `201 Created`
  ```json
  {
    "data": {
      "blog": {
        "id": "...",
        "title": "...",
        "description": "...",
        "imgURL": "...",
        "authorId": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    },
    "message": "Blog created successfully"
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` – Missing/invalid token
  - `422 Unprocessable Entity` – Validation errors

#### Update Blog

- **PUT** `/api/v1/blog/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:** (same as create)
- **Success Response:**
  - `200 OK` (updated blog object)
- **Error Responses:**
  - `401 Unauthorized` – Not the blog author
  - `404 Not Found` – Blog not found

#### Delete Blog

- **DELETE** `/api/v1/blog/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Success Response:**
  - `200 OK`
  ```json
  { "message": "Blog deleted successfully" }
  ```
- **Error Responses:**
  - `401 Unauthorized` – Not the blog author
  - `404 Not Found` – Blog not found

---

## Authentication

- Register via `/api/v1/signup` to create a user.
- Login via `/api/v1/login` to receive a JWT access token.
- For protected routes (blog create/update/delete), include the token in the `Authorization` header:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

---

## Postman/Swagger

- You can import the above endpoints into Postman manually.
- (Optional) To generate Swagger docs, consider using [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).

---

## Dependencies & Tools Used

- **Express.js** – Web framework
- **TypeScript** – Type safety
- **Prisma** – ORM for MongoDB
- **MongoDB** – Database
- **class-validator, class-transformer** – DTO validation
- **jsonwebtoken** – JWT authentication
- **bcrypt** – Password hashing
- **typedi** – Dependency injection
- **dotenv, envalid** – Environment variable management
- **helmet, cors, morgan, winston** – Security, logging, CORS, HTTP logging
- **nodemon, ts-node, swc** – Dev/build tools
- **Docker, docker-compose** – Containerization
- **Vercel** – Serverless deployment (optional)

---

## File/Folder Structure Overview

```
server/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Entry point
│   ├── config/               # Environment/configuration
│   ├── controllers/          # Route controllers (auth, blog)
│   ├── dtos/                 # Data Transfer Objects (validation schemas)
│   ├── exceptions/           # Custom error classes
│   ├── interfaces/           # TypeScript interfaces/types
│   ├── middlewares/          # Express middlewares (auth, validation, error, upload)
│   ├── prisma/               # Prisma schema
│   ├── routes/               # Express route definitions
│   ├── services/             # Business logic (auth, blog)
│   └── utils/                # Utility functions (logger, env validation)
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript config
├── Dockerfile                # Docker build config
├── docker-compose.yml        # Docker Compose setup
├── .env                      # Environment variables (not committed)
├── vercel.json               # Vercel deployment config
└── ...                       # Other config and dotfiles
```

---

## Environment Variables

Create a `.env` file in the root with at least:

```
NODE_ENV=development
PORT=3000
SECRET_KEY=your_jwt_secret
DATABASE_URL=mongodb://localhost:27017/express-ts-prisma
LOG_FORMAT=dev
ORIGIN=http://localhost:3000
UPLOADTHING_TOKEN=your_uploadthing_token
```

---
