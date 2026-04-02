import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

const Login = () => {

  const API_URL = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const inputValue = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitForm = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.post(`${API_URL}/api/auth/login`, formData)

      localStorage.setItem('authToken', response.data.token)

      alert(response.data.message)

      navigate('/home')

    } catch (error) {

      alert(error.response.data.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <span className="brand-name">Course<span>Hub</span></span>
        <div className="auth-left-content">
          <h2>Welcome back <span>champ.</span></h2>
          <p>Login to continue building amazing things with your account.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h1>Login</h1>
          <p className="auth-sub-title"> Don't have an account? <Link to="/">Register</Link></p>
          <form onSubmit={submitForm}>
            <div className="field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={inputValue}
                value={formData.email}
              />
            </div>
            <div className="field">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={inputValue}
                value={formData.password}
              />
            </div>
            <button className="auth-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login