import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppointmentListPage from './components/appointmentList/AppointmentListPage';
import AppointmentFormPage from './components/appointmentForm/AppointmentFormPage';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <Router>
      <Sidebar>
      <Routes>
        <Route exact path="/appointment-list" element={<AppointmentListPage />} />
        <Route exact path="/appointment-form" element={<AppointmentFormPage />} />
      </Routes>
      </Sidebar>
      
    </Router>
  );
}

export default App;
