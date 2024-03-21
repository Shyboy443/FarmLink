import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddProduct from './pages/addProduct/AddProduct';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Sidebar from './components/sidebar/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './pages/editProduct/EditProduct';


axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }
    , [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer/>
        <Routes>



          <Route path="/dashboard" element={


            <Sidebar>
              <Layout>
                <Dashboard />

              </Layout>
            </Sidebar>


          } />

          <Route path="/add-product" element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          } />

          <Route path="/edit-product" element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
