import axios from 'axios';
import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom"
import AddProduct from './pages/addProduct/AddProduct';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import AddPayment from './components/payment/addPayment/addPayement';
import AllPayment from './components/payment/allPayment/allPayment';
import UpdatePayment from './components/payment/UpdatePayment/UpdatePayment';

axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }
  ,[dispatch])

  return (
    <div className="App">
        <BrowserRouter>
          {/* <ToastContainer/> */}
          <Routes>

          <Route path= "/add-product" element = {


            <AddProduct/>



          }/>
          
          
          <Route path="/add-payment" element={
            <AddPayment/> 
          }/>
          <Route path="/allpayments" element={
            <AllPayment/> 
          }/>
          <Route path="/updatePayment/:id" element={<UpdatePayment />} />



        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
