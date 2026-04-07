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

Deploy the Django backend to Railway from the `backend` folder. The included [backend/railway.toml](c:\Users\Ajay\Desktop\Sidnova\backend\railway.toml) sets:

- `gunicorn` as the runtime server
- migrations + admin bootstrap before deploy
- health checks at `/api/health/`

Recommended Railway setup:

1. Create a PostgreSQL database service in Railway.
2. Create a backend service from this repository and set the root directory to `backend`.
3. Set these Railway variables:

```env
DATABASE_URL=<Railway Postgres connection string>
DJANGO_SECRET_KEY=<generate a strong secret>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<your railway backend domain>
DJANGO_CORS_ALLOWED_ORIGINS=https://sidnova.vercel.app
DJANGO_CSRF_TRUSTED_ORIGINS=https://sidnova.vercel.app,https://<your railway backend domain>
DJANGO_TIME_ZONE=Asia/Kolkata
DJANGO_ADMIN_USERNAME=admin
DJANGO_ADMIN_PASSWORD=Sidnova@2026
DJANGO_SESSION_COOKIE_SAMESITE=None
DJANGO_CSRF_COOKIE_SAMESITE=None
```

4. In Vercel set:

```env
VITE_API_BASE_URL=https://<your railway backend domain>
```

Default admin dashboard access:

- URL: `/admin`
- Password: `Sidnova@2026`

## Admin export

Open `/admin`, enter the admin password, and use the dashboard to:

- review registrations event-wise
- download Excel sheets for all registrations
- download Excel sheets for individual events
