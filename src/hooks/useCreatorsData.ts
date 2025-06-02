'use client'

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Creator, ApiResponse, FilterState } from '../components/pages/creators/types';

export const useCreatorsData = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [filteredData, setFilteredData] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    subscriberCount: { min: 0, max: Infinity },
    openRate: { min: 0, max: 100 },
    niche: '',
    frequency: '',
    searchTerm: '',
    sortBy: 'subscriberCount',
    sortDirection: 'desc'
  });

  // Fetch creators data
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3004/all-creators');
        const result = await response.json();
        
        if (result.success) {
          setData(result);
          setFilteredData(result.creators);
          
          // Set filter ranges based on actual data
          const maxSubscribers = Math.max(...result.creators.map((creator: Creator) => creator.subscriberCount || 0), 0);
          const maxOpenRate = Math.max(...result.creators.map((creator: Creator) => creator.openRate || 0), 0);
          
          setFilters(prev => ({
            ...prev,
            subscriberCount: { min: 0, max: maxSubscribers },
            openRate: { min: 0, max: maxOpenRate }
          }));
        } else {
          setError(result.message || 'Failed to fetch creators');
          toast.error('Failed to fetch creators data');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Network error. Please check your connection.');
        setLoading(false);
        toast.error('Failed to fetch creators data');
        console.error(err);
      }
    };
    
    fetchCreators();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    if (!data || !data.creators) return;
    
    let filtered = [...data.creators];
    
    // Filter by subscriber count
    filtered = filtered.filter(creator => 
      (creator.subscriberCount || 0) >= filters.subscriberCount.min && 
      (creator.subscriberCount || 0) <= filters.subscriberCount.max
    );
    
    // Filter by open rate
    filtered = filtered.filter(creator => 
      (creator.openRate || 0) >= filters.openRate.min && 
      (creator.openRate || 0) <= filters.openRate.max
    );
    
    // Filter by niche
    if (filters.niche) {
      filtered = filtered.filter(creator => 
        (creator.niche?.toLowerCase() || '').includes(filters.niche.toLowerCase())
      );
    }
    
    // Filter by frequency
    if (filters.frequency) {
      filtered = filtered.filter(creator => 
        creator.frequency === filters.frequency
      );
    }
    
    // Filter by search term (searches in creator name, brand name, and email)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(creator => 
        (creator.creatorName?.toLowerCase() || '').includes(searchLower) ||
        (creator.brandName?.toLowerCase() || '').includes(searchLower) ||
        (creator.email?.toLowerCase() || '').includes(searchLower)
      );
    }
    
    // Sort the data
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Creator];
      const bValue = b[filters.sortBy as keyof Creator];
      
      // Handle date comparison
      if (typeof aValue === 'string' && typeof bValue === 'string' && 
          (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt')) {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        
        return filters.sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      
      // Handle numerical comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // String comparison
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      return filters.sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    
    setFilteredData(filtered);
  }, [filters, data]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleSort = (field: string) => {
    if (filters.sortBy === field) {
      setFilters(prev => ({
        ...prev,
        sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        sortBy: field,
        sortDirection: 'desc'
      }));
    }
  };

  return {
    data,
    filteredData,
    loading,
    error,
    filters,
    updateFilters,
    handleSort,
    refetch: () => window.location.reload()
  };
};
