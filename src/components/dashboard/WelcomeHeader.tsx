import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

interface User {
  id: string
  creatorName: string
  brandName: string
  email: string
  avatar: string
  subscriberCount: number
  niche: string
  frequency: string
}

interface WelcomeHeaderProps {
  user: User
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800">
            <AvatarImage src={user.avatar} alt={user.creatorName} />
            <AvatarFallback>{user.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.creatorName}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user.brandName} • {user.subscriberCount.toLocaleString()} subscribers
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {user.niche} • {user.frequency} newsletter
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Pro Creator
          </Badge>
        </div>
      </div>
    </div>
  )
}
