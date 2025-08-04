'use client'
import React from 'react'
import { useState } from 'react';
import { tools } from '../constants/ToolsData.jsx';

const SearchBar = () => {
   
  const [query, setQuery] = useState("");  

  const filteredTools = tools.filter((tool)=>{
    tool.name.toLowerCase().includes(query.toLowerCase());
  })
   return (
    <div className='max-w-5xl mx-auto p-4'>
      <input
        type="text"
        placeholder="Search tools…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-3 border border-[#0D00FF] rounded-md mb-6'
      />

    </div>
  )
}

export default SearchBar