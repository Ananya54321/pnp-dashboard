// Global types and interfaces for creator-related functionality
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

// Creator interface with all required fields for detail views
export interface CreatorDetail {
  _id: string;
  creatorName: string;
  brandName: string;
  niche: string;
  subscriberCount: number;
  openRate: number;
  userLink: string;
  adCopy: string;
  email: string;
  discordUsername: string;
  frequency: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

// API Response interfaces
export interface CreatorsListResponse {
  success: boolean;
  creators: Creator[];
  message?: string;
}

export interface CreatorDetailResponse {
  success: boolean;
  creator: CreatorDetail;
  message?: string;
}

// Generic API response for flexibility
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

// Filtering and sorting types
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

// Tier and performance level types
export interface SubscriberTier {
  tier: 'Starter' | 'Growing' | 'Pro' | 'Premium' | 'Elite';
  color: string;
  icon?: string;
}

export interface PerformanceLevel {
  level: 'Needs Improvement' | 'Average' | 'Good' | 'Very Good' | 'Excellent';
  color: string;
}

// Creator row component props
export interface CreatorRowProps {
  creator: Creator;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

// Common frequency types
export type FrequencyType = 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'other';

// Utility type for frequency colors
export interface FrequencyColorMap {
  daily: string;
  weekly: string;
  'bi-weekly': string;
  monthly: string;
  other: string;
}
