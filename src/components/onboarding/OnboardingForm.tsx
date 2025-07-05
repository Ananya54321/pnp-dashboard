'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Building, 
  Users, 
  TrendingUp, 
  Link as LinkIcon, 
  MessageSquare, 
  Clock, 
  // FileText, // Commented out unused import
  ArrowRight, 
  Loader2,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { DatabaseService } from '@/lib/database'
import { toast } from 'sonner'

interface OnboardingFormData {
  creatorName: string
  brandName: string
  niche: string
  subscriberCount: string
  openRate: string
  userLink: string
  discordUsername: string
  frequency: string
  adCopy: string
  specialInstructions: string
}

interface OnboardingFormProps {
  onComplete: () => void
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<OnboardingFormData>({
    creatorName: user?.name || '',
    brandName: '',
    niche: '',
    subscriberCount: '',
    openRate: '',
    userLink: '',
    discordUsername: '',
    frequency: '',
    adCopy: '',
    specialInstructions: ''
  })

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
    return formData.creatorName && formData.brandName
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
      setError('Please fill in your creator name and brand name')
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

    if (!user) {
      setError('User not authenticated')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create creator profile in Appwrite database
      await DatabaseService.createCreatorProfile({
        creatorName: formData.creatorName,
        brandName: formData.brandName,
        email: user.email,
        niche: formData.niche,
        subscriberCount: parseInt(formData.subscriberCount) || 0,
        openRate: parseFloat(formData.openRate) || 0,
        userLink: formData.userLink,
        discordUsername: formData.discordUsername,
        frequency: formData.frequency,
        adCopy: formData.adCopy,
        specialInstructions: formData.specialInstructions,
        isOnboardingComplete: true
      }, user.$id)

      toast.success('Profile created successfully!')
      onComplete()
    } catch (error: unknown) {
      console.error('Onboarding error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create profile. Please try again.'
      setError(errorMessage)
      toast.error('Failed to create profile')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
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
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandName" className="text-gray-700 dark:text-gray-300">
                Newsletter/Brand Name *
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="brandName"
                  name="brandName"
                  placeholder="e.g., Tech Weekly Digest"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
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
                    placeholder="42.5"
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
                  <Select onValueChange={(value) => handleSelectChange('frequency', value)} value={formData.frequency}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userLink" className="text-gray-700 dark:text-gray-300">
                  Newsletter Website *
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
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adCopy" className="text-gray-700 dark:text-gray-300">
                Ad Copy / Newsletter Description *
              </Label>
              <Textarea
                id="adCopy"
                name="adCopy"
                placeholder="Write a compelling description of your newsletter for potential collaborators..."
                value={formData.adCopy}
                onChange={handleInputChange}
                className="min-h-[120px]"
                maxLength={200}
                required
              />
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

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Help us set up your creator profile so you can start collaborating with other newsletter creators
          </CardDescription>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                `}>
                  {currentStep > step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div className={`
                    w-8 h-1 mx-2
                    ${currentStep > step 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Newsletter Details' :
              'Description & Preferences'
            }
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={loading}
                >
                  Previous
                </Button>
              )}
              
              <div className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep < 3 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={loading}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Profile...
                      </>
                    ) : (
                      <>
                        Complete Profile
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
