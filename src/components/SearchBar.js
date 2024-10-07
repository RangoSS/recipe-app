import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar mb-4">
      <input
        type="text"
        placeholder="Search by recipe name or category..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>
  );
};

export default SearchBar;
