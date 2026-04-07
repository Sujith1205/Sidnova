# Sidnova

Sidnova is a festival registration platform with:

- a Vite + React frontend for the public event website
- a Django backend for registrations and admin access
- a custom `/admin` dashboard for protected registration review
- Excel export for all registrations and per-event downloads

## Frontend

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- By default the frontend uses `/api` on the same origin during local dev through Vite proxy
- Optionally set the backend URL with `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Backend

- Create a virtual environment
- Install dependencies: `pip install -r backend/requirements.txt`
- Run migrations: `python backend/manage.py migrate`
- Bootstrap admin password login: `python backend/manage.py ensure_default_admin`
- Start server: `python backend/manage.py runserver`

## Railway deployment

This repo is now set up to deploy to Railway as two services:

- a frontend service from the repository root using [railway.toml](c:\Users\Ajay\Desktop\Sidnova\railway.toml)
- a backend service from the `backend` folder using [backend/railway.toml](c:\Users\Ajay\Desktop\Sidnova\backend\railway.toml)

### Backend service

The backend Railway config now:

- runs `gunicorn`
- runs migrations, `collectstatic`, and admin bootstrap before deploy
- exposes a health check at `/api/health/`

Recommended setup:

1. Create a PostgreSQL database service in Railway.
2. Create a backend service from this repository and set the root directory to `backend`.
3. Attach the PostgreSQL `DATABASE_URL`.
4. Set these Railway variables:

```env
DATABASE_URL=<Railway Postgres connection string>
DJANGO_SECRET_KEY=<generate a strong secret>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<your-backend-service.up.railway.app>
DJANGO_CORS_ALLOWED_ORIGINS=https://<your-frontend-service.up.railway.app>
DJANGO_CSRF_TRUSTED_ORIGINS=https://<your-frontend-service.up.railway.app>,https://<your-backend-service.up.railway.app>
DJANGO_TIME_ZONE=Asia/Kolkata
DJANGO_ADMIN_USERNAME=admin
DJANGO_ADMIN_PASSWORD=<set-a-strong-password>
DJANGO_SESSION_COOKIE_SAMESITE=None
DJANGO_CSRF_COOKIE_SAMESITE=None
```

### Frontend service

The frontend Railway config now:

- builds with `npm run build`
- serves the production `dist` folder with SPA route fallback
- supports the React router paths like `/admin` and `/register/:slug`

Create a second Railway service from this same repository with the root directory left as the repository root, then set:

```env
VITE_API_BASE_URL=https://<your-backend-service.up.railway.app>
```

Default admin dashboard access:

- URL: `/admin`
- Password: the value of `DJANGO_ADMIN_PASSWORD`

## Admin export

Open `/admin`, enter the admin password, and use the dashboard to:

- review registrations event-wise
- download Excel sheets for all registrations
- download Excel sheets for individual events
