# Contacts Book App

A simple CRUD contacts app built with Node.js, Express, and SQLite.

## Tech Stack
- Node.js + Express (REST API)
- SQLite via better-sqlite3
- Vitest + Supertest (testing)
- Docker + Docker Compose (deployment)
- OpenSSL self-signed certificate (server.pem)

## Install & Run

```bash
npm install
npm start
```

## Run Tests

```bash
npm test
```

## Docker

```bash
docker compose up --build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /contacts | Get all contacts |
| GET | /contacts/:id | Get one contact |
| POST | /contacts | Create contact |
| PUT | /contacts/:id | Update contact |
| DELETE | /contacts/:id | Delete contact |
