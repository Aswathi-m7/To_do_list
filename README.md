Submitted By

Name: Aswathi M
Project Type: Full Stack Web Application (CRUD + Authentication)
Repository: https://github.com/Aswathi-m7/To_do_list

------------------------------------------------------------------------------------

1. Project Overview

This project is a Full Stack To-Do List Application built using React, Django REST Framework, and MySQL.
The objective was to create a practical task management app where users can securely manage their personal tasks.

The application allows users to:
- Register and login
- Create tasks
- View their own tasks
- Update task details
- Mark tasks as completed
- Delete tasks

This project demonstrates full frontend-backend integration, REST API development, authentication, database integration, and cloud deployment.

------------------------------------------------------------------------------------

2. Problem Statement

Users need a simple and secure way to manage day-to-day tasks in one place.
The goal of this project was to build a responsive and scalable task manager using:
- React for frontend UI
- Django + Django REST Framework for backend APIs
- MySQL for persistent data storage

------------------------------------------------------------------------------------

3. Tech Stack

Frontend
- React
- Vite
- Axios
- CSS

Backend
- Django
- Django REST Framework
- django-cors-headers
- Gunicorn

Database
- MySQL (Aiven)

Deployment
- Frontend: Netlify
- Backend: Render
- Database: Aiven MySQL

------------------------------------------------------------------------------------

4. Core Features Implemented

Authentication Features
1. User Registration
2. User Login (Token-based)
3. User Logout
4. Current User Profile API

Task CRUD Features
1. Create Task
   - title, description, due date, completion status
2. Read Tasks
   - list tasks for logged-in user
3. Update Task
   - edit task details/status
4. Delete Task
   - remove task from database

Additional Features
- User-wise data isolation (each user sees only their tasks)
- Form validation
- API error handling
- Responsive frontend layout

------------------------------------------------------------------------------------

5. Database Design

Main tables used:
- `auth_user` (Django default user table)
- `tasks_task` (application task table)

Task fields:
- `id`
- `owner_id` (FK to auth_user)
- `title`
- `description`
- `is_completed`
- `due_date`
- `created_at`
- `updated_at`

------------------------------------------------------------------------------------

6. Backend Implementation (Django)

Backend includes:
- `Task` model
- Serializers for task and user/auth flows
- Auth APIs:
  - register
  - login
  - logout
  - current user (`me`)
- Task APIs:
  - list/create
  - retrieve/update/delete
- Token authentication
- MySQL integration via environment variables

Production configuration:
- `ALLOWED_HOSTS` from env
- `CORS_ALLOWED_ORIGINS` from env
- Gunicorn as WSGI server

------------------------------------------------------------------------------------

7. Frontend Implementation (React)

Frontend includes:
- Auth forms (Register/Login)
- Task form (Create/Edit)
- Task list display
- Delete and status update actions
- Axios API layer with token interceptor
- Environment-based API URL (`VITE_API_BASE_URL`)
- Error and success feedback messages

------------------------------------------------------------------------------------

8. API Endpoints

Auth
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/auth/me/`

Tasks
- `GET /api/tasks/` - list tasks
- `POST /api/tasks/` - create task
- `GET /api/tasks/{id}/` - retrieve task
- `PUT /api/tasks/{id}/` - update task
- `DELETE /api/tasks/{id}/` - delete task

------------------------------------------------------------------------------------

9. Deployment Details

Live Links
- Frontend: https://my-todo-app-abc.netlify.app
- Backend API: https://todo-backend-sdz7.onrender.com/api/auth/login/

Deployment Summary
1. Backend deployed on Render
2. Frontend deployed on Netlify
3. MySQL hosted on Aiven
4. Environment variables configured on both platforms
5. CORS and API base URL configured for cross-domain communication

------------------------------------------------------------------------------------

10. Challenges Faced and Resolutions

1. MySQL driver/build issues on Windows
   - Resolved by switching to PyMySQL and required dependencies.

2. Authentication/register 500 issue
   - Fixed register view logic to properly save serializer user.

3. CORS issues between Netlify and Render
   - Resolved by configuring correct frontend origin in backend env.

4. Wrong backend project/port conflicts
   - Fixed by running the correct service and updating frontend API base URL.

5. Aiven connection/auth setup issues
   - Resolved by creating dedicated DB/user and correcting env values.

------------------------------------------------------------------------------------

11. Testing and Validation

The application was tested for:
- User registration/login/logout
- Task create/read/update/delete
- User-specific task visibility
- Frontend-backend integration in local and deployed environments
- Error handling for failed API calls

Result: Core functionality works successfully in both local and production setup.

------------------------------------------------------------------------------------

12. Project Outcome

This project meets full-stack CRUD requirements using React, Django, and MySQL with authentication.
It demonstrates:
- End-to-end web app architecture
- Secure REST API implementation
- Database integration
- Cloud deployment workflow
- Debugging and production configuration handling

------------------------------------------------------------------------------------

13. Conclusion

This To-Do List application is a complete and functional full-stack project for practical daily task tracking.
This project strengthened skills in:
- React frontend development
- Django REST API and authentication
- MySQL database integration
- Deployment on Render and Netlify
- Handling real-world production issues

------------------------------------------------------------------------------------
