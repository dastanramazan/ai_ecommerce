# Alpha Wolf Parts

An AI-assisted e-commerce site for car parts - brakes, engine components, and fluids from brands like Brembo, Duralast, Mobil 1, and Bosch. Shoppers get an AI Parts Helper to find the right fit; store owners get an admin panel to manage the catalog.

## Project Structure

This repo has three independent apps:

| Folder | What it is | Default port |
|---|---|---|
| `e-commerce-frontend` | Customer-facing storefront (React) | 3000 |
| `e-commerce-admin` | Admin panel for managing products (React) | 3000 (set `PORT` to run alongside the storefront) |
| `e-commerce-backend` | REST API (Express + MongoDB) | 4000 |

## Features

- **Product catalog** with category browsing (Brakes / Engine / Fluids), pagination, and a real product page per item
- **Shopping cart** with persistent, per-user cart data
- **Authentication** with bcrypt-hashed passwords and JWT sessions
- **Admin panel** with its own login, gated behind an `isAdmin` flag - add products (with images and descriptions), list and remove products
- **AI Parts Helper** - a chat widget backed by Google Gemini, proxied through the backend so the API key never reaches the browser
- **Input validation** and a centralized error format on every API route

## Tech Stack

- **Frontend & Admin:** React (Create React App), React Router
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Auth:** bcrypt password hashing, JSON Web Tokens
- **AI:** Google Gemini API (`@google/generative-ai`), called server-side only

## Setup & Installation

### 1. Clone the repository
```sh
git clone https://github.com/dastanramazan/ai_ecommerce.git
cd ai_ecommerce
```

### 2. Backend
```sh
cd e-commerce-backend
npm install
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, GEMINI_API_KEY
npm start
```
The API runs on `http://localhost:4000`.

To create an admin account (needed to log into the admin panel):
```sh
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=your-password npm run create-admin
```

### 3. Storefront
```sh
cd e-commerce-frontend
npm install
cp .env.example .env   # REACT_APP_API_URL, defaults to http://localhost:4000
npm start
```

### 4. Admin panel
```sh
cd e-commerce-admin
npm install
cp .env.example .env
PORT=3001 npm start
```
Log in with the account created by `create-admin` above.

## Environment Variables

Each app has its own `.env.example` listing what it needs. None of the real `.env` files are committed - if you're setting this up fresh, you'll need your own MongoDB connection string and Gemini API key.

## Future Plans

- Move product images off local disk storage to a hosted service (Cloudinary/S3)
- Real checkout / payment integration
- Broader admin tooling (edit existing products, order management)

## Author

- **Dastan Ramazan**
- [GitHub Repository](https://github.com/dastanramazan/ai_ecommerce)
