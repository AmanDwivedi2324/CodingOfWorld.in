import React from 'react'
import Header from './components/Header'
import LandingPageTop from './components/LandingPageTop'
import SearchBar from './components/SearchBar'
import { tools } from './constants/ToolsData'
import Card from './components/Card'

const page = () => {
  return (
    <div className='h-full'>
      <LandingPageTop />
      <SearchBar />
      <div className="px-5 py-3 mt-5 mb-5 space-y-2 max-w-7xl mx-auto grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-20 ">
          {tools.map((tool,id)=>{
            return <Card key={id} image={tool.image} title={tool.name} description={tool.description} link={tool.link} buttonText="Try Now" />
          })}
      </div>
    </div>
  )
}

export default page