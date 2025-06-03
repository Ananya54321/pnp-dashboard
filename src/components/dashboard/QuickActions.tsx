import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Zap, Calendar, Users } from 'lucide-react'

export const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Analytics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">View detailed performance metrics</p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Create Campaign</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Start a new collaboration</p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Schedule</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manage your content calendar</p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Community</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Join creator discussions</p>
        </CardContent>
      </Card>
    </div>
  )
}
