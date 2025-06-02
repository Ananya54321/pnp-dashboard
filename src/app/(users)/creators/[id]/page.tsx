'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Mail, 
  ExternalLink, 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Copy,
  Globe,
  Clock,
  FileText,
  Star,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'
import { CreatorDetail, CreatorDetailResponse } from '@/types/creators'

const CreatorDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const creatorId = params.id as string

  const [creator, setCreator] = useState<CreatorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCreator = async () => {
      if (!creatorId) return
      
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3004/creators/${creatorId}`)
        const result: CreatorDetailResponse = await response.json()
        
        if (result.success) {
          setCreator(result.creator)
        } else {
          setError(result.message || 'Creator not found')
          toast.error('Failed to fetch creator details')
        }
      } catch (err) {
        setError('Network error. Please check your connection.')
        toast.error('Failed to fetch creator details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [creatorId])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getFrequencyColor = (frequency: string) => {
    const colors = {
      daily: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      weekly: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'bi-weekly': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      monthly: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
    return colors[frequency as keyof typeof colors] || colors.other
  }

  const getSubscriberTier = (count: number) => {
    if (count >= 100000) return { tier: 'Elite', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400', icon: '👑' }
    if (count >= 50000) return { tier: 'Premium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: '⭐' }
    if (count >= 10000) return { tier: 'Pro', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', icon: '🚀' }
    if (count >= 1000) return { tier: 'Growing', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: '📈' }
    return { tier: 'Starter', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400', icon: '🌱' }
  }

  const getPerformanceLevel = (openRate: number) => {
    if (openRate >= 25) return { level: 'Excellent', color: 'text-green-600 dark:text-green-400' }
    if (openRate >= 20) return { level: 'Very Good', color: 'text-blue-600 dark:text-blue-400' }
    if (openRate >= 15) return { level: 'Good', color: 'text-yellow-600 dark:text-yellow-400' }
    if (openRate >= 10) return { level: 'Average', color: 'text-orange-600 dark:text-orange-400' }
    return { level: 'Needs Improvement', color: 'text-red-600 dark:text-red-400' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading creator details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error || 'Creator not found'}</p>
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const subscriberTier = getSubscriberTier(creator.subscriberCount)
  const performanceLevel = getPerformanceLevel(creator.openRate)

  return (
    <div className="min-h-screen dark:bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Creators
          </Button>
        </div>

        {/* Profile Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Sidebar - Profile Info */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Creator Profile Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {creator.creatorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {creator.creatorName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                    {creator.brandName}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge className={subscriberTier.color}>
                      {subscriberTier.icon} {subscriberTier.tier}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {creator.niche}
                    </Badge>
                  </div>
                  
                  {/* Ad Copy Section */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ad Copy</p>
                    </div>
                    <div className="text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {creator.adCopy}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Member Since Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</h3>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {formatDate(creator.createdAt)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {formatDate(creator.updatedAt)}
                </p>
              </CardContent>
            </Card>

           

          
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Statistics Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {creator.subscriberCount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
                      <p className="text-xs text-gray-400">{subscriberTier.tier} Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {creator.openRate}%
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Open Rate</p>
                      <p className={`text-xs ${performanceLevel.color}`}>{performanceLevel.level}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                        {creator.frequency}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Publishing Frequency</p>
                      <p className="text-xs text-gray-400">Newsletter Schedule</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Special Instructions (if exists) */}
            {creator.specialInstructions && (
              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Shield className="w-5 h-5" />
                    Special Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {creator.specialInstructions}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => copyToClipboard(creator.specialInstructions, 'Special instructions')}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Instructions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Contact Information Grid */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="font-medium text-gray-900 dark:text-white font-mono">
                              {creator.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(creator.email, 'Email')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Discord</p>
                            <p className="font-medium text-gray-900 dark:text-white font-mono">
                              {creator.discordUsername}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(creator.discordUsername, 'Discord username')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                            <p className="font-medium text-blue-600 dark:text-blue-400 break-all">
                              {creator.userLink}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(creator.userLink, 'Website URL')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(creator.userLink, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorDetailsPage
