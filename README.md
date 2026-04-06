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

## Render deployment

The included [render.yaml](c:\Users\Ajay\Desktop\Sidnova\render.yaml) provisions:

- a static frontend service named `sidnova-frontend`
- a PostgreSQL database named `sidnova-postgres`
- a Python web service for the Django backend
- automatic `DATABASE_URL` injection from Render into Django

On Render:

1. Create a new Blueprint deployment from this repository.
2. Render will create the frontend, Postgres database, and backend service from `render.yaml`.
3. The backend startup command will run migrations and bootstrap the admin account automatically.
4. The frontend will build with `VITE_API_BASE_URL` pointing to the Render backend URL.

Default admin dashboard access:

- URL: `/admin`
- Password: `Sidnova@2026`

## Admin export

Open `/admin`, enter the admin password, and use the dashboard to:

- review registrations event-wise
- download Excel sheets for all registrations
- download Excel sheets for individual events
