"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from './ui/button'
import { Toaster } from 'sonner'
import { toast } from 'sonner'

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

const DisplayData = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://pickandpartner-94sz.onrender.com/get-info");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        console.log(err)
        setLoading(false);
        toast.error("Failed to fetch URL data");
      }
    };
    
    fetchData();
  }, []);
  
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !data?.success) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-800">Error fetching data</h3>
        <p className="text-red-600">{error || "Unknown error"}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">URL Analytics</h2>
      
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unique Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.urlData.map((url) => (
              <React.Fragment key={url._id}>
                <tr className={`hover:bg-gray-50 ${expandedRow === url._id ? "bg-blue-50" : ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900">
                        {url.shortId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-500 truncate" title={url.originalUrl}>
                      {url.originalUrl}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {url.totalClicks}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {url.uniqueClicks}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                    <td colSpan={6} className="bg-gray-50 px-6 py-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Visitor Information</h4>
                          {url.visitorDetails.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {url.visitorDetails.map((visitor) => (
                                <div key={visitor._id} className="bg-white p-2 rounded-md shadow-sm text-sm border">
                                  <p>ID: {visitor.visitorId.substring(0, 10)}...</p>
                                  <p>Location: {visitor.city || "Unknown"}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No visitor data available</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm">Created</h4>
                            <p className="text-sm text-gray-600">{formatDate(url.createdAt)}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Last Updated</h4>
                            <p className="text-sm text-gray-600">{formatDate(url.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default DisplayData;