import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SellerLayout from '../../components/layouts/SellerLayout';
import DeleteModal from '../../components/DeleteModal';
import ProductModal from '../../components/ProductModel';
import {
  addProduct,
  deleteProduct,
  getMyProducts,
  updateProduct,
} from '../../features/products/productSlice';

const SellerProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  console.log(products);

  const [showFormModal, setShowFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });

  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setEditItem(null);
    setShowFormModal(true);
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setShowFormModal(true);
  };

  const handleFormSubmit = (formData) => {
    if (editItem) {
      dispatch(updateProduct({ id: editItem._id, productData: formData }));
    } else {
      dispatch(addProduct(formData));
    }

    setShowFormModal(false);
    setEditItem(null);
  };

  const handleDelete = (product) => {
    setDeleteModal({ open: true, item: product });
  };

  const confirmDelete = () => {
    if (deleteModal.item?._id) {
      dispatch(deleteProduct(deleteModal.item._id));
    }
    setDeleteModal({ open: false, item: null });
  };
  console.log(products);

  return (
    <SellerLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Products</h1>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          onClick={handleAddProduct}
        >
          + Add Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4 font-semibold text-gray-700">
                    ${product.price}
                  </td>

                  <td className="p-4 flex gap-4 justify-center">
                    <button
                      className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-yellow-600"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products?.length === 0 && (
                <tr key="no-products">
                  <td colSpan="4" className="p-5 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.item?.name}
      />

      <ProductModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={editItem}
      />
    </SellerLayout>
  );
};

export default SellerProducts;
