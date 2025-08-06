import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AppointmentList = ({ refreshTrigger }) => {
    const [appointments, setAppointments] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;
        const fetchAppointments = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`${API_URL}/appointments`, config);
                setAppointments(response.data);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
        };
        fetchAppointments();
    }, [token, refreshTrigger]);

    return (
        <section>
            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                <p>You have no upcoming appointments.</p>
            ) : (
                appointments.map((appt) => (
                    <article key={appt._id}>
                        <p>
                            <strong>Patient: {appt.patient_name}</strong> (Age: {appt.age})<br />
                            <small>
                                Date: {new Date(appt.appointment_date).toLocaleDateString()}<br />
                                Doctor: Dr. {appt.doctor.name} ({appt.doctor.speciality})
                            </small>
                        </p>
                    </article>
                ))
            )}
        </section>
    );
};

export default AppointmentList;