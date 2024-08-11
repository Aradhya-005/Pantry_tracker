import React from 'react'
import SearchBar from '../components/SearchBar'
import AddItemForm from '../components/AddItemForm';

const page = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement your search logic here
  };
  return (
   <>
    <SearchBar placeholder="Search..." onSearch={handleSearch} />
    <AddItemForm/>
   </>
  )
}

export default page