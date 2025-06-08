
'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  loadingAuthState: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signUpWithEmail: (email: string, pass: string) => Promise<User | null>;
  signInWithEmail: (email: string, pass: string) => Promise<User | null>;
  logOut: () => Promise<void>;
  isAuthDialogOpen: boolean;
  openAuthDialog: (mode?: 'default' | 'adminOnly') => void;
  closeAuthDialog: () => void;
  isAdminOverrideLoggedIn: boolean;
  loginAsAdminOverride: (username: string, pass: string) => Promise<boolean>;
  authDialogMode: 'default' | 'adminOnly';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials for prototype
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "&^%$6fsndh^6773hV#%67gd";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAdminOverrideLoggedIn, setIsAdminOverrideLoggedIn] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'default' | 'adminOnly'>('default');
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuthState(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    if (isAdminOverrideLoggedIn) setIsAdminOverrideLoggedIn(false); // Log out admin override if signing in as regular user
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      toast({ title: "Signed in successfully!", description: `Welcome ${result.user.displayName || result.user.email}!` });
      closeAuthDialog();
      return result.user;
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      return null;
    }
  };

  const signUpWithEmail = async (email: string, pass: string): Promise<User | null> => {
    if (isAdminOverrideLoggedIn) setIsAdminOverrideLoggedIn(false);
    try {
      const userCredential = await fbCreateUserWithEmailAndPassword(auth, email, pass);
      setCurrentUser(userCredential.user);
      toast({ title: "Signed up successfully!", description: `Welcome ${userCredential.user.email}!` });
      closeAuthDialog();
      return userCredential.user;
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
      let description = error.message;
      if (error.code === 'auth/email-already-in-use') {
        description = "This email is already in use. Please try signing in or use a different email.";
      }
      toast({ title: "Sign-up failed", description, variant: "destructive" });
      return null;
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<User | null> => {
    if (isAdminOverrideLoggedIn) setIsAdminOverrideLoggedIn(false);
    try {
      const userCredential = await fbSignInWithEmailAndPassword(auth, email, pass);
      setCurrentUser(userCredential.user);
      toast({ title: "Signed in successfully!", description: `Welcome ${userCredential.user.email}!` });
      closeAuthDialog();
      return userCredential.user;
    } catch (error: any) {
      console.error("Email Sign-In Error:", error);
      let description = error.message;
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = "Invalid email or password. Please double-check your credentials. If you're new, please sign up first.";
      }
      toast({ title: "Sign-in failed", description, variant: "destructive" });
      return null;
    }
  };

  const loginAsAdminOverride = async (username: string, pass: string): Promise<boolean> => {
    if (username === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      setIsAdminOverrideLoggedIn(true);
      setCurrentUser(null); // Clear any Firebase user
      toast({ title: "Admin signed in successfully!", description: "Welcome Admin!" });
      closeAuthDialog();
      return true;
    }
    toast({ title: "Admin sign-in failed", description: "Invalid credentials.", variant: "destructive" });
    return false;
  };

  const logOut = async () => {
    try {
      await fbSignOut(auth); // Sign out Firebase user
      setCurrentUser(null);
      setIsAdminOverrideLoggedIn(false); // Also log out admin override
      toast({ title: "Signed out successfully."});
    } catch (error: any) {
      console.error("Sign Out Error:", error);
      toast({ title: "Sign-out failed", description: error.message, variant: "destructive" });
    }
  };

  const openAuthDialog = (mode: 'default' | 'adminOnly' = 'default') => {
    setAuthDialogMode(mode);
    setIsAuthDialogOpen(true);
  };
  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
     // Reset to default mode when dialog closes, in case it was opened in adminOnly mode
    setTimeout(() => setAuthDialogMode('default'), 150);
  };


  const value = {
    currentUser,
    loadingAuthState,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    logOut,
    isAuthDialogOpen,
    openAuthDialog,
    closeAuthDialog,
    isAdminOverrideLoggedIn,
    loginAsAdminOverride,
    authDialogMode,
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
