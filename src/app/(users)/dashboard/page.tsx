'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  TrendingUp, 
  Mail, 
  BookOpen, 
  Star, 
  MessageCircle, 
  Filter,
  BarChart3,
  Zap,
  Heart,
  UserPlus,
  Calendar,
  Target,
  Award,
  Sparkles
} from 'lucide-react'



const Page = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800">
                <AvatarImage src={currentUser.avatar} alt={currentUser.creatorName} />
                <AvatarFallback>{currentUser.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {currentUser.creatorName}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser.brandName} • {currentUser.subscriberCount.toLocaleString()} subscribers
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {currentUser.niche} • {currentUser.frequency} newsletter
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Pro Creator
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.subscriberCount.toLocaleString()}</div>
              <p className="text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Rate</CardTitle>
              <Mail className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.openRate}%</div>
              <p className="text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +2.3% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Frequency</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{currentUser.frequency}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Newsletter schedule
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Discord</CardTitle>
              <MessageCircle className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.discordUsername}</div>
              <p className="text-xs text-green-600 dark:text-green-400">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Connected
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Creator Profile Summary */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Your Creator Profile
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your public profile information for collaborations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ad Copy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentUser.adCopy}
                </p>
              </div>
              
              {currentUser.specialInstructions && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Special Instructions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentUser.specialInstructions}
                  </p>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Newsletter Link</h4>
                <a 
                  href={currentUser.userLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {currentUser.userLink}
                </a>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Edit Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Preview Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Creator Recommendations */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Recommended Creators
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Creators with similar audience size (±5k subscribers)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyCreators.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-0">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={creator.avatar} alt={creator.creatorName} />
                        <AvatarFallback>{creator.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {creator.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">{creator.creatorName}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{creator.brandName}</p>
                      <div className="flex items-center space-x-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {creator.subscriberCount.toLocaleString()} subs
                        </Badge>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {creator.openRate}% open rate
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize whitespace-nowrap">
                          {creator.frequency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 ml-4">
                    <Button size="sm" variant="outline" className="px-3 py-1 text-xs">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" className="px-3 py-1 text-xs">
                      <UserPlus className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Newsletter Feed */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  Latest {currentUser.niche} Newsletters
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Latest newsletters from your niche
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/creators'}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>View All Newsletters</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nicheNewsletters.map((newsletter) => (
                <div key={newsletter.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{newsletter.creatorName}</h4>
                          {newsletter.category === 'Featured' && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{newsletter.brandName}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={newsletter.category === 'Featured' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {newsletter.category}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {newsletter.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subscribers</span>
                      <span className="font-medium text-gray-900 dark:text-white">{newsletter.subscriberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Read Time</span>
                      <span className="font-medium text-gray-900 dark:text-white">{newsletter.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Niche</span>
                      <Badge variant="outline" className="text-xs">{newsletter.niche}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Published</span>
                      <span className="text-xs text-green-600 dark:text-green-400">{newsletter.publishedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Creators Section */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Popular Newsletter Creators
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Top creators you can interact with and learn from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCreators.map((creator) => (
                <div key={creator.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={creator.avatar} alt={creator.creatorName} />
                        <AvatarFallback>{creator.creatorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{creator.creatorName}</h4>
                          {creator.isVerified && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{creator.brandName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subscribers</span>
                      <span className="font-medium text-gray-900 dark:text-white">{creator.subscriberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Open Rate</span>
                      <span className="font-medium text-gray-900 dark:text-white">{creator.openRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Niche</span>
                      <Badge variant="outline" className="text-xs">{creator.niche}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Frequency</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{creator.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Last Active</span>
                      <span className="text-xs text-green-600 dark:text-green-400">{creator.lastActive}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View detailed performance metrics</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Create Campaign</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start a new collaboration</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Schedule</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your content calendar</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Join creator discussions</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Page
