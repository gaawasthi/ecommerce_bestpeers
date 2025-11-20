import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import DeleteModal from '../../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getAllProducts,
} from '../../features/products/productSlice';

const Products = () => {
  const categories = ['All Categories', 'Fashion', 'Electronics', 'Sports'];
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const dispatch = useDispatch();

  const { products, totalPages, isLoading } = useSelector(
    (state) => state.product
  );
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    category: '',
  });

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const apply = () => {
    applyFilters({
      search,
      category: category === 'All Categories' ? '' : category,
      page: 1,
      limit: 20,
    });
  };

  const clear = () => {
    setSearch('');
    setCategory('All Categories');
    applyFilters({
      search: '',
      category: '',
      page: 1,
      limit: 20,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts(filters));
  }, [dispatch, filters]);

  const handleDelete = (product) => {
    setDeleteModal({ open: true, item: product });
  };

  const confirmDelete = () => {
    if (deleteModal.item?._id) {
      dispatch(deleteProduct(deleteModal.item._id));
    }
    setDeleteModal({ open: false, item: null });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    apply();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePageChange = (newPage) => {
    applyFilters({
      ...filters,
      page: newPage,
    });
  };

  return (
    <AdminLayout>
      {/* Header with Search and Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 text-sm">Manage your product inventory</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="flex-1 min-w-[200px]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search products..."
              />
              <svg
                className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>

          {/* Category Filter */}
          <div className="min-w-[150px]">
            <select
              onChange={handleCategoryChange}
              value={category}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={apply}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply
            </button>
            <button
              onClick={clear}
              className="px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.category) && (
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-800 font-medium">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  Search: "{filters.search}"
                  <button
                    onClick={() => setSearch('')}
                    className="hover:text-blue-900 ml-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                  Category: {filters.category}
                  <button
                    onClick={() => setCategory('All Categories')}
                    className="hover:text-green-900 ml-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-3">Loading products...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products?.length > 0 ? (
                products.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-md truncate">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ₹{item.price}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4"
                      />
                    </svg>
                    <p className="font-medium">No products found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page <span className="font-medium">{filters.page}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={filters.page === 1}
                    onClick={() => handlePageChange(filters.page - 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    disabled={filters.page === totalPages}
                    onClick={() => handlePageChange(filters.page + 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.item?.name}
      />
    </AdminLayout>
  );
};

export default Products;
