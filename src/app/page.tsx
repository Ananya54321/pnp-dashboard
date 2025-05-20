import React from 'react'
import DisplayData from '@/components/displayData'
import ShortenURL from "@/components/shortenURL"

const page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">URL Shortener Dashboard</h1>
        <p className="text-gray-600">Create and manage shortened URLs</p>
      </header>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <ShortenURL />
      </div>
      
      <section>
        <DisplayData />
      </section>
    </div>
  )
}

export default page
