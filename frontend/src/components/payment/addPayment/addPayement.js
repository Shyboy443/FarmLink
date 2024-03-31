import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./addPayment.css"; 

export default function AddPayment() {
  const [holdername, setHoldername] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

 function sendData(e) {
  e.preventDefault();

  const newPayment = {
    holdername,
    email,
    cardNumber,
    expiry,
    cvv,
    address,
    city,
    state,
    zipcode
  };

  axios.post("http://localhost:5000/api/payment/add", newPayment)
    .then(() => {
      toast.success("Payment Added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Clear the form fields after successful payment
      setHoldername("");
      setEmail("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setAddress("");
      setCity("");
      setState("");
      setZipcode("");
    })
    .catch((err) => {
      toast.error("Error adding payment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
}

  
  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
      <form onSubmit={sendData}>
        <div className="container mt-5 px-5">
          <div className="mb-4">
            <h2>Confirm order and pay</h2>
            <span>Please make the payment, after which you can enjoy all the features and benefits.</span>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="card p-3">
                <h6 className="text-uppercase">Payment details</h6>
                <div className="inputbox mt-3">
                  <input type="text" name="holdername" className="form-control" required onChange={(e) => setHoldername(e.target.value)} />
                  <span>Name on card</span>
                </div>
                <div className="inputbox mt-3">
                  <input type="email" name="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
                  <span>Email Address</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      <input type="text" name="cardNumber" className="form-control" required onChange={(e) => setCardNumber(e.target.value)} />
                      <i className="fa fa-credit-card"></i>
                      <span>Card Number</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-row">
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="expiry" className="form-control" required onChange={(e) => setExpiry(e.target.value)} />
                        <span>Expiry</span>
                      </div>
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="cvv" className="form-control" required onChange={(e) => setCvv(e.target.value)} />
                        <span>CVV</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <h6 className="text-uppercase">Billing Address</h6>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="address" className="form-control" required onChange={(e) => setAddress(e.target.value)} />
                        <span>Street Address</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="city" className="form-control" required onChange={(e) => setCity(e.target.value)} />
                        <span>City</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="state" className="form-control" required onChange={(e) => setState(e.target.value)} />
                        <span>State/Province</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input type="text" name="zipcode" className="form-control" required onChange={(e) => setZipcode(e.target.value)} />
                        <span>Zip code</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-4 d-flex justify-content-between">
                <span>Previous step</span>
                <button className="btn btn-success px-3">Pay $840</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-blue p-3 text-white mb-3">
                <span>You have to pay</span>
                <div className="d-flex flex-row align-items-end mb-3">
                  <h1 className="mb-0 yellow">$549</h1> <span>.99</span>
                </div>
                <span>Enjoy all the features and perks after you complete the payment</span>
                <a href="#" className="yellow decoration">Know all the features</a>
                <div className="hightlight">
                  <span>100% Guaranteed support and update for the next 5 years.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer /> 
    </div>
  );
}