# Creator Profile Database Setup Guide

This guide explains how to set up the Appwrite database to store creator profile information for users who register via OAuth (Google/GitHub).

## Overview

When users register via OAuth providers (Google/GitHub), they only provide basic authentication information (name, email). This system prompts users to complete their creator profile with additional required information and stores it in an Appwrite database.

## Database Schema Setup

### 1. Create Database

1. Go to your Appwrite Console
2. Navigate to **Databases**
3. Click **Create Database**
4. Name it `creators-db` (or your preferred name)
5. Copy the Database ID and add it to your `.env.local` file as `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

### 2. Create Collections

Create a collection called `creators` with the following attributes:

#### Collection Settings
- **Collection ID**: `creators` (copy this to `NEXT_PUBLIC_APPWRITE_CREATORS_COLLECTION_ID`)
- **Name**: `Creator Profiles`

#### Attributes

| Attribute Name | Type | Size | Required | Default | Index |
|----------------|------|------|----------|---------|-------|
| `userId` | String | 255 | Yes | - | Yes (Unique) |
| `creatorName` | String | 255 | Yes | - | No |
| `brandName` | String | 255 | Yes | - | Yes |
| `email` | Email | 255 | Yes | - | Yes |
| `niche` | String | 100 | Yes | - | Yes |
| `subscriberCount` | Integer | - | Yes | 0 | Yes |
| `openRate` | Float | - | Yes | 0.0 | Yes |
| `userLink` | URL | 500 | Yes | - | No |
| `discordUsername` | String | 100 | Yes | - | No |
| `frequency` | String | 50 | Yes | - | Yes |
| `adCopy` | String | 200 | Yes | - | No |
| `specialInstructions` | String | 500 | No | - | No |
| `isOnboardingComplete` | Boolean | - | Yes | false | Yes |

#### Detailed Attribute Configuration

1. **userId** (String, 255, Required, Unique Index)
   - Links to Appwrite user ID
   - Used to associate profile with authenticated user

2. **creatorName** (String, 255, Required)
   - Creator's full name
   - Display name for the profile

3. **brandName** (String, 255, Required, Index)
   - Newsletter or brand name
   - Searchable field

4. **email** (Email, 255, Required, Index)
   - Creator's email address
   - Usually populated from OAuth data

5. **niche** (String, 100, Required, Index)
   - Newsletter category/niche
   - Used for filtering and matching

6. **subscriberCount** (Integer, Required, Index)
   - Number of newsletter subscribers
   - Used for filtering and ranking

7. **openRate** (Float, Required, Index)
   - Email open rate percentage
   - Performance metric for matching

8. **userLink** (URL, 500, Required)
   - Newsletter website or landing page
   - Must be valid URL format

9. **discordUsername** (String, 100, Required)
   - Discord username for communication
   - Format: username#1234

10. **frequency** (String, 50, Required, Index)
    - Publishing frequency
    - Values: daily, weekly, bi-weekly, monthly, other

11. **adCopy** (String, 200, Required)
    - Newsletter description for partnerships
    - Used in collaboration requests

12. **specialInstructions** (String, 500, Optional)
    - Additional collaboration preferences
    - Can be empty

13. **isOnboardingComplete** (Boolean, Required, Index)
    - Tracks onboarding completion status
    - Used to determine if user needs onboarding

### 3. Set Collection Permissions

Configure the following permissions for the `creators` collection:

#### Read Permissions
- **Any**: Allow all users to read creator profiles (for discovery)
- Or specific roles if you want to restrict access

#### Create Permissions
- **Users**: Allow authenticated users to create their profile

#### Update Permissions
- **Users**: Allow users to update their own profiles
- Add rule: `userId` equals `$user_id`

#### Delete Permissions
- **Users**: Allow users to delete their own profiles (optional)
- Add rule: `userId` equals `$user_id`

### 4. Create Indexes

Create the following indexes for better query performance:

1. **userId** (Unique) - Already created as unique attribute
2. **email** (Non-unique) - For email lookups
3. **niche** (Non-unique) - For filtering by category
4. **subscriberCount** (Non-unique) - For sorting and filtering
5. **openRate** (Non-unique) - For performance-based filtering
6. **frequency** (Non-unique) - For frequency-based matching
7. **isOnboardingComplete** (Non-unique) - For onboarding status queries
8. **brandName** (Non-unique) - For search functionality

## Environment Variables

Add these to your `.env.local` file:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

# Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_CREATORS_COLLECTION_ID=creators
```

## Usage Flow

### 1. OAuth Registration
1. User signs in with Google/GitHub
2. Appwrite creates user account with basic info (name, email)
3. User is redirected to OAuth success page

### 2. Onboarding Check
1. System checks if user has completed onboarding
2. If not, redirects to `/onboarding` page
3. If yes, redirects to `/dashboard`

### 3. Onboarding Process
1. User fills out creator profile form (3 steps)
2. Data is validated and saved to Appwrite database
3. `isOnboardingComplete` is set to `true`
4. User is redirected to dashboard

### 4. Dashboard Access
1. Dashboard checks onboarding status on each visit
2. Incomplete profiles are redirected to onboarding
3. Complete profiles see full dashboard

## API Integration

The system uses the `DatabaseService` class in `/src/lib/database.ts` which provides:

- `createCreatorProfile()` - Create new profile
- `getCreatorProfileByUserId()` - Get profile by user ID
- `updateCreatorProfile()` - Update existing profile
- `hasCompletedOnboarding()` - Check completion status
- `completeOnboarding()` - Mark as complete

## Testing

To test the setup:

1. Register a new user via OAuth
2. Verify redirect to onboarding page
3. Complete the onboarding form
4. Verify profile creation in Appwrite database
5. Verify redirect to dashboard
6. Test subsequent logins go directly to dashboard

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify environment variables are set correctly
   - Check database and collection IDs match

2. **Permission errors**
   - Ensure collection permissions allow authenticated users to create/read
   - Verify user is properly authenticated

3. **Validation errors**
   - Check all required fields are provided
   - Verify data types match schema

4. **Onboarding loop**
   - Check `isOnboardingComplete` field is properly set
   - Verify the completion logic in `DatabaseService`

### Debug Mode

Enable debug logging by adding to your environment:

```env
NEXT_PUBLIC_APPWRITE_DEBUG=true
```

This will log database operations to the browser console.
