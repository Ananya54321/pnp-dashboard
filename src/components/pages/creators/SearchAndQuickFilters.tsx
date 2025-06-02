'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { FilterState } from "./types"

interface SearchAndQuickFiltersProps {
  filters: FilterState;
  onFiltersChange: (updates: Partial<FilterState>) => void;
}

export const SearchAndQuickFilters = ({ filters, onFiltersChange }: SearchAndQuickFiltersProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search creators, brands, or emails..."
                value={filters.searchTerm}
                onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
                className="pl-10 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filters.frequency}
              onChange={(e) => onFiltersChange({ frequency: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Frequencies</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="other">Other</option>
            </select>
            
            <Input
              placeholder="Filter by niche"
              value={filters.niche}
              onChange={(e) => onFiltersChange({ niche: e.target.value })}
              className="w-40 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
