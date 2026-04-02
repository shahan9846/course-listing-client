import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {

    const navigate = useNavigate()

    const logout = () => {

        const logoutConfirm = window.confirm('Are you sure you want to logout?')

        if (logoutConfirm) {

            localStorage.removeItem('authToken')

            navigate('/')
            
        }
    }

    return (
        <nav className="navbar">
            <Link to='/home' className="nav-logo">Course<span>Hub</span></Link>
            <div className="nav-links">
                <NavLink to="/home" style={({ isActive }) => ({ color: isActive ? '#e8c547' : '' })}> Browse </NavLink>
                <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? '#e8c547' : '' })}> Dashboard </NavLink>
                <button onClick={logout} className="nav-logout"> Logout </button>
            </div>
        </nav>
    )
}

export default Navbar