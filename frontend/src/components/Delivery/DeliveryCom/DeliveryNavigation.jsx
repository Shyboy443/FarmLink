import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sample from "../DeliveryNavCom/Sample";
import UpdateDelivery from "../DeliveryNavCom/UpdateDelivery";

const NavPage = () => {

  
    
    return (
        <React.Fragment>
        <section>
          <Routes>
            <Route path="/updatedelivery" element={<UpdateDelivery />} />
            <Route path="/*" element={<Sample />} />
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;