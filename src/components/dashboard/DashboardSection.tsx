import React from 'react'

interface DashboardSectionProps {
  children: React.ReactNode
  className?: string
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}>
      {children}
    </div>
  )
}
