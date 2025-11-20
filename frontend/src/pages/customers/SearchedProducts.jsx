import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searched } from '../../features/products/productSlice';
import ProductCard from '../../components/ProductCard';

const SearchedProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  const { searchedProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (query) {
      dispatch(searched(query));
    }
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, dispatch]);
  console.log(searchedProducts);

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="mb-8 flex flex-wrap gap-4 justify-center items-center ">
      {searchedProducts.map((product) => (
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
  );
};

export default SearchedProducts;
