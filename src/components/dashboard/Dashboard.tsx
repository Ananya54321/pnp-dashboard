import React from 'react'
import { WelcomeHeader } from './WelcomeHeader'
import { QuickStats } from './index'
import { CreatorProfileSummary } from './CreatorProfileSummary'
import { RecommendedCreators } from './RecommendedCreators'
import { NewsletterFeed } from './NewsletterFeed'
import { PopularCreators } from './PopularCreators'
import { QuickActions } from './QuickActions'

export interface User {
  id: string
  creatorName: string
  brandName: string
  email: string
  avatar: string
  subscriberCount: number
  niche: string
  openRate: number
  clickThroughRate: number
  userLink: string
  adCopy: string
  discordUsername: string
  frequency: string
  specialInstructions?: string
  joinedDate: string
}

export interface Creator {
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
  isOnline: boolean
}

export interface PopularCreator extends Creator {
  isVerified: boolean
  lastActive: string
}

export interface Newsletter {
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

interface DashboardProps {
  currentUser: User
  nearbyCreators: Creator[]
  nicheNewsletters: Newsletter[]
  popularCreators: PopularCreator[]
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  nearbyCreators,
  nicheNewsletters,
  popularCreators
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <WelcomeHeader user={currentUser} />

        {/* Quick Stats */}
        <QuickStats user={currentUser} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Creator Profile Summary */}
          <CreatorProfileSummary user={currentUser} />
          
          {/* Creator Recommendations */}
          <RecommendedCreators creators={nearbyCreators} />
        </div>

        {/* Newsletter Feed */}
        <NewsletterFeed 
          newsletters={nicheNewsletters} 
          currentUserNiche={currentUser.niche} 
        />

        {/* Popular Creators Section */}
        <PopularCreators creators={popularCreators} />

        {/* Quick Actions */}
        <QuickActions />

      </div>
    </div>
  )
}
