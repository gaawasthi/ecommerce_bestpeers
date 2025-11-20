import React, { useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { topCustomers } from "../../features/adminAnalytics/AdminSlice";

const TopCustomers = () => {
  const dispatch = useDispatch();

  const { customersData , isLoading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(topCustomers());
  }, [dispatch]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Top Customers</h1>

      {isLoading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : customersData.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No customer data found.
        </p>
      ) : (
        <ul className="bg-white rounded-lg shadow mb-6 divide-y">
          {customersData.map((cust) => {
            const initials = `${cust.firstName?.[0] || ""}${
              cust.lastName?.[0] || ""
            }`;

            return (
              <li
                key={cust._id || initials}
                className="flex justify-between items-center p-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar Circle */}
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {initials.toUpperCase()}
                  </div>

                  <span className="font-medium text-gray-700">
                    {cust.firstName} {cust.lastName}
                  </span>
                </div>

                <span className="text-sm font-semibold text-green-600">
                  {cust.count} Orders
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </AdminLayout>
  );
};

export default TopCustomers;
