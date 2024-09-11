import React, { useEffect, useRef } from "react";
import "../style/Style.css";
import search from "../assets/search.svg";

export default function SearchBar({
  handleSearchChange,
  handleSearch,
  error,
  location,
  recentSearches,
  showDropdown,
  setShowDropdown,
  handleRecentSearchClick,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    // Hide dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-container" ref={searchRef}>
        <div className="search-city">
          <input
            type="text"
            placeholder="Search city..."
            className="search-bar"
            value={location}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onClick={() => setShowDropdown(true)} // Show dropdown when clicked
          />
          <button onClick={handleSearch} className="search-button">
            <img src={search} alt="" />
          </button>
          {showDropdown && recentSearches.length > 0 && (
            <div className="dropdown">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    handleRecentSearchClick(search);
                    setShowDropdown(false); // Hide dropdown after clicking recent search
                  }}
                >
                  {search}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
