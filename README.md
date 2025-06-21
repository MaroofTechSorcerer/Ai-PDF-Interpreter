
# 📄 AI PDF Interpreter

An AI-powered web application to **upload, interpret, and analyze PDF documents** with a Python FastAPI backend and a modern React + TailwindCSS frontend.

This project allows users to extract structured text from PDF files and display the results in an intuitive interface. 

---

## 🚀 Features

- 📤 Upload and analyze PDF files in real time  
- 🔍 Extract and clean structured text from documents  
- 📂 View uploaded documents and their metadata  
- 💾 Download and retrieve processed results
- 📊 Responsive UI built with React and TailwindCSS  
- ⚡ FastAPI  

---

### 📥 Demo Video

![Demo Video](./demo/demo.mp4)

## 🛠️ Tech Stack

### 🖥️ Frontend  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  

### ⚙️ Backend  
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)  
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  


---

## 📂 Project Structure

```
Ai-PDF-Interpreter/
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── ...
├── frontend/              # React + Tailwind frontend
│   ├── components/
│   ├── pages/
│   └── ...
└── README.md
```

---

## ⚙️ Installation

### 🔧 Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
---

### 🌐 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 📬 API Endpoints

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| POST   | `/upload`        | Upload PDF file             |
| GET    | `/documents`     | List all processed files    |
| GET    | `/document/{id}` | Get a specific document     |

FastAPI auto docs available at `http://localhost:8000/docs`

---

## ✍️ Author

**Mohammad Maroof**  
🔗 [LinkedIn](https://linkedin.com/in/mohammad-maroof-05aa10264)  
💻 [GitHub](https://github.com/MaroofTechSorcerer)

---

## 📈 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=MaroofTechSorcerer&theme=dark&hide_border=true&include_all_commits=false&count_private=true)  

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=MaroofTechSorcerer&theme=dark&hide_border=true&layout=compact)

[![](https://visitcount.itsvg.in/api?id=MaroofTechSorcerer-AiPDF&icon=5&color=6)](https://visitcount.itsvg.in)

---

> 🛠️ Built with ❤️ using Python, FastAPI, React, TailwindCSS.
