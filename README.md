# Student Login & Registration System - MERN Stack

A complete Student Authentication System built with MongoDB, Express, React, and Node.js (MERN Stack).

## Project Overview

This project implements a secure student authentication system with the following features:
- **Student Registration** - Create new student accounts with validation
- **Secure Login** - JWT-based authentication
- **Protected Dashboard** - Access student information and settings
- **Password Management** - Securely update passwords
- **Course Selection** - Change enrolled course
- **Secure Logout** - Clear session tokens

## Project Structure

```
mernprac/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   └── authController.js
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   └── dashboard.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
└── README.md
```

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken (JWT)** - Authentication
- **mongoose** - MongoDB ODM
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Features

### Part A: Backend Development (6 Marks)

#### 1. MongoDB Schema/Model
- **Name** - Student full name
- **Email** - Unique email address
- **Password** - Hashed password using bcrypt
- **Course** - Student's enrolled course

#### 2. REST APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new student |
| POST | `/api/login` | Authenticate student |
| GET | `/api/dashboard` | Get student profile (Protected) |
| PUT | `/api/update-password` | Change password (Protected) |
| PUT | `/api/update-course` | Change course (Protected) |

#### 3. Security Features
- bcrypt for password hashing (10 salt rounds)
- JWT for stateless authentication
- Authentication middleware for protected routes
- Password verification on login
- Unique email validation

### Part B: Frontend Development (6 Marks)

#### 1. Components
- **Register Form** - Name, Email, Password, Course selection
- **Login Form** - Email, Password with validation
- **Dashboard** - Multi-tab interface with:
  - Profile information display
  - Password change form
  - Course change dropdown
  - Logout button

#### 2. Features
- Axios API integration with interceptors
- JWT token stored in localStorage
- Protected routes with ProtectedRoute component
- Error handling and user feedback
- Loading states
- Responsive design

### Part C: Integration & Functionality (3 Marks)

#### 1. Route Protection
- `/dashboard` route protected with authentication middleware
- Unauthorized users redirected to login
- Token validation on each protected request

#### 2. Security Measures
- Password hashing before database storage
- JWT token expiration (7 days)
- Old password verification for password change
- Secure logout with token removal

#### 3. Error Handling
- Duplicate email registration prevention
- Invalid login credentials feedback
- Password validation (minimum 6 characters)
- Token expiration handling
- Course validation

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/student_auth
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
```

4. Start MongoDB (if local installation)

5. Run server:
```bash
npm start          # Production
npm run dev        # Development with nodemon
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Ensure `.env` has:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register
```
POST /api/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "course": "Computer Science"
}

Response (201):
{
  "message": "Registration successful",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

#### Login
```
POST /api/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

#### Get Dashboard (Protected)
```
GET /api/dashboard
Authorization: Bearer {token}

Response (200):
{
  "message": "Dashboard data fetched",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update Password (Protected)
```
PUT /api/update-password
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "oldPassword": "password123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}

Response (200):
{
  "message": "Password updated successfully"
}
```

#### Update Course (Protected)
```
PUT /api/update-course
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "course": "Electronics"
}

Response (200):
{
  "message": "Course updated successfully",
  "student": {
    "id": "student_id",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Electronics"
  }
}
```

## Course Options
- Computer Science
- Electronics
- Mechanical
- Civil
- Other

## Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set `REACT_APP_API_BASE_URL` to backend URL
4. Deploy

## Testing the Application

1. **Register a new student**
   - Navigate to `/register`
   - Fill in all fields
   - Submit

2. **Login**
   - Navigate to `/login`
   - Enter credentials
   - Dashboard loads if successful

3. **View Dashboard**
   - Profile tab shows student information
   - Change Password tab for password update
   - Change Course tab for course selection

4. **Logout**
   - Click Logout button
   - Redirected to login page

## Error Messages

| Scenario | Message |
|----------|---------|
| Email already registered | "Email already registered" |
| Invalid credentials | "Invalid email or password" |
| Missing fields | "Please provide all required fields" |
| Weak password | "Password must be at least 6 characters" |
| Unauthorized access | "Invalid or expired token" |
| No token | "No token provided" |

## Security Considerations

1. **Password Security**
   - Minimum 6 characters
   - Hashed using bcrypt with 10 salt rounds
   - Never stored in plaintext

2. **JWT Security**
   - 7-day expiration
   - Stored in localStorage on client
   - Sent in Authorization header for requests

3. **Input Validation**
   - Email format validation
   - Required field validation
   - Password confirmation matching

4. **Route Protection**
   - Authentication middleware on protected endpoints
   - ProtectedRoute component on frontend

## Future Enhancements

- Email verification on registration
- Password reset functionality
- Refresh token mechanism
- Role-based access control (Admin/Student)
- Student profile picture upload
- Two-factor authentication
- Audit logging
- Rate limiting

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access

### CORS Errors
- Check frontend URL in backend CORS settings
- Verify API base URL in frontend .env

### Token Expiration
- Clear localStorage and login again
- Check JWT_SECRET is consistent

### Port Already in Use
- Change PORT in backend .env
- Update REACT_APP_API_BASE_URL in frontend .env

## License

MIT License - Feel free to use this project for learning purposes.

## Author

Created as a MERN Stack educational project.

---

**Happy Coding!** 🚀
