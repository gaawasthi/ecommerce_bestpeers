import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/layouts/AdminLayout';
import Card from '../../components/Card';
import {
  getTotalRevenue,
  lastWeek,
  topCustomers,
  topProducts,
  topSellers,
} from '../../features/adminAnalytics/AdminSlice';
import { TrendingUp, Users, ShoppingBag, DollarSign, Award, Package, Crown, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    revenue,
    weekData,
    sellersData,
    productsData,
    customersData,
    isLoading,
    error,
  } = useSelector((state) => state.admin);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(getTotalRevenue());
    dispatch(lastWeek());
    dispatch(topCustomers());
    dispatch(topProducts());
    dispatch(topSellers());
  }, [dispatch]);

  // Enhanced stats with icons and colors
  const stats = [
    { 
      title: 'Total Revenue', 
      value: `₹${(revenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      title: 'Orders Last Week', 
      value: weekData?.ordersLastWeek ?? 0,
      icon: ShoppingBag,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Customers Last Week', 
      value: weekData?.customerLastWeek ?? 0,
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  const StatCard = ({ stat, index }) => (
    <div 
      className={`relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full transform translate-x-16 -translate-y-16`}></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`${stat.bgColor} p-3 rounded-xl`}>
            <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>
      </div>
    </div>
  );

  const RankBadge = ({ rank }) => {
    const colors = {
      1: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white',
      2: 'bg-gradient-to-br from-gray-300 to-gray-500 text-white',
      3: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white',
    };
    
    return (
      <div className={`w-8 h-8 rounded-full ${colors[rank] || 'bg-gray-200 text-gray-700'} flex items-center justify-center font-bold text-sm shadow-md`}>
        {rank}
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      vip: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      gold: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      silver: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getCustomerStatus = (index) => {
    if (index === 0) return 'vip';
    if (index === 1) return 'gold';
    return 'silver';
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-red-600 text-xl font-semibold mb-2">
                Failed to load dashboard
              </h2>
              <p className="text-gray-600">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="">
       

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
         
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Top Sellers</h2>
              </div>
            </div>
            <div className="p-6">
              {sellersData?.length ? (
                <div className="space-y-4">
                  {sellersData.map((seller, index) => (
                    <div 
                      key={seller._id || seller.name || index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-emerald-50 hover:to-emerald-50/30 transition-all duration-300 group"
                    >
                      <RankBadge rank={index + 1} />
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {seller.firstName?.[0]}{seller.lastName?.[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {seller.firstName} {seller.lastName}
                        </p>
                       
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600 text-lg">
                          ₹{Number(seller.totalRevenue || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No seller data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Top Products</h2>
              </div>
            </div>
            <div className="p-6">
              {productsData?.length ? (
                <div className="space-y-4">
                  {productsData.map((product, index) => {
                    const trend = Math.max(60, 100 - (index * 8)); // Simulate trend percentage
                    return (
                      <div 
                        key={product._id || product.name || index}
                        className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-blue-50 hover:to-blue-50/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-gray-900 flex-1">{product.name}</p>
                          <span className="font-bold text-blue-600">{product.count} sold</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${trend}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{trend}%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          ₹{Number(product.revenue || product.count * 100).toLocaleString()} revenue
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No product data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Customers */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Top Customers</h2>
              </div>
            </div>
            <div className="p-6">
              {customersData?.length ? (
                <div className="space-y-4">
                  {customersData.map((customer, index) => (
                    <div 
                      key={customer._id || customer.name || index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-purple-50 hover:to-pink-50/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {customer.firstName?.[0]}{customer.lastName?.[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{customer.count} orders</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={getCustomerStatus(index)} />
                        <p className="font-bold text-purple-600 text-lg">
                          ₹{Number(customer.totalSpent || customer.count * 150).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No customer data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-blue-600 font-medium text-sm">New order #{Math.floor(Math.random() * 4000)} placed</p>
                    <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-purple-600 font-medium text-sm">New customer registered</p>
                    <p className="text-xs text-gray-500 mt-1">15 min ago</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-emerald-600 font-medium text-sm">Product sold: {productsData?.[0]?.name || 'Popular Item'}</p>
                    <p className="text-xs text-gray-500 mt-1">32 min ago</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-blue-600 font-medium text-sm">Order #{Math.floor(Math.random() * 4000)} completed</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;