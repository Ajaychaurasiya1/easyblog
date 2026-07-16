# Easyblog

Full-stack blog app: React (Vite) frontend + Express/MongoDB backend.

## Project structure

```text
easyblog/
  backend/          # Express API (Render)
  frontend/         # React + Vite (Vercel)
  render.yaml       # Render blueprint
```

## Local setup

### 1. Install dependencies

```bash
npm run install:all
```

Or separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment files

Copy examples and fill in values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Backend (`backend/.env`)**

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
PORT=4000
```

**Frontend (`frontend/.env`)**

```env
VITE_API_URL=http://localhost:4000
```

### 3. Run

Two terminals:

```bash
npm run dev:backend    # http://localhost:4000
npm run dev:frontend   # http://localhost:5173
```

## Deploy

### Backend (Render)

1. Connect this repo on [Render](https://render.com)
2. Web Service settings:
   - **Root Directory:** `backend`
   - **Build:** `npm install`
   - **Start:** `npm start` (`node src/index.js`)
3. Environment variables: `MONGODB_URI`, `JWT_SECRET`
4. MongoDB Atlas → Network Access → allow `0.0.0.0/0`

Example live API: `https://easyblog-r43p.onrender.com`

### Frontend (Vercel)

1. Import the same repo on [Vercel](https://vercel.com)
2. Settings:
   - **Root Directory:** `frontend`
   - **Build:** `npm run build`
   - **Output:** `dist`
3. Environment variable:

```env
VITE_API_URL=https://easyblog-r43p.onrender.com
```

SPA routing is handled by `frontend/vercel.json`.

## API overview

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/user/register` | No | Multipart: name, email, password, image |
| POST | `/user/login` | No | JSON: email, password |
| GET | `/blog/all` | No | List blogs |
| POST | `/blog/create` | Yes | Multipart: title, category, description, image |
| DELETE | `/blog/delete/:id` | Yes | Delete own blog |
| GET | `/blog/user/blogs` | Yes | Current user's blogs |
| GET | `/images/:file` | No | Uploaded images |
