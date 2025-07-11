import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, Mail, Calendar, FileText } from 'lucide-react'
import { User } from '@/types/dashboard'

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
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Click Through Rate</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.clickThroughRate}%</div>
          <p className="text-xs text-red-600 dark:text-red-400">
            -0.5% from last week
          </p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Newsletter Analysis</CardTitle>
          <FileText className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
        </CardHeader>
        <CardContent>
          <a 
            href="https://evaluateyournl.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              Evaluate your newsletter →
            </div>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}


