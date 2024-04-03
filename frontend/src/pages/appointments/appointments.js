
import React from 'react'

const appointment = () => {
  // State and form handling code...

  const formContainerStyles = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyles = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const textareaStyles = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    height: '100px',
  };

  const buttonStyles = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const buttonHoverStyles = {
    backgroundColor: '#0056b3',
  };


  return (
    <div style={formContainerStyles} className="form-container">
      <h2>Request an Appointment</h2>
      <form>
        <div>
          <label style={labelStyles}>Date:</label>
          <input
            style={inputStyles}
            type="date"
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Time:</label>
          <input
            style={inputStyles}
            type="time"
            required
          />
        </div>
        <div>
          <label style={labelStyles}>Additional Information:</label>
          <textarea
            style={textareaStyles}
            placeholder="Optional"
          />
        </div>
        <button style={buttonStyles} onMouseEnter={(e) => e.target.style = buttonHoverStyles} onMouseLeave={(e) => e.target.style = buttonStyles} type="submit">Submit Request</button>
      </form>
    </div>
  );
};


export default appointment