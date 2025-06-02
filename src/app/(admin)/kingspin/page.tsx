'use client'
import React from 'react'
import DisplayData from '@/components/pages/kingspin/displayData'
import ShortenURL from "@/components/pages/kingspin/shortenURL"
import AuthCheck from "@/components/pages/kingspin/authCheck"
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
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">URL Shortener Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage shortened URLs</p>
          </header>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10 border border-gray-200 dark:border-gray-700">
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
