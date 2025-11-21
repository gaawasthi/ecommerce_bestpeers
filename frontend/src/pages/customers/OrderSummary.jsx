import React, { useEffect } from 'react';
import useFormattedDate from '../../hooks/Date';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearLastOrder } from '../../features/orders/orderSlice';
import confetti from 'canvas-confetti';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createdOrder: lastOrder } = useSelector((state) => state.order);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check if lastOrder exists, if not try to get from localStorage
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
    
    if (!lastOrder && !storedOrder) {
      navigate('/');
      return;
    }

    // Trigger confetti only when we have order data
    if (lastOrder || storedOrder) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          startVelocity: 35,
          spread: 360,
          ticks: 50,
          particleCount: 40,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [lastOrder, navigate]);

  // Get order from Redux or localStorage as fallback
  const order = lastOrder || JSON.parse(localStorage.getItem("lastOrder"));

  // Show loading or redirect if no order data
  if (!order) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const date = useFormattedDate(order?.createdAt);

  const handleGoHome = () => {
    dispatch(clearLastOrder());
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xl">
        
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-white">
              Order Confirmation
            </h2>
            <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              Paid
            </span>
          </div>
          <p className="text-slate-200 text-sm mt-2">
            Thank you for your order!
          </p>
        </div>

        {/* Main */}
        <div className="p-6">
          {/* Order Details */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-slate-500 text-sm font-medium">Order Number</p>
              <p className="text-slate-900 text-sm font-medium mt-2">
                {order?.ordernumber || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium">Date</p>
              <p className="text-slate-900 text-sm font-medium mt-2">{date}</p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium">Total</p>
              <p className="text-sm font-medium text-indigo-700 mt-2">
                ₹{order?.totalPrice || 0}
              </p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-100 rounded-xl p-4 mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              Shipping Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500 text-sm font-medium">Customer</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order?.address?.fullName || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Shipping Method
                </p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  Express Delivery
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm font-medium">Address</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order?.address?.addressLine1 || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm font-medium">Phone</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {order?.address?.phone || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-100 rounded-xl p-4 mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Subtotal</p>
                <p className="text-slate-900 text-sm font-semibold">
                  ₹{order?.itemsPrice || 0}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Shipping</p>
                <p className="text-slate-900 text-sm font-semibold">
                  ₹{order?.shippingPrice || 0}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Tax</p>
                <p className="text-slate-900 text-sm font-semibold">
                  ₹{order?.taxPrice || 0}
                </p>
              </div>

              {order?.discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-sm text-slate-500 font-medium">Discount</p>
                  <p className="text-green-600 text-sm font-semibold">
                    -₹{order?.discount || 0}
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t border-gray-300">
                <p className="text-[15px] font-semibold text-slate-900">
                  Total
                </p>
                <p className="text-[15px] font-semibold text-indigo-700">
                  ₹{order?.totalPrice || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              Need help?{" "}
              <a href="#" className="text-indigo-700 hover:underline">
                Contact us
              </a>
            </p>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[15px] py-2 px-4 rounded-lg cursor-pointer transition duration-200"
              onClick={handleGoHome}
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;