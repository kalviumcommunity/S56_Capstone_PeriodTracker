import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './update.css';

function Update() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [activityData, setActivityData] = useState({
        activity: '',
        imageurl: '',
        phase: '',
        benefits: '',
        createdby: '',
    });
    
    const [error, setError] = useState(null);  // Error state
    const [loading, setLoading] = useState(true);  // Loading state for fetching and submission
    
    // Fetch data for activity
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://s56-janhavi-capstone-periodtracker-2.onrender.com/activity/${id}`);
            if (response.status === 200) {
                setActivityData(response.data);
                setError(null);  // Clear any existing errors
            } else {
                setError('Failed to fetch activity data.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
        setLoading(false); // End loading after fetch attempt
    };

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({ ...activityData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!activityData.activity || !activityData.imageurl || !activityData.phase || !activityData.benefits || !activityData.createdby) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`https://s56-janhavi-capstone-periodtracker-2.onrender.com/activity/${id}`, activityData);
            alert('Activity updated successfully!');
            navigate('/travel');
        } catch (error) {
            console.error('Error updating activity:', error);
            setError('Error updating activity. Please try again later.');
        }
        setLoading(false); // End loading after submission attempt
    };

    useEffect(() => {
        fetchData(); 
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="updatehere">
                <h1>Update your Activity here!</h1>

                {/* Display error if any */}
                {error && <p className="error">{error}</p>}
                
                {/* Loading indicator */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form className='updateform' onSubmit={handleSubmit}>
                        <label htmlFor="activity">Activity:</label>
                        <input
                            type="text"
                            id="activity"
                            name="activity"
                            value={activityData.activity}
                            onChange={handleChange}
                        />

                        <label htmlFor="imageurl">Image URL:</label>
                        <input
                            type="text"
                            id="imageurl"
                            name="imageurl"
                            value={activityData.imageurl}
                            onChange={handleChange}
                        />

                        <label htmlFor="phase">Phase:</label>
                        <input
                            type="text"
                            id="phase"
                            name="phase"
                            value={activityData.phase}
                            onChange={handleChange}
                        />

                        <label htmlFor="benefits">Benefits:</label>
                        <input
                            type="text"
                            id="benefits"
                            name="benefits"
                            value={activityData.benefits}
                            onChange={handleChange}
                        />

                        <label htmlFor="createdby">Created By:</label>
                        <input
                            type="text"
                            id="createdby"
                            name="createdby"
                            value={activityData.createdby}
                            onChange={handleChange}
                        />

                        <button type="submit" id='sub' disabled={loading}>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Update;
