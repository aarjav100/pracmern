# Frontend - Student Authentication System

React frontend for the MERN Student Authentication System.

## Project Structure

```
frontend/
├── public/
│   └── index.html         # HTML template
├── src/
│   ├── components/
│   │   ├── Register.jsx       # Registration form component
│   │   ├── Login.jsx          # Login form component
│   │   ├── Dashboard.jsx      # Protected dashboard component
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── services/
│   │   └── api.js             # Axios API configuration
│   ├── styles/
│   │   ├── auth.css           # Authentication pages styling
│   │   └── dashboard.css      # Dashboard styling
│   ├── App.js                 # Main app component with routing
│   └── index.js               # React entry point
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables
└── .gitignore                 # Git ignore file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## Components

### Register.jsx
Registration form with:
- Name field
- Email field (validated)
- Password field
- Course dropdown selection
- Submit button
- Link to login page

### Login.jsx
Login form with:
- Email field
- Password field
- Submit button
- Link to registration page

### Dashboard.jsx
Protected component with:
- Profile tab showing student info
- Change Password tab
- Change Course tab
- Logout button

### ProtectedRoute.jsx
Route wrapper that:
- Checks for JWT token in localStorage
- Redirects to login if no token
- Allows access to protected pages if token exists

## Services

### api.js
Axios configuration that:
- Sets base URL from environment variable
- Automatically adds JWT token to request headers
- Handles API communication
- Provides functions for all endpoints

## Routing

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | Redirect to /login | No |
| `/register` | Register | No |
| `/login` | Login | No |
| `/dashboard` | Dashboard | Yes |
| `*` | Redirect to /login | No |

## Features

- **Form Validation** - Input validation on all forms
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during API calls
- **Token Management** - Automatic token storage and sending
- **Responsive Design** - Mobile-friendly layout
- **Protected Routes** - Dashboard accessible only to authenticated users

## Component Lifecycle

### Registration Flow
1. User enters details
2. Submit form
3. API call to `/api/register`
4. Token stored in localStorage
5. Redirect to dashboard

### Login Flow
1. User enters email and password
2. Submit form
3. API call to `/api/login`
4. Token stored in localStorage
5. Redirect to dashboard

### Protected Access
1. Check localStorage for token
2. If no token, redirect to login
3. If token exists, allow access

### Logout
1. Remove token from localStorage
2. Redirect to login page

## Styling

### Color Scheme
- Primary: Purple gradient (#667eea to #764ba2)
- White for cards and forms
- Red (#e74c3c) for logout button
- Error: Light red background
- Success: Light green background

### Responsive Breakpoints
- Mobile: < 600px
- Tablet: 600px - 1024px
- Desktop: > 1024px

## Environment Variables

- `REACT_APP_API_BASE_URL` - Backend API base URL (default: http://localhost:5000/api)

## Dependencies

- **react** - UI library
- **react-dom** - DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client

## Development

### Running the Development Server
```bash
npm start
```

### Building for Production
```bash
npm run build
```

### File Structure Tips
- Place reusable components in `/components`
- Keep page-specific logic in `/pages`
- API calls in `/services`
- Global styles in `/styles`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set `REACT_APP_API_BASE_URL` environment variable
4. Deploy

### Netlify
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy

## Common Issues

### CORS Errors
- Ensure backend is running
- Check `REACT_APP_API_BASE_URL` is correct
- Verify CORS is enabled in backend

### Token Expiration
- Login again to get new token
- Clear localStorage if needed

### Blank Page
- Check browser console for errors
- Ensure all dependencies are installed
- Clear browser cache
