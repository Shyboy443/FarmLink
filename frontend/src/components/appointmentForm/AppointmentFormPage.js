import React, { useState } from 'react';
import axios from 'axios';
import './AppointmentFormPage.scss'; // Import SCSS file for styling

const AppointmentFormPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const newAppointment = {
      firstName,
      lastName,
      email,
      message,
      date,
      time,
    }

    axios.post("http://localhost:5000/appointments/add", newAppointment)
      .then(() => {
        alert("Appointment added successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setDate("");
        setTime("");

      })
      .catch((err) => {
        alert(err);
      });
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
            type="text" 
            className="form-control" 
            id="inputDate" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AppointmentFormPage;
