import React from 'react';
import './Filters.scss';

export default function Filters({
  sortOption,
  setSortOption,
  priceFilter,
  setPriceFilter,
  selectedCity,
  setSelectedCity,
  memberOnly,
  setMemberOnly,
  minRating,
  setMinRating,
  availableCities
}) {
  return (
    <div className="filtersPanel">
      <div className="filterGroup">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Select</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="filterGroup">
        <label htmlFor="price-select">Price Range:</label>
        <select
          id="price-select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </select>
      </div>

      <div className="filterGroup">
        <label htmlFor="city-select">City:</label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="filterGroup checkboxGroup">
        <label htmlFor="member-only">Member Rate Only</label>
        <input
          type="checkbox"
          id="member-only"
          checked={memberOnly}
          onChange={(e) => setMemberOnly(e.target.checked)}
        />
      </div>

      <div className="filterGroup">
        <label htmlFor="min-rating">Minimum Rating:</label>
        <input
          id="min-rating"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          placeholder="e.g. 7.5"
        />
      </div>
    </div>
  );
}
