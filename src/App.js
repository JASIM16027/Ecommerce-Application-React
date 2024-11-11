import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Importing User Pages
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login.jsx';
import Register from './Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './Pages/SingleCategory/SingleCategory';
import Wishlist from './Pages/WhisList/Wishlist';
import PaymentSuccess from './Pages/Payment/PaymentSuccess';
import CheckoutForm from './Components/Checkout/CheckoutForm';
import UpdateDetails from './Pages/Update_User/UpdateDetails';
import ForgotPasswordForm from './Auth/ForgotPassword/ForgotPasswordForm';
import AddNewPassword from './Auth/ForgotPassword/AddNewPassword';

// Importing Admin Pages
import AdminLogin from './Admin/Auth/Login/AdminLogin';
import AdminRegister from './Admin/Auth/Register/AdminRegister';
import AdminHomePage from './Admin/Pages/AdminHomePage';
import SingleUserPage from './Admin/Pages/SingleUserPage';
import SingleProduct from './Admin/Pages/SingleProduct';

// Importing Navigation Components
// import MobileNavigation from './Navigation/MobileNavigation';
// import DesktopNavigation from './Navigation/DesktopNavigation';

function App() {
  return (
    <>
      {/* Toast notifications */}
      {/* <ToastContainer position='top-center' /> */}

      <Router>
        {/* Main Navigation Components */}
        {/* <DesktopNavigation /> */}
        
        <div className='main-content'>
          <Routes>
            {/* User Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/detail/type/:cat/:id' element={<ProductDetail />} />
            <Route path='/product/type/:cat' element={<SingleCategory />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<CheckoutForm />} />
            <Route path='/update' element={<UpdateDetails />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
            <Route path='/user/reset/:id/:token' element={<AddNewPassword />} />

            {/* Admin Routes */}
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/register' element={<AdminRegister />} />
            <Route path='/admin/home' element={<AdminHomePage />} />
            <Route path='/admin/home/user/:id' element={<SingleUserPage />} />
            <Route path='/admin/home/product/:type/:id' element={<SingleProduct />} />
          </Routes>
        </div>

        {/* Mobile Navigation */}
        {/* <MobileNavigation /> */}
      </Router>
    </>
  );
}

export default App;
