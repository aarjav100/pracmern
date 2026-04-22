# Quick Start Guide

## Project Initialization & Running

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Git (optional)

---

## 🚀 Quick Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend will run on: **http://localhost:5000**

Backend is ready when you see:
```
MongoDB connected successfully
Server running on port 5000
```

### 2. Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will automatically open at: **http://localhost:3000**

---

## 📝 First Test

### 1. Register a Student
- Go to http://localhost:3000/register
- Fill in the form:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Course: Computer Science
- Click "Register"
- You'll see the Dashboard

### 2. View Dashboard
- You're now logged in
- See your profile
- Try changing password
- Try changing course
- Click Logout

### 3. Login Again
- Go to http://localhost:3000/login
- Email: john@example.com
- Password: password123 (or your new password if you changed it)
- Login successful!

---

## 🗄️ MongoDB Setup

### Option A: Local MongoDB (Windows)

1. Download from: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. MongoDB starts automatically
4. Connection string in `.env` is already set to: `mongodb://localhost:27017/student_auth`

### Option B: MongoDB Atlas (Cloud)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/student_auth
   ```
5. Update `.env` in backend:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_auth
   ```

---

## 📁 Project Structure

```
mernprac/
├── backend/
│   ├── server.js          ← Main file
│   ├── .env               ← Configuration
│   ├── package.json
│   └── [folders with code]
├── frontend/
│   ├── src/
│   │   ├── App.js         ← Main file
│   │   └── index.js
│   ├── .env               ← Configuration
│   ├── package.json
│   └── [folders with code]
└── [Documentation files]
```

---

## 🔐 How It Works

### Registration Flow
```
1. User enters details → Frontend
2. Frontend sends POST to /api/register → Backend
3. Backend hashes password with bcrypt
4. Backend stores in MongoDB
5. Backend returns JWT token
6. Frontend stores token in localStorage
7. Frontend redirects to dashboard
```

### Login Flow
```
1. User enters email & password → Frontend
2. Frontend sends POST to /api/login → Backend
3. Backend finds user in MongoDB
4. Backend compares passwords (bcrypt)
5. Backend generates JWT token
6. Frontend stores token
7. Frontend redirects to dashboard
```

### Dashboard Access
```
1. User goes to /dashboard
2. Frontend checks localStorage for token
3. If no token → redirects to login
4. If token exists → shows dashboard
5. All API calls include token in header
6. Backend middleware verifies token
```

---

## 🛠️ Available Commands

### Backend
```bash
cd backend

npm start         # Run production
npm run dev       # Run development (with auto-reload)
npm install       # Install dependencies
```

### Frontend
```bash
cd frontend

npm start         # Start development server (opens browser)
npm build         # Build for production
npm install       # Install dependencies
```

---

## 🔗 API Endpoints

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | /api/register | No | Register new student |
| POST | /api/login | No | Login student |
| GET | /api/dashboard | Yes | Get profile |
| PUT | /api/update-password | Yes | Change password |
| PUT | /api/update-course | Yes | Change course |

---

## 🧪 Testing with Postman

Export this as a Postman collection or test manually:

### 1. Register
```
POST http://localhost:5000/api/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123456",
  "course": "Computer Science"
}
```

Response will include: `"token": "eyJhbGc..."`

### 2. Login (Copy the token from response)
```
POST http://localhost:5000/api/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "test123456"
}
```

### 3. Get Dashboard (Paste token)
```
GET http://localhost:5000/api/dashboard
Header:
Authorization: Bearer {paste_token_here}
```

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution: Start MongoDB first
- Windows: Should auto-start
- Mac: brew services start mongodb-community
- Linux: sudo systemctl start mongod
```

### Frontend shows blank page
```
Solution:
1. Check browser console (F12) for errors
2. Verify backend is running on 5000
3. Clear localStorage: F12 → Application → LocalStorage → Delete
4. Reload page
```

### "Can't reach backend" error
```
Solution:
1. Ensure backend is running: npm run dev
2. Check REACT_APP_API_BASE_URL in frontend/.env
3. Should be: http://localhost:5000/api
4. Restart frontend: npm start
```

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution: Change PORT in backend/.env to 5001
Then update frontend REACT_APP_API_BASE_URL to:
http://localhost:5001/api
```

---

## 📚 Project Files

### Main Documentation
- **README.md** - Complete project overview
- **DEPLOYMENT.md** - How to deploy to Render & Vercel
- **API_TESTING.md** - Complete API testing guide
- **REQUIREMENTS.md** - All requirements checklist
- **backend/README.md** - Backend documentation
- **frontend/README.md** - Frontend documentation

---

## 🚀 Next Steps

### 1. Run Locally (Now)
Follow the "Quick Setup" section above

### 2. Test Everything
- Register, Login, Update Password, Change Course, Logout
- Test with Postman
- Try invalid inputs

### 3. Deploy (Later)
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Deploying backend to Render
- Deploying frontend to Vercel
- Setting up MongoDB Atlas

### 4. Customize
- Change colors in CSS files
- Add more fields to registration
- Add more courses to options
- Add profile picture upload

---

## ✅ Features Included

### User Accounts
- ✅ Secure registration with email validation
- ✅ Secure login with password hashing
- ✅ JWT-based authentication
- ✅ 7-day token expiration

### Dashboard
- ✅ View profile information
- ✅ Update password (old password verification)
- ✅ Change course
- ✅ Secure logout

### Security
- ✅ Bcrypt password hashing
- ✅ JWT authentication
- ✅ Protected routes (frontend & backend)
- ✅ Token in Authorization header
- ✅ Input validation

### Code Quality
- ✅ Well-organized project structure
- ✅ Error handling & validation
- ✅ Loading states
- ✅ Responsive design
- ✅ API interceptors
- ✅ Middleware pattern

---

## 📞 Need Help?

### Check These Files
1. **Error in backend?** → See backend/README.md
2. **Error in frontend?** → See frontend/README.md
3. **Want to test API?** → See API_TESTING.md
4. **Want to deploy?** → See DEPLOYMENT.md
5. **Check requirements?** → See REQUIREMENTS.md

### Common Issues
- Can't connect to MongoDB? → Check MongoDB is running
- CORS error? → Ensure backend is running
- Token expired? → Login again
- Forgotten password? → Clear localStorage, register new account

---

## 🎓 Learning Outcomes

After this project, you understand:
- ✅ How to build MERN applications
- ✅ JWT authentication flow
- ✅ Password hashing & security
- ✅ API design with Express
- ✅ React routing & components
- ✅ MongoDB schemas & models
- ✅ Protected routes
- ✅ Error handling

---

**Ready to start? Run these commands:**

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

Then go to http://localhost:3000 and test the application! 🎉

---

**Happy Coding!** 🚀
