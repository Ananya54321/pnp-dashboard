'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, User, Building, Mail, Lock, ArrowRight, Loader2, Users, TrendingUp, Link as LinkIcon, MessageSquare, Clock, FileText } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { DatabaseService } from '@/lib/database'
import { account } from '@/lib/appwrite'
import { GoogleOAuthButton, GitHubOAuthButton } from '@/components/auth/OAuthButton'

const RegisterPage = () => {
  const router = useRouter()
  const { register } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    creatorName: '',
    brandName: '',
    email: '',
    password: '',
    confirmPassword: '',
    niche: '',
    subscriberCount: '',
    openRate: '',
    userLink: '',
    discordUsername: '',
    frequency: '',
    adCopy: '',
    specialInstructions: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateStep1 = () => {
    return formData.creatorName && formData.brandName && formData.email && 
           formData.password && formData.confirmPassword && 
           formData.password === formData.confirmPassword && 
           formData.password.length >= 6
  }

  const validateStep2 = () => {
    return formData.niche && formData.subscriberCount && formData.openRate && 
           formData.userLink && formData.discordUsername && formData.frequency
  }

  const validateStep3 = () => {
    return formData.adCopy.length > 0 && formData.adCopy.length <= 200
  }

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      setError('Please fill in all required fields correctly')
      return
    }
    if (currentStep === 2 && !validateStep2()) {
      setError('Please complete all newsletter details')
      return
    }
    setError('')
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep3()) {
      setError('Please provide a valid ad copy (1-200 characters)')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Register user with Appwrite using creator name as display name
      await register(
        formData.email.toLowerCase(),
        formData.password,
        formData.creatorName
      )

      // Get the current user to access their ID
      const currentUser = await account.get()
      
      // Create creator profile in database
      await DatabaseService.createCreatorProfile({
        creatorName: formData.creatorName,
        brandName: formData.brandName,
        email: formData.email.toLowerCase(),
        niche: formData.niche,
        subscriberCount: parseInt(formData.subscriberCount) || 0,
        openRate: parseFloat(formData.openRate) || 0,
        userLink: formData.userLink,
        discordUsername: formData.discordUsername,
        frequency: formData.frequency,
        adCopy: formData.adCopy,
        specialInstructions: formData.specialInstructions,
        isOnboardingComplete: true
      }, currentUser.$id)

      setSuccess('Account created successfully! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: unknown) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="creatorName" className="text-gray-700 dark:text-gray-300">
            Creator Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="creatorName"
              name="creatorName"
              placeholder="Your full name"
              value={formData.creatorName}
              onChange={handleInputChange}
              className="pl-10"
              maxLength={50}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandName" className="text-gray-700 dark:text-gray-300">
            Brand/Newsletter Name *
          </Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="brandName"
              name="brandName"
              placeholder="Your newsletter brand"
              value={formData.brandName}
              onChange={handleInputChange}
              className="pl-10"
              maxLength={100}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
          Email Address *
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            Password *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 pr-10"
              minLength={6}
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
            Confirm Password *
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">Passwords do not match</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="niche" className="text-gray-700 dark:text-gray-300">
            Newsletter Niche *
          </Label>
          <Input
            id="niche"
            name="niche"
            placeholder="e.g., Tech, Business, Health"
            value={formData.niche}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subscriberCount" className="text-gray-700 dark:text-gray-300">
            Subscriber Count *
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="subscriberCount"
              name="subscriberCount"
              type="number"
              placeholder="5000"
              value={formData.subscriberCount}
              onChange={handleInputChange}
              className="pl-10"
              min="0"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="openRate" className="text-gray-700 dark:text-gray-300">
            Open Rate (%) *
          </Label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="openRate"
              name="openRate"
              type="number"
              placeholder="45.5"
              value={formData.openRate}
              onChange={handleInputChange}
              className="pl-10"
              min="0"
              max="100"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency" className="text-gray-700 dark:text-gray-300">
            Publishing Frequency *
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Select onValueChange={(value) => handleSelectChange('frequency', value)}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="userLink" className="text-gray-700 dark:text-gray-300">
          Newsletter Website URL *
        </Label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="userLink"
            name="userLink"
            type="url"
            placeholder="https://yournewsletter.com"
            value={formData.userLink}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="discordUsername" className="text-gray-700 dark:text-gray-300">
          Discord Username *
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="discordUsername"
            name="discordUsername"
            placeholder="username#1234"
            value={formData.discordUsername}
            onChange={handleInputChange}
            className="pl-10"
            maxLength={32}
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="adCopy" className="text-gray-700 dark:text-gray-300">
          Ad Copy / Newsletter Description *
        </Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <Textarea
            id="adCopy"
            name="adCopy"
            placeholder="Write a compelling description of your newsletter for potential collaborators..."
            value={formData.adCopy}
            onChange={handleInputChange}
            className="pl-10 min-h-[100px]"
            maxLength={200}
            required
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formData.adCopy.length}/200 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialInstructions" className="text-gray-700 dark:text-gray-300">
          Special Instructions (Optional)
        </Label>
        <Textarea
          id="specialInstructions"
          name="specialInstructions"
          placeholder="Any special requirements or preferences for collaborations..."
          value={formData.specialInstructions}
          onChange={handleInputChange}
          className="min-h-[80px]"
          maxLength={500}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formData.specialInstructions.length}/500 characters
        </p>
      </div>
    </div>
  )

  return (
    <div className="mt-6 bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Your Creator Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join our community of newsletter creators
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  currentStep > step 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
              {currentStep === 1 && 'Account Information'}
              {currentStep === 2 && 'Newsletter Details'}
              {currentStep === 3 && 'Profile & Bio'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              {currentStep === 1 && 'Set up your basic account credentials'}
              {currentStep === 2 && 'Tell us about your newsletter'}
              {currentStep === 3 && 'Complete your creator profile'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* OAuth Buttons - Only show on step 1 */}
            {currentStep === 1 && (
              <>
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
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Dynamic Step Content */}
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

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

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
