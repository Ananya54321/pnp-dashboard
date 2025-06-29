# OAuth Onboarding System

This implementation provides a complete onboarding flow for users who register via OAuth (Google/GitHub) to collect missing creator profile information and store it in Appwrite.

## Features

- ✅ **OAuth Integration**: Works with existing Google/GitHub OAuth setup
- ✅ **Onboarding Detection**: Automatically detects incomplete profiles
- ✅ **Progressive Forms**: 3-step onboarding form with validation
- ✅ **Database Integration**: Stores profile data in Appwrite database
- ✅ **Dashboard Protection**: Prevents access until onboarding is complete
- ✅ **Unified Registration**: Regular email/password registration also saves to database

## Files Added/Modified

### New Files

```
src/
├── lib/
│   └── database.ts                                    # Appwrite database service
├── components/
│   └── onboarding/
│       ├── OnboardingForm.tsx                         # Multi-step onboarding form
│       └── OnboardingBanner.tsx                       # Completion status banner
├── hooks/
│   └── useOnboardingStatus.ts                         # Onboarding status hook
└── app/
    └── (users)/
        └── onboarding/
            └── page.tsx                               # Onboarding page

CREATOR_PROFILE_SETUP.md                              # Database setup guide
.env.example                                          # Updated with DB variables
```

### Modified Files

```
src/app/(users)/auth/oauth/success/page.tsx           # OAuth success handling
src/app/(users)/dashboard/page.tsx                    # Dashboard protection
src/app/(users)/auth/register/page.tsx                # Regular registration integration
```

## Quick Setup

### 1. Environment Variables

Add these to your `.env.local`:

```env
# Existing Appwrite config
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id

# New database config
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_CREATORS_COLLECTION_ID=creators
```

### 2. Database Setup

Follow the detailed guide in `CREATOR_PROFILE_SETUP.md` to:
1. Create the database in Appwrite
2. Create the `creators` collection
3. Set up attributes and permissions
4. Configure indexes

### 3. Test the Flow

1. **OAuth Registration**: Register with Google/GitHub
2. **Onboarding Redirect**: Should redirect to `/onboarding`
3. **Form Completion**: Fill out the 3-step form
4. **Dashboard Access**: Should redirect to `/dashboard`
5. **Subsequent Logins**: Should go directly to dashboard

## User Experience Flow

### First-Time OAuth Users

```
OAuth Sign-in → OAuth Success → Profile Check → Onboarding Form → Dashboard
```

### Returning Users

```
OAuth Sign-in → OAuth Success → Profile Check → Dashboard
```

### Regular Email Registration

```
Registration Form → Profile Saved → Dashboard
```

## Technical Implementation

### Onboarding Status Detection

The system uses the `useOnboardingStatus` hook to check if a user has completed their profile:

```typescript
const { isOnboardingComplete, loading } = useOnboardingStatus()
```

### Database Service

The `DatabaseService` class provides methods for:
- Creating profiles
- Checking completion status
- Updating profiles

### Form Validation

The onboarding form includes:
- Step-by-step validation
- Real-time error feedback
- Progress indicators
- Required field validation

## Schema Design

The creator profile includes:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| userId | String | ✅ | Links to Appwrite user |
| creatorName | String | ✅ | Creator's name |
| brandName | String | ✅ | Newsletter brand |
| email | Email | ✅ | Contact email |
| niche | String | ✅ | Content category |
| subscriberCount | Number | ✅ | Subscriber count |
| openRate | Float | ✅ | Email open rate % |
| userLink | URL | ✅ | Website/newsletter URL |
| discordUsername | String | ✅ | Discord contact |
| frequency | String | ✅ | Publishing frequency |
| adCopy | String | ✅ | Description for partnerships |
| specialInstructions | String | ❌ | Additional preferences |
| isOnboardingComplete | Boolean | ✅ | Completion status |

## Error Handling

The system includes comprehensive error handling for:
- Network connectivity issues
- Database permission errors
- Validation failures
- Authentication state changes

## Customization

### Modifying Form Steps

Edit `OnboardingForm.tsx` to:
- Add/remove form fields
- Change validation rules
- Modify step progression

### Updating Database Schema

1. Modify the schema in Appwrite console
2. Update the `CreatorProfile` interface in `database.ts`
3. Update form validation in `OnboardingForm.tsx`

### Changing Redirect Behavior

Modify the redirect logic in:
- `oauth/success/page.tsx` for OAuth flows
- `dashboard/page.tsx` for dashboard protection

## Security Considerations

- ✅ User can only create/update their own profile
- ✅ Database permissions restrict access appropriately
- ✅ Input validation prevents malicious data
- ✅ URLs are validated for format correctness

## Performance Features

- ✅ Efficient database queries with proper indexing
- ✅ Client-side caching of onboarding status
- ✅ Minimal re-renders with proper state management
- ✅ Progressive form loading

## Testing Checklist

- [ ] OAuth registration creates account
- [ ] Incomplete profiles redirect to onboarding
- [ ] Onboarding form validates all steps
- [ ] Profile data saves correctly to database
- [ ] Dashboard access works after completion
- [ ] Returning users skip onboarding
- [ ] Regular registration also saves profile
- [ ] Error states display correctly
- [ ] Loading states work properly
- [ ] Mobile responsive design

## Troubleshooting

### Common Issues

**"Database not found" errors**
- Check environment variables are set correctly
- Verify database ID matches Appwrite console

**"Permission denied" errors**
- Ensure collection permissions allow user access
- Check user is properly authenticated

**Infinite redirect loops**
- Verify `isOnboardingComplete` field updates correctly
- Check completion logic in `DatabaseService`

**Form validation errors**
- Ensure all required fields have proper validation
- Check data types match database schema

### Debug Mode

Enable detailed logging by setting:

```env
NEXT_PUBLIC_APPWRITE_DEBUG=true
```

This will log all database operations to the browser console.

## Future Enhancements

Potential improvements to consider:

- **Profile Images**: Add avatar upload functionality
- **Social Links**: Support for multiple social media profiles
- **Categories**: More granular niche categorization
- **Metrics Tracking**: Historical performance data
- **Bulk Import**: CSV import for existing creator data
- **Admin Dashboard**: Management interface for profiles

## Support

For issues related to:
- **Appwrite Setup**: Check the official Appwrite documentation
- **OAuth Configuration**: Review the existing `APPWRITE_SETUP.md`
- **Database Schema**: Refer to `CREATOR_PROFILE_SETUP.md`
- **Form Customization**: See component documentation in source files
