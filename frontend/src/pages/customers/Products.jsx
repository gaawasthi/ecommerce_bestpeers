import React, { useEffect, useState } from 'react';
import ProductLayout from '../../components/layouts/ProductsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';
import ProductCard from '../../components/ProductCard';

const AllProducts = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,  
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const { products, totalPages ,isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts(filters));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters]);

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };   

 
  return (
    <ProductLayout applyFilters={setFilters}>

  {isLoading && (
    <div className="h-40 flex justify-center items-center text-lg font-semibold">
      Loading...
    </div>
  )}

  {!isLoading && products.length === 0 && (
    <div className="h-40 flex justify-center items-center text-xl font-bold text-gray-500">
      No Products Found
    </div>
  )}


  {!isLoading && products.length > 0 && (
    <>
      <div className="mb-8 flex flex-wrap gap-4 justify-center items-center">
        {products.map((product) => (
          <div key={product._id} className="w-[215px]">
            <ProductCard
              id={product._id}
              title={product.name}
              image={product?.images[0]?.url}
              price={product.price}
              category={product.category}
            />
          </div>
        ))}
      </div>


      <div className="flex gap-6 justify-center items-center mt-10">
        <button
          disabled={filters.page === 1}
          onClick={() => handlePageChange(filters.page - 1)}
          className="border border-gray-500 px-4 py-1 rounded-lg disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="text-lg font-semibold">
          Page {filters.page} / {totalPages}
        </span>

        <button
          disabled={filters.page === totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
          className="border border-gray-500 px-4 py-1 rounded-lg disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </>
  )}
</ProductLayout>

  );
};

export default AllProducts;
