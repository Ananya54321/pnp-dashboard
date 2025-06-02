'use client'

import { Button } from "@/components/ui/button"
import { SortAsc, SortDesc } from "lucide-react"
import { SortDirection } from "./types"

interface TableHeaderProps {
  sortBy: string;
  sortDirection: SortDirection;
  onSort: (field: string) => void;
}

export const TableHeader = ({ sortBy, sortDirection, onSort }: TableHeaderProps) => {
  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className="h-auto p-0 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {children}
      {sortBy === field && (
        sortDirection === 'asc' ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
      )}
    </Button>
  );

  return (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <tr>
        <th className="px-6 py-3 text-left">
          <SortButton field="creatorName">
            Creator Info
          </SortButton>
        </th>
        <th className="px-6 py-3 text-left">
          <SortButton field="niche">
            Niche & Frequency
          </SortButton>
        </th>
        <th className="px-6 py-3 text-left">
          <SortButton field="subscriberCount">
            Audience
          </SortButton>
        </th>
        <th className="px-6 py-3 text-left">
          <SortButton field="openRate">
            Performance
          </SortButton>
        </th>
        <th className="px-6 py-3 text-left">
          <SortButton field="createdAt">
            Joined
          </SortButton>
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
          Actions
        </th>
      </tr>
    </thead>
  );
};
