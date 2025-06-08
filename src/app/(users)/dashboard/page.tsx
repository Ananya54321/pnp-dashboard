'use client'
import React from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { QuickStats } from '@/components/dashboard'
import { RecommendedCreators } from '@/components/dashboard/RecommendedCreators'
import { PerformanceLeaderboard } from '@/components/dashboard/PerformanceLeaderboard'
import { PopularCreators } from '@/components/dashboard/PopularCreators'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { currentUser, nearbyCreators, popularCreators } from '@/constants/dashboardData'

const Page = () => {
  return (
    <DashboardLayout>
      <QuickStats user={currentUser} />

      {/* Main Content Grid */}
      <DashboardSection>
        <RecommendedCreators creators={nearbyCreators} />
        <PerformanceLeaderboard creators={popularCreators} />
      </DashboardSection>

      {/* Popular Creators Section */}
      <PopularCreators creators={popularCreators} />

      {/* Quick Actions */}
      <QuickActions />
    </DashboardLayout>
  )
}

export default Page
