# API Testing Guide

## Testing with Postman

### 1. Base URL
```
http://localhost:5000/api
```

### 2. Register Endpoint

**Request:**
```
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "course": "Computer Science"
}
```

**Expected Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGc...token_here...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

**Test Cases:**
- [ ] Valid registration creates student and returns token
- [ ] Duplicate email returns 400 error
- [ ] Missing fields returns 400 error
- [ ] Invalid email format returns error

---

### 3. Login Endpoint

**Request:**
```
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...token_here...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science"
  }
}
```

**Test Cases:**
- [ ] Valid credentials return token
- [ ] Wrong password returns 401 error
- [ ] Non-existent email returns 401 error
- [ ] Missing fields returns 400 error

---

### 4. Get Dashboard (Protected)

**Request:**
```
GET /dashboard
Authorization: Bearer {token_from_login}
```

**Expected Response (200):**
```json
{
  "message": "Dashboard data fetched",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Computer Science",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Test Cases:**
- [ ] With valid token returns student data
- [ ] Without token returns 401 error
- [ ] With invalid token returns 401 error
- [ ] With expired token returns 401 error

---

### 5. Update Password (Protected)

**Request:**
```
PUT /update-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "password123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

**Expected Response (200):**
```json
{
  "message": "Password updated successfully"
}
```

**Test Cases:**
- [ ] Correct old password updates successfully
- [ ] Incorrect old password returns 401 error
- [ ] Mismatched new passwords return 400 error
- [ ] Password < 6 characters returns 400 error
- [ ] Without token returns 401 error
- [ ] User can login with new password after update

---

### 6. Update Course (Protected)

**Request:**
```
PUT /update-course
Authorization: Bearer {token}
Content-Type: application/json

{
  "course": "Electronics"
}
```

**Expected Response (200):**
```json
{
  "message": "Course updated successfully",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Electronics"
  }
}
```

**Test Cases:**
- [ ] Valid course updates successfully
- [ ] Invalid course returns 400 error
- [ ] Without token returns 401 error
- [ ] Dashboard shows updated course
- [ ] Course options: Computer Science, Electronics, Mechanical, Civil, Other

---

## Using curl Commands

### Register
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "course": "Computer Science"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Dashboard (save token from login response)
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Password
```bash
curl -X PUT http://localhost:5000/api/update-password \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "password123",
    "newPassword": "newpassword456",
    "confirmPassword": "newpassword456"
  }'
```

### Update Course
```bash
curl -X PUT http://localhost:5000/api/update-course \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "course": "Electronics"
  }'
```

---

## Error Response Examples

### 400 - Bad Request
```json
{
  "message": "Email already registered"
}
```

### 401 - Unauthorized
```json
{
  "message": "Invalid email or password"
}
```

### 401 - No Token
```json
{
  "message": "No token provided"
}
```

### 404 - Not Found
```json
{
  "message": "Student not found"
}
```

### 500 - Server Error
```json
{
  "message": "Registration failed",
  "error": "Error details here"
}
```

---

## Integration Testing

### Complete User Journey

1. **Register User**
   - POST /register with new email
   - Verify token received
   - Verify student object returned

2. **Login User**
   - POST /login with registered email
   - Verify same token format
   - Verify student data matches registration

3. **Access Dashboard**
   - GET /dashboard with token
   - Verify all student fields present
   - Verify createdAt timestamp

4. **Change Password**
   - PUT /update-password with old password
   - Verify success message
   - Try login with new password
   - Verify login works

5. **Change Course**
   - PUT /update-course with valid course
   - GET /dashboard to verify change
   - Verify course field updated

6. **Test Security**
   - Try accessing /dashboard without token
   - Try accessing /dashboard with invalid token
   - Try updating password with wrong old password
   - Verify all return 401 errors

---

## Frontend Testing Checklist

### Registration Page
- [ ] Form renders correctly
- [ ] All fields are required
- [ ] Email validation works
- [ ] Course dropdown has all options
- [ ] Password field is masked
- [ ] Submit button works
- [ ] Error message displays for duplicate email
- [ ] Success redirects to dashboard
- [ ] Link to login page works

### Login Page
- [ ] Form renders correctly
- [ ] Email and password required
- [ ] Submit button works
- [ ] Error message for invalid credentials
- [ ] Success redirects to dashboard
- [ ] Link to register page works

### Dashboard Page
- [ ] Protected route (redirects if not logged in)
- [ ] Profile tab shows all student info
- [ ] Profile tab shows registration date
- [ ] Change Password tab has all fields
- [ ] Password change validates correctly
- [ ] Change Course tab has dropdown
- [ ] Course update works
- [ ] Profile updates after course change
- [ ] Logout button clears token
- [ ] Logout redirects to login

---

## Performance Testing

### Expected Response Times
- Register: < 500ms
- Login: < 500ms
- Get Dashboard: < 300ms
- Update Password: < 500ms
- Update Course: < 500ms

### Load Testing
- Can handle 100+ concurrent users
- Database indexes prevent slow queries
- No memory leaks in long-running sessions

---

## Security Testing

- [ ] Passwords are hashed (not stored plain)
- [ ] JWT tokens expire after 7 days
- [ ] Token theft: Can't use expired token
- [ ] CORS: Only frontend domain allowed
- [ ] Input validation: SQL injection prevention
- [ ] Password requirements: Minimum 6 chars
- [ ] Email uniqueness: Prevents duplicates

---

## Test Data

### Valid Test Credentials
```
Name: Test Student
Email: test@example.com
Password: Test123456
Course: Computer Science
```

### Invalid Test Cases
```
Email: not-an-email
Password: 12345 (too short)
Course: InvalidCourse
```

---

## Debugging

### View Network Requests
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Perform action
4. Click on request
5. View Headers, Payload, Response

### View Console Errors
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check API responses

### View LocalStorage
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Expand LocalStorage
4. See stored token

---

## Postman Collection

### Export Format
You can export this as a Postman collection JSON and import into Postman for easier testing.

---

**Happy Testing!** ✅
