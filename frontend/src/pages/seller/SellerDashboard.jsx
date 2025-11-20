import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerLayout from "../../components/layouts/SellerLayout";
import {
  getSellerTotalRevenue,
  getlowStockProducts,
  getpendingOrders,
  getdeliverdOrders,
} from "../../features/seller/sellerSlice";
import { TrendingUp, Package, AlertTriangle, Clock, CheckCircle, BarChart3, DollarSign, ShoppingBag } from 'lucide-react';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const {
    total,
    lowStock,
    pendingOrders,
    deliverdOrders,
    isLoading,
    error,
  } = useSelector((state) => state.seller);

  useEffect(() => {
    setMounted(true);
    dispatch(getSellerTotalRevenue());
    dispatch(getlowStockProducts());
    dispatch(getpendingOrders());
    dispatch(getdeliverdOrders());
  }, [dispatch]);

     
  // Professional stats with subtle colors
  const stats = [
    { 
      title: 'Total Revenue', 
      value: `₹${(total ?? 0).toLocaleString()}`,
      icon: DollarSign,
      trend: '+12.5%',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      title: 'Pending Orders', 
      value: pendingOrders?.length ?? 0,
      icon: Clock,
      trend: '+5.2%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      title: 'Delivered Orders', 
      value: deliverdOrders?.length ?? 0,
      icon: CheckCircle,
      trend: '+8.7%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      title: 'Low Stock Items', 
      value: lowStock?.length ?? 0,
      icon: AlertTriangle,
      trend: 'Need attention',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
  ];

  const StatCard = ({ stat, index }) => (
    <div 
      className={`bg-white rounded-lg border ${stat.borderColor} p-6 shadow-sm hover:shadow-md transition-all duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          <p className={`text-xs font-medium ${stat.color} mt-1`}>{stat.trend}</p>
        </div>
        <div className={`${stat.bgColor} p-3 rounded-lg`}>
          <stat.icon className={`w-6 h-6 ${stat.color}`} />
        </div>
      </div>
    </div>
  );

  const OrderStatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-orange-100 text-orange-800 border border-orange-200',
      delivered: 'bg-green-100 text-green-800 border border-green-200',
      processing: 'bg-blue-100 text-blue-800 border border-blue-200',
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const StockLevelBadge = ({ stock }) => {
    const getStockColor = (stock) => {
      if (stock <= 5) return 'bg-red-100 text-red-800 border border-red-200';
      if (stock <= 15) return 'bg-orange-100 text-orange-800 border border-orange-200';
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStockColor(stock)}`}>
        {stock} left
      </span>
    );
  };

  if (isLoading) {
    return (
      <SellerLayout>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
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
                Failed to load dashboard
              </h2>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-7 h-7 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">Seller Dashboard</h1>
          </div>
          <p className="text-gray-600">Overview of your store performance and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Low Stock Products */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Low Stock Products</h2>
              </div>
            </div>
            <div className="p-4">
              {lowStock?.length ? (
                <div className="space-y-3">
                  {lowStock.map((product, index) => (
                    <div 
                      key={product._id || product.name || index}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          {/* <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p> */}
                        </div>
                      </div>
                      <div className="text-right">
                        <StockLevelBadge stock={product.stock} />
                       
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">All products are well stocked</p>
                </div>
              )}
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
              </div>
            </div>
            <div className="p-4">
              {pendingOrders?.length ? (
                <div className="space-y-3">
                  {pendingOrders.slice(0, 5).map((order, index) => (
                    <div 
                      key={order._id}
                      className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 text-sm">Order #{order.ordernumber}</p>
                        <OrderStatusBadge status={order.orderStatus || 'pending'} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{order.items?.length || 0} items</span>
                        <span className="font-semibold text-gray-900">
                          ₹{Number(order.totalPrice || 0).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">No pending orders</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Deliveries */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Deliveries</h2>
              </div>
            </div>
            <div className="p-4">
              {deliverdOrders?.length ? (
                <div className="space-y-3">
                  {deliverdOrders.slice(0, 5).map((order, index) => (
                    <div 
                      key={order._id}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Order #{order.ordernumber}</p>
                          <p className="text-xs text-gray-500">
                            {order.items?.length || 0} items • {order.address?.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{Number(order.totalPrice || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">No delivered orders yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left">
                  <Package className="w-5 h-5 text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Add Product</p>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left">
                  <ShoppingBag className="w-5 h-5 text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">View Orders</p>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left">
                  <AlertTriangle className="w-5 h-5 text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Manage Stock</p>
                </button>
                <button className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left">
                  <BarChart3 className="w-5 h-5 text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Analytics</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;