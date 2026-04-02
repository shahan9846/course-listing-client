import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import '../styles/CourseDetail.css'

const CourseDetail = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL

    const { id } = useParams()

    const navigate = useNavigate()

    const [course, setCourse] = useState(null)

    const token = localStorage.getItem('authToken')

    useEffect(() => {

        if (!token) {
            navigate('/')
            return
        }

        if (!id) {
            navigate('/home')
            return
        }

        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

               setCourse(response.data)

            } catch (error) {
                alert(error.response.data.message)
            }
        }

        fetchCourse()

    }, [id, navigate, token])

    if (!course) {
        return (
            <div className="loading">
                <Navbar />
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="app-layout">

            <Navbar />

            <div className="details">
                <div className="detail-container">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/home')}
                    > ← Back
                    </button>
                    <div className="detail-card">
                        <p className="detail-category">{course.category}</p>
                        <h1 className="detail-title"> {course.title} </h1>
                        <p className="detail-instructor"> By: <span>{course.instructor}</span> </p>
                        <p className="detail-description">{course.description} </p>
                        <p className="detail-duration"> Duration: <span>{course.duration}</span> weeks </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail