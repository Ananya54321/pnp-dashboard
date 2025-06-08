'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface CreatorsHeaderProps {
  totalCreators: number;
  onToggleFilters: () => void;
}

export const CreatorsHeader = ({ totalCreators, onToggleFilters }: CreatorsHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Newsletter Creators
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and discover all newsletter creators on the platform
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-sm">
          {totalCreators} creators found
        </Badge>
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>
    </div>
  );
};
