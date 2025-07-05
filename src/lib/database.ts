import { databases } from './appwrite';
// import { client } from './appwrite'; // Commented out unused import
import { Models, Query } from 'appwrite';

// Environment variables
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const CREATORS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CREATORS_COLLECTION_ID!;

export interface CreatorProfile {
  userId: string;
  creatorName: string;
  brandName: string;
  email: string;
  niche: string;
  subscriberCount: number;
  openRate: number;
  userLink: string;
  discordUsername: string;
  frequency: string;
  adCopy: string;
  specialInstructions?: string;
  isOnboardingComplete: boolean;
}

export interface CreatorProfileDocument extends CreatorProfile, Models.Document {}

export class DatabaseService {
  // Create a new creator profile
  static async createCreatorProfile(profile: Omit<CreatorProfile, 'userId'>, userId: string): Promise<CreatorProfileDocument> {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        CREATORS_COLLECTION_ID,
        'unique()',
        {
          ...profile,
          userId,
          isOnboardingComplete: true
        }
      );
      return document as CreatorProfileDocument;
    } catch (error) {
      console.error('Error creating creator profile:', error);
      throw error;
    }
  }

  // Get creator profile by user ID
  static async getCreatorProfileByUserId(userId: string): Promise<CreatorProfileDocument | null> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CREATORS_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      
      if (response.documents.length === 0) {
        return null;
      }
      
      return response.documents[0] as CreatorProfileDocument;
    } catch (error) {
      console.error('Error fetching creator profile:', error);
      throw error;
    }
  }

  // Update creator profile
  static async updateCreatorProfile(documentId: string, updates: Partial<CreatorProfile>): Promise<CreatorProfileDocument> {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        CREATORS_COLLECTION_ID,
        documentId,
        updates
      );
      return document as CreatorProfileDocument;
    } catch (error) {
      console.error('Error updating creator profile:', error);
      throw error;
    }
  }

  // Check if user has completed onboarding
  static async hasCompletedOnboarding(userId: string): Promise<boolean> {
    try {
      const profile = await this.getCreatorProfileByUserId(userId);
      return profile?.isOnboardingComplete || false;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  // Mark onboarding as complete
  static async completeOnboarding(userId: string): Promise<void> {
    try {
      const profile = await this.getCreatorProfileByUserId(userId);
      if (profile) {
        await this.updateCreatorProfile(profile.$id, { isOnboardingComplete: true });
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }
}
