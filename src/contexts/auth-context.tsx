
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
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuthState(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
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
    try {
      const userCredential = await fbCreateUserWithEmailAndPassword(auth, email, pass);
      setCurrentUser(userCredential.user);
      toast({ title: "Signed up successfully!", description: `Welcome ${userCredential.user.email}!` });
      closeAuthDialog();
      return userCredential.user;
    } catch (error: any) {
      console.error("Email Sign-Up Error:", error);
      toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
      return null;
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<User | null> => {
    try {
      const userCredential = await fbSignInWithEmailAndPassword(auth, email, pass);
      setCurrentUser(userCredential.user);
      toast({ title: "Signed in successfully!", description: `Welcome ${userCredential.user.email}!` });
      closeAuthDialog();
      return userCredential.user;
    } catch (error: any) {
      console.error("Email Sign-In Error:", error);
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      return null;
    }
  };

  const logOut = async () => {
    try {
      await fbSignOut(auth);
      setCurrentUser(null);
      toast({ title: "Signed out successfully."});
    } catch (error: any) {
      console.error("Sign Out Error:", error);
      toast({ title: "Sign-out failed", description: error.message, variant: "destructive" });
    }
  };

  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

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
