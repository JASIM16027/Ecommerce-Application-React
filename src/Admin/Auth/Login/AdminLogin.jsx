import './AdminLogin.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLockOutline } from 'react-icons/md';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "", key: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!credentials.email || !credentials.password) {
      return toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
    }
    
    if (!emailRegex.test(credentials.email)) {
      return toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
    }
    
    if (credentials.password.length < 5) {
      return toast.error("Please enter a valid password", { autoClose: 500, theme: 'colored' });
    }
    
    try {
      const response = await axios.post(process.env.REACT_APP_ADMIN_LOGIN, {
        email: credentials.email,
        password: credentials.password,
        key: credentials.key
      });
      const receive = response.data;
      
      if (receive.success) {
        toast.success("Login Successfully", { autoClose: 500, theme: 'colored' });
        localStorage.setItem('Authorization', receive.authToken);
        navigate('/admin/home');
      } else {
        toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
      }
    } catch (error) {
      toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="login-icon">
          <MdLockOutline size={36} />
        </div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            placeholder="Email Address"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
            />
            <span onClick={handleClickShowPassword} className="toggle-password">
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </span>
          </div>
          <input
            type="password"
            name="key"
            value={credentials.key}
            onChange={handleOnChange}
            placeholder="Admin Code"
            required
          />
          <label className="remember-me">
            <input type="checkbox" name="Remember-me" /> Remember me
          </label>
          <button type="submit" className="submit-btn">
            Sign In
          </button>
          <div className="links">
            <Link to="/forgotpassword" className="link">Forgot password?</Link>
            <Link to="/admin/register" className="link">
              Don't have an account? <span className="sign-up">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
