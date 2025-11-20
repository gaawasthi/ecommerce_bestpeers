import React, { useState } from 'react';

const ProductSidebar = ({ applyFilters }) => {
  const categories = ['Fashion', 'Electronics', 'Sports'];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const apply = () => {
    applyFilters({
      search,
      category,
      minPrice,
      maxPrice,
      page: 1,
      limit: 20,
    });
  };

  const clear = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');

    applyFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      page: 1,
      limit: 20,
    });
  };

  return (
    <div className="w-64 mt-6 rounded-xl bg-white shadow-md p-4 h-screen sticky top-20">

      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="font-medium">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="font-medium">Price Range</label>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-2 border rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={apply}
        className="w-full bg-blue-500 text-white p-2 rounded-lg mb-3"
      >
        Apply
      </button>

      <button
        onClick={clear}
        className="w-full bg-gray-300 p-2 rounded-lg"
      >
        Clear
      </button>

    </div>
  );
};

export default ProductSidebar;
