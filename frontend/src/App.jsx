import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Dasboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Sellers from './pages/admin/Seller';
import Customers from './pages/admin/Customers';
import TopProducts from './pages/admin/TopProducts';
import TopCustomers from './pages/admin/TopCustomers';
import TopSellers from './pages/admin/TopSellers';
import { Provider } from 'react-redux';
import store from './app/store';
import Profile from './pages/admin/Profile';
import Login from './pages/Login';
import Products from './pages/admin/Products';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProfile from './pages/seller/SellerProfile';
import SellerProducts from './pages/seller/SellerProducts';
import RegistrationForm from './pages/Register';
import CustomerLayout from './components/layouts/CustomerLayout';
import Home from './pages/Home';
import AllProducts from './pages/customers/Products';
import ProductDetail from './pages/customers/ProductDetail';
import Cart from './pages/customers/Cart';
import Checkout from './pages/customers/Checkout';
import OrderSummary from './pages/customers/OrderSummary';
import OrderList from './pages/customers/OrderList';
import CustomerProfile from './pages/customers/Profile';
import SearchedProducts from './pages/customers/SearchedProducts';
import ForgotPassword from './pages/ForgotPassword';
import SellerOrders from './pages/seller/SellerOrders';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forget" element={<ForgotPassword/>} />

          {/* admin routes */}

          <Route path="/admin/dashboard" element={<Dasboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/sellers" element={<Sellers />} />
          <Route path="/admin/top-products" element={<TopProducts />} />
          <Route path="/admin/top-customers" element={<TopCustomers />} />
          <Route path="/admin/top-sellers" element={<TopSellers />} />

          {/* seller */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/Seller/profile" element={<SellerProfile />} />
          <Route path="/Seller/products" element={<SellerProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />

          {/*customer routes  */}
          <Route path="/" element={<CustomerLayout />}>
             <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/summary" element={<OrderSummary />} />
             <Route path="/orders" element={<OrderList />} />
             <Route path="/userprofile" element={<CustomerProfile/>}/>
             <Route path="/search" element={<SearchedProducts/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
