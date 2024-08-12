// app/dashboard/page.tsx
"use client";
import React, { useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <SearchBar placeholder="Search..." onSearch={handleSearch} />
    </div>
  );
};

export default DashboardPage;
