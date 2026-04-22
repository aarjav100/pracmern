import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, updatePassword, updateCourse } from '../services/api';
import '../styles/dashboard.css';

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [courseForm, setCourseForm] = useState({
    course: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await getDashboard();
      setStudent(response.data.student);
      setCourseForm({ course: response.data.student.course });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard');
      setLoading(false);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await updatePassword(passwordForm);
      setMessage(response.data.message);
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password update failed');
    }
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setCourseForm({ course: value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await updateCourse(courseForm);
      setStudent({
        ...student,
        course: response.data.student.course,
      });
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Course update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  if (!student) {
    return <div className="dashboard-container"><p>No student data</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {student.name} 👋</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="error-message">
        <span style={{marginRight: '8px'}}>⚠️</span>
        {error}
      </div>}
      {message && <div className="success-message">
        <span style={{marginRight: '8px'}}>✅</span>
        {message}
      </div>}

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Security
        </button>
        <button
          className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
          onClick={() => setActiveTab('course')}
        >
          Academic
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2><span>👤</span> Your Profile</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Full Name</label>
                <p>{student.name}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{student.email}</p>
              </div>
              <div className="info-item">
                <label>Enrolled Course</label>
                <p>{student.course}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date(student.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="form-section">
            <h2><span>🔒</span> Security Settings</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Min 6 characters"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <button type="submit">Update Security</button>
            </form>
          </div>
        )}

        {activeTab === 'course' && (
          <div className="form-section">
            <h2><span>🎓</span> Academic Information</h2>
            <form onSubmit={handleCourseSubmit}>
              <div className="form-group">
                <label>Change Enrolled Course</label>
                <select
                  value={courseForm.course}
                  onChange={handleCourseChange}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit">Update Course</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
