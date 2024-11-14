// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLockOutline } from 'react-icons/md';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import './Login.css'

// Component: Login
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Regular Expression for validating email
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Redirect to home if already logged in
  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      navigate("/");
    }
  }, [navigate]);

  // Update credentials on input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Validation for form inputs
  const validateForm = () => {
    if (!credentials.email || !credentials.password) {
      toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
      return false;
    }
    if (!EMAIL_REGEX.test(credentials.email)) {
      toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
      return false;
    }
    if (credentials.password.length < 5) {
      toast.error("Password must be at least 5 characters", { autoClose: 500, theme: 'colored' });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN,
        credentials
      );
      const { success, authToken } = response.data;

      if (success) {
        toast.success("Login Successfully", { autoClose: 500, theme: 'colored' });
        localStorage.setItem('Authorization', authToken);
        navigate('/');
      } else {
        toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      toast.error(Array.isArray(errorMessage) ? errorMessage[0].msg : errorMessage, {
        autoClose: 500,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="login-container">
      {/* Login Box */}
      <div className="login-box">
        <div className="login-avatar">
          <MdLockOutline />
        </div>
        <h1 className="login-title">Sign in</h1>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            placeholder="Email Address"
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </span>
          </div>


          <div className="remember-me">

            <input type="checkbox" name="Remember me" />
            Remember me
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>

          {/* Additional Links */}
          <div className="login-links">
            <Link to="/forgotpassword" className="forgot-password">
              Forgot password?
            </Link>
            <Link to="/register" className="register-link">
              Don't have an account? <span>Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
