import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, Heart } from 'lucide-react'

interface Newsletter {
  id: string
  title: string
  creatorName: string
  brandName: string
  publishedAt: string
  readTime: string
  subscriberCount: number
  category: string
  niche: string
}

interface NewsletterFeedProps {
  newsletters: Newsletter[]
  currentUserNiche: string
}

export const NewsletterFeed: React.FC<NewsletterFeedProps> = ({ newsletters, currentUserNiche }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <BookOpen className="w-5 h-5 mr-2 text-green-600" />
              Latest {currentUserNiche} Newsletters
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Latest newsletters from your niche
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/creators'}
            className="flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>View All Newsletters</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter) => (
            <div key={newsletter.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{newsletter.creatorName}</h4>
                      {newsletter.category === 'Featured' && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{newsletter.brandName}</p>
                  </div>
                </div>
                <Badge 
                  variant={newsletter.category === 'Featured' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {newsletter.category}
                </Badge>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                  {newsletter.title}
                </h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subscribers</span>
                  <span className="font-medium text-gray-900 dark:text-white">{newsletter.subscriberCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Read Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">{newsletter.readTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Niche</span>
                  <Badge variant="outline" className="text-xs">{newsletter.niche}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Published</span>
                  <span className="text-xs text-green-600 dark:text-green-400">{newsletter.publishedAt}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Read
                </Button>
                <Button size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
