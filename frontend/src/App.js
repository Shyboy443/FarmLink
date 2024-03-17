//import './App.css';
//import Header from './components/Header';
//import React from "react";
import './App.css';
import Header from './components/Header';
import Addfeedback from "./components/Addfeedback";
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div >
   <Header/>

   <Routes>
      <Route path="/add" element={<Addfeedback/>}/>
      </Routes>
      
      

    </div>
    </Router>
  );
}

export default App;
