import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sellerOrder, updateOrder } from '../../features/orders/orderSlice';
import SellerLayout from '../../components/layouts/SellerLayout';
import useFormattedDate from '../../hooks/Date';
import toast from 'not-a-toast';
import 'not-a-toast/style.css';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from 'lucide-react';

const SellerOrders = () => {
  const dispatch = useDispatch();
  const { sellersOrders, isLoading, error } = useSelector(
    (state) => state.order
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(sellerOrder());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    await dispatch(updateOrder({ id, updateData:newStatus }));
    dispatch(sellerOrder());
    toast({ message: 'updated status ' });
  };

  // Filter orders based on search and status
  const filteredOrders = sellersOrders?.filter((order) => {
    const matchesSearch =
      order.ordernumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-800 border-orange-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      returned: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      processing: <RefreshCw className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
      returned: <RefreshCw className="w-4 h-4" />,
    };
    return icons[status];
  };

  if (isLoading) {
    return (
      <SellerLayout>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading orders...</p>
            </div>
          </div>
        </div>
      </SellerLayout>
    );
  }

  if (error) {
    return (
      <SellerLayout>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-3xl mb-4">⚠️</div>
              <h2 className="text-gray-700 text-lg font-semibold mb-2">
                Failed to load orders
              </h2>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={() => dispatch(sellerOrder())}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="min-h-screen ">
        {/* Header */}
     
        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {filteredOrders?.length || 0} orders found
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders?.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.ordernumber}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.ordernumber.slice(10,20)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Payment: {order.paymentMethod}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.user?.firstName} {order.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.user?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {order.items?.length} items
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          ₹{order.totalPrice}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                'en-IN'
                              )
                            : 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`text-sm px-3 py-1 rounded border ${getStatusColor(
                            order.orderStatus
                          )} focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="returned">Returned</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="More Options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400 mb-2">
                        <Truck className="w-12 h-12 mx-auto" />
                      </div>
                      <p className="text-gray-500 text-lg font-medium mb-1">
                        No orders found
                      </p>
                      <p className="text-gray-400 text-sm">
                        {searchTerm || statusFilter !== 'all'
                          ? 'Try adjusting your search or filters'
                          : "You don't have any orders yet"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Legend */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Order Status Guide
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'pending',
              'confirmed',
              'processing',
              'shipped',
              'delivered',
              'cancelled',
              'returned',
            ].map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    getStatusColor(status).split(' ')[0]
                  }`}
                ></div>
                <span className="text-sm text-gray-600 capitalize">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerOrders;
