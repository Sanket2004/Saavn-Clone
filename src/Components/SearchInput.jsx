import React from 'react'

function SearchInput({ value, onChange }) {
  return (
    <input
    className='h-12 w-full border border-2 rounded-md text-black focus:outline px-2 bg-gray-50 placeholder:text-gray-400'
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter song name"
    />
  );
}

export default SearchInput
