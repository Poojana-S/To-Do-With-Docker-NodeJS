# 📝 To-Do App with Docker & Node.js

A simple and responsive To-Do application built using **Node.js, Express.js, HTML, CSS, and JavaScript**.  
The application is containerized using **Docker** and can be deployed easily on an AWS EC2 instance.

---

## 🚀 Features

- ✅ Add new todos
- ✅ View all todos
- ✅ Update todo status
- ✅ Delete todos
- ✅ Clear completed todos
- ✅ REST API backend
- ✅ Dockerized Node.js application
- ✅ Easy deployment on cloud servers

---

## 🛠️ Tech Stack

- **Frontend**
  - HTML
  - CSS
  - JavaScript

- **Backend**
  - Node.js
  - Express.js

- **Containerization**
  - Docker

- **Deployment**
  - AWS EC2

---

## 📂 Project Structure

```
To-Do-With-Docker-NodeJS/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone repository

```bash
git clone https://github.com/Poojana-S/To-Do-With-Docker-NodeJS.git
```

### 2. Navigate to project

```bash
cd To-Do-With-Docker-NodeJS
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start application

```bash
npm start
```

Application runs at:

```
http://localhost:3000
```

---

# 🐳 Run Using Docker

## Build Docker Image

```bash
docker build -t todo .
```

## Run Container

```bash
docker run -d -p 3000:3000 todo
```

Open:

```
http://localhost:3000
```

---

# ☁️ AWS EC2 Deployment

### Pull project

```bash
git clone https://github.com/Poojana-S/To-Do-With-Docker-NodeJS.git
```

### Build image

```bash
docker build -t todo .
```

### Run container

```bash
docker run -d -p 80:3000 todo
```

Access using:

```
http://<EC2-Public-IP>
```

---

# 🔌 API Endpoints

## Get all todos

```
GET /todos
```

## Create todo

```
POST /todos
```

Example:

```json
{
  "text": "Complete Docker deployment"
}
```

## Update todo

```
PUT /todos/:id
```

## Delete todo

```
DELETE /todos/:id
```

## Delete completed todos

```
DELETE /todos/completed/all
```

---

# 🐳 Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 👩‍💻 Author

**Poojana S**

GitHub:
https://github.com/Poojana-S

---

## 📄 License

This project is open-source and available under the MIT License.
