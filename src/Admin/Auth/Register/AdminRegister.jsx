
import "./AdminRegister.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';


const AdminRegister = () => {
  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "", key: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/gm
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    try {
      if (!credentials.email || !credentials.firstName || !credentials.password || !credentials.phoneNumber || !credentials.lastName) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
      } else if (credentials.firstName.length <= 3 || credentials.lastName.length <= 3) {
        toast.error("Please enter name with more than 3 characters", { autoClose: 500, theme: 'colored' });
      } else if (!emailRegex.test(credentials.email)) {
        toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
      } else if (!phoneRegex.test(credentials.phoneNumber)) {
        toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' });
      } else if (credentials.password.length < 5) {
        toast.error("Please enter a password with more than 5 characters", { autoClose: 500, theme: 'colored' });
      } else {
        const sendAuth = await axios.post(process.env.REACT_APP_ADMIN_REGISTER, {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
          key: credentials.key
        });
        const receive = await sendAuth.data;
        if (receive.success) {
          toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' });
          localStorage.setItem('Authorization', receive.authToken);
          navigate('/admin/home');
        } else {
          toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
    }
  };

  return (
    <div className="admin-register-container">
      <div className="admin-register-box">
        <div className="admin-register-avatar">
          <MdLockOutline className="icon-lock" />
        </div>
        <h1 className="admin-register-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="admin-register-form">
          <div className="input-group">
            <input type="text" name="firstName" value={credentials.firstName} onChange={handleOnChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={credentials.lastName} onChange={handleOnChange} placeholder="Last Name" required />
          </div>
          <input type="email" name="email" value={credentials.email} onChange={handleOnChange} placeholder="Email Address" required />
          <input type="text" name="phoneNumber" value={credentials.phoneNumber} onChange={handleOnChange} placeholder="Contact Number" required />
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} name="password" value={credentials.password} onChange={handleOnChange} placeholder="Password" required />
            <span className="password-toggle" onClick={handleClickShowPassword}>
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </span>
          </div>
          <input type="password" name="key" value={credentials.key} onChange={handleOnChange} placeholder="Admin Code" required />
          <label className="checkbox-group">
            <input type="checkbox" name="allowExtraEmails" />
            I want to receive inspiration, marketing promotions, and updates via email.
          </label>
          <button type="submit" className="admin-register-button">Sign Up</button>
          <div className="redirect">
            Already have an account?
            <Link to='/admin/login' className="login-link">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
