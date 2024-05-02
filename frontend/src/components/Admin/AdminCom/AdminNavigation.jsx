import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sample from "../AdminNavCom/Sample";
import UpdateAdmin from "../AdminNavCom/UpdateAdmin"
import SearchUsers from "../AdminNavCom/SearchUser"
import DeleteUser from "../AdminNavCom/DeleteUser"

const NavPage = () => {

    
    return (
        <React.Fragment>
        <section>
          <Routes>
            <Route path="/updateadmin" element={<UpdateAdmin />} />
            <Route path="/search" element={<SearchUsers />} />
            <Route path="/deleteuser" element={<DeleteUser />} />
            <Route path="/*" element={<Sample />} />
          
          </Routes>
        </section>
      </React.Fragment>
    );
  };
  
  export default NavPage;