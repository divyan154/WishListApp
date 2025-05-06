# 🎁 Shared Wishlist App

A full-stack web application where users can create, manage, and share wishlists with friends and family. Built using the MERN stack and deployed on **Vercel** (frontend) and **Render** (backend).

## 🌐 Live Demo

- **Frontend:** ([https://your-frontend.vercel.app](https://wish-list-app-qjyp-h1kt8glxa-divyan154s-projects.vercel.app/register))
- **Backend API:** ([https://your-backend.onrender.com](https://wishlistapp-2ydm.onrender.com/))

> ⚠️ Replace the URLs above with your actual deployed links.

---

## 🛠️ Tech Stack

### Frontend (Vercel)
- **React** with **Next.js (App Router)**
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Axios** for HTTP requests

### Backend (Render)
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **CORS**, **dotenv**, **bcrypt**, and **JWT** for authentication and configuration

---

## ✨ Features

- 🔐 User registration & login (JWT auth)
- 📝 Create and manage personal wishlists
- 🎁 Add, view, and delete products from wishlists
- 🔗 Share wishlists with unique links
- 📱 Responsive UI

---

## 📦 Folder Structure

```bash
shared-wishlist-app/
│
├── frontend/            # React + Next.js app
│   └── components/      # Reusable UI components
│   └── app/             # App Router pages
│   └── lib/             # Axios setup, utils
│   └── public/          # Static assets
│
├── backend/             # Express API
│   └── controllers/     # Business logic
│   └── models/          # Mongoose schemas
│   └── routes/          # API routes
│   └── middleware/      # Auth, CORS
│   └── .env             # Environment variables





🚀 Getting Started Locally
1. Clone the repo
git clone https://github.com/your-username/shared-wishlist-app.git
cd shared-wishlist-app

2. Backend Setup (/backend)
bash
Copy
Edit
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret
FRONTEND_URL=http://localhost:3000
run Using node index.js



3. Frontend Setup (/frontend)

cd ../frontend
npm install
npm run dev

🧩 API Endpoints (Backend)

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | `/api/register`            | Register new user        |
| POST   | `/api/login`               | Login and get JWT        |
| POST   | `/api/wishlists`           | Create new wishlist      |
| GET    | `/api/wishlists/:id`       | Get wishlist by ID       |
| POST   | `/api/wishlists/:id/items` | Add product to wishlist  |
| DELETE | `/api/items/:id`           | Delete product from list |


🔒 CORS Setup (Backend)
Backend uses the cors package and reads the allowed origin from .env:

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


📤 Deployment
Frontend (Vercel)
Push /frontend to a GitHub repo

Import it on vercel.com

Set environment variable NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

Backend (Render)
Push /backend to a separate repo

Create a new Web Service on render.com

Set environment variables (PORT, MONGO_URI, JWT_SECRET, FRONTEND_URL)
