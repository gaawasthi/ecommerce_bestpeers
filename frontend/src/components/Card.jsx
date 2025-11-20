import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
