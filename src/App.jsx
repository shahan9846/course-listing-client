import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import AddEditCourse from './pages/AddEditCourse'
import './styles/Global.css'
import './styles/Variables.css'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/add" element={<AddEditCourse />} />
                <Route path="/courses/edit/:id" element={<AddEditCourse />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App