import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'
import './AddNewPassword.css'

const AddNewPassword = () => {
    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}/${id}/${token}`, { newPassword: password })

            if (data.msg.name === "TokenExpiredError") {
                toast.error("Token is expired. Please try again.", { autoClose: 500, theme: 'colored' })
                navigate('/login')
            } else {
                toast.success(data.msg, { autoClose: 500, theme: 'colored' })
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "An error occurred. Please try again.", { autoClose: 500, theme: 'colored' })
        }
    }

    return (
        <div className="password-reset-container">
            <div className="password-reset-box">
                <div className="avatar">
                    <RiEyeFill />
                </div>
                <h1 className="title">Forgot Password</h1>
                <form className="password-form" onSubmit={handleSubmit}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter New Password"
                        required
                        minLength="6"
                        autoFocus
                    />
                    <span className="toggle-password" onClick={handleClickShowPassword}>
                        {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </span>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Your Company</p>
            </footer>
        </div>
    )
}

export default AddNewPassword
