import React, { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import DeleteModal from '../../components/DeleteModal';
import Table from '../../components/Table';

const Sellers = () => {
  // Sample seller data
  const [sellers, setSellers] = useState([
    { Name: 'Seller A', Email: 'sellerA@example.com', Sales: '$5000' },
    { Name: 'Seller B', Email: 'sellerB@example.com', Sales: '$3500' },
    { Name: 'Seller C', Email: 'sellerC@example.com', Sales: '$2500' },
  ]);

  // State to handle delete modal
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });

  // Open delete modal
  const handleDelete = (seller) => {
    setDeleteModal({ open: true, item: seller });
  };

  // Confirm deletion
  const confirmDelete = () => {
    setSellers(sellers.filter(s => s !== deleteModal.item));
    setDeleteModal({ open: false, item: null });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Sellers</h1>

      {/* Table of sellers */}
      <Table
        columns={['Name', 'Email', 'Sales']}
        data={sellers}
        actions={[{ label: 'Delete', onClick: handleDelete }]}
      />

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={confirmDelete}
        itemName={deleteModal.item?.Name}
      />
    </AdminLayout>
  );
};

export default Sellers;
