export interface User {
  id: string
  creatorName: string
  brandName: string
  email: string
  avatar: string
  subscriberCount: number
  niche: string
  openRate: number
  clickThroughRate: number
  userLink: string
  adCopy: string
  discordUsername: string
  frequency: string
  specialInstructions?: string
  joinedDate: string
}

export interface Creator {
  id: string
  creatorName: string
  brandName: string
  avatar: string
  subscriberCount: number
  niche: string
  openRate: number
  userLink: string
  discordUsername: string
  frequency: string
  isOnline?: boolean
}

export interface PopularCreator extends Creator {
  isVerified: boolean
  lastActive: string
}

export interface Newsletter {
  id: string
  title: string
  creatorName: string
  brandName: string
  publishedAt: string
  readTime: string
  subscriberCount: number
  category: string
  niche: string
}
