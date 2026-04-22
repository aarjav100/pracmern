# Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Instructions

#### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/student_auth
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
EOF

# Start development server
npm run dev
```

#### 2. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Ensure .env exists
cat > .env << EOF
REACT_APP_API_BASE_URL=http://localhost:5000/api
EOF

# Start development server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## MongoDB Setup

### Option 1: Local MongoDB

#### Windows
1. Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install MongoDB
3. MongoDB should start automatically
4. Verify connection: `mongosh`

#### Mac
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
curl https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org
systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_auth?retryWrites=true&w=majority
```

---

## Deployment

### Backend Deployment on Render

#### Step 1: Prepare Repository
```bash
# Ensure MongoDB_URI and JWT_SECRET are in .env
# Commit code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository
5. Configure settings:
   - **Name**: student-auth-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Set Environment Variables
In Render dashboard:
- Add `MONGODB_URI`
- Add `JWT_SECRET`
- Add `PORT` (optional, default 5000)

#### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Note the URL (e.g., https://student-auth-backend.onrender.com)

### Frontend Deployment on Vercel

#### Step 1: Prepare Repository
```bash
# Commit code to GitHub
cd frontend
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select frontend repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend

#### Step 3: Set Environment Variables
In Vercel project settings:
- Add environment variable:
  - Key: `REACT_APP_API_BASE_URL`
  - Value: `https://student-auth-backend.onrender.com/api`

#### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete
- Your app is live!

---

## Alternative: Heroku Deployment (Backend)

### Notes
Heroku's free tier ended in November 2022. Use Render instead.

For historical reference or alternative services:
- Railway.app
- Cyclic.sh
- Fly.io

---

## Environment Variables Reference

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/student_auth
JWT_SECRET=super_secret_key_change_this
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### Production Values
```
Backend:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_auth
JWT_SECRET=very_strong_secret_key_should_be_long
PORT=5000
NODE_ENV=production

Frontend:
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
```

---

## Verification Checklist

### Local Development
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB is running and connected
- [ ] Can register new student
- [ ] Can login with credentials
- [ ] Dashboard loads after login
- [ ] Can change password
- [ ] Can change course
- [ ] Logout clears token and redirects to login

### After Deployment
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] CORS properly configured
- [ ] Environment variables set correctly
- [ ] Registration works on live app
- [ ] Login works on live app
- [ ] Protected routes require authentication
- [ ] Logout works and clears session

---

## Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MongoDB service status
3. Verify MONGODB_URI is correct
```

### CORS Errors
```
Error: Access to XMLHttpRequest blocked by CORS

Solution:
1. Check backend CORS middleware is enabled
2. Verify REACT_APP_API_BASE_URL is correct
3. Restart both servers
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution:
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Token Issues
```
Error: Invalid or expired token

Solution:
1. Clear localStorage
2. Login again to get new token
3. Check JWT_SECRET is same in backend
```

### Build Failures on Vercel
```
Solution:
1. Check Node version compatibility
2. Ensure all dependencies in package.json
3. Try building locally first: npm run build
4. Check build logs in Vercel dashboard
```

---

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MONGODB_URI uses secure connection
- [ ] Passwords are hashed with bcrypt
- [ ] No sensitive data in source code
- [ ] CORS restricted to frontend domain
- [ ] API validates all inputs
- [ ] Error messages don't leak sensitive info
- [ ] Token expiration set (7 days)
- [ ] HTTPS enforced (automatic on Vercel/Render)

---

## Performance Tips

1. **Database Indexes**: MongoDB creates index on email field
2. **Token Expiration**: 7 days balances security and convenience
3. **API Response**: Minimize data returned in responses
4. **Frontend**: Use React lazy loading for code splitting
5. **Caching**: Implement browser cache headers

---

## Updating After Deployment

### Update Backend
```bash
cd backend
git add .
git commit -m "Update message"
git push origin main
# Render auto-deploys
```

### Update Frontend
```bash
cd frontend
git add .
git commit -m "Update message"
git push origin main
# Vercel auto-deploys
```

---

## Support & Documentation

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Render Documentation](https://render.com/docs/)
- [Vercel Documentation](https://vercel.com/docs/)

---

**Happy Deploying!** 🚀
