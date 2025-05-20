'use client'
import React from 'react'
import DisplayData from '@/components/displayData'
import ShortenURL from "@/components/shortenURL"
import AuthCheck from "@/components/authCheck"
import { Toaster } from 'sonner'

const page = () => {
  // This would typically be stored in an environment variable or configuration
  // For production, NEVER hardcode secrets in your components
  const secretAccessCode = "$2b$12$UxSe7NS6oLF.61vH8jfTSOE0liHmlgcKa/K.JJWy0eZJ4AZhXTGR2";
  
  return (
    <>
      <Toaster position="top-right" />
      <AuthCheck secretCode={secretAccessCode}>
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
      </AuthCheck>
    </>
  )
}

export default page
