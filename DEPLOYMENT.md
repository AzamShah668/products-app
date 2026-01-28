# 🚀 Production Deployment Guide

This guide covers deploying both the FastAPI backend and React frontend to production.

## 🏗️ Architecture Overview

- **Backend**: FastAPI (Python) with SQLite database
- **Frontend**: React (TypeScript) with Vite
- **Deployment**: Separate backend and frontend deployments

## 📋 Prerequisites

- Backend deployed and accessible via HTTPS
- Domain name (recommended for production)
- SSL certificate (Let's Encrypt or similar)

## 🔧 Backend Deployment

### Option 1: Railway (Recommended)

1. **Connect Repository**:
   - Import your GitHub repo to Railway
   - Railway will detect Python/FastAPI automatically

2. **Environment Variables**:
   ```
   DATABASE_URL=sqlite:///./products.db
   SECRET_KEY=your-super-secret-key-change-this-in-production
   ACCESS_TOKEN_EXPIRE_MINUTES=120
   ```

3. **Deploy**:
   - Railway will build and deploy automatically
   - Your API will be available at `https://your-app.railway.app`

### Option 2: Render

1. **Create Web Service**:
   - Connect GitHub repository
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables**: Same as Railway

### Option 3: Heroku

1. **Create App**:
   ```bash
   heroku create your-app-name
   ```

2. **Configure**:
   ```bash
   heroku buildpacks:add heroku/python
   heroku config:set DATABASE_URL=sqlite:///./products.db
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set ACCESS_TOKEN_EXPIRE_MINUTES=120
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**:
   - Import your GitHub repo to Vercel
   - Set root directory to `frontend/`

2. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

3. **Deploy**:
   - Vercel will build and deploy automatically
   - Your frontend will be available at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Connect Repository**:
   - Import your GitHub repo
   - Set build settings:
     - Base directory: `frontend/`
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

3. **Deploy**:
   - Netlify will build and deploy automatically

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔒 Security Considerations

### Backend Security

1. **Environment Variables**:
   - Never commit secrets to version control
   - Use strong, random SECRET_KEY
   - Set ACCESS_TOKEN_EXPIRE_MINUTES appropriately

2. **Database**:
   - For production, consider PostgreSQL instead of SQLite
   - Enable database backups
   - Use connection pooling

3. **CORS**:
   - Update CORS origins in production:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-frontend-domain.com"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

### Frontend Security

1. **HTTPS Only**:
   - Ensure your frontend is served over HTTPS
   - Redirect HTTP to HTTPS

2. **Content Security Policy**:
   - Configure CSP headers in your deployment platform

3. **API URLs**:
   - Use environment variables for API URLs
   - Never hardcode API endpoints

## 🚀 Production Checklist

### Backend
- [ ] Environment variables configured
- [ ] SECRET_KEY is strong and random
- [ ] CORS origins updated for production domain
- [ ] Database backups configured (if using persistent DB)
- [ ] Logging configured
- [ ] Health checks working
- [ ] SSL certificate installed

### Frontend
- [ ] VITE_API_URL points to production backend
- [ ] Build process working
- [ ] All routes working (SPA routing configured)
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Error boundaries implemented

### General
- [ ] Domain configured
- [ ] SSL certificate valid
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated

## 🔍 Testing Production Deployment

1. **Backend API**:
   ```bash
   curl https://your-backend-api.com/health
   curl https://your-backend-api.com/docs
   ```

2. **Frontend**:
   - Visit your frontend URL
   - Test user registration
   - Test login/logout
   - Test product CRUD operations

3. **Integration**:
   - Verify frontend can communicate with backend
   - Test authentication flow
   - Test error handling

## 📊 Monitoring & Maintenance

### Backend Monitoring
- Set up application logging
- Monitor response times
- Track error rates
- Database performance monitoring

### Frontend Monitoring
- Use services like Sentry for error tracking
- Monitor Core Web Vitals
- Track user interactions

### Database
- Regular backups
- Monitor disk usage
- Optimize queries if needed

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in backend
   - Verify frontend domain is allowed

2. **Authentication Issues**:
   - Check JWT token expiration
   - Verify SECRET_KEY consistency
   - Check token storage in frontend

3. **API Connection Issues**:
   - Verify VITE_API_URL in frontend
   - Check network connectivity
   - Verify backend is running

4. **Build Issues**:
   - Check build logs
   - Verify environment variables
   - Clear build cache if needed

## 📞 Support

If you encounter issues:
1. Check deployment platform documentation
2. Review application logs
3. Test locally first
4. Check network connectivity
5. Verify environment configuration

## 🎉 Success!

Once deployed, your full-stack application will be live and ready for users! 🎊

**Your application URLs:**
- Frontend: `https://your-frontend-domain.com`
- Backend API: `https://your-backend-api.com`
- API Documentation: `https://your-backend-api.com/docs`