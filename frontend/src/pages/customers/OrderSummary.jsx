import React, { useEffect } from 'react';
import useFormattedDate from '../../hooks/Date';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const { createdOrder: lastOrder } = useSelector((state) => state.order);
  console.log(lastOrder);
   const naviagate = useNavigate()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!lastOrder) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">No order found</h2>
      </div>
    );
  }

  const date = useFormattedDate(lastOrder?.createdAt);

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
                {lastOrder?.ordernumber}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium">Date</p>
              <p className="text-slate-900 text-sm font-medium mt-2">{date}</p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium">Total</p>
              <p className="text-sm font-medium text-indigo-700 mt-2">
                ₹{lastOrder?.totalPrice || 0}
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
                  {lastOrder?.address?.fullName}
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
                  {lastOrder?.address?.addressLine1}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm font-medium">Phone</p>
                <p className="text-slate-900 text-sm font-medium mt-2">
                  {lastOrder?.address?.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {/* <div className="mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              Order Items ({lastOrder?.items?.length || 0})
            </h3>

            <div className="space-y-4">
              {lastOrder?.items?.map((item, index) => (
                <div
                  key={item?.product?._id || index}
                  className="flex items-start gap-4 max-sm:flex-col"
                >

                  <img
                    src={item?.product?.images?.[0]?.url || "/placeholder.png"}
                    alt={item?.product?.name || "Product"}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-900">
                      {item?.product?.name}
                    </h4>

                    <p className="text-slate-500 text-xs font-medium mt-2">
                      Qty: {item?.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-900 text-sm font-semibold">
                      ₹{item?.product?.price}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div> */}

          {/* Price Summary */}
          <div className="bg-gray-100 rounded-xl p-4 mt-8">
            <h3 className="text-base font-medium text-slate-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Subtotal</p>
                <p className="text-slate-900 text-sm font-semibold">
                  ₹{lastOrder?.totalPrice || 0}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-sm text-slate-500 font-medium">Shipping</p>
                <p className="text-slate-900 text-sm font-semibold">₹0</p>
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-300">
                <p className="text-[15px] font-semibold text-slate-900">
                  Total
                </p>
                <p className="text-[15px] font-semibold text-indigo-700">
                  ₹{lastOrder?.totalPrice || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm font-medium">
              Need help?{' '}
              <a href="#" className="text-indigo-700 hover:underline">
                Contact us
              </a>
            </p>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[15px] py-2 px-4 rounded-lg cursor-pointer transition duration-200"
              onClick={() => naviagate('/')}
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
