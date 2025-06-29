'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { DatabaseService } from '@/lib/database'

export const useOnboardingStatus = () => {
  const { user, loading: authLoading } = useAuth()
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (authLoading || !user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const hasCompleted = await DatabaseService.hasCompletedOnboarding(user.$id)
        setIsOnboardingComplete(hasCompleted)
      } catch (err) {
        console.error('Error checking onboarding status:', err)
        setError('Failed to check onboarding status')
        setIsOnboardingComplete(false) // Default to incomplete on error
      } finally {
        setLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [user, authLoading])

  const markOnboardingComplete = async () => {
    if (!user) return

    try {
      await DatabaseService.completeOnboarding(user.$id)
      setIsOnboardingComplete(true)
    } catch (err) {
      console.error('Error marking onboarding complete:', err)
      throw err
    }
  }

  return {
    isOnboardingComplete,
    loading,
    error,
    markOnboardingComplete
  }
}
