'use client'

import { Card, CardContent } from "@/components/ui/card"
import { TableHeader } from "./TableHeader"
import { CreatorRow } from "./CreatorRow"
import { Users } from "lucide-react"
import { Creator, SortDirection } from "./types"

interface CreatorsTableProps {
  creators: Creator[];
  sortBy: string;
  sortDirection: SortDirection;
  expandedRow: string | null;
  onSort: (field: string) => void;
  onToggleExpand: (id: string) => void;
}

export const CreatorsTable = ({ 
  creators, 
  sortBy, 
  sortDirection, 
  expandedRow, 
  onSort, 
  onToggleExpand 
}: CreatorsTableProps) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader 
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {creators.map((creator) => (
                <CreatorRow
                  key={creator._id}
                  creator={creator}
                  isExpanded={expandedRow === creator._id}
                  onToggleExpand={onToggleExpand}
                />
              ))}
            </tbody>
          </table>
          
          {creators.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No creators found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
