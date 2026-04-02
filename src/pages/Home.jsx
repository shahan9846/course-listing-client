import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Home = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const token = localStorage.getItem("authToken")

    const currentUserId = token ? jwtDecode(token).id : null

    const deleteCourse = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCourses(prev => prev.filter(course => course._id !== id))
            alert(response.data.message)

        } catch (error) {
            alert(error.response?.data?.message)
        }
    }

    const editCourse = (course) => {
        navigate(`/courses/edit/${course._id}`)
    }

    const filteredCourses = courses.filter(course => {
        const matchesFilter = activeFilter === 'all' || course.category.toLowerCase() === activeFilter.toLowerCase()
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    useEffect(() => {

        if (!token) {
            navigate('/')
            return
        }

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCourses(response.data)

            } catch (error) {
                alert(error.response?.data?.message)
            }
        }

        fetchCourses()

    }, [])

    return (
        <div className="app-layout">

            <Navbar />

            <div className="courses-section">
                <div className="courses-section-heading">
                    <h1>Learn <span>essential skills</span> <br />for your career</h1>
                    <p>CourseHub helps you build in-demand skills fast and advance your career</p>
                    <button>Explore Course</button>
                </div>
                <div className="all-course-list">
                    <div className="search-course-section">
                        <div className="search-course-wrap">
                            <input
                                type="text"
                                placeholder='Search courses by title…'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* <button className='search-course-btn'>Search</button> */}
                        </div>
                        <Link to="/courses/add" className="add-btn-home">  + Add New Course </Link>
                    </div>
                    <div className="filterd-courses">
                        <button className={activeFilter === 'all' ? 'active-filter' : ''} onClick={() => setActiveFilter('all')} >All</button>
                        <button className={activeFilter === 'web' ? 'active-filter' : ''} onClick={() => setActiveFilter('web')}>Web</button>
                        <button className={activeFilter === 'design' ? 'active-filter' : ''} onClick={() => setActiveFilter('design')} >Design</button>
                        <button className={activeFilter === 'data science' ? 'active-filter' : ''} onClick={() => setActiveFilter('data science')} >Data Science</button>
                        <button className={activeFilter === 'mobile' ? 'active-filter' : ''} onClick={() => setActiveFilter('mobile')} >Mobile</button>
                    </div>
                    <h2 className="section-title">
                        {filteredCourses.length > 0 ? 'All Courses' : 'No Course Added..'}
                    </h2>
                    <div className="course-grid">
                        {filteredCourses.map((data) => (
                            <div
                                className="course-card"
                                key={data._id}
                                onClick={() => navigate(`/courses/${data._id}`)}
                            >
                                <span className='card-category'>{data.category}</span>
                                <h1 className='card-title'>{data.title}</h1>
                                <p className="card-instructor">By : {data.instructor}</p>
                                <p className="card-desc">{data.description}</p>
                                <hr />
                                <p className='card-duration'>{data.duration} weeks</p>
                                {currentUserId === data.user && (
                                    <div className="card-actions">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                editCourse(data)
                                            }}
                                            className='card-actions edit'
                                        >  Edit </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteCourse(data._id)
                                            }}
                                            className='card-actions delete'
                                        > Delete </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home