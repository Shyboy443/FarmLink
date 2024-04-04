import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importing components and pages from both code snippets
import AddProduct from './pages/addProduct/AddProduct';
import AddPayment from './components/payment/addPayment/addPayment';
import AllPayment from './components/payment/allPayment/allPayment';
import UpdatePayment from './components/payment/UpdatePayment/UpdatePayment';
import OfferManagement from './components/offer/Offers';
import OfferPreview from './components/offer/OfferPreview';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Sidebar from './components/sidebar/Sidebar';
import EditProduct from './pages/editProduct/EditProduct';
import Categories from './pages/marketplace/categories/Categories';
import MarketplaceNavbar from './components/marketplaceNav/MarketplaceNavbar';
import ProductDetailsfarmer from './components/product/productDetails/ProductDetails';
import ProductDetails from './pages/marketplace/details/ProductDetails';
import MarketHome from './pages/marketplace/home/marketHomePage';
import ProductAdminReport from './components/productAdminReport/productAdminReport';

import { CategoryProvider } from './customHook/CategoryProvider';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  // Setting a demo cookie for the application
  document.cookie = "authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3ZjU1YjQ4ZDE1OTEzYTQzZmVkZGEiLCJpYXQiOjE3MTIxMTkxOTksImV4cCI6MTcxMjcyMzk5OX0.XrrwNYPJktrclWwTThPsppWQmACZhrawuT9BBpYhd5Y; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

  return (
    <div className="App">
      <CategoryProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-payment" element={<AddPayment />} />
            <Route path="/allpayments" element={<AllPayment />} />
            <Route path="/updatePayment/:id" element={<UpdatePayment />} />
            <Route path="/offers" element={<OfferManagement />} />
            <Route path="/offers-preview" element={<OfferPreview />} />
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
            <Route path="/Home" element={
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
            <Route path="/edit-product/:id" element={
              <Sidebar>
                <Layout>
                  <EditProduct />
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
            <Route path="/generate-report" element={
              <Sidebar>
                <Layout>
                  <ProductAdminReport />
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
