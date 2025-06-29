'use client'
import React from 'react'
import { OnboardingForm } from '@/components/onboarding/OnboardingForm'
import { useRouter } from 'next/navigation'

const OnboardingPage = () => {
  const router = useRouter()

  const handleOnboardingComplete = () => {
    // Redirect to dashboard after successful onboarding
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <OnboardingForm onComplete={handleOnboardingComplete} />
      </div>
    </div>
  )
}

export default OnboardingPage
