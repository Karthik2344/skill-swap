# SkillSwap – Skill Barter Platform

A MERN stack web application that enables users to **exchange skills** without money.  
Users can create accounts, showcase their skills, and send barter requests to collaborate and learn from others.

---

## 🚀 Features

- 🔐 User authentication (JWT-based login & register)
- 👤 Profile management (update bio, skills, and details)
- 🔄 Skill barter requests (send/accept/decline requests)
- 🔍 Explore page to discover users and their skills
- 📱 Fully responsive UI (Tailwind CSS)
- ⚡ Backend with Express & MongoDB
- 🌐 API integration with Axios

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite / CRA)
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Others:**
- JWT Authentication
- bcrypt.js for password hashing

---

## ⚙️ Installation & Setup

Clone the repo:

```bash
git clone https://github.com/your-username/skillswap.git
cd skillswap

```
## Backend setup
```bash
cd backend
npm install
npm run dev
```

##Create .env file in Backend
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```
## Frontend setup
```bash
cd frontend
npm install
npm run dev
```


