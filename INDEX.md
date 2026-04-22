# Student Login & Registration System - MERN Stack

## 📖 Project Overview

A complete, production-ready **Student Authentication System** built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project implements secure user registration, authentication, and account management with JWT tokens and password hashing.

---

## 🎯 Quick Links

| Document | Purpose |
|----------|---------|
| **[QUICK_START.md](QUICK_START.md)** | 🚀 Start here - 5 minute setup |
| **[README.md](README.md)** | 📚 Complete project documentation |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | ☁️ Deploy to Render & Vercel |
| **[API_TESTING.md](API_TESTING.md)** | 🧪 Test all API endpoints |
| **[REQUIREMENTS.md](REQUIREMENTS.md)** | ✅ All requirements checklist |

---

## 🏗️ Project Structure

```
mernprac/
│
├── 📁 backend/
│   ├── config/db.js                    [MongoDB connection]
│   ├── models/Student.js               [Database schema + bcrypt]
│   ├── controllers/authController.js   [Business logic]
│   ├── routes/auth.js                  [API endpoints]
│   ├── middleware/auth.js              [JWT verification]
│   ├── server.js                       [Express setup]
│   ├── package.json
│   ├── .env                            [Configuration]
│   └── README.md                       [Backend docs]
│
├── 📁 frontend/
│   ├── public/index.html               [HTML template]
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx            [Registration form]
│   │   │   ├── Login.jsx               [Login form]
│   │   │   ├── Dashboard.jsx           [Protected dashboard]
│   │   │   └── ProtectedRoute.jsx      [Route protection]
│   │   ├── services/api.js             [Axios & API calls]
│   │   ├── styles/
│   │   │   ├── auth.css               [Auth page styles]
│   │   │   └── dashboard.css          [Dashboard styles]
│   │   ├── App.js                      [Routing setup]
│   │   └── index.js                    [Entry point]
│   ├── package.json
│   ├── .env                            [Configuration]
│   └── README.md                       [Frontend docs]
│
├── 📄 QUICK_START.md                   [Quick setup guide]
├── 📄 README.md                        [Main documentation]
├── 📄 DEPLOYMENT.md                    [Deployment guide]
├── 📄 API_TESTING.md                   [API testing guide]
├── 📄 REQUIREMENTS.md                  [Requirements checklist]
└── 📄 INDEX.md                         [This file]
```

---

## ✨ Features

### User Management
- 🔐 Secure user registration with email validation
- 🔑 Secure login with password verification
- 👤 View student profile information
- 🔄 Update password (with old password verification)
- 📚 Change enrolled course
- 🚪 Secure logout

### Security
- 🔒 **bcrypt** password hashing (10 salt rounds)
- 🎟️ **JWT** authentication (7-day expiration)
- 🛡️ Protected routes (frontend & backend)
- ✔️ Input validation and error handling
- 📧 Unique email enforcement

### Technical Stack
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Frontend**: React + React Router
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Password Security**: bcrypt

---

## 🚀 Getting Started

### 1️⃣ Quickstart (5 minutes)
```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev

# Frontend (Terminal 2)
cd frontend
npm install
npm start
```

👉 See [QUICK_START.md](QUICK_START.md) for detailed instructions

### 2️⃣ Test the Application
- Go to http://localhost:3000
- Register a new student account
- Login with your credentials
- Update password and course
- Test all features

### 3️⃣ Deploy (Optional)
- Backend → Render.com
- Frontend → Vercel.com

👉 See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment

---

## 📋 API Endpoints

### Public Routes
```
POST   /api/register              → Create new account
POST   /api/login                 → Login & get token
```

### Protected Routes (require JWT token)
```
GET    /api/dashboard             → Get profile info
PUT    /api/update-password       → Change password
PUT    /api/update-course         → Change course
```

👉 See [API_TESTING.md](API_TESTING.md) for detailed API documentation

---

## 📐 Project Requirements

### Part A: Backend (6 Marks) ✅
- ✅ MongoDB schema with Name, Email, Password, Course
- ✅ 5 REST API endpoints
- ✅ bcrypt password hashing
- ✅ JWT authentication with middleware

### Part B: Frontend (6 Marks) ✅
- ✅ Registration & Login forms
- ✅ Protected dashboard with profile, password, course tabs
- ✅ Axios API integration
- ✅ Token management & localStorage

### Part C: Integration (3 Marks) ✅
- ✅ Protected routes with auth middleware
- ✅ Comprehensive error handling
- ✅ Secure logout functionality

👉 See [REQUIREMENTS.md](REQUIREMENTS.md) for complete checklist

---

## 🧪 Testing

### Manual Testing
1. Register with new email
2. Login with credentials
3. Update password
4. Change course
5. Logout and re-login

### API Testing
- Postman collection examples in [API_TESTING.md](API_TESTING.md)
- curl commands for testing
- Complete error scenarios

### Automated Testing
```bash
# Backend database operations:
npm install          # Install dependencies
npm run dev          # Start with auto-reload

# Frontend build:
npm run build        # Build for production
npm test            # Run tests
```

---

## 💾 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/student_auth
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

## 🔒 Security Features

| Feature | Implementation |
|---------|-----------------|
| Password Hashing | bcrypt (10 rounds) |
| Authentication | JWT (7-day expiration) |
| Route Protection | Middleware + ProtectedRoute |
| Input Validation | Server & client-side |
| CORS | Enabled for frontend domain |
| Token Storage | localStorage |
| Password Change | Requires old password verification |

---

## 📚 Documentation

| Document | Contains |
|----------|----------|
| **QUICK_START.md** | Commands to run project, basic troubleshooting |
| **README.md** | Complete project documentation, features, API docs |
| **DEPLOYMENT.md** | Step-by-step deployment to Render & Vercel |
| **API_TESTING.md** | Postman examples, curl commands, test cases |
| **REQUIREMENTS.md** | All project requirements with implementation details |
| **backend/README.md** | Backend setup, dependencies, development guide |
| **frontend/README.md** | Frontend setup, components, styling info |

---

## 🐛 Troubleshooting

### Backend Issues
| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Start MongoDB service |
| Port 5000 already in use | Change PORT in .env to 5001 |
| Dependencies won't install | Delete node_modules, run npm install |

### Frontend Issues
| Problem | Solution |
|---------|----------|
| Blank page | Check console (F12), verify backend running |
| CORS error | Ensure backend is on http://localhost:5000 |
| Can't login | Clear localStorage, verify MongoDB has data |

👉 See [QUICK_START.md](QUICK_START.md#-troubleshooting) for more solutions

---

## 🎓 What You'll Learn

After completing this project, you'll understand:

- ✅ Full MERN stack development
- ✅ JWT authentication flow
- ✅ Password security & hashing
- ✅ REST API design
- ✅ Protected routes
- ✅ MongoDB schema design
- ✅ React routing & components
- ✅ Error handling & validation
- ✅ Production deployment

---

## 📞 Support Resources

### Documentation
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- React: https://react.dev
- JWT: https://jwt.io

### Hosting
- Render (Backend): https://render.com
- Vercel (Frontend): https://vercel.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Files Created | 30+ |
| Backend Routes | 5 |
| Frontend Components | 5 |
| Lines of Code | 2000+ |
| API Endpoints | 5 |
| Database Collections | 1 |
| Security Features | 6+ |

---

## 🎯 Marks Distribution

| Component | Marks |
|-----------|-------|
| Backend Development | 6 |
| Frontend Development | 6 |
| Integration & Functionality | 3 |
| **Total** | **15** |

---

## 🚀 Next Steps

### Immediate (Now)
1. Read [QUICK_START.md](QUICK_START.md)
2. Run backend: `npm run dev`
3. Run frontend: `npm start`
4. Test all features

### Short Term (This week)
1. Deploy to Render & Vercel
2. Test on live servers
3. Review [REQUIREMENTS.md](REQUIREMENTS.md)
4. Show to instructor

### Future (Optional)
1. Email verification
2. Password reset
3. User profile pictures
4. Admin dashboard
5. Two-factor authentication

---

## 📝 Version History

- **v1.0.0** - Initial release with all features
  - User registration & login
  - JWT authentication
  - Password & course management
  - Protected routes
  - Complete documentation

---

## 📄 License

This project is created for educational purposes as part of a MERN Stack course.

---

## 👨‍💻 Project Created

Created with ❤️ as a comprehensive MERN Stack learning project.

---

## ⭐ Key Achievements

✅ **All Requirements Met** - Part A, B, and C completed  
✅ **Production Ready** - Can be deployed immediately  
✅ **Well Documented** - 5+ comprehensive guides  
✅ **Secure** - JWT + bcrypt + validation  
✅ **Responsive** - Works on all devices  
✅ **Error Handling** - Comprehensive error messages  
✅ **Testing Guide** - Complete API testing documentation  

---

## 🎉 Ready to Start?

**👉 Jump to [QUICK_START.md](QUICK_START.md) to get up and running in 5 minutes!**

---

*Last Updated: January 2024*  
*Created for MERN Stack Educational Project*
