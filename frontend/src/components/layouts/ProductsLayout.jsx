import React from 'react';
import Sidebar from '../Sidebar';
import ProductSIdebar from '../ProductSIdebar';




const ProductLayout = ({ children, applyFilters }) => {
  return (
    <div className="flex gap-6">
      <ProductSIdebar applyFilters={applyFilters} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ProductLayout;
