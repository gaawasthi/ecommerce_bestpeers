import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ title, image, price, category = '', id }) => {
  const dispatch = useDispatch();
const cartHandler = (e) => {
  e.stopPropagation();
  dispatch(addToCart({ productId: id}));
};

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="w-full max-w-xs bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100"
    >
      <div className="w-full h-52 overflow-hidden rounded-lg mb-3 flex items-center justify-center bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      <h2 className="text-base font-semibold text-gray-800 line-clamp-2 h-12 mb-2">
        {title}
      </h2>

      {category && (
        <p className="text-xs text-gray-500 mb-3">
          Category:{' '}
          <span className="font-medium text-gray-700">{category}</span>
        </p>
      )}

      <div className="flex justify-between items-center mt-auto">
        <p className="text-lg font-bold text-gray-900">₹{price}</p>
        <button
        
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 font-medium"
        >
    view
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
