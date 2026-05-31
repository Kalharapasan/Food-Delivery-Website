# Food Delivery Website

A simple full-stack food delivery application with separate `client`, `admin`, and `server` apps.

Overview
- Frontend user app: `client` (React + Vite)
- Admin dashboard: `admin` (React + Vite)
- Backend API: `server` (Node + Express, Supabase for data)

Prerequisites
- Node.js 18+ and npm (or yarn)
- A Supabase project (URL and keys) for the backend

Quick start
1. Install dependencies

```bash
# root (optional)
cd server
npm install

cd ../client
npm install

cd ../admin
npm install
```

2. Configure environment variables (create a `.env` in `server`)

Required variables (example names):
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (required for seeding)
- `SUPABASE_ANON_KEY` — Supabase anon key (used if service role key is not present)
- `PORT` — optional API port (default used in code)

3. Seed the database (creates default admin and sample food items)

```bash
cd server
node seed.js
```

4. Run development servers

```bash
# start backend (auto-reloads with nodemon)
cd server
npm run server

# start client
cd ../client
npm run dev

# start admin dashboard
cd ../admin
npm run dev
```

Build for production

```bash
cd client
npm run build

cd ../admin
npm run build
```

Notes
- The backend uses Supabase (see `server/config/Databases.js`). Ensure the environment variables are set before running or seeding.
- Seed script requires `SUPABASE_SERVICE_ROLE_KEY` because row-level security prevents anonymous inserts.
- Backend scripts: `npm run server` (development with nodemon) and `npm start` (production).

Where to look
- API entry: `server/server.js`
- Frontend entry: `client/src/main.jsx` and `admin/src/main.jsx`
- Database seed: `server/seed.js`

If you want, I can also add a `.env.example` and update `package.json` scripts. Want me to do that next?

License
- This project is released under a proprietary license. See `LICENSE.md` for full terms and contact information.
