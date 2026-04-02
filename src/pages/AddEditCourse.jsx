import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import '../styles/AddEditCourse.css'

const AddEditCourse = () => {

    const API_URL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const { id } = useParams()

    const isEdit = Boolean(id)

    const token = localStorage.getItem('authToken')

    const [formData, setFormData] = useState({
        title: '',
        instructor: '',
        duration: '',
        category: '',
        description: ''
    })

    useEffect(() => {

        if (!token) {
            navigate('/')
            return
        }

        if (isEdit) {

            const fetchCourse = async () => {

                try {
                    const response = await axios.get(`${API_URL}/api/courses/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })

                    const { title, instructor, duration, category, description } = response.data

                    setFormData({
                        title,
                        instructor,
                        duration,
                        category,
                        description
                    })

                } catch (error) {

                    alert('Cannot load course')
                }
            }

            fetchCourse()
        }

    }, [id])

    const inputValue = (e) => {

        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const submitData = async (e) => {

        e.preventDefault()

        try {
            if (isEdit) {

                await axios.put(`${API_URL}/api/courses/${id}`, formData, {

                    headers: { Authorization: `Bearer ${token}` }

                })

                alert('Course updated')

            } else {

                const response = await axios.post(`${API_URL}/api/courses`, formData, {

                    headers: { Authorization: `Bearer ${token}` }
                })

                alert(response.data.message)
            }

            navigate('/home')

        } catch (error) {

            alert(error.response.data.message || 'Error')
            
        }
    }

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <div className="form-wrap">
                    <button className="back-link" onClick={() => navigate('/home')}> ← Back  </button>
                    <form onSubmit={submitData} className="course-form">
                        <div className="form-row">
                            <div className="form-field">
                                <label >Course Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. React for Beginners"
                                    value={formData.title}
                                    onChange={inputValue}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label >Instructor Name *</label>
                                <input
                                    type="text"
                                    name="instructor"
                                    placeholder="e.g. John Doe"
                                    value={formData.instructor}
                                    onChange={inputValue}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-field">
                                <label>Duration *</label>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="e.g. 5 weeks"
                                    value={formData.duration}
                                    onChange={inputValue}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="category">Category *</label>
                                <div className="select-wrap">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={inputValue}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-field">
                            <label >Description *</label>
                            <textarea
                                name="description"
                                placeholder="Describe what students will learn…"
                                rows="5"
                                value={formData.description}
                                onChange={inputValue}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate('/home')}
                            > Cancel </button>
                            <button type="submit" className="submit-btn">
                                {isEdit ? 'Update Course →' : 'Publish Course →'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddEditCourse
