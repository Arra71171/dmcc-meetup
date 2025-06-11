import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// This requires a service account key file. We'll use environment variables for security.
try {
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      throw new Error('Firebase Admin SDK credentials are not fully provided in environment variables.');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error('Firebase Admin SDK Initialization Error:', error);
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // Securely compare the provided password with the one from your environment variables
    if (password === process.env.ADMIN_PASSWORD) {
      // The UID for your admin user. This can be any string.
      const uid = 'admin-user';
      // Add a custom claim to identify this user as an admin
      const additionalClaims = { admin: true };

      // Create a custom token
      const customToken = await admin.auth().createCustomToken(uid, additionalClaims);

      return NextResponse.json({ token: customToken });
    } else {
      // If the password is wrong, return an unauthorized error
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}