import React from 'react';
import './Filters.scss';

export default function Filters({ sortOption, setSortOption, priceFilter, setPriceFilter }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Default</option>
          <option value="az">Name (A–Z)</option>
          <option value="za">Name (Z–A)</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="price">Price range</label>
        <select id="price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">All</option>
          <option value="0-100">$0 – $100</option>
          <option value="100-200">$100 – $200</option>
          <option value="200+">$200+</option>
        </select>
      </div>
    </div>
  );
}
