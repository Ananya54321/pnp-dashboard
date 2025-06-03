import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Award, Star, MessageCircle, Heart } from 'lucide-react'

interface PopularCreator {
  id: string
  creatorName: string
  brandName: string
  avatar: string
  subscriberCount: number
  niche: string
  openRate: number
  userLink: string
  discordUsername: string
  frequency: string
  isVerified: boolean
  lastActive: string
}

interface PopularCreatorsProps {
  creators: PopularCreator[]
}

export const PopularCreators: React.FC<PopularCreatorsProps> = ({ creators }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Award className="w-5 h-5 mr-2 text-yellow-600" />
          Popular Newsletter Creators
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Top creators you can interact with and learn from
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div key={creator.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={creator.avatar} alt={creator.creatorName} />
                    <AvatarFallback>{creator.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{creator.creatorName}</h4>
                      {creator.isVerified && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{creator.brandName}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subscribers</span>
                  <span className="font-medium text-gray-900 dark:text-white">{creator.subscriberCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Open Rate</span>
                  <span className="font-medium text-gray-900 dark:text-white">{creator.openRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Niche</span>
                  <Badge variant="outline" className="text-xs">{creator.niche}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Frequency</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{creator.frequency}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Active</span>
                  <span className="text-xs text-green-600 dark:text-green-400">{creator.lastActive}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-1" />
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
