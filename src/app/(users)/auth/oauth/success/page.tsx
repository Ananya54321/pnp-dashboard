'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, UserPlus, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import { slideInFromTop, slideInFromLeft } from '@/utils/motion'

const OAuthSuccessPage = () => {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { isOnboardingComplete, loading: onboardingLoading } = useOnboardingStatus()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [redirectMessage, setRedirectMessage] = useState('')

  useEffect(() => {
    if (authLoading || onboardingLoading) return

    if (!user) {
      // If no user after OAuth, redirect to login with error
      router.push('/auth/login?error=oauth_failed')
      return
    }

    if (isOnboardingComplete === null) return

    setIsRedirecting(true)

    if (isOnboardingComplete) {
      setRedirectMessage('Taking you to your dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      setRedirectMessage('Setting up your profile...')
      setTimeout(() => {
        router.push('/onboarding')
      }, 2000)
    }
  }, [user, authLoading, isOnboardingComplete, onboardingLoading, router])

  if (authLoading || onboardingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md space-y-6"
          initial="hidden"
          animate="visible"
          variants={slideInFromTop}
        >
          <motion.div 
            className="text-center space-y-4"
            variants={slideInFromLeft(0.2)}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto"
              >
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30"
              />
            </div>
            <AnimatedGradientText>
              <Sparkles className="w-4 h-4 mr-2" />
              Completing Sign In
            </AnimatedGradientText>
          </motion.div>
          
          <motion.div variants={slideInFromLeft(0.4)}>
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="space-y-4 pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Almost there...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we complete your authentication and prepare your experience
                  </p>
                  <div className="flex justify-center space-x-1 py-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (user && isRedirecting) {
    const isNewUser = !isOnboardingComplete
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-lg space-y-8"
          initial="hidden"
          animate="visible"
          variants={slideInFromTop}
        >
          {/* Success Animation */}
          <motion.div 
            className="text-center"
            variants={slideInFromLeft(0.2)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.3 
              }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              <div className={`absolute inset-0 rounded-full ${isNewUser ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'}`}></div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isNewUser ? (
                  <UserPlus className="w-12 h-12 text-blue-600" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                )}
              </motion.div>
              {/* Ripple Effect */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full border-2 ${isNewUser ? 'border-blue-300' : 'border-green-300'}`}
              />
            </motion.div>
            
            <AnimatedGradientText className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {isNewUser ? 'Welcome to Pick and Partner!' : 'Welcome Back!'}
            </AnimatedGradientText>
          </motion.div>

          {/* Main Content Card */}
          <motion.div variants={slideInFromLeft(0.4)}>
            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden">
              <div className={`h-2 ${isNewUser ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}`}></div>
              <CardContent className="space-y-6 pt-8 pb-8">
                <div className="text-center space-y-4">
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {isNewUser ? `Hello, ${user.name}!` : `Welcome back, ${user.name}!`}
                  </motion.h2>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400"
                  >
                    <span>{redirectMessage}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Alert className={`border-0 ${isNewUser ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10' : 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10'}`}>
                    <AlertDescription className={`text-center ${isNewUser ? 'text-blue-700 dark:text-blue-400' : 'text-green-700 dark:text-green-400'} font-medium`}>
                      {isNewUser 
                        ? '🎉 We need a few more details to set up your amazing creator profile!'
                        : '✨ Authentication completed successfully! Taking you to your dashboard...'
                      }
                    </AlertDescription>
                  </Alert>
                </motion.div>

                {/* Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="pt-4"
                >
                  <div className="flex justify-center">
                    <motion.div
                      className={`h-1 rounded-full ${isNewUser ? 'bg-blue-200 dark:bg-blue-800' : 'bg-green-200 dark:bg-green-800'}`}
                      style={{ width: '200px' }}
                    >
                      <motion.div
                        className={`h-full rounded-full ${isNewUser ? 'bg-blue-600' : 'bg-green-600'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return null
}

export default OAuthSuccessPage
