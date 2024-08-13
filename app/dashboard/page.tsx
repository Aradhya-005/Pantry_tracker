
import React from 'react';
import AddItemForm from '../components/AddItemForm';
import '../css/SearchBar.css'
import SearchBar from '../components/SearchBar';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const DashboardPage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div>
      
      <SearchBar placeholder="Search..." onSearch={handleSearch} />
      <AddItemForm/>
    </div>
  );
};

export default DashboardPage;
