import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface User {
  adCopy: string
  specialInstructions?: string
  userLink: string
}

interface CreatorProfileSummaryProps {
  user: User
}

export const CreatorProfileSummary: React.FC<CreatorProfileSummaryProps> = ({ user }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900 dark:text-white">
          <Star className="w-5 h-5 mr-2 text-yellow-600" />
          Your Creator Profile
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Your public profile information for collaborations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ad Copy</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {user.adCopy}
          </p>
        </div>
        
        {user.specialInstructions && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Special Instructions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {user.specialInstructions}
            </p>
          </div>
        )}
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Newsletter Link</h4>
          <a 
            href={user.userLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {user.userLink}
          </a>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            Edit Profile
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Preview Public Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
