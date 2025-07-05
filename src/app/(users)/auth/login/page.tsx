'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { GoogleOAuthButton, GitHubOAuthButton } from '@/components/auth/OAuthButton'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await login(formData.email, formData.password)
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: unknown) {
      console.error('Login error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className="h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your creator account
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <GoogleOAuthButton disabled={loading} />
              <GitHubOAuthButton disabled={loading} />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="creator@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10">
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {success && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10">
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors underline decoration-blue-600 dark:decoration-blue-400 underline-offset-2"
                >
                  Create one here
                </Link>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors underline decoration-blue-600 dark:decoration-blue-400 underline-offset-2"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
