import React, { useState } from "react";
import axios from "axios";

export default function AddStudent() {

    const [fname, setFname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setCode] = useState("");
    const [phone, setPhone] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newDelivery ={

            fname,
            address,
            city,
            postalCode,
            phone
        };
       
        
        axios.post("http://localhost:5000/delivery/add", newDelivery)
        .then(() => {
            alert("Delivery info added");

            setFname("");
            setAddress("");
            setCity("");
            setCode("");
            setPhone("");
        })
        .catch((err) => {
            console.error("Error occurred while adding delivery info:", err); // Log the error to console
            alert("Error occurred while adding delivery info");
        });
    }

  return (
    <div className="d-flex justify-content-center">
       
      <form  onSubmit = {sendData} className="w-50">

        <div className="form-group">
          <label htmlFor="fname" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Enter your full name"
            onChange = {(e)=>{
                setFname(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id=" address"
            placeholder="Enter yor address"
            onChange = {(e)=>{
                setAddress(e.target.value);
            }}
          />
           </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter your city"
            onChange = {(e)=>{
                setCity(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode" className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            placeholder="Enter the postal code of your city"
            onChange = {(e)=>{
                setCode(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            onChange = {(e)=>{
                setPhone(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
