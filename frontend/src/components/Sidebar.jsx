import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Globe, Sparkles, Crown, TrendingUp, Users, Package, Award } from 'lucide-react';

const Sidebar = () => {
  const links = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      name: 'Profiles',
      path: '/admin/profile',
      icon: <Users className="w-6 h-6" />,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <Package className="w-6 h-6" />,
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
      name: 'Users',
      path: '/admin/customers',
      icon: <UserIcon className="w-6 h-6" />,
    },
    {
      name: 'Top Products',
      path: '/admin/top-products',
      icon: <StarIcon className="w-6 h-6" />,
    },
    {
      name: 'Top Customers',
      path: '/admin/top-customers',
      icon: <Crown className="w-6 h-6" />,
    },
    {
      name: 'Top Sellers',
      path: '/admin/top-sellers',
      icon: <Award className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-blue-50 shadow-xl border-r border-gray-200 p-6 h-screen fixed left-0 top-0 overflow-y-auto">
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
      
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200 transform scale-105' 
                  : 'text-gray-700 hover:bg-white hover:shadow-md hover:border hover:border-gray-100'
              }`
            }
          >
            <div className={({ isActive }) => 
              `transition-transform duration-300 group-hover:scale-110 ${
                isActive ? 'text-white' : 'text-gray-600'
              }`
            }>
              {link.icon}
            </div>
            <span className="ml-3 font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

    
      {/* <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Revenue</span>
            <span className="text-xs font-bold text-emerald-600">₹284,592</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Orders</span>
            <span className="text-xs font-bold text-blue-600">1,249</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Customers</span>
            <span className="text-xs font-bold text-purple-600">432</span>
          </div>
        </div>
      </div> */}


      
    </div>
  );
};

export default Sidebar;