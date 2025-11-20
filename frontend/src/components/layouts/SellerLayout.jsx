import React from 'react';
import Sidebar from '../Sidebar';
import SellerSidebar from '../SellerSidebar';

const SellerLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SellerSidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 overflow-y-auto h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
