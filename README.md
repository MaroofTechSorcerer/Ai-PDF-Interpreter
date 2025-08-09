
# 📄 AI PDF Interpreter

An AI-powered web application to **upload, interpret, and analyze PDF documents** with a Python FastAPI backend and a modern React + TailwindCSS frontend.

This project allows users to extract structured text from PDF files and display the results in an intuitive interface. 

---

## 🚀 Features

### 📄 PDF Processing Features

- 🧠 **PDF Text Extraction** – Extract all text content from PDF files  
- ✨ **PDF Summarization** – Generate AI-powered summaries of PDF content  
- 🌐 **PDF Translation** – Translate PDF content to any target language  
- ✂️ **PDF Splitting** – Split PDFs by specific page ranges  
- ➕ **PDF Merging** – Combine multiple PDF files into one document  
- 🔍 **PDF Search** – Search within PDF content for keywords and phrases  
- 🖼️ **PDF to Images Conversion** – Convert PDF pages into PNG image files  

---

### 📥 Download Features

- 🗜️ **ZIP File Downloads** – Download extracted images or split PDFs as compressed archives  
- 🧾 **Summary PDF Export** – Save AI-generated summaries as new PDF files  
- 🖼️ **Image Downloads** – Download images converted from PDF pages  
- 📄 **Split PDF Downloads** – Download each split part as an individual PDF  
- 📎 **Merged PDF Downloads** – Download the final combined PDF document  
- 📚 **Batch File Downloads** – Download multiple processed files together  

---

### 📁 File Output & Handling

- 📤 **Multiple Output Formats** – Support for PDF, PNG, and ZIP outputs  
- 🚀 **Static File Serving** – Direct download links served via FastAPI backend  
- ✅ **File Validation** – Ensure PDF file types before processing  
- 🧷 **Organized File Naming** – Automatically name output files for easy retrieval  

---
---

### 📥 Project Introduction Video

https://drive.google.com/file/d/1XZ4mGZtqNKrEHHUqIBp9Qg6FP4gEvPz0/view?usp=sharing

### 📥 Demo Video

https://drive.google.com/file/d/1PwCT037v8ZbtpquYmL42oy4WLMzGsCMN/view?usp=drive_link

## 🛠️ Tech Stack

### 🖥️ Frontend  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  

### ⚙️ Backend  
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)  
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)  


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
