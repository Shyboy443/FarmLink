import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentRequestsPage.scss';

const AppointmentRequestsPage = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([]);

  // Function to fetch appointment requests from backend
  const fetchAppointmentRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointment-requests');
      setAppointmentRequests(response.data);
    } catch (error) {
      console.error('Error fetching appointment requests:', error);
    }
  };
  // Function to accept appointment request
const acceptAppointmentRequest = async (id) => {
    try {
        await axios.put(`http://localhost:5000/appointments/${id}/accept`);
        // Handle success
    } catch (error) {
        // Handle error
    }
};

// Function to reject appointment request
const rejectAppointmentRequest = async (id) => {
    try {
        await axios.put(`http://localhost:5000/appointments/${id}/reject`);
        // Handle success
    } catch (error) {
        // Handle error
    }
};


  useEffect(() => {
    // Fetch appointment requests from backend upon component mount
    fetchAppointmentRequests();
  }, []);

  return (
    <div className="appointment-requests-page">
      <h2>Appointment Requests</h2>
      {/* Appointment requests list */}
      <ul>
        {appointmentRequests.map((request) => (
          <li key={request.id}>
            <div>
              <strong>Name:</strong> {request.firstName} {request.lastName}
            </div>
            <div>
              <strong>Email:</strong> {request.email}
            </div>
            <div>
              <strong>Date:</strong> {request.date}
            </div>
            <div>
              <strong>Time:</strong> {request.time}
            </div>
            <div>
              <strong>Message:</strong> {request.message}
            </div>
            <button onClick={() => acceptAppointmentRequest(request.id)}>Accept</button>
            <button onClick={() => rejectAppointmentRequest(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
);

};

export default AppointmentRequestsPage;
