'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'

const OAuthDemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">OAuth Pages Demo</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Test the improved OAuth success and failure pages
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/auth/oauth/success">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                View Success Page
              </Button>
            </Link>
            <Link href="/auth/oauth/failure">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <XCircle className="w-4 h-4 mr-2" />
                View Failure Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OAuthDemoPage
