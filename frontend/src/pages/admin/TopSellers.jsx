import React, { useEffect } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { topSellers } from '../../features/adminAnalytics/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';

const TopSellers = () => {
  const dispatch = useDispatch();
  const { sellersData = [], isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(topSellers());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h1 className="text-2xl font-bold mb-6">Top Sellers</h1>

        {isLoading ? (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        ) : sellersData.length === 0 ? (
          <p className="text-center py-10 text-gray-400">
            No seller data available.
          </p>
        ) : (
          <ul className="divide-y">
            {sellersData.map((cust, idx) => {
              const initials = `${cust.firstName?.[0] || ''}${
                cust.lastName?.[0] || ''
              }`;

              return (
                <li
                  key={cust._id || idx}
                  className="flex justify-between items-center px-4 py-4 hover:bg-gray-50 transition rounded-lg"
                >
                  {/* LEFT: Avatar + Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {initials.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 tracking-wide">
                        {cust.firstName} {cust.lastName}
                      </p>
                      <span className="text-xs text-gray-500">Seller</span>
                    </div>
                  </div>

                  {/* RIGHT: Orders + Revenue */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">
                      {cust.totalSold} Sales
                    </p>
                    <p className="text-xs text-gray-600">
                      Revenue: ₹{cust.totalRevenue?.toLocaleString()}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
};

export default TopSellers;
