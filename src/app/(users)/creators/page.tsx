'use client'

import React, { useState } from 'react'
import { CreatorsHeader } from '@/components/pages/creators/CreatorsHeader'
import { SearchAndQuickFilters } from '@/components/pages/creators/SearchAndQuickFilters'
import { AdvancedFilters } from '@/components/pages/creators/AdvancedFilters'
import { CreatorsTable } from '@/components/pages/creators/CreatorsTable'
import { LoadingState, ErrorState } from '@/components/pages/creators/LoadingAndErrorStates'
import { useCreatorsData } from '@/hooks/useCreatorsData'

const CreatorsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const {
    filteredData,
    loading,
    error,
    filters,
    updateFilters,
    handleSort,
    refetch
  } = useCreatorsData();

  const toggleExpandRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <CreatorsHeader 
          totalCreators={filteredData.length}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
        
        <SearchAndQuickFilters 
          filters={filters}
          onFiltersChange={updateFilters}
        />
        
        <AdvancedFilters 
          filters={filters}
          onFiltersChange={updateFilters}
          show={showFilters}
        />
        
        <CreatorsTable 
          creators={filteredData}
          sortBy={filters.sortBy}
          sortDirection={filters.sortDirection}
                    expandedRow={expandedRow}
          onSort={handleSort}
          onToggleExpand={toggleExpandRow}
        />
      </div>
    </div>
  )
}

export default CreatorsPage
