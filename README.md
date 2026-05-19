# HireMind AI

HireMind AI is a production-style AI career intelligence SaaS for resume analysis, job matching, interview preparation, and application tracking.

This repository is being built phase by phase. Phase 1 establishes the backend foundation: FastAPI, PostgreSQL, SQLAlchemy models, JWT authentication, and Docker Compose.
Phase 2 adds the React/Vite/Tailwind frontend foundation with authentication screens, protected routing, and dashboard workspace.

## Phase 1 Features

- FastAPI application with modular route, service, schema, model, auth, and database layers.
- PostgreSQL connection through SQLAlchemy 2.0.
- JWT signup, login, and protected current-user endpoint.
- Password hashing with bcrypt via passlib.
- Product-ready database tables for users, resumes, analyses, job descriptions, applications, interview questions, and activity logs.
- Dockerfile and Docker Compose setup for local API + Postgres.
- Alembic scaffold for future production migrations.
- Health check endpoints for API and database readiness.

## Project Structure

```text
backend/
  app/
    api/routes/       REST route modules
    auth/             JWT and password security
    core/             settings and app configuration
    database/         SQLAlchemy engine/session/init helpers
    models/           ORM tables and relationships
    schemas/          Pydantic request/response contracts
    services/         business logic
    utils/            shared helpers
    main.py           FastAPI application entrypoint
  uploads/            future resume upload storage
  requirements.txt
  Dockerfile
  alembic/           database migration scaffold
docker-compose.yml
.env.example
```

## Frontend Development

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

The frontend expects the API at:

```text
http://127.0.0.1:8000/api/v1
```

## Run Locally With Docker

1. Create your environment file:

```bash
cp .env.example .env
```

2. Start the API and database:

```bash
docker compose up --build
```

3. Open the API docs:

```text
http://localhost:8000/docs
```

For local development, tables are created on startup when `CREATE_TABLES_ON_STARTUP=true`. As the schema stabilizes, generate real migrations from `backend/` with:

```bash
alembic revision --autogenerate -m "describe schema change"
alembic upgrade head
```

## API Endpoints

Base URL:

```text
http://localhost:8000/api/v1
```

Available in Phase 1:

- `GET /health`
- `GET /health/db`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

Added in Phase 3:

- `POST /resume/upload`
- `GET /resume`
- `GET /resume/{resume_id}`

## Example Auth Flow

Register:

```json
{
  "email": "student@example.com",
  "full_name": "Alex Taylor",
  "password": "securepass123",
  "target_role": "Backend Engineer",
  "location": "Chicago, IL"
}
```

Login:

```json
{
  "email": "student@example.com",
  "password": "securepass123"
}
```

Use the returned bearer token for protected requests:

```text
Authorization: Bearer <access_token>
```

## Phase Roadmap

1. Backend foundation: FastAPI, PostgreSQL, auth, Docker.
2. Frontend foundation: React, Vite, Tailwind, routing, auth pages, dashboard shell.
3. Resume upload and parsing.
4. AI resume analysis, job matching, interview prep, and career roadmap generation.
5. Application tracker.
6. Analytics and dashboard enhancements.
7. Deployment hardening for AWS-style infrastructure.
