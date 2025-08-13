# 🚀 URL Shortener – Full Stack

A URL shortener built with:

- **Backend:** NestJS + TypeORM + PostgreSQL
- **Frontend:** Next.js 13 (App Router) + Tailwind CSS
- **Database:** PostgreSQL
- **Orchestration:** Docker Compose

---

## 📦 Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Node.js v18 or newer (only needed if running locally without Docker)
- npm or yarn

---

## 🛠 Project Structure

```
.
├── backend/             # API REST with NestJS
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
├── frontend/            # UI with Next.js 13 + TailwindCSS
│   ├── app/
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml   # Service orchestration
```

---

## 📂 Backend – NestJS API

- Main endpoints:

| Method | Route    | Description          |
| ------ | -------- | -------------------- |
| POST   | `/`      | Create a short URL   |
| GET    | `/`      | List all URLs        |
| GET    | `/:slug` | Redirect to original |

- Default port: **3001**

---

## 🎨 Frontend – Next.js + Tailwind

- Based on `app/` directory in Next.js 13+
- Styling with Tailwind CSS
- Communicates with backend via Axios
- Default port
