import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AppointmentFormPage.scss';

const AppointmentFormPage = () => {
  const location = useLocation();
  const [expertId, setExpertId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('expertId');
    if (id) {
      setExpertId(id);
    }
  }, [location]);

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!date.trim()) {
      errors.date = 'Date is required';
    }

    if (!time.trim()) {
      errors.time = 'Time is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newAppointment = {
        expertId,
        firstName,
        lastName,
        email,
        message,
        date,
        time,
      };

      axios.post("http://localhost:5000/appointments/add", newAppointment)
        .then(() => {
          axios.post("http://localhost:5000/appointments/send-email", {
            expertId,
            subject: "New Appointment Request",
            body: `You have a new appointment request from ${firstName} ${lastName}. 
              Date: ${date}, Time: ${time}, Email: ${email}, Message: ${message}`,
          })
          .then(() => {
            alert("Appointment added successfully and email sent to the expert");
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
            setDate("");
            setTime("");
          })
          .catch((err) => {
            alert("Appointment added successfully but failed to send email to the expert");
            console.error('Error sending email:', err);
          });
        })
        .catch((err) => {
          alert("Failed to add appointment");
          console.error('Error adding appointment:', err);
        });
    }
  };

  return (
    <div className="appointment-form-page">
      <h2>Request an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputFirstName" className="form-label">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="inputFirstName" 
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="inputLastName" className="form-label">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="inputLastName" 
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="inputMessage" className="form-label">Message</label>
          <textarea 
            className="form-control" 
            id="inputMessage" 
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputDate" className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            id="inputDate" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <div className="text-danger">{errors.date}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="inputTime" className="form-label">Time</label>
          <input 
            type="text" 
            className="form-control" 
            id="inputTime" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <div className="text-danger">{errors.time}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AppointmentFormPage;
