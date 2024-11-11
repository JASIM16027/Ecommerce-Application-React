import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdLockOutline, MdMailOutline } from 'react-icons/md'
import './ForgotPasswordForm.css'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [isSentMail, setIsSentMail] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const sendEmail = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}`, { email: email })
            toast.success(sendEmail.data.msg, { autoClose: 500, theme: 'colored' })
            setIsSentMail(true)
        } catch (error) {
            toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
        }
    }

    return (
        <>
            {!isSentMail ?
                <div className="forgot-password-container">
                    <div className="forgot-password-box">
                        <div className="avatar">
                            <MdLockOutline />
                        </div>
                        <h1 className="forgot-password-title">Forgot Password</h1>
                        <form onSubmit={handleSubmit} className="forgot-password-form">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                            />
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                :
                <div className="success-container">
                    <h2 className="success-message">Email Sent Successfully</h2>
                    <a href="https://mail.google.com/mail/" target="_blank" rel="noreferrer">
                        <button className="open-mail-button">
                            <MdMailOutline /> Open Mail
                        </button>
                    </a>
                </div>
            }
        </>
    )
}

export default ForgotPasswordForm
