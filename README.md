# 📋 Todo Web Application

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> A production-ready, full-stack TODO application demonstrating advanced full-stack development capabilities with comprehensive task management features.

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🌐 API Documentation](#-api-documentation)
- [🚀 Deployment](#-deployment)
- [🏆 Project Highlights](#-project-highlights)
- [🎯 Standout Features](#-standout-features)
- [🛠️ Development Best Practices](#️-development-best-practices)
- [📈 Performance & Scalability](#-performance--scalability)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Create, read, update, and delete tasks
- 🔍 **Advanced Search**: Real-time search across titles, descriptions, and categories
- 🎯 **Priority System**: Assign priorities (1-10) with color-coded visual indicators
- 📊 **Smart Sorting**: Sort by priority, due date, or creation date (ascending/descending)
- 🔽 **Status Filtering**: Filter tasks by status (All/Done/Undone)
- 🏷️ **Categories**: Organize tasks with custom categories

### Advanced Features
- 🎯 **Drag & Drop**: Reorder tasks intuitively with @dnd-kit
- 📅 **Due Dates**: Schedule tasks with integrated date picker
- 📱 **Responsive Design**: Mobile-first approach that works on all devices
- ⚡ **Real-time Updates**: Instant UI feedback without page refreshes
- 🎨 **Modern UI**: Beautiful interface with shadcn/ui components
- 🔒 **Type Safety**: Full TypeScript implementation across the stack

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - Powerful ORM for database operations
- **PostgreSQL/SQLite** - Production-ready database (PostgreSQL) with SQLite for development
- **Pydantic** - Data validation and serialization
- **python-dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - End-to-end type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible component library
- **@dnd-kit** - Premier drag and drop library
- **React Hooks** - Modern state management

### DevOps & Deployment
- **Railway** - Backend deployment with managed PostgreSQL
- **Vercel** - Frontend deployment with global CDN
- **Docker** - Containerized backend for consistent deployments
- **GitHub** - Version control and CI/CD integration

## 📁 Project Structure

```
TodoWebApp/
├── backend/                 # FastAPI backend application
│   ├── main.py             # API endpoints and middleware
│   ├── models.py           # SQLAlchemy database models
│   ├── schemas.py          # Pydantic validation schemas
│   ├── crud.py             # Database CRUD operations
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Docker configuration
│   ├── railway.toml        # Railway deployment config
│   └── .env.example        # Environment variables template
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable React components
│   │   ├── lib/           # Utilities and API client
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   ├── vercel.json        # Vercel deployment config
│   └── .env.production    # Production environment variables
├── DEPLOYMENT.md          # Detailed deployment guide
├── PROJECT_SUMMARY.md     # Comprehensive project overview
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.11+** and pip
- **Git** for version control

### Local Development

#### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🌐 API Documentation

### Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|-------------------|
| `GET` | `/tasks` | Get all tasks with filtering | `search`, `status`, `category`, `sort_by`, `sort_order` |
| `POST` | `/tasks` | Create a new task | - |
| `GET` | `/tasks/{id}` | Get a specific task | - |
| `PUT` | `/tasks/{id}` | Update a task | - |
| `DELETE` | `/tasks/{id}` | Delete a task | - |
| `GET` | `/categories` | Get all categories | - |

### Query Parameters
- **search**: Search in title, description, and category
- **status**: Filter by `all`, `done`, or `undone`
- **category**: Filter by category name
- **sort_by**: Sort by `priority`, `due_date`, or `created_at`
- **sort_order**: `asc` or `desc`

### Interactive Documentation
Visit `/docs` for interactive API documentation (Swagger UI).

## 🚀 Deployment

### Production Deployment

#### 1. Backend (Railway)
```bash
# Deploy to Railway
cd backend
railway login
railway init
railway up
```

**Configuration:**
- Root directory: `backend`
- Builder: Dockerfile
- Database: PostgreSQL (provided by Railway)
- Environment variables: `ALLOWED_ORIGINS` (set to your Vercel domain)

#### 2. Frontend (Vercel)
```bash
# Deploy to Vercel
cd frontend
vercel login
vercel --prod
```

**Configuration:**
- Root directory: `frontend`
- Build command: `npm run build`
- Environment variables: `NEXT_PUBLIC_API_URL` (set to Railway URL)

#### 3. Environment Setup

**Backend Environment Variables:**
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_ORIGINS=https://your-app.vercel.app
```

**Frontend Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### 📱 Live Application URLs

**Current Deployment:**
- **🌐 Frontend Application**: https://frontend-gamma-seven-16.vercel.app
- **⚙️ Backend API**: https://todowebapp1-production.up.railway.app
- **📚 API Documentation**: https://todowebapp1-production.up.railway.app/docs
- **🔗 GitHub Repository**: https://github.com/ikitcya/TodoWebApp1

**Alternative URLs:**
- **Frontend (Direct)**: https://frontend-l4yd09quv-maksyms-projects-d10f7576.vercel.app
- **API Endpoints**: https://todowebapp1-production.up.railway.app/tasks
- **OpenAPI Schema**: https://todowebapp1-production.up.railway.app/openapi.json

## 🏆 Project Highlights

### 🏗️ Technical Excellence
- **🔒 Type Safety**: End-to-end TypeScript implementation
- **🏗️ Modern Architecture**: Clean separation of concerns with reusable components
- **🗄️ Database Design**: Optimized schema with proper relationships and indexing
- **🚀 API Design**: RESTful API with comprehensive error handling
- **⚡ Performance**: Optimized builds and efficient data fetching

### 🎨 User Experience
- **🎨 Modern UI**: Clean, intuitive interface with shadcn/ui components
- **📱 Responsive Design**: Mobile-first approach, works on all devices
- **🎯 Interactive Features**: Smooth drag-and-drop functionality
- **⚡ Real-time Updates**: Instant UI feedback without page refreshes
- **🔍 Advanced Filtering**: Multiple filter options for task management

### 🚀 Production Ready
- **🚀 Deployment Ready**: Configured for Railway and Vercel
- **🔧 Environment Management**: Proper environment variable handling
- **🗄️ Database Support**: SQLite for development, PostgreSQL for production
- **🛡️ Error Handling**: Comprehensive error management and user feedback
- **📊 Monitoring**: Ready for integration with monitoring tools

## 🎯 Standout Features

This project goes beyond basic requirements to demonstrate professional full-stack development:

### **🚀 Advanced Functionality**
- **🎯 Drag & Drop**: Intuitive task reordering with @dnd-kit
- **📅 Due Date Management**: Calendar integration for task scheduling
- **🏷️ Category System**: Custom categorization for better organization
- **🔍 Multi-field Search**: Search across titles, descriptions, and categories
- **📊 Advanced Sorting**: Multiple sorting options with priority indicators

### **🔧 Technical Excellence**
- **🔒 Full TypeScript**: End-to-end type safety across the stack
- **🗄️ Production Database**: PostgreSQL with optimized schema design
- **🎨 Modern UI/UX**: shadcn/ui components with Tailwind CSS
- **📱 Responsive Design**: Mobile-first approach
- **⚡ Performance**: Optimized builds and efficient data fetching

### **🛠️ DevOps Best Practices**
- **🐳 Containerization**: Docker-ready backend
- **🚀 CI/CD Ready**: Configured for Railway and Vercel deployment
- **🔧 Environment Management**: Proper configuration handling
- **📚 Comprehensive Documentation**: Detailed guides and API docs

## 🛠️ Development Best Practices

- **🏗️ Clean Architecture**: Separation of concerns with modular design
- **🧩 Reusable Components**: Component-based React architecture
- **🔒 Type Safety**: Comprehensive TypeScript implementation
- **🌐 API Design**: RESTful endpoints with proper HTTP methods
- **⚠️ Error Handling**: Graceful error management and user feedback
- **🧪 Testing Ready**: Structure supports easy testing integration
- **🔒 Security**: CORS configuration and environment variable management

## 📈 Performance & Scalability

- **🗄️ Database Optimization**: Indexed queries and efficient schema
- **⚡ Frontend Optimization**: Next.js optimizations and code splitting
- **🚀 API Performance**: Fast response times with proper caching
- **📏 Scalable Architecture**: Ready for horizontal scaling
- **📊 Monitoring Ready**: Easy integration with monitoring tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [FastAPI](https://fastapi.tiangolo.com/)
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Drag and drop functionality by [@dnd-kit](https://dndkit.com/)

---

**⭐ If you find this project helpful, please consider giving it a star!**

