# 📄 AI Resume Analyzer

An **AI-powered Resume Analyzer** that compares resumes against job descriptions and provides a **match score**, insights, and suggestions for improvement.

Built with **FastAPI (backend)**, **React + Vite (frontend)**, and **Google Gemini API** for AI analysis.

---

## ✨ Features

- 📂 Upload your resume (PDF format).
- 📝 Input a job description.
- 🤖 AI-powered analysis using **Gemini**:
  - Match score (0–100).
  - Missing/extra skills.
  - Tailored improvement suggestions.
- 📊 ATS-friendly evaluation.
- ⚡ Modern UI with gradient theme and responsive design.

---

## 🛠️ Tech Stack

**Frontend**:

- React (Vite)
- TailwindCSS / Custom CSS

**Backend**:

- FastAPI
- PyPDF2 (PDF text extraction)
- CORS enabled for frontend communication

**AI/ML**:

- Google Gemini API (LLM for text analysis)

**Database (Optional)**:

- PostgreSQL (for storing user data / logs)

---

## 📂 Project Structure

```
AI-Resume-Analyzer/
│── backend/
│   │── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── services/
│   │   │   ├── pdf_parser.py     # Extract text from resumes
│   │   │   ├── ai_analyzer.py    # Call Gemini for analysis
│   │   └── __init__.py
│   ├── venv/                     # Virtual environment
│   ├── requirements.txt
│   └── .env                      # Environment variables
│
│── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Footer.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/<your-username>/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

---

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# or
source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend will run at → [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend will run at → [http://localhost:5173](http://localhost:5173)

---

## 🚀 Usage

1. Open [http://localhost:5173](http://localhost:5173).
2. Upload your resume (PDF).
3. Paste a job description.
4. Click **Analyze** → Get match score + AI suggestions instantly.

---

## 📸 Screenshots

Homepage
[Homepage](frontend/public/FP.png)

Upload Resume
[Upload Resume](frontend/public/uploaded.png)

Analysis Output
[Analysis Result 1](frontend/public/output1.png)
[Analysis Result 2](frontend/public/output2.png)

---

## 📌 Roadmap

- [ ] Improve UI/UX with TailwindCSS components
- [ ] Add user authentication & dashboard
- [ ] Store past analyses in database
- [ ] Export analysis as PDF

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 🙌 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Google Gemini API](https://ai.google.dev/)
- [PyPDF2](https://pypi.org/project/PyPDF2/)
