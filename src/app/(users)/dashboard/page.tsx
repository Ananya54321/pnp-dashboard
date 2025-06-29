'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { QuickStats } from '@/components/dashboard'
import { RecommendedCreators } from '@/components/dashboard/RecommendedCreators'
import { PerformanceLeaderboard } from '@/components/dashboard/PerformanceLeaderboard'
import { PopularCreators } from '@/components/dashboard/PopularCreators'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { currentUser, nearbyCreators, popularCreators } from '@/constants/dashboardData'
import { useProtectedRoute } from '@/hooks/useAuthRoute'
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus'

const Page = () => {
  const router = useRouter()
  const { user, loading: authLoading } = useProtectedRoute()
  const { isOnboardingComplete, loading: onboardingLoading } = useOnboardingStatus()

  // Redirect to onboarding if user hasn't completed it
  useEffect(() => {
    if (!authLoading && !onboardingLoading && user && isOnboardingComplete === false) {
      router.push('/onboarding')
    }
  }, [user, authLoading, isOnboardingComplete, onboardingLoading, router])

  if (authLoading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null // This will redirect to login
  }

  // Don't render dashboard if onboarding is incomplete (will redirect)
  if (isOnboardingComplete === false) {
    return null
  }

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
