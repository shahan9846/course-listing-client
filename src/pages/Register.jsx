import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

const Register = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputValue = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, formData)

            localStorage.setItem("authToken", response.data.token);

            alert(response.data.message)

            navigate('/home')

        } catch (error) {
            alert(error.response.data.message)

            setFormData({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-left">
                <span className="brand-name">Course<span>Hub</span></span>
                <div className="auth-left-content">
                    <h2>Learn from <br /><span>the best.</span><br /></h2>
                    <p>Join thousands of learners and start building real skills with expert-led courses.</p>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-box">
                    <h1>Create account</h1>
                    <p className="auth-sub-title">Already have an account? <Link to='/login'>Login</Link> </p>
                    <form onSubmit={submitForm}>
                        <div className="field">
                            <label>Full Name *</label>
                            <input type="text" name="name" placeholder='Full Name' onChange={inputValue} value={formData.name} required />
                        </div>
                        <div className="field">
                            <label>Email Address *</label>
                            <input type="email" name="email" placeholder='Email' onChange={inputValue} value={formData.email} required />
                        </div>
                        <div className="field">
                            <label>Password *</label>
                            <input type="password" name="password" placeholder='Password' onChange={inputValue} value={formData.password} required />
                        </div>
                        <button type="submit" className="auth-btn">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
