import React, { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';
import toast from 'not-a-toast';
import 'not-a-toast/style.css';
import SimpleParallax from 'simple-parallax-js';
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.product);
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleQuantityChange = (action) => {
    if (action === 'increment' && quantity < product?.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      alert('Please login first to proceed with purchase');
      return;
    }
    
    dispatch(addToCart({ 
      productId: id, 
      quantity: quantity 
    }));
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      toast({
        message: "Please login",
        showIcon: true,
        iconAnimation: "default",
        iconTimingFunction: "ease",
        iconBorderRadius: "50%",
        iconType: "warn",
      });
      return;
    }

    dispatch(addToCart({ 
      productId: id, 
      quantity: quantity 
    }));
    
    toast({
      message: "Added to Cart.",
      showIcon: true,
      iconAnimation: "default",
      iconTimingFunction: "ease",
      iconBorderRadius: "50%",
      iconType: "success",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading product</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>Home</li>
            <li>/</li>
            <li>{product.category}</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Section - Made more compact */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-md aspect-square max-w-full mx-auto">
             <SimpleParallax>
     <img
                src={product.images?.[selectedImage]?.url}
                alt={product.name}
                className="w-full h-full object-contain p-2"
              />
             </SimpleParallax>
         
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image._id}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section - More compact */}
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart
                      className={isFavorite ? 'fill-current' : ''}
                      size={18}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  (4.8 / 128 reviews)
                </span>
              </div>

              <p className="text-3xl font-bold text-gray-900 mb-3">
                ₹{product.price}
              </p>
            </div>

            {/* Compact info grid */}
            <div className="bg-gray-100 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </div>
              {product.brand && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium text-gray-900">
                    {product.brand}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: product.color }}
                  ></div>
                  <span className="font-medium text-gray-900 capitalize text-sm">
                    {product.color}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Availability:</span>
                <span
                  className={`font-medium text-sm ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  disabled={quantity >= product.stock}
                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Buy Now
              </button>
            </div>

            {/* Features - More compact */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Truck className="text-blue-600" size={16} />
                </div>
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="text-green-600" size={16} />
                </div>
                <p className="text-xs text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <RotateCcw className="text-orange-600" size={16} />
                </div>
                <p className="text-xs text-gray-600">30 Day Returns</p>
              </div>
            </div>

            {/* Seller Info - More compact */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Seller Information
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {product.seller?.firstName?.[0]}
                  {product.seller?.lastName?.[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {product.seller?.firstName} {product.seller?.lastName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {product.seller?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;