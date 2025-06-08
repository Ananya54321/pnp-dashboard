import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BarChart3 } from 'lucide-react'
import { Creator } from '@/types/dashboard'

interface PerformanceLeaderboardProps {
  creators: Creator[]
}

export const PerformanceLeaderboard: React.FC<PerformanceLeaderboardProps> = ({ creators }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <BarChart3 className="w-5 h-5 mr-2 text-yellow-600" />
              Performance Leaderboard
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Leading creators by engagement metrics
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/creators'}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {creators.slice(0, 5).map((creator, index) => (
          <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black dark:bg-gray-600 dark:text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={creator.avatar} alt={creator.creatorName} />
                  <AvatarFallback className="text-xs">{creator.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{creator.creatorName}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{creator.brandName}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-right">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{creator.openRate}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Open Rate</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {Math.round(creator.openRate * 0.65)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">CTR</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
