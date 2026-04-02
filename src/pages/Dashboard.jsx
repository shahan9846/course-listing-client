import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../Components/Navbar'
import '../styles/Dashboard.css'

const Dashboard = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [myCourses, setMyCourses] = useState([])

    const [user, setUser] = useState([])

    const token = localStorage.getItem('authToken')

    const currentUserId = token ? jwtDecode(token).id : null

    const fetchUser = async () => {

        try {

            const response = await axios.get(`${API_URL}/api/auth/user`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(response.data)

        } catch (error) {

            // alert(error.response.data.message)
        }
    }

    useEffect(() => {


        if (!token) {
            navigate('/')
            return
        }

        const fetchCourses = async () => {

            try {
                const response = await axios.get(`${API_URL}/api/courses`, {

                    headers: { Authorization: `Bearer ${token}` }

                })

                const filtered = response.data.filter(current => current.user === currentUserId)

                setMyCourses(filtered)

            } catch (error) {

                // alert(error.response.data.message)

            }
        }

        fetchCourses()
        fetchUser()

    }, [])

    const deleteCourse = async (id) => {

        try {

            const response = await axios.delete(`${API_URL}/api/courses/${id}`, {

                headers: { Authorization: `Bearer ${token}` }
            })

            setMyCourses(prev => prev.filter(course => course._id !== id))

            alert(response.data.message)

        } catch (error) {

            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-user-profile-section">
                    <div className="dashboard-user-profile">
                        <p>DASHBOARD</p>
                        <h1>{user.name}</h1>
                        <h6>{user.email}</h6>
                    </div>
                    <Link to="/courses/add">+ Add Course</Link >
                </div>
                <hr />
                {myCourses.map((course) => (
                    <div className="dashboard-course-section">
                        <div className="table-container">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Courses</th>
                                        <th>Category</th>
                                        <th>Duration</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{course.title}</td>
                                        <td>{course.category}</td>
                                        <td>{course.duration} weeks</td>
                                        <td>
                                            <div className="dashboard-actions">
                                                <Link to={`/courses/${course._id}`} className="view">View</Link>
                                                <Link to={`/courses/edit/${course._id}`} className="edit">Edit</Link>
                                                <button className="delete" onClick={() => deleteCourse(course._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Dashboard