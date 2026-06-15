# 📅 Appointment System

A full-stack appointment management system built with Django REST Framework and React (Vite + Tailwind CSS).

## 🛠️ Tech Stack

**Backend**

- Python 3.12
- Django 5.x
- Django REST Framework
- PostgreSQL
- Docker

**Frontend**

- React 19
- Vite
- Tailwind CSS v4

## 📁 Project Structure

```
appointment_system/
├── .github/
│   └── workflows/
│       └── appointment.yml       # CI/CD pipeline
├── appointment_project/     # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/
│   └── ui/                  # React frontend
│       ├── src/
│       ├── package.json
│       └── vite.config.js
├── .env.example             # Environment variable template
├── .gitignore
├── Docker-compose.yml
├── Dockerfile
├── manage.py
└── requirements.txt
```

## ⚙️ Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL
- Docker

---

### 🐍 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/Aiswarya-Pokharel/appointment_system.git
cd appointment_system

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
cp .env.example .env
# Fill in your values in .env

# 5. Run migrations
python manage.py migrate

# 6. Create superuser
python manage.py createsuperuser

# 7. Start the server
python manage.py runserver
```

Backend runs at: [http://localhost:8000](http://localhost:8000)

---

### ⚛️ Frontend Setup

```bash
cd frontend/ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

### 🐳 Docker Setup

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🧪 Running Tests

```bash
python manage.py test
```

CI runs automatically on every push via GitHub Actions.

---

## 🚀 CI/CD

This project uses GitHub Actions for continuous integration:

- ✅ Installs Python dependencies
- ✅ Spins up a PostgreSQL service
- ✅ Runs Django tests on every push

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
