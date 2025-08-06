import React, { useState } from 'react';
import DoctorList from './DoctorList';
import AppointmentList from './AppointmentList';
import BookingModal from './BookingModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleBookingSuccess = () => {
        setRefreshTrigger(prev => prev + 1); // Trigger a refresh
    };

    return (
        <>
            <nav>
                <ul>
                    <li><strong>Doctor Appointment System</strong></li>
                </ul>
                <ul>
                    <li><a href="#" role="button" onClick={handleLogout} className="secondary">Logout</a></li>
                </ul>
            </nav>
            
            <AppointmentList refreshTrigger={refreshTrigger} />
            <DoctorList onBookAppointment={handleBookAppointment} />

            {selectedDoctor && (
                <BookingModal
                    isOpen={isModalOpen}
                    doctor={selectedDoctor}
                    onClose={() => setIsModalOpen(false)}
                    onBookingSuccess={handleBookingSuccess}
                />
            )}
        </>
    );
};

export default Dashboard;