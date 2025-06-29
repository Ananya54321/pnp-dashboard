'use client'
import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { UserPlus, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface OnboardingBannerProps {
  show: boolean
}

export const OnboardingBanner: React.FC<OnboardingBannerProps> = ({ show }) => {
  if (!show) return null

  return (
    <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/10 mb-6">
      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="text-orange-700 dark:text-orange-300">
          <strong>Complete your profile</strong> - Finish setting up your creator profile to start collaborating with other newsletter creators.
        </div>
        <Button 
          asChild 
          size="sm" 
          className="ml-4 bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0"
        >
          <Link href="/onboarding">
            <UserPlus className="w-4 h-4 mr-2" />
            Complete Profile
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
