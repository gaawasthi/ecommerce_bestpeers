import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import EcommerceFooter from '../Footer';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <EcommerceFooter/>
    </div>
  );
};

export default CustomerLayout;