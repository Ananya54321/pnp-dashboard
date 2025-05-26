"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { Input } from '../../ui/input'

interface VisitorDetail {
  visitorId: string;
  city: string;
  _id: string;
}

interface URLData {
  _id: string;
  shortId: string;
  originalUrl: string;
  totalClicks: number;
  uniqueClicks: number;
  visitorDetails: VisitorDetail[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  urlData: URLData[];
}

// Filter type definitions
type SortDirection = 'asc' | 'desc';

interface FilterState {
  totalClicks: {
    min: number;
    max: number;
  };
  uniqueClicks: {
    min: number;
    max: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: string;
  sortDirection: SortDirection;
}

const DisplayData = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [filteredData, setFilteredData] = useState<URLData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    totalClicks: { min: 0, max: Infinity },
    uniqueClicks: { min: 0, max: Infinity },
    dateRange: { start: '', end: '' },
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://pickandpartner-94sz.onrender.com/get-info");
        setData(response.data);
        
        // Initialize filteredData with all data initially
        if (response.data && response.data.success) {
          setFilteredData(response.data.urlData);
          
          // Set default max values based on actual data
          const maxTotalClicks = Math.max(...response.data.urlData.map((url: URLData) => url.totalClicks), 0);
          const maxUniqueClicks = Math.max(...response.data.urlData.map((url: URLData) => url.uniqueClicks), 0);
          
          const dates = response.data.urlData.map((url: URLData) => new Date(url.createdAt).getTime());
          const minDate = dates.length ? new Date(Math.min(...dates)).toISOString().split('T')[0] : '';
          const maxDate = dates.length ? new Date(Math.max(...dates)).toISOString().split('T')[0] : '';
          
          setFilters(prev => ({
            ...prev,
            totalClicks: { min: 0, max: maxTotalClicks },
            uniqueClicks: { min: 0, max: maxUniqueClicks },
            dateRange: { start: minDate, end: maxDate }
          }));
        }
        
        setLoading(false);
      } catch (err: unknown) {
        setError("Failed to fetch data");
        setLoading(false);
        console.log(err);
        toast.error("Failed to fetch URL data");
      }
    };
    
    fetchData();
  }, []);
  
  // Apply filters whenever filters change
  useEffect(() => {
    if (!data || !data.urlData) return;
    
    let filtered = [...data.urlData];
    
    // Filter by total clicks
    filtered = filtered.filter(url => 
      url.totalClicks >= filters.totalClicks.min && 
      url.totalClicks <= filters.totalClicks.max
    );
    
    // Filter by unique clicks
    filtered = filtered.filter(url => 
      url.uniqueClicks >= filters.uniqueClicks.min && 
      url.uniqueClicks <= filters.uniqueClicks.max
    );
    
    // Filter by date range
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start).getTime();
      filtered = filtered.filter(url => 
        new Date(url.createdAt).getTime() >= startDate
      );
    }
    
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end).getTime() + (24 * 60 * 60 * 1000 - 1); // End of the selected day
      filtered = filtered.filter(url => 
        new Date(url.createdAt).getTime() <= endDate
      );
    }
    
    // Sort the data
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof URLData];
      const bValue = b[filters.sortBy as keyof URLData];
      
      // Handle date comparison
      if (typeof aValue === 'string' && typeof bValue === 'string' && 
          (filters.sortBy === 'createdAt' || filters.sortBy === 'updatedAt')) {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        
        if (filters.sortDirection === 'asc') {
          return aTime - bTime;
        } else {
          return bTime - aTime;
        }
      }
      
      // Handle numerical comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (filters.sortDirection === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
      
      // For other types, use string comparison as fallback
      const aStr = String(aValue);
      const bStr = String(bValue);
      
      if (filters.sortDirection === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
    
    setFilteredData(filtered);
  }, [filters, data]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  
  const toggleExpandRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };
  
  const handleFilterChange = (filterType: keyof FilterState, field: string, value: string | number) => {
    if (filterType === 'totalClicks' || filterType === 'uniqueClicks' || filterType === 'dateRange') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [filterType]: {
          ...prevFilters[filterType],
          [field]: value
        }
      }));
    }
  };
  
  const clearFilters = () => {
    if (data && data.urlData.length > 0) {
      const maxTotalClicks = Math.max(...data.urlData.map((url) => url.totalClicks), 0);
      const maxUniqueClicks = Math.max(...data.urlData.map((url) => url.uniqueClicks), 0);
      
      const dates = data.urlData.map((url) => new Date(url.createdAt).getTime());
      const minDate = dates.length ? new Date(Math.min(...dates)).toISOString().split('T')[0] : '';
      const maxDate = dates.length ? new Date(Math.max(...dates)).toISOString().split('T')[0] : '';
      
      setFilters({
        totalClicks: { min: 0, max: maxTotalClicks },
        uniqueClicks: { min: 0, max: maxUniqueClicks },
        dateRange: { start: minDate, end: maxDate },
        sortBy: 'createdAt',
        sortDirection: 'desc'
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }
  
  if (error || !data?.success) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-400">Error fetching data</h3>
        <p className="text-red-600 dark:text-red-400">{error || "Unknown error"}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">URL Analytics</h2>
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Total Clicks</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Min</label>
                  <Input 
                    type="number"
                    min="0"
                    value={filters.totalClicks.min}
                    onChange={(e) => handleFilterChange('totalClicks', 'min', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Max</label>
                  <Input 
                    type="number"
                    min="0"
                    value={filters.totalClicks.max === Infinity ? '' : filters.totalClicks.max}
                    onChange={(e) => handleFilterChange('totalClicks', 'max', e.target.value ? parseInt(e.target.value) : Infinity)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Unique Clicks</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Min</label>
                  <Input 
                    type="number"
                    min="0"
                    value={filters.uniqueClicks.min}
                    onChange={(e) => handleFilterChange('uniqueClicks', 'min', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Max</label>
                  <Input 
                    type="number"
                    min="0"
                    value={filters.uniqueClicks.max === Infinity ? '' : filters.uniqueClicks.max}
                    onChange={(e) => handleFilterChange('uniqueClicks', 'max', e.target.value ? parseInt(e.target.value) : Infinity)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Created Date</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
                  <Input 
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleFilterChange('dateRange', 'start', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
                  <Input 
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleFilterChange('dateRange', 'end', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Sort By</h3>
              <div className="grid grid-cols-1 gap-2">
                <select 
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                >
                  <option value="totalClicks">Total Clicks</option>
                  <option value="uniqueClicks">Unique Clicks</option>
                  <option value="createdAt">Created Date</option>
                </select>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Sort Direction</h3>
              <div className="grid grid-cols-1 gap-2">
                <select 
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={filters.sortDirection}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortDirection: e.target.value as SortDirection }))}
                >
                  <option value="desc">Highest to Lowest</option>
                  <option value="asc">Lowest to Highest</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="secondary"
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredData.length} of {data.urlData.length} URLs
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Original URL
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setFilters(prev => ({
                  ...prev,
                  sortBy: 'totalClicks',
                  sortDirection: prev.sortBy === 'totalClicks' && prev.sortDirection === 'desc' ? 'asc' : 'desc'
                }))}
              >
                Total Clicks {filters.sortBy === 'totalClicks' && (filters.sortDirection === 'desc' ? '▼' : '▲')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setFilters(prev => ({
                  ...prev,
                  sortBy: 'uniqueClicks',
                  sortDirection: prev.sortBy === 'uniqueClicks' && prev.sortDirection === 'desc' ? 'asc' : 'desc'
                }))}
              >
                Unique Clicks {filters.sortBy === 'uniqueClicks' && (filters.sortDirection === 'desc' ? '▼' : '▲')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setFilters(prev => ({
                  ...prev,
                  sortBy: 'createdAt',
                  sortDirection: prev.sortBy === 'createdAt' && prev.sortDirection === 'desc' ? 'asc' : 'desc'
                }))}
              >
                Created Date {filters.sortBy === 'createdAt' && (filters.sortDirection === 'desc' ? '▼' : '▲')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.length > 0 ? (
              filteredData.map((url) => (
                <React.Fragment key={url._id}>
                  <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${expandedRow === url._id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {url.shortId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate" title={url.originalUrl}>
                        {url.originalUrl}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                        {url.totalClicks}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                        {url.uniqueClicks}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(url.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => copyToClipboard(`https://pickandpartner-94sz.onrender.com/${url.shortId}`)}
                      >
                        Copy URL
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => toggleExpandRow(url._id)} 
                      >
                        {expandedRow === url._id ? "Hide Details" : "View Details"}
                      </Button>
                    </td>
                  </tr>
                  {expandedRow === url._id && (
                    <tr>
                      <td colSpan={6} className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-white">Visitor Information</h4>
                            {url.visitorDetails.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {url.visitorDetails.map((visitor) => (
                                  <div key={visitor._id} className="bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm text-sm border border-gray-200 dark:border-gray-600">
                                    <p className="text-gray-900 dark:text-white">ID: {visitor.visitorId.substring(0, 10)}...</p>
                                    <p className="text-gray-600 dark:text-gray-400">Location: {visitor.city || "Unknown"}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 dark:text-gray-400">No visitor data available</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-900 dark:text-white">Created</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(url.createdAt)}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-900 dark:text-white">Last Updated</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(url.updatedAt)}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No URLs match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayData;