# DMCC Community App Deployment Guide

This document provides instructions for deploying your DMCC Community application to Firebase Hosting.

## Prerequisites

1. Install the Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Make sure you have the correct permissions for the `dmcc-community` Firebase project.

## Deployment Steps

### Option 1: Using the Deployment Script

1. Run the deployment script:
   ```bash
   node deploy.js
   ```

   This script will:
   - Build your Next.js application
   - Deploy to Firebase Hosting

### Option 2: Manual Deployment

1. Build your Next.js application:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Security and Configuration

- The Firebase configuration files have been set up for your `dmcc-community` project.
- Firestore security rules are configured to:
  - Allow admin users full access to all documents
  - Allow authenticated users to read all registrations
  - Allow users to create their own registration entries
  - Only allow updates/deletes by the original creator or admins

## Troubleshooting

If you encounter any issues during deployment:

1. **Firestore Rules Errors**:
   - Go to the Firebase Console > Firestore Database > Rules
   - Copy the rules from `firestore.rules` and paste them in the console

2. **Authentication Issues**:
   - Verify that your `firebaseConfig` settings match what's in the Firebase Console
   - Check that admin users have the proper custom claims set (`token.admin == true`)

3. **Build Errors**:
   - The deployment is configured to ignore TypeScript and ESLint errors during build
   - To fix these properly, address the errors in your code before deploying

## Post-Deployment

After deployment:

1. Your site will be available at:
   - `https://dmcc-community.web.app`
   - `https://dmcc-community.firebaseapp.com`

2. Verify that:
   - Authentication works correctly
   - Registration form is functioning
   - Admin dashboard is accessible to admin users
   - CSV export and other admin features are working

## Monitoring and Analytics

Your app is now configured with:
- Firebase Analytics - to track user engagement
- Firebase Performance Monitoring - to detect performance issues

You can view these metrics in the Firebase Console.

## Questions or Issues?

If you encounter any problems with your deployment, review the Firebase documentation or seek assistance from your development team.
