import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import Categories from './pages/marketplace/categories/Categories';
import MarketplaceNavbar from './components/marketplaceNav/MarketplaceNavbar';
import { CategoryProvider } from './customHook/CategoryProvider';
import ProductDetailsfarmer from '../src/components/product/productDetails/ProductDetails';
import ProductDetails from './pages/marketplace//details/ProductDetails';
import MarketHome from './pages/marketplace/home/marketHomePage';
import ProductAdminReport from './components/productAdminReport/productAdminReport';
import AssignDelivery from "./components/AssignDelivery"; 
import AllDeliveries from "./components/AllDeliveries";
import AllBuddies from "./components/AllBuddies";
import ListBuddy from "./components/ListBuddy";
import AdminMain from "./components/Admin/AdminMain"
import Signup from "./components/Singup";
import Login from "./components/Login";
import BuyerMain from "./components/Buyer/BuyerMain"
import DeliveryMain from "./components/Delivery/DeliveryMain";
import ExpertMain from "./components/Expert/ExpertMain";
import FarmerMain from "./components/Farmer/FarmerMain";


axios.defaults.withCredentials = true

let user;
function App() {

  
  // demo cookie

//  document.cookie = "authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3ZjU1YjQ4ZDE1OTEzYTQzZmVkZGEiLCJpYXQiOjE3MTM5MzA4OTIsImV4cCI6MTcxNDUzNTY5Mn0.JC8Ila_SlAQ_lgHCSl28z-JhcKl8WG8Fevg0pMC8CHg; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus()
  //     dispatch(SET_LOGIN(status))
  //   }
  //   loginStatus() 
  
  // }
  //   , [dispatch])

   
        
    try {
      user = JSON.parse(localStorage.getItem("role"));
  } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      
      return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <CategoryProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>

            {/*Poornima*/}

            {user && user.role === "admin" && <Route path="/*" element={ <Sidebar>
                <Layout>
                  <ProductAdminReport />
                </Layout>
              </Sidebar>} />}
            {user && user.role === "buyer" && <Route path="/*" element={ <MarketplaceNavbar showCategories={false}>
                <MarketHome/>
              </MarketplaceNavbar>} />}
            {user && user.role === "farmer" && <Route path="/*" element={
              <Sidebar>
                <Layout>
                  <Dashboard />

                </Layout>
              </Sidebar>} />}
            {user && user.role === "delivery" && <Route path="/*" element={<DeliveryMain />} />}
            {user && user.role === "expert" && <Route path="/*" element={<ExpertMain />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />


            <Route path="/market" element={
              <MarketplaceNavbar showCategories={true}>
                <Categories />
              </MarketplaceNavbar>
            } />

            <Route path="/product/:productId" element={
              <MarketplaceNavbar showCategories={false}>
                <ProductDetails />
              </MarketplaceNavbar>
            } />

            <Route path="/" element={
              <MarketplaceNavbar showCategories={false}>
                <MarketHome/>
              </MarketplaceNavbar>
            } />


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


            <Route path="/product-detail/:id" element={
              <Sidebar>
                <Layout>
                  <ProductDetailsfarmer />

                </Layout>
              </Sidebar>


            } />

            <Route path="/edit-product/:id" element={
              <Sidebar>
                <Layout>
                  <EditProduct />
                </Layout>
              </Sidebar>
            } />

            <Route path="/product-admin" element={
              <Sidebar>
                <Layout>
                  <ProductAdminReport />
                </Layout>
              </Sidebar>
            } />

            <Route path="/assign" element={
              <Sidebar>
                <Layout>
                  <AssignDelivery />
                </Layout>
              </Sidebar>
            } />

            <Route path="/view" element={
              <Sidebar>
                <Layout>
                <AllDeliveries />
                </Layout>
              </Sidebar>
            } />

            <Route path="/list-buddy" element={
              <Sidebar>
                <Layout>
                <ListBuddy />
                </Layout>
              </Sidebar>
            } />

            <Route path="/all-buddies" element={
              <Sidebar>
                <Layout>
                <AllBuddies />
                </Layout>
              </Sidebar>
            } />

            

          </Routes>
        </BrowserRouter>
      </CategoryProvider>
    </div>
  );
}

export default App;
