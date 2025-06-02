'use client'

import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Copy,
  Eye
} from "lucide-react"
import { Creator } from "./types"

interface CreatorRowProps {
  creator: Creator;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

export const CreatorRow = ({ creator, isExpanded, onToggleExpand }: CreatorRowProps) => {
  const router = useRouter()
  
  const getFrequencyColor = (frequency: string | undefined) => {
    const colors = {
      daily: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      weekly: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'bi-weekly': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      monthly: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return colors[(frequency || 'unknown') as keyof typeof colors] || colors.other;
  };

  const getSubscriberTier = (count: number | undefined) => {
    const safeCount = count || 0;
    if (safeCount >= 100000) return { tier: 'Elite', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' };
    if (safeCount >= 50000) return { tier: 'Premium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' };
    if (safeCount >= 10000) return { tier: 'Pro', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' };
    if (safeCount >= 1000) return { tier: 'Growing', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' };
    return { tier: 'Starter', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' };
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const copyToClipboard = (text: string | undefined) => {
    if (!text) {
      toast.error('Nothing to copy');
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const subscriberTier = getSubscriberTier(creator.subscriberCount);

  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="px-6 py-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900 dark:text-white">
                {creator.creatorName || 'N/A'}
              </p>
              <Badge className={subscriberTier.color}>
                {subscriberTier.tier}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {creator.brandName || 'N/A'}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <Mail className="w-3 h-3" />
              {creator.email || 'N/A'}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {creator.niche || 'N/A'}
            </Badge>
            <div>
              <Badge className={getFrequencyColor(creator.frequency)}>
                {creator.frequency || 'N/A'}
              </Badge>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {(creator.subscriberCount || 0).toLocaleString()}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {creator.openRate || 0}%
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            {formatDate(creator.createdAt)}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => router.push(`/creators/${creator._id}`)}
              title="View Creator Details"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggleExpand(creator._id)}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            {creator.userLink && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(creator.userLink, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="bg-gray-50 dark:bg-gray-800">
          <td colSpan={6} className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {creator.email || 'N/A'}
                      </span>
                      {creator.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(creator.email)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Discord:</span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {creator.discordUsername || 'N/A'}
                      </span>
                      {creator.discordUsername && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(creator.discordUsername)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    {creator.userLink && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Website:</span>
                        <a
                          href={creator.userLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-mono break-all"
                        >
                          {creator.userLink}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Ad Copy
                  </h4>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {creator.adCopy || 'No ad copy provided'}
                    </p>
                  </div>
                </div>
                
                {creator.specialInstructions && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Special Instructions
                    </h4>
                    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {creator.specialInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
