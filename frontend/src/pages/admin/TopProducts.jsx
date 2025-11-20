import React, { useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { topProducts } from "../../features/adminAnalytics/AdminSlice";

const TopProducts = () => {
  const dispatch = useDispatch();

  const { productsData , isLoading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Top Products</h1>

      {isLoading ? (
        <div className="text-center py-10">Loading top products...</div>
      ) : productsData.length === 0 ? (
        <div className="text-center py-10">No product data found.</div>
      ) : (
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {productsData.map((prod, index) => (
            <li
              key={prod._id || index}
              className="flex justify-between border-b py-2"
            >
              <span>{prod?.name || "Unknown Product"}</span>
              <span className="text-green-600 font-semibold">
                {prod?.count} Sold
              </span>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
};

export default TopProducts;
