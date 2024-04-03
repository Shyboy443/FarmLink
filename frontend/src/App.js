import React from "react";
import AssignDelivery from "./components/AssignDelivery";
import MainDel from "./components/MainDel";
import AllDeliveries from "./components/AllDeliveries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDel />} />
        <Route path="/assign" element={<AssignDelivery />} />
        <Route path="/view" element={<AllDeliveries />} />
      </Routes>
    </Router>
  );
}

export default App;
