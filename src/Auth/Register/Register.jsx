import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'
import './Register.css'

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: '',
    email: "",
    phoneNumber: '',
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    const auth = localStorage.getItem('Authorization')
    if (auth) navigate('/')
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/gm
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!credentials.email || !credentials.firstName || !credentials.password || !credentials.phoneNumber || !credentials.lastName) {
      return toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
    }

    if (credentials.firstName.length < 1 || credentials.lastName.length < 1) {
      return toast.error("Please enter a valid name", { autoClose: 500, theme: 'colored' })
    }

    if (!emailRegex.test(credentials.email)) {
      return toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' })
    }

    if (!phoneRegex.test(credentials.phoneNumber)) {
      return toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
    }

    if (credentials.password.length < 5) {
      return toast.error("Password must be at least 5 characters long", { autoClose: 500, theme: 'colored' })
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_REGISTER}`, credentials)

      if (response.data.success) {
        toast.success("Registered successfully", { autoClose: 500, theme: 'colored' })
        localStorage.setItem('Authorization', response.data.authToken)
        navigate('/')
      } else {
        toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
      }
    } catch (error) {
      toast.error(error.response?.data?.error[0]?.msg || "Something went wrong", { autoClose: 500, theme: 'colored' })
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={credentials.firstName}
            onChange={handleOnChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={credentials.lastName}
            onChange={handleOnChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={credentials.phoneNumber}
            onChange={handleOnChange}
            placeholder="Contact Number"
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
            <span className="toggle-password" onClick={handleClickShowPassword}>
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}

export default Register
