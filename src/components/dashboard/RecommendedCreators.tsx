import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Target, Filter, MessageCircle, UserPlus } from 'lucide-react'
import { Creator } from '@/types/dashboard'

interface RecommendedCreatorsProps {
  creators: Creator[]
}

export const RecommendedCreators: React.FC<RecommendedCreatorsProps> = ({ creators }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Recommended Creators
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Creators with similar audience size (±5k subscribers)
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {creators.map((creator) => (
          <div key={creator.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-0">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={creator.avatar} alt={creator.creatorName} />
                  <AvatarFallback>{creator.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {creator.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{creator.creatorName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{creator.brandName}</p>
                <div className="flex items-center space-x-2 mt-1 flex-wrap">
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    {creator.subscriberCount.toLocaleString()} subs
                  </Badge>
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    {creator.openRate}% open rate
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize whitespace-nowrap">
                    {creator.frequency}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0 ml-4">
              <Button size="sm" variant="outline" className="px-3 py-1 text-xs">
                <MessageCircle className="w-3 h-3 mr-1" />
                Chat
              </Button>
              <Button size="sm" className="px-3 py-1 text-xs">
                <UserPlus className="w-3 h-3 mr-1" />
                Partner
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
