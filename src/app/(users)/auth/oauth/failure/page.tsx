'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { XCircle, ArrowLeft, Home, RefreshCw, AlertTriangle, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import { slideInFromTop, slideInFromLeft } from '@/utils/motion'

const OAuthFailurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-950 dark:via-black dark:to-red-900/10 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-lg space-y-8"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
      >
        {/* Error Animation */}
        <motion.div 
          className="text-center"
          variants={slideInFromLeft(0.2)}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.3 
            }}
            className="relative mx-auto w-24 h-24 mb-6"
          >
            <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/20"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <XCircle className="w-12 h-12 text-red-600" />
            </motion.div>
            {/* Pulse Effect */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-red-300"
            />
          </motion.div>
          
          <AnimatedGradientText className="mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Authentication Failed
          </AnimatedGradientText>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={slideInFromLeft(0.4)}>
          <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Oops! Something went wrong
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                  We couldn't complete your sign-in request
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Alert className="border-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    <div className="space-y-3">
                      <p className="font-medium">This could happen for several reasons:</p>
                      <ul className="list-none space-y-2 ml-4">
                        <motion.li 
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                          <span>You cancelled the authorization process</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 }}
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                          <span>Network connectivity issues occurred</span>
                        </motion.li>
                        <motion.li 
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 }}
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                          <span>The OAuth provider is temporarily unavailable</span>
                        </motion.li>
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/auth/login" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </Link>
                  
                  <Link href="/" className="w-full">
                    <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Need assistance?</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    If you continue to experience issues, please contact our support team. 
                    We're here to help you get connected!
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20">
                      Contact Support
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              💡 <strong>Pro tip:</strong> Make sure to allow popups and check your internet connection before trying again.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OAuthFailurePage
