import React from "react";
import "./Search.scss";

export default function Search({ searchInput, setSearchInput }) {
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-wrapper" role="search" aria-label="City or hotel name">
      <input
        id="hotelSearch"
        type="text"
        placeholder="City or Hotel name"
        className="search-input"
        aria-label="Search for city or hotel name"
        onChange={handleSearch}
        value={searchInput}
      />
      <span className="search-icon" aria-hidden="true">🔍</span>
    </div>
  );
}
