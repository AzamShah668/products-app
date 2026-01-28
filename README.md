# 🛍️ Products Management System

A full-stack web application for managing products with user authentication. Built with FastAPI backend and React frontend.

## 📦 What's Included

### Backend (FastAPI + Python)
- User registration and authentication with JWT tokens
- CRUD operations for products
- SQLite database with SQLModel
- Password hashing with bcrypt
- CORS support
- Automatic API documentation

### Frontend (React + TypeScript)
- Modern React application with TypeScript
- User authentication (login/register)
- Product management interface
- Responsive design with Tailwind CSS
- Protected routes and authentication state
- Production-ready build configuration

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository and navigate to the project**:
   ```bash
   cd your-project-directory
   ```

2. **Start both services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Manual Setup

#### Backend Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Run the backend
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=sqlite:///./products.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
├── app/                    # Backend application
│   ├── api/               # API endpoints
│   ├── core/              # Core functionality
│   ├── db/                # Database configuration
│   ├── models/            # Database models
│   ├── schemas/           # Pydantic schemas
│   └── main.py           # FastAPI application
├── frontend/              # Frontend application
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   └── ...
│   └── package.json
├── docker-compose.yml     # Docker orchestration
├── Dockerfile.backend     # Backend Docker config
├── DEPLOYMENT.md         # Production deployment guide
└── README.md            # This file
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info (requires authentication)

### Products
- `GET /products/` - List all products
- `GET /products/{id}` - Get specific product
- `POST /products/` - Create new product (requires authentication)
- `PUT /products/{id}` - Update product (requires authentication)
- `DELETE /products/{id}` - Delete product (requires authentication)

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy Options

#### Backend
- **Railway**: Connect GitHub repo, automatic deployment
- **Render**: Python web service with build commands
- **Heroku**: Traditional PaaS deployment

#### Frontend
- **Vercel**: Connect GitHub repo, automatic deployment
- **Netlify**: Static site hosting with build configuration
- **GitHub Pages**: Free hosting for open source projects

## 🧪 Testing

### Backend Tests
```bash
# Install test dependencies
pip install pytest httpx

# Run tests
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your configuration:
```env
DATABASE_URL=sqlite:///./products.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

## Running the Application

Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit `http://localhost:8000/docs` for interactive API documentation.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info (requires authentication)

### Products
- `GET /products/` - List all products
- `GET /products/{id}` - Get specific product
- `POST /products/` - Create new product (requires authentication)
- `PUT /products/{id}` - Update product (requires authentication)
- `DELETE /products/{id}` - Delete product (requires authentication)

## Project Structure

```
app/
├── api/
│   ├── auth.py          # Authentication endpoints
│   ├── products.py      # Product CRUD endpoints
│   ├── deps.py          # Dependencies (empty)
│   └── security.py      # Security utilities
├── core/
│   ├── auth.py          # Authentication logic (empty)
│   ├── config.py        # Configuration settings
│   └── security.py      # Password hashing and JWT
├── db/
│   ├── base.py          # Database initialization
│   └── session.py       # Database session management
├── models.py/
│   ├── product.py       # Product model
│   └── user.py          # User model
├── schemas/
│   ├── product.py       # Product schemas
│   └── user.py          # User schemas
└── main.py              # FastAPI application
```

## What You Learned

This backend implements:
1. **FastAPI Application Setup** - Creating the main app with CORS and routers
2. **Database Models** - Using SQLModel for type-safe database models
3. **Authentication** - JWT-based auth with password hashing
4. **API Endpoints** - RESTful endpoints for users and products
5. **Dependency Injection** - Using FastAPI's dependency system
6. **Configuration Management** - Environment-based configuration
7. **CRUD Operations** - Complete Create, Read, Update, Delete functionality

## Next Steps

To extend this backend, you could:
- Add product categories
- Implement search and filtering
- Add user roles and permissions
- Add product images
- Implement rate limiting
- Add comprehensive error handling
- Write tests
- Add logging
- Use a production database (PostgreSQL/MySQL)# products-app
