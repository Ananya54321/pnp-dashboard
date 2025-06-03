import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Calendar,
  MessageCircle
} from 'lucide-react'

interface User {
  subscriberCount: number
  openRate: number
  frequency: string
  discordUsername: string
}

interface QuickStatsProps {
  user: User
}

export const QuickStats: React.FC<QuickStatsProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.subscriberCount.toLocaleString()}</div>
          <p className="text-xs text-green-600 dark:text-green-400">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Rate</CardTitle>
          <Mail className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.openRate}%</div>
          <p className="text-xs text-green-600 dark:text-green-400">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            +2.3% from last week
          </p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Frequency</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{user.frequency}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Newsletter schedule
          </p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Discord</CardTitle>
          <MessageCircle className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{user.discordUsername}</div>
          <p className="text-xs text-green-600 dark:text-green-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Connected
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
