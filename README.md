# Full Stack To-Do List App (React + Django + MySQL)

This project includes:
- `backend/`: Django REST API with token authentication and task CRUD.
- `frontend/`: React (Vite) application for register/login and task management.

## Features

- User registration, login, logout
- Token-based authentication
- Create, read, update, delete tasks
- Task fields: title, description, due date, completed status
- Tasks are user-specific (each user sees only their own tasks)

## Tech Stack

- Frontend: React + Vite + Axios
- Backend: Django + Django REST Framework
- Database: MySQL (with SQLite fallback for local quick run)

## Project Structure

```text
To_do_list/
  backend/
    manage.py
    requirements.txt
    .env.example
    todo_backend/
    tasks/
  frontend/
    package.json
    .env.example
    src/
```

## 1. Backend Setup (Django)

### Prerequisites
- Python 3.10+
- MySQL Server

### Create MySQL database

```sql
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Install backend dependencies

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

### Configure environment

```powershell
Copy-Item .env.example .env
```

Edit `backend/.env` with your MySQL credentials if needed.

Note: this project uses `PyMySQL` (pure Python driver), so you do not need to compile `mysqlclient` on Windows.

### Run migrations and start server

```powershell
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:
- `http://127.0.0.1:8000`

## 2. Frontend Setup (React)

### Prerequisites
- Node.js 18+

### Install and run

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend runs at:
- `http://127.0.0.1:5173`

## 3. API Endpoints

Base URL: `http://127.0.0.1:8000/api`

- `POST /auth/register/` - register user
- `POST /auth/login/` - login and get token
- `POST /auth/logout/` - logout (requires token)
- `GET /auth/me/` - current user (requires token)
- `GET /tasks/` - list tasks (requires token)
- `POST /tasks/` - create task (requires token)
- `PUT /tasks/{id}/` - update task (requires token)
- `DELETE /tasks/{id}/` - delete task (requires token)

Auth header format:

```http
Authorization: Token <your_token>
```

## 4. Database Design

Tables used:
- `auth_user` (Django built-in user table)
- `tasks_task` with columns:
  - `id`
  - `owner_id` (FK to `auth_user`)
  - `title`
  - `description`
  - `is_completed`
  - `due_date`
  - `created_at`
  - `updated_at`

## 5. Quick Testing Checklist

- Register a new user from UI
- Login with created user
- Create a task
- Edit task fields and status
- Delete a task
- Confirm users only see their own tasks

## 6. Notes

- If you want SQLite instead of MySQL for quick setup, set in `backend/.env`:
  - `USE_MYSQL=false`
- CORS is configured for frontend dev URLs (`localhost:5173`).
