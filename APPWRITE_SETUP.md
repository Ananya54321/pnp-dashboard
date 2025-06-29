# Appwrite Authentication Setup Guide with OAuth

This guide walks you through setting up Appwrite authentication with Google and GitHub OAuth in your Next.js project.

## Prerequisites

1. An Appwrite account (sign up at [appwrite.io](https://appwrite.io))
2. A new Appwrite project created in your dashboard
3. Google OAuth credentials (Google Cloud Console)
4. GitHub OAuth app credentials (GitHub Developer Settings)

## Setup Steps

### 1. Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Copy your Project ID
4. Note your API Endpoint (usually `https://cloud.appwrite.io/v1`)

### 2. Configure Web Platform

1. In your Appwrite project dashboard, go to **Settings > Platforms**
2. Add a new **Web App** platform
3. Set the hostname to:
   - `localhost` (for development)
   - Your production domain (for production)

### 3. Setup Google OAuth

#### Google Cloud Console Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API or Google Identity API
4. Go to **Credentials** > **Create Credentials** > **OAuth 2.0 Client IDs**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - Development: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[YOUR_PROJECT_ID]`
   - Production: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[YOUR_PROJECT_ID]`
7. Copy your **Client ID** and **Client Secret**

#### Appwrite Google OAuth Setup:
1. In your Appwrite console, go to **Auth > Settings**
2. Find **Google** in the OAuth2 Providers section
3. Toggle it **ON**
4. Enter your Google **Client ID** and **Client Secret**
5. Save the settings

### 4. Setup GitHub OAuth

#### GitHub Developer Settings:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Your app name
   - **Homepage URL**: Your app homepage
   - **Authorization callback URL**: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[YOUR_PROJECT_ID]`
4. Copy your **Client ID** and **Client Secret**

#### Appwrite GitHub OAuth Setup:
1. In your Appwrite console, go to **Auth > Settings**
2. Find **GitHub** in the OAuth2 Providers section
3. Toggle it **ON**
4. Enter your GitHub **Client ID** and **Client Secret**
5. Save the settings

## GitHub OAuth Configuration Details

### GitHub OAuth App Settings

When creating your GitHub OAuth App, use these exact values:

**Application name:**
```
Pick and Partner
```

**Homepage URL:**
```
http://localhost:3001
```
(For development - use your production domain for production)

**Application description:** (Optional)
```
Pick and Partner - Influencer marketing platform with smart, data-driven, and AI-powered solutions.
```

**Authorization callback URL:**
```
https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[YOUR_PROJECT_ID]
```

### Step-by-Step GitHub Setup

1. **Go to GitHub Developer Settings**
   - Visit: <https://github.com/settings/developers>
   - Click "New OAuth App"

2. **Fill in OAuth App Details**
   - **Application name**: `Pick and Partner`
   - **Homepage URL**: `http://localhost:3001` (development) or `https://yourdomain.com` (production)
   - **Application description**: `Pick and Partner - Influencer marketing platform`
   - **Authorization callback URL**: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[YOUR_PROJECT_ID]`

3. **Register Application**
   - Click "Register application"
   - Copy the **Client ID**

4. **Generate Client Secret**
   - Click "Generate a new client secret"
   - Copy the **Client Secret** (save it immediately - you won't see it again!)

5. **Configure in Appwrite**
   - Go to your Appwrite Console
   - Navigate to "Auth" > "Settings"
   - Find "GitHub" in OAuth2 Providers
   - Toggle it ON
   - Paste your Client ID and Client Secret
   - Save settings

### Important Notes for GitHub OAuth

- **Callback URL must be exact** - Any typo will cause authentication to fail
- **Client Secret is shown only once** - Save it immediately after generation
- **Homepage URL should match your environment** - Use localhost for development, your domain for production
- **Application name will be shown to users** during the OAuth consent process

### 5. Environment Variables

1. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
```

Replace `your_project_id_here` with your actual Project ID from Appwrite.

### 6. Configure Authentication

1. In your Appwrite console, go to **Auth > Settings**
2. Enable the authentication methods you want:
   - Email/Password (for traditional login)
   - Google OAuth (configured above)
   - GitHub OAuth (configured above)
3. Configure email templates if needed
4. Set up your custom domains for password reset emails

### 5. Configure Email Service (Optional but Recommended)

For password reset emails to work properly:

1. Go to **Settings > SMTP** in your Appwrite console
2. Configure your SMTP settings or use Appwrite's built-in email service
3. Test the email configuration

## Usage Examples

### Using the Auth Context with OAuth

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, loading, login, loginWithOAuth, logout } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Using OAuth Buttons

```tsx
import { GoogleOAuthButton, GitHubOAuthButton } from '@/components/auth/OAuthButton'

function LoginPage() {
  return (
    <div>
      <GoogleOAuthButton />
      <GitHubOAuthButton />
      
      {/* Or use the generic component */}
      <OAuthButton provider="google" />
      <OAuthButton provider="github" />
    </div>
  )
}
```

### Protected Routes

```tsx
import { useProtectedRoute } from '@/hooks/useAuthRoute'

function ProtectedPage() {
  const { user, loading } = useProtectedRoute()
  
  if (loading) return <div>Loading...</div>
  if (!user) return null // Will redirect to login
  
  return <div>Protected content</div>
}
```

### Guest Routes (redirect if authenticated)

```tsx
import { useGuestRoute } from '@/hooks/useAuthRoute'

function LoginPage() {
  const { user, loading } = useGuestRoute()
  
  if (loading) return <div>Loading...</div>
  if (user) return null // Will redirect to dashboard
  
  return <LoginForm />
}
```

### Logout Button

```tsx
import { LogoutButton } from '@/components/auth/LogoutButton'

function Header() {
  return (
    <header>
      <LogoutButton />
    </header>
  )
}
```

## Available Auth Methods

The AuthContext provides these methods:

- `login(email, password)` - Sign in with email/password
- `loginWithOAuth(provider)` - Sign in with Google or GitHub OAuth
- `register(email, password, name)` - Create new account
- `logout()` - Sign out current user
- `resetPassword(email)` - Send password reset email
- `updatePassword(newPassword, oldPassword)` - Update user password

## Available Auth Routes

Your app now has these authentication routes:

- `/auth/login` - Login page (with OAuth buttons)
- `/auth/register` - Registration page (with OAuth buttons)
- `/auth/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset form (with URL parameters)
- `/auth/oauth/success` - OAuth success redirect page
- `/auth/oauth/failure` - OAuth failure redirect page

## OAuth Flow

1. User clicks Google/GitHub button
2. Redirected to provider for authentication
3. User authorizes your application
4. Provider redirects back to Appwrite
5. Appwrite redirects to `/auth/oauth/success` on success
6. Success page redirects to dashboard after showing confirmation
7. On failure, redirects to `/auth/oauth/failure` with error message

## Security Considerations

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **HTTPS**: Always use HTTPS in production
3. **Password Policy**: Configure strong password requirements in Appwrite
4. **Rate Limiting**: Appwrite provides built-in rate limiting for auth endpoints
5. **Session Management**: Sessions are automatically managed by Appwrite

## Customization

### Custom Password Reset Domain

In production, update the password reset URL in `AuthContext.tsx`:

```tsx
const resetPassword = async (email: string) => {
  await account.createRecovery(
    email,
    `https://yourdomain.com/auth/reset-password`
  );
};
```

### Additional User Data

To store additional user data beyond email/name/password, you can:

1. Create a database collection in Appwrite
2. Store user profiles linked to the user ID
3. Use the `databases` instance from `@/lib/appwrite`

## Google OAuth Configuration Details

### Authorized JavaScript Origins
Add these origins in your Google Cloud Console:

**For Development:**
```
http://localhost:3001
```

**For Production:**
```
https://yourdomain.com
```

### Authorized Redirect URIs
Add this exact URI in your Google Cloud Console:

**For Development & Production:**
```
https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[YOUR_PROJECT_ID]
```

### Step-by-Step Google Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select or create a project

2. **Enable APIs**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity API"
   - Click "Enable"

3. **Create OAuth Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"

4. **Configure OAuth Client**
   - **Name**: Your app name (e.g., "Pick and Partner")
   - **Authorized JavaScript origins**: 
     - `http://localhost:3001` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[YOUR_PROJECT_ID]`

5. **Copy Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Keep these secure!

6. **Configure in Appwrite**
   - Go to your Appwrite Console
   - Navigate to "Auth" > "Settings"
   - Find "Google" in OAuth2 Providers
   - Toggle it ON
   - Paste your Client ID and Client Secret
   - Save settings

## Troubleshooting OAuth

### Common OAuth Issues

1. **"Invalid redirect URI"** - Check that your redirect URI exactly matches the one configured in your OAuth provider
2. **"OAuth provider not found"** - Ensure the provider is enabled in Appwrite Auth settings
3. **"Invalid OAuth credentials"** - Verify your Client ID and Client Secret are correct
4. **"OAuth popup blocked"** - Modern browsers may block OAuth popups; use redirects instead
5. **"State parameter mismatch"** - Clear cookies and try again

### Testing OAuth in Development

1. Make sure your Appwrite project platform includes `localhost`
2. Use `http://localhost:3000` for development (adjust port as needed)
3. The OAuth redirect will still go to Appwrite's servers, not your localhost

### Production OAuth Setup

1. Add your production domain to Appwrite platforms
2. Update OAuth redirect URIs to use your production domain
3. Test thoroughly in production environment

### Debug Mode

Enable debug mode in development by adding to your environment:

```env
NEXT_PUBLIC_APPWRITE_DEBUG=true
```

## Migration from Existing Auth

If you're migrating from your existing auth system:

1. Export existing user data
2. Create users in Appwrite via the server SDK
3. Update your frontend to use the new auth context
4. Test thoroughly before removing old auth code

## Support

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.gg/GSeTUeA)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)
