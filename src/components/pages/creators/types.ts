export interface Creator {
  _id: string;
  creatorName?: string;
  brandName?: string;
  niche?: string;
  subscriberCount?: number;
  openRate?: number;
  userLink?: string;
  adCopy?: string;
  email?: string;
  discordUsername?: string;
  frequency?: string;
  specialInstructions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse {
  success: boolean;
  creators: Creator[];
  message?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  subscriberCount: {
    min: number;
    max: number;
  };
  openRate: {
    min: number;
    max: number;
  };
  niche: string;
  frequency: string;
  searchTerm: string;
  sortBy: string;
  sortDirection: SortDirection;
}
