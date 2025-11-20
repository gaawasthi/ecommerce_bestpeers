import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import DeleteModal from '../../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminCreateSeller,
  allUsers,
  deleteUser,
} from '../../features/adminAnalytics/AdminSlice';
import AddSellerModel from '../../components/AddSellerModel';
import toast from 'not-a-toast';
import 'not-a-toast/style.css';

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    item: null,
  });

  const [roleFilter, setRoleFilter] = useState('All');

  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const handleDelete = (user) => {
    setDeleteModal({ open: true, item: user });
  };

  const confirmDelete = () => {
    if (deleteModal.item?._id) {
      dispatch(deleteUser(deleteModal.item._id)).then(() => {
        dispatch(allUsers());
        toast({
          message: 'User deleted successfully',
          duration: 2000,
          autoClose: true,
          pauseOnHover: true,
        });
      });
    }
    setDeleteModal({ open: false, item: null });
  };

  const filteredUsers =
    roleFilter === 'All'
      ? users
      : users?.filter((u) => u.role.toLowerCase() === roleFilter.toLowerCase());

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
        </select>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
        >
          Add Seller
        </button>{' '}
      </div>

      {isLoading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : filteredUsers?.length === 0 ? (
        <p className="text-center py-10 text-gray-600">
          No users found for selected role.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredUsers?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4 text-gray-800">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 text-gray-600">{item.phone || '-'}</td>
                  <td className="p-4 text-gray-600 capitalize">{item.role}</td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={`${deleteModal.item?.firstName} ${deleteModal.item?.lastName}`}
      />

      <AddSellerModel
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(values) => {
          dispatch(adminCreateSeller(values));
          toast({
            message: 'Seller deleted successfully',
            duration: 2000,
            autoClose: true,
            pauseOnHover: true,
          });
        }}
      />
    </AdminLayout>
  );
};

export default Customers;
