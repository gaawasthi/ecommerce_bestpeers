
**Ecommerce BestPeers**

A full-stack e-commerce application with separate `backend` (Node.js + Express + MongoDB) and `frontend` (React + Vite) folders. This README explains how to run the project locally, the main features, required environment variables, and where to find important code.

**Highlights**
- **Backend**: `Node.js`, `Express`, `Mongoose`, `Redis`, `Cloudinary`, JWT auth, email (SMTP).
- **Frontend**: `React`, `Vite`, `Tailwind CSS`, `Redux Toolkit`, `React Router`.
- **APIs**: REST endpoints under `/api/*` (users, products, orders, cart, admin, seller).

**API Routes**
Below is a concise reference of the backend routes (base paths shown). All paths are relative to the API base mounted in `server.js` (for example `/api/users`, `/api/products`, etc.).

- **Users** (`/api/users`)
	- `POST /register` — Register a new user (validation middleware).
	- `POST /resendOtp` — Resend verification OTP.
	- `POST /verify` — Verify OTP and create account.
	- `POST /login` — Log in (returns JWT).
	- `POST /logout` — Log out (requires auth).
	- `POST /reset` — Request password reset (send email).
	- `POST /reset/password` — Reset password using token.
	- `POST /password/change` — Change password (requires auth).
	- `GET /me` — Get current user info (requires auth).
	- `PUT /:id` — Update user profile (requires auth; admin can update any user).
	- `GET /` — Get all users (admin only).
	- `GET /:id` — Get a single user (admin only).
	- `DELETE /:id` — Delete a user (admin only).
	- `POST /create/seller` — Create a seller account (admin only).

- **Products** (`/api/products`)
	- `GET /` — List all products (public).
	- `GET /search` — Search products by query params (public).
	- `GET /my/products` — Get products for the authenticated seller (seller only).
	- `GET /:id` — Get single product details (public).
	- `POST /create` — Create a product (auth + role `admin` or `seller`; supports image upload).
	- `PUT /:id` — Update a product (auth + role `admin` or `seller`).
	- `DELETE /:id` — Delete a product (auth + role `admin` or `seller`).

- **Orders** (`/api/order`)
	- `POST /create` — Create an order (requires auth).
	- `GET /seller/orders` — Get orders for seller's products (seller only).
	- `GET /all` — Get all orders (admin only).
	- `GET /orders` — Get orders for current user (requires auth).
	- `GET /orders/:id` — Get a single user order (requires auth).
	- `GET /orders/cancel/:id` — Cancel a user order (requires auth).
	- `PUT /orders/update/:id` — Seller updates order status (requires auth + seller role).

- **Cart** (`/api/cart`)
	- `POST /add` — Add an item to cart (requires auth).
	- `GET /` — Get current user's cart (requires auth).
	- `PUT /update` — Update cart items (requires auth).
	- `DELETE /remove/:id` — Remove an item from cart (requires auth).
	- `PUT /empty` — Empty/clear the cart (requires auth).

- **Seller Dashboard** (`/api/dashboard/seller`)
	- `GET /total` — Seller's total revenue (seller only).
	- `GET /low` — Seller low-stock products (seller only).
	- `GET /pen` — Seller pending orders (seller only).
	- `GET /del` — Seller delivered orders stats (seller only).

- **Admin Dashboard** (`/api/dashboard/admin`)
	- `GET /total` — Total revenue (admin only).
	- `GET /week` — Last week analytics (admin only).
	- `GET /customer/top` — Top customers (admin only).
	- `GET /product/top` — Top products (admin only).
	- `GET /seller/top` — Top sellers (admin only).



**Quick Start (Local)**
- **Prerequisites**: `Node.js` (v18+ recommended), `npm`, `MongoDB` (Atlas or local), Redis instance.

- Clone the repo and install dependencies for both backend and frontend.

Backend (from repo root):
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

**Environment variables**
Create a `.env` file in `backend/` with at least the following variables:

- **`MONGO_URI`**: MongoDB connection string.
- **`REDIS_URL`**: Redis connection URL.
- **`PORT`**: (optional) Backend port, defaults to `5000`.
- **`JWT_SECRET`**: Secret used to sign JWT tokens.
- **`CLOUDINARY_NAME`**: Cloudinary cloud name.
- **`CLOUDINARY_API`**: Cloudinary API key.
- **`CLOUDINARY_SECRET`**: Cloudinary API secret.
- **`SMTP_USER`**: SMTP username for sending emails.
- **`SMTP_PASSWORD`**: SMTP password for sending emails.

You can find where these are used in `backend/config` and across controllers/middlewares.

**Useful scripts**
- Backend (inside `backend`):
	- `npm start` : Run the backend (`node server.js`).
- Frontend (inside `frontend`):
	- `npm run dev` : Start the Vite dev server.
	- `npm run build` : Build frontend for production.
	- `npm run preview` : Preview production build.

**Project structure (high level)**
- `backend/` : API, models, controllers, routes, and config.
- `frontend/` : React app built with Vite. Main UI components live in `src/components` and pages in `src/pages`.

**Run locally (example)**
1. Start MongoDB (or ensure Atlas URI is valid) and Redis.
2. From `backend/` set `.env` and run:
```bash
cd backend
npm start
```
3. From `frontend/` run the dev server:
```bash
cd frontend
npm run dev
```
4. Open the frontend URL shown by Vite (usually `http://localhost:5173`).

**Deployment notes**
- Backend: any Node.js host (e.g., Heroku, Render, Railway) — ensure env vars and Redis are configured.
- Frontend: any static host that supports SPA (e.g., Vercel, Netlify). Update allowed origins in `backend/server.js` CORS list when deploying.

**Where to look next**
- API routes: `backend/routes/*.js` (users, products, orders, cart, admin, seller).
- DB connection: `backend/config/db.js`.
- Cloudinary upload helper: `backend/config/cloudinary.js`.
- Auth middleware: `backend/middlewares/authmiddleware.js`.

**Contributing**
- Open an issue or submit a PR. Keep changes small and focused. Follow existing coding style.

**License & Contact**
- This repo does not include a license file — add one if you plan to open-source.
- For questions, open an issue or contact the maintainer via the repository owner.


