
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  signInWithCustomToken,
  sendEmailVerification,
  type User
} from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loadingAuthState: boolean;
  loading: boolean;
  isAuthDialogOpen: boolean;
  authDialogMode: 'default' | 'adminOnly';
  openAuthDialog: (mode?: 'default' | 'adminOnly') => void;
  closeAuthDialog: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithAdminOverride: (password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'default' | 'adminOnly'>('default');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let unsubscribe: () => void;
    
    function setupAuthListener() {
      setLoadingAuthState(true);
      
      // Firebase auth is already initialized with persistence in firebase.ts
      // No need to call ensurePersistence() anymore
      
      console.log("Setting up auth state listener");
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log("Auth state changed:", user ? `User logged in: ${user.uid}` : "No user logged in");
        if (user) {
          const tokenResult = await user.getIdTokenResult(true);
          const userIsAdmin = tokenResult.claims.admin === true;
          console.log(`User is admin: ${userIsAdmin}`);
          setIsAdmin(userIsAdmin);
        } else {
          setIsAdmin(false);
        }
        setCurrentUser(user);
        setLoadingAuthState(false);
      });
    }
    
    setupAuthListener();
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle the user state update
      toast({
        title: "Signed in with Google",
        description: "You have successfully signed in.",
      });
    } catch (e: unknown) {
      console.error("Google sign-in error:", e);
      let description = "An unknown error occurred.";
      if (e instanceof Error) {
        description = e.message;
      }
      toast({
        title: "Google Sign-In Failed",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<void> => {
    try {
      const userCredential = await fbSignInWithEmailAndPassword(auth, email, pass);
      
      if (!userCredential.user.emailVerified) {
        await fbSignOut(auth); // Sign out the user immediately
        toast({
          title: "Email Not Verified",
          description: "Please check your inbox and click the verification link before signing in.",
          variant: "destructive",
        });
        return; // Stop the login process
      }

      setCurrentUser(userCredential.user);
      toast({ title: "Signed in successfully!", description: `Welcome ${userCredential.user.email}!` });
      closeAuthDialog();
    } catch (e: unknown) {
      console.error("Email Sign-In Error:", e);
      let description = "An unknown error occurred.";
      if (e instanceof FirebaseError) {
        description = e.message;
        if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
          description = "Sign-in failed: Invalid email or password. Please ensure your credentials are correct. If you are a new user, you must 'Sign Up' first to create an account.";
        }
      } else if (e instanceof Error) {
        description = e.message;
      }
      toast({ title: "Sign-in failed", description, variant: "destructive" });
    }
  };

  const signUpWithEmail = async (email: string, pass: string): Promise<void> => {
    try {
      const userCredential = await fbCreateUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(userCredential.user);
      await fbSignOut(auth); // Sign out immediately to force verification
      toast({ 
        title: "Account Created!", 
        description: `A verification link has been sent to ${userCredential.user.email}. Please verify your email and then sign in.` 
      });
      closeAuthDialog();
    } catch (e: unknown) {
      console.error("Email Sign-Up Error:", e);
      let description = "An unknown error occurred.";
      if (e instanceof FirebaseError) {
        description = e.message;
        if (e.code === 'auth/email-already-in-use') {
          description = "This email is already registered. Please try signing in or use a different email.";
        }
      } else if (e instanceof Error) {
        description = e.message;
      }
      toast({ title: "Sign-up failed", description, variant: "destructive" });
    }
  };

  const signInWithAdminOverride = async (password: string) => {
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Admin login failed');
      }

      await signInWithCustomToken(auth, data.token);

      toast({
        title: "Admin login successful",
        description: "You are now securely logged in as an admin.",
      });
      setAuthDialogOpen(false);
    } catch (e: unknown) {
      console.error("Admin sign-in error:", e);
      let description = "An unknown error occurred.";
      if (e instanceof Error) {
        description = e.message;
      }
      toast({
        title: "Admin login failed",
        description,
        variant: "destructive",
      });
    }
  };

  const logOut = async () => {
    try {
      await fbSignOut(auth); // Sign out Firebase user
      setCurrentUser(null);
      setIsAdmin(false);
      toast({ title: "Signed out successfully."});
    } catch (e: unknown) {
      console.error("Sign Out Error:", e);
      let description = "An unknown error occurred.";
      if (e instanceof Error) {
        description = e.message;
      }
      toast({ title: "Sign-out failed", description, variant: "destructive" });
    }
  };

  const openAuthDialog = (mode: 'default' | 'adminOnly' = 'default') => {
    setAuthDialogMode(mode);
    setAuthDialogOpen(true);
  };
  const closeAuthDialog = () => {
    setAuthDialogOpen(false);
    // Reset to default mode when dialog closes, in case it was opened in adminOnly mode
    setTimeout(() => setAuthDialogMode('default'), 150);
  };

  const value: AuthContextType = {
    currentUser,
    isAdmin,
    loadingAuthState,
    loading,
    isAuthDialogOpen,
    authDialogMode,
    openAuthDialog,
    closeAuthDialog,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInWithAdminOverride,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
