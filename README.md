# Sidnova

Sidnova is a festival registration platform with:

- a Vite + React frontend for the public event website
- a Django backend for registrations and admin access
- CSV export from Django admin so submissions can be opened in Excel

## Frontend

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Set the backend URL with `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Backend

- Create a virtual environment
- Install dependencies: `pip install -r backend/requirements.txt`
- Run migrations: `python backend/manage.py migrate`
- Create admin user: `python backend/manage.py createsuperuser`
- Start server: `python backend/manage.py runserver`

## Admin export

Open `/admin`, log in, go to `Registrations`, and use the CSV export action.
The exported CSV opens directly in Excel and other spreadsheet apps.
