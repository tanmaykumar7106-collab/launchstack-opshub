# 🚀 LaunchStack OpsHub

> **AI-Powered Business Operations Platform**

LaunchStack OpsHub is a modern business management platform built with the **MERN Stack**. It helps organizations manage clients, projects, tasks, SOPs, reports, and AI-assisted workflows through a clean and responsive dashboard.

---

## 🌐 Live Demo

| Service | Status |
|----------|--------|
| Frontend | ✅ https://launchstack-opshub-pate.vercel.app |
| Backend API | ✅ https://launchstack-opshub.vercel.app |
| Database | ✅ MongoDB Atlas |
| AI Copilot | 🖥️ Local (Ollama) |

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

---

## 📊 Dashboard

- Business Analytics
- Project Overview
- Task Overview
- Recent Projects
- Upcoming Tasks
- Interactive Charts

---

## 👥 Client Management

- Add Clients
- Update Clients
- Delete Clients
- Search Clients

---

## 📁 Project Management

- Create Projects
- Update Status
- Track Progress
- Assign Priority

---

## ✅ Task Management

- Task Tracking
- Status Updates
- Priority Levels
- Due Date Management

---

## 📚 SOP Library

- Create SOPs
- Edit SOPs
- Organize by Category

---

## 📈 Reports

- Dashboard Reports
- Status Distribution
- Business Insights

---

## 🤖 AI Copilot

Generate professional:

- SOPs
- Project Task Plans
- Client Emails

Powered by:

- Ollama
- Llama 3
- Markdown Rendering

---

## 🌙 UI Features

- Responsive Design
- Dark Mode
- Toast Notifications
- Reusable Design System
- Modern Dashboard
- Theme-aware Charts

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- Lucide React
- React Hot Toast
- React Markdown

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Cookie Parser
- CORS

---

## AI

- Ollama
- Llama 3
- Local AI Inference

---

# 🏗️ System Architecture

```text
                 React Frontend
                     │
                     ▼
               Express Backend
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 MongoDB Atlas               AI Copilot
                                    │
                                    ▼
                             Ollama + Llama 3
```

---

# 📂 Project Structure

```text
launchstack-opshub/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── api/
│   └── package.json
│
├── docs/
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/tanmaykumar7106-collab/launchstack-opshub.git
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

---

# 🔑 Environment Variables

Backend:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

OLLAMA_URL=http://localhost:11434/api/generate

OLLAMA_MODEL=llama3:latest
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📡 API Modules

- Authentication
- Dashboard
- Clients
- Projects
- Tasks
- SOP Library
- Reports
- AI Copilot

---

# 🤖 AI Copilot

The AI Copilot can generate:

- Professional SOPs
- Project Task Plans
- Business Emails

---

## ⚠️ AI Deployment Note

The AI Copilot uses **Ollama** running locally.

The deployed application demonstrates the complete platform while AI generation is available in the local development environment for privacy and offline inference.

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Vercel Serverless Functions

Database

- MongoDB Atlas

---

# 🗺️ Roadmap

- Role-Based Access Control
- Team Collaboration
- Activity Logs
- File Uploads
- Calendar Integration
- Notifications
- Hosted AI Providers (OpenAI/Gemini/Groq)
- Save AI Output to SOP Library

---

# 👨‍💻 Author

**Tanmay Kumar**

B.Tech CSE (AI & ML)

---

## ⭐ If you like this project

Consider giving the repository a **Star**.
