import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const closeSearch = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleIconClick = () => {
    setIsOpen((open) => !open);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      onSearch?.();
    }
  };

  return (
    <form className={`search-bar ${isOpen ? 'is-open' : ''}`} onSubmit={handleSearchSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (!searchQuery) setIsOpen(false); }}
        className="search-input-expand"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
      />
      <button type="button" className="search-icon-btn" onClick={handleIconClick} aria-label={isOpen ? 'Close search' : 'Search'}>
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
