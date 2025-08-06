import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const DoctorList = ({ onBookAppointment }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${API_URL}/doctors`);
                setDoctors(response.data);
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <section>
            <h2>Our Doctors</h2>
            {doctors.map((doctor) => (
                <article key={doctor._id}>
                    <header><strong>Dr. {doctor.name}</strong></header>
                    {doctor.speciality} - {doctor.department}
                    <footer>
                        <button onClick={() => onBookAppointment(doctor)}>Book Appointment</button>
                    </footer>
                </article>
            ))}
        </section>
    );
};

export default DoctorList;