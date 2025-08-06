import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const BookingModal = ({ doctor, isOpen, onClose, onBookingSuccess }) => {
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const dialogRef = useRef(null);

    // Control the dialog's open/closed state
    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const appointmentData = {
                patient_name: patientName,
                age: Number(age),
                appointment_date: appointmentDate,
                doctor: doctor._id,
            };
            await axios.post(`${API_URL}/appointments`, appointmentData, config);
            onBookingSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book appointment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog ref={dialogRef} onClose={onClose}>
            <article>
                <header>
                    <a href="#close" aria-label="Close" className="close" onClick={(e) => { e.preventDefault(); onClose(); }}></a>
                    Book with Dr. {doctor.name}
                </header>
                <form onSubmit={handleSubmit}>
                    <label>
                        Patient Name
                        <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                    </label>
                    <label>
                        Age
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                    </label>
                    <label>
                        Appointment Date
                        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                    </label>
                    {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
                    <footer>
                        <button type="button" className="secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" aria-busy={loading}>{loading ? 'Booking...' : 'Confirm'}</button>
                    </footer>
                </form>
            </article>
        </dialog>
    );
};

export default BookingModal;