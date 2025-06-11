# Firebase Setup Guide

## Environment Variables

To fix the Firebase authentication error, you need to create a `.env.local` file in your project root with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

## How to Get These Values

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one if needed)
3. Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Scroll down to "Your apps" section
5. If you don't have a web app configured, add one by clicking the web icon (`</>`)
6. Your Firebase configuration values will be displayed in the Firebase SDK snippet

## After Adding Environment Variables

After creating the `.env.local` file with your Firebase credentials:

1. Stop your Next.js development server if it's running
2. Restart the server with `npm run dev`
3. Your Firebase authentication should now work correctly

Remember to keep your `.env.local` file private and never commit it to your repository, as it contains sensitive API keys.
