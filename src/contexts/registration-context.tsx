
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { RegistrationFormValues } from '@/components/forms/specific-registration-form';
import { db, auth } from '@/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './auth-context';

export interface RegistrationEntry extends Omit<RegistrationFormValues, 'paymentScreenshot' | 'agreeToTerms'> {
  id: string;
  submittedAt: Date;
  paymentScreenshotFilename?: string | null;
  agreeToTerms: boolean;
}

interface RegistrationContextType {
  registrations: RegistrationEntry[];
  addRegistration: (data: RegistrationFormValues) => Promise<void>;
  updateRegistration: (id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
  getRegistrationById: (id: string) => RegistrationEntry | undefined;
  loadingRegistrations: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(true);
  const { toast } = useToast();
  const { currentUser: authContextCurrentUser, loadingAuthState, isAdmin } = useAuth();

  useEffect(() => {
    // 1. Wait for auth state to be fully resolved before deciding anything.
    if (loadingAuthState) {
      console.log("RegistrationProvider: Waiting for auth state to resolve...");
      setLoadingRegistrations(true);
      return; // Exit early, will re-run when loadingAuthState changes.
    }

    let unsubscribe: () => void = () => {};

    // 2. Only set up the listener if the user is a logged-in admin.
    if (authContextCurrentUser && isAdmin) {
      setLoadingRegistrations(true);
      console.log("RegistrationProvider: Admin user detected, setting up Firestore listener for /registrations collection...");
      
      const q = query(collection(db, "registrations"), orderBy("submittedAt", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedRegistrations: RegistrationEntry[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          let submittedAtDate: Date;
          const submittedAtValue = data.submittedAt;

          if (submittedAtValue instanceof Timestamp) {
            submittedAtDate = submittedAtValue.toDate();
          } else if (submittedAtValue && typeof submittedAtValue.seconds === 'number') {
            submittedAtDate = new Timestamp(submittedAtValue.seconds, submittedAtValue.nanoseconds).toDate();
          } else if (submittedAtValue instanceof Date) {
            submittedAtDate = submittedAtValue;
          } else if (submittedAtValue === null) {
            submittedAtDate = new Date(); // Fallback for null
          } else {
            console.warn(`Registration ${doc.id} has an invalid 'submittedAt' value:`, submittedAtValue, `Using current date as fallback.`);
            submittedAtDate = new Date();
          }

          return {
            id: doc.id,
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            registrationType: data.registrationType || 'others',
            numberOfFamilyMembers: data.numberOfFamilyMembers,
            address: data.address,
            expectations: data.expectations,
            paymentScreenshotFilename: data.paymentScreenshotFilename,
            agreeToTerms: data.agreeToTerms === true,
            submittedAt: submittedAtDate,
          } as RegistrationEntry;
        });
        setRegistrations(fetchedRegistrations);
        setLoadingRegistrations(false);
        console.log("RegistrationProvider: Registrations fetched/updated from Firestore:", fetchedRegistrations.length, "registrations found.");
      }, (error) => {
        console.error("RegistrationProvider: Error fetching registrations from Firestore in onSnapshot: ", error);
        toast({
          title: "Error Fetching Registrations",
          description: `Could not load registration data. ${error.message}`,
          variant: "destructive",
        });
        setLoadingRegistrations(false);
      });
    } else {
      // 3. For non-admins or logged-out users, clear data and stop loading.
      console.log('RegistrationProvider: No admin user detected. Clearing registrations.');
      setRegistrations([]);
      setLoadingRegistrations(false);
    }

    // 4. Cleanup function to unsubscribe when the component unmounts or dependencies change.
    return () => {
      console.log("RegistrationProvider: Cleaning up Firestore listener.");
      unsubscribe();
    };
  }, [authContextCurrentUser, isAdmin, loadingAuthState, toast]);


  const addRegistration = useCallback(async (data: RegistrationFormValues) => {
    const firebaseCurrentUser = auth.currentUser;
    if (!firebaseCurrentUser) {
      toast({
        title: "Authentication Error",
        description: "You are not signed in. Please sign in and try again.",
        variant: "destructive",
      });
      throw new Error("User not authenticated for addRegistration.");
    }
    
    const { paymentScreenshot, numberOfFamilyMembers, ...restOfData } = data;

    const baseEntry = {
      ...restOfData,
      userId: firebaseCurrentUser.uid,
      paymentScreenshotFilename: paymentScreenshot instanceof File ? paymentScreenshot.name : null,
      agreeToTerms: data.agreeToTerms,
      submittedAt: serverTimestamp(),
    };

    const newEntryForFirestore: Omit<RegistrationEntry, 'id' | 'submittedAt'> = data.registrationType === 'family'
      ? { ...baseEntry, numberOfFamilyMembers }
      : { ...baseEntry };

    try {
      await addDoc(collection(db, "registrations"), { ...newEntryForFirestore, submittedAt: serverTimestamp() });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Please try again.";
      toast({
        title: "Registration Firestore Error",
        description: `Could not save your registration. ${message}`,
        variant: "destructive",
      });
      throw e;
    }
  }, [toast]);

  const updateRegistration = useCallback(async (id: string, dataToUpdate: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => {
    const regDocRef = doc(db, "registrations", id);
    try {
      const processedDataToUpdate = { ...dataToUpdate };
      if (processedDataToUpdate.registrationType !== 'family' && 'numberOfFamilyMembers' in processedDataToUpdate) {
        processedDataToUpdate.numberOfFamilyMembers = undefined;
      }
      
      await updateDoc(regDocRef, processedDataToUpdate);
      toast({
        title: "Registration Updated",
        description: "The registration details have been successfully updated.",
        variant: "default",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast({
        title: "Update Failed",
        description: `Could not update the registration. ${message}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteRegistration = useCallback(async (id: string) => {
    const regDocRef = doc(db, "registrations", id);
    try {
      await deleteDoc(regDocRef);
      toast({
        title: "Registration Deleted",
        description: "The registration has been successfully deleted.",
        variant: "default",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Please try again.";
      toast({
        title: "Deletion Failed",
        description: `Could not delete the registration. ${message}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const getRegistrationById = useCallback((id: string) => {
    return registrations.find(reg => reg.id === id);
  }, [registrations]);

  useEffect(() => {
     console.log("RegistrationContext: Current registrations array updated:", registrations.length, "registrations in state.");
  }, [registrations]);


  const value = {
    registrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
    getRegistrationById,
    loadingRegistrations,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrations() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
}

