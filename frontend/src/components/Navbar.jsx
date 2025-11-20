import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Search,
  LogIn,
  LogOut,
  ShoppingCart,
  Home,
  Heart,
  Package,
  User,
  ChevronDown,
  SearchIcon,
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';
import { logoutApi } from '../features/auth/authSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  const [value, setValue] = useState('');

  useEffect(() => {
    if (user) dispatch(getCart());
  }, [dispatch, user]);

  const handleLogout = async () => {
    await dispatch(logoutApi());
    setShowProfileDropdown(false);
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <NavLink
            to="/"
            className="text-xl font-bold flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="text-blue-600" size={24} />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            <Package size={18} />
            Products
          </NavLink>
        </div>

        <form
          className="flex flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?query=${value}`);
          }}
        >
          <SearchIcon className="mt-2 mr-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>

        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={22} className="text-gray-700" />
            {cart?.items?.length > 0 &&
              (user ? (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] 
                flex items-center justify-center rounded-full font-medium"
                >
                  {cart?.items?.length}
                </span>
              ) : null)}
          </NavLink>

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <button className="flex items-center gap-2 p-2 pr-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all shadow-sm">
                {/* Profile Icon */}
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={20} className="text-gray-700" />
                </div>

                {/* Name */}
                <span className="font-medium text-gray-800 text-sm">
                  {user?.firstName}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-600 transition-transform ${
                    showProfileDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transition-all">
                  <NavLink
                    to="/userprofile"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <User size={18} />
                    <span className="font-medium">Profile</span>
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Package size={18} />
                    <span className="font-medium">Orders</span>
                  </NavLink>

                  <div className="border-t border-gray-200 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 font-medium shadow"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <NavLink
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg"
          >
            <ShoppingCart size={20} />
            {cart?.items?.length > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-[16px] h-[16px] 
                flex items-center justify-center rounded-full font-medium"
              >
                {cart?.items?.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <div className="space-y-1">
            <NavLink
              to="/"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/products"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <Package size={18} />
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <ShoppingCart size={18} />
              Cart
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/userprofile"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  <User size={18} />
                  Profile
                </NavLink>

                <NavLink
                  to="/orders"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  <Package size={18} />
                  Orders
                </NavLink>
              </>
            )}
          </div>

          {/* Bottom Logout/Login */}
          <div className="pt-3 border-t border-gray-200">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <LogIn size={16} />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
