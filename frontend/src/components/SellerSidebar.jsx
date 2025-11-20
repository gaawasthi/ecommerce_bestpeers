import React, { Profiler } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  TagIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Apple, Globe, User } from 'lucide-react';

const SellerSidebar = () => {
  const links = [
    {
      name: 'Dashboard',
      path: '/seller/dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      name: 'Profiles',
      path: '/seller/profile',
      icon: <User className="w-6 h-6" />,
    },
    {
      name: 'Products',
      path: '/seller/products',
      icon: <Globe className="w-6 h-6" />,
    },

    {
      name: 'Orders',
      path: '/seller/orders',
      icon: <ShoppingCartIcon className="w-6 h-6" />,
    }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-blue-50 shadow-xl border-r border-gray-200 p-6 h-screen fixed left-0 top-0 overflow-y-auto">
      <h1 className="text-xl font-bold mb-6">Seller Panel</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md hover:bg-gray-200 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SellerSidebar;
