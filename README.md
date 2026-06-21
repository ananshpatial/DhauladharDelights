# Dhauladhar Delights

A production-style MERN food delivery web app with customer ordering, JWT authentication, cart checkout, contact messages and an admin supervision CRM for menu and order operations.

## Stack

- Frontend: React, Vite, React Router DOM, Axios, Context API, CSS variables
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, dotenv, CORS

## Run Locally

1. Start MongoDB locally.
2. Install dependencies:

```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Configure `backend/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dhauladhar_delights
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

4. Start both apps:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

Optional demo data:

```bash
cd backend
npm run seed
```

## Admin Supervision CRM

Register with account type `Admin Supervision`, then open `/admin`. If you run the seed command, you can also use:

- Email: `admin@dhauladhardelights.com`
- Password: `admin123`

The dashboard supports:

- Add, update and delete food items
- View all orders
- Update order tracking status
- View contact requests
- See operation logs for recent admin actions

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Foods:

- `GET /api/foods`
- `GET /api/foods/:id`
- `POST /api/foods` admin
- `PUT /api/foods/:id` admin
- `DELETE /api/foods/:id` admin

Orders:

- `POST /api/orders` authenticated
- `GET /api/orders` authenticated, admin sees all
- `GET /api/orders/:id` authenticated
- `PUT /api/orders/:id` admin status update

Contact:

- `POST /api/contact`
- `GET /api/contact` admin

## Notes

The frontend includes fallback demo food cards so the UI remains inspectable before MongoDB has menu data. Once food items are added through the admin CRM, the live database menu is shown.
"# DhauladharDelights" 
