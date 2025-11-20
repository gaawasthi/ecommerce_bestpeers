import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Delete {itemName}?</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
