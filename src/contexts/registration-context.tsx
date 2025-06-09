
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode }
  from 'react';
import type { RegistrationFormValues } from '@/components/forms/specific-registration-form'; 
import { db, auth } from '@/lib/firebase'; // Import auth
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
// Import useAuth to get currentUser directly if needed, though it's better if RegistrationForm passes it or checks it
// For robust diagnostics, we can check it here too.
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
  const { currentUser: authContextCurrentUser } = useAuth(); // Get currentUser from AuthContext for diagnostics

  useEffect(() => {
    setLoadingRegistrations(true);
    console.log("RegistrationProvider: Setting up Firestore listener for /registrations collection...");
    const q = query(collection(db, "registrations"), orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRegistrations: RegistrationEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let submittedAtDate: Date;
        if (data.submittedAt instanceof Timestamp) {
          submittedAtDate = data.submittedAt.toDate();
        } else if (data.submittedAt && typeof data.submittedAt.seconds === 'number') {
          submittedAtDate = new Timestamp(data.submittedAt.seconds, data.submittedAt.nanoseconds).toDate();
        } else if (data.submittedAt instanceof Date) {
          submittedAtDate = data.submittedAt;
        } else {
          console.warn(`Registration ${doc.id} has an invalid submittedAt, using current date as fallback.`);
          submittedAtDate = new Date(); 
        }

        fetchedRegistrations.push({
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
        } as RegistrationEntry); 
      });
      setRegistrations(fetchedRegistrations);
      setLoadingRegistrations(false);
      console.log("RegistrationProvider: Registrations fetched/updated from Firestore:", JSON.stringify(fetchedRegistrations.length, null, 2), "registrations found.");
    }, (error) => {
      console.error("RegistrationProvider: Error fetching registrations from Firestore in onSnapshot: ", error);
      toast({
        title: "Error Fetching Registrations",
        description: `Could not load registration data. ${error.message}`,
        variant: "destructive",
      });
      setLoadingRegistrations(false);
    });

    return () => {
      console.log("RegistrationProvider: Unsubscribing Firestore listener for /registrations.");
      unsubscribe();
    }
  }, [toast]);


  const addRegistration = useCallback(async (data: RegistrationFormValues) => {
    console.log("RegistrationContext: addRegistration CALLED with data:", JSON.stringify(data, (key, value) => value instanceof File ? value.name : value, 2));
    
    // Diagnostic: Check currentUser from auth context at the moment of attempting to add registration
    const firebaseCurrentUser = auth.currentUser; // Directly check Firebase auth's current user
    console.log("RegistrationContext: Firebase auth.currentUser at time of addRegistration:", firebaseCurrentUser ? firebaseCurrentUser.uid : "null");
    console.log("RegistrationContext: AuthContext currentUser at time of addRegistration:", authContextCurrentUser ? authContextCurrentUser.uid : "null");

    if (!firebaseCurrentUser) {
      console.error("RegistrationContext: User is NOT authenticated at the point of addRegistration. Aborting.");
      toast({
        title: "Authentication Error",
        description: "You are not signed in. Please sign in and try again.",
        variant: "destructive",
      });
      throw new Error("User not authenticated for addRegistration.");
    }
    
    const { paymentScreenshot, ...restOfData } = data;

    const newEntryForFirestore: Omit<RegistrationEntry, 'id' | 'submittedAt' | 'paymentScreenshotFilename' | 'agreeToTerms'> & { submittedAt: any; paymentScreenshotFilename?: string | null, agreeToTerms: boolean, userId: string } = {
      ...restOfData,
      userId: firebaseCurrentUser.uid, // Store the UID of the user who made the registration
      numberOfFamilyMembers: data.registrationType === 'family' ? data.numberOfFamilyMembers : undefined,
      paymentScreenshotFilename: paymentScreenshot instanceof File ? paymentScreenshot.name : null,
      agreeToTerms: data.agreeToTerms,
      submittedAt: serverTimestamp(),
    };
    console.log("RegistrationContext: Data prepared for Firestore:", JSON.stringify(newEntryForFirestore, null, 2));

    try {
      console.log("RegistrationContext: Attempting addDoc to 'registrations' collection in Firestore...");
      const docRef = await addDoc(collection(db, "registrations"), newEntryForFirestore);
      console.log("RegistrationContext: Document written to Firestore with ID: ", docRef.id);
      // Success toast is handled in the form component after this promise resolves.
    } catch (e) {
      console.error("RegistrationContext: Error during addDoc to Firestore:", e);
      toast({
        title: "Registration Firestore Error",
        description: `Could not save your registration. ${(e as Error).message || "Please try again."}`,
        variant: "destructive",
      });
      throw e; // Re-throw the error so the calling component can also catch it
    }
  }, [toast, authContextCurrentUser]); // Added authContextCurrentUser to dependency array

  const updateRegistration = useCallback(async (id: string, dataToUpdate: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => {
    console.log(`RegistrationContext: updateRegistration called for ID ${id} with data:`, dataToUpdate);
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
    } catch (error) {
      console.error("Error updating registration in Firestore: ", error);
      toast({
        title: "Update Failed",
        description: `Could not update the registration. ${(error as Error).message || "Please try again."}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteRegistration = useCallback(async (id: string) => {
    console.log(`RegistrationContext: deleteRegistration called for ID ${id}`);
    const regDocRef = doc(db, "registrations", id);
    try {
      await deleteDoc(regDocRef);
      toast({
        title: "Registration Deleted",
        description: "The registration has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting registration from Firestore: ", error);
      toast({
        title: "Deletion Failed",
        description: `Could not delete the registration. ${(error as Error).message || "Please try again."}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const getRegistrationById = useCallback((id: string) => {
    return registrations.find(reg => reg.id === id);
  }, [registrations]);

  useEffect(() => {
     console.log("RegistrationContext: Current registrations array updated:", JSON.stringify(registrations.length, null, 2), "registrations in state.");
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

