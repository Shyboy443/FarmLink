import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sample from "../ExpertNavCom/Sample";
import UpdateExpert from "../ExpertNavCom/UpdateExpert"

const NavPage = () => {

  
    
    return (
        <React.Fragment>
        <section>
          <Routes>
            <Route path="/updateexpert" element={<UpdateExpert />} />
            <Route path="/*" element={<Sample />} />
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;