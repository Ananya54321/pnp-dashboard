import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen dark:bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {children}
      </div>
    </div>
  )
}
