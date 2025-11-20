import React, { useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const cartItems = cart?.items || [];
 const user =  JSON.parse(localStorage.getItem('user'))


  useEffect(() => {
    dispatch(getCart());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeCartItem(productId));
  };
  
  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-xl">
              <ShoppingBag className="h-20 w-20 text-indigo-600" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Looks like you haven't added anything to your cart yet. Start exploring our products!
          </p>

          <button
            onClick={() => navigate('/products')}
            className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            Start Shopping
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }
 if(!user) return  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-xl">
              <ShoppingBag className="h-20 w-20 text-indigo-600" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Login to view cart
          </h2>
        

          <button
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
         Login
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
          <div className="lg:col-span-8 space-y-4">
            {cart?.items?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                
                  <div className="relative group">
                    <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <img
                        src={item.product?.images?.[0]?.url}
                        alt={item.product?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-1">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {item.product?.name}
                    </h2>
                    <p className="text-sm text-slate-500 uppercase tracking-wide">
                      {item.product?.category}
                    </p>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{item.price}
                    </p>
                  </div>

                  
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 shadow-inner">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-white rounded-lg transition-colors duration-150"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={18} className={item.quantity <= 1 ? 'text-slate-300' : 'text-slate-600'} />
                    </button>
                    <span className="w-16 text-center font-semibold text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product._id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-white rounded-lg transition-colors duration-150"
                    >
                      <Plus size={18} className="text-slate-600" />
                    </button>
                  </div>

               
                  <div className="text-center md:text-right min-w-[100px]">
                    <p className="text-sm text-slate-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-slate-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-150"
                    title="Remove item"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">₹{cart.itemsPrice || 0}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800">Total</span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ₹{cart.totalPrice || 0}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
                  🔒 Secure checkout powered by trusted payment partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;