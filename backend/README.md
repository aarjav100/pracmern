# Backend - Student Authentication System

Node.js and Express backend for the MERN Student Authentication System.

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   └── Student.js         # Student schema and model
├── routes/
│   └── auth.js            # Authentication routes
├── middleware/
│   └── auth.js            # JWT verification middleware
├── controllers/
│   └── authController.js  # Route handlers and business logic
├── server.js              # Express server setup
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
└── .gitignore             # Git ignore file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Steps

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/student_auth
JWT_SECRET=your_secret_key_here
PORT=5000
```

3. For development with auto-reload:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## API Endpoints

### Public Routes
- `POST /api/register` - Register new student
- `POST /api/login` - Login student

### Protected Routes (Require JWT Token)
- `GET /api/dashboard` - Get student profile
- `PUT /api/update-password` - Update password
- `PUT /api/update-course` - Update course

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variable management

## Dev Dependencies

- **nodemon** - Auto-restart server on file changes

## Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. JWT token generated on success
4. Token stored in client localStorage
5. Token sent in Authorization header for protected routes
6. Middleware verifies token before processing request

## Development

### Running the Server

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm start
```

### Testing Endpoints

Use Postman or curl to test:

```bash
# Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "course": "Computer Science"
  }'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Dashboard (with token)
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5000)

## Error Handling

All errors return appropriate HTTP status codes:
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Security Features

- Password hashing with bcrypt
- JWT for stateless authentication
- Password verification on login
- Email validation
- Protected routes with middleware
- CORS enabled for cross-origin requests
