'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FilterState } from "./types"

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (updates: Partial<FilterState>) => void;
  show: boolean;
}

export const AdvancedFilters = ({ filters, onFiltersChange, show }: AdvancedFiltersProps) => {
  if (!show) return null;

  return (
    <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 dark:text-white">Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Min Subscribers
            </label>
            <Input
              type="number"
              value={filters.subscriberCount.min}
              onChange={(e) => onFiltersChange({
                subscriberCount: { ...filters.subscriberCount, min: Number(e.target.value) || 0 }
              })}
              className="dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max Subscribers
            </label>
            <Input
              type="number"
              value={filters.subscriberCount.max === Infinity ? '' : filters.subscriberCount.max}
              onChange={(e) => onFiltersChange({
                subscriberCount: { ...filters.subscriberCount, max: Number(e.target.value) || Infinity }
              })}
              className="dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Min Open Rate (%)
            </label>
            <Input
              type="number"
              value={filters.openRate.min}
              onChange={(e) => onFiltersChange({
                openRate: { ...filters.openRate, min: Number(e.target.value) || 0 }
              })}
              className="dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max Open Rate (%)
            </label>
            <Input
              type="number"
              value={filters.openRate.max}
              onChange={(e) => onFiltersChange({
                openRate: { ...filters.openRate, max: Number(e.target.value) || 100 }
              })}
              className="dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
