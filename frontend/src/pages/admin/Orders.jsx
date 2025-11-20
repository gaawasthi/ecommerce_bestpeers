import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import Table from '../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders } from '../../features/orders/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { adminOrders, isLoading } = useSelector((state) => state.order);
    // console.log(adminOrders);
    
  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Order Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Total Price</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {adminOrders?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition duration-150">
                 
                  <td className="p-4 text-gray-800">{item.ordernumber}</td>

                  <td className="p-4 text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

              
                  <td className="p-4 text-gray-600">
                    {item.address?.fullName || "Unknown"}
                  </td>

          
                  <td className="p-4 font-semibold text-gray-700">
                    ${item.totalPrice}
                  </td>

                 
                  <td className="p-4 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-lg text-white shadow 
                      ${item.orderStatus === "delivered"
                        ? "bg-green-500"
                        : item.orderStatus === "processing"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders;
