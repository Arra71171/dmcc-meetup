
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode }
  from 'react';
// Ensure RegistrationFormValues is imported correctly based on the new type export from specific-registration-form
import type { RegistrationFormValues } from '@/components/forms/specific-registration-form'; 
import { db } from '@/lib/firebase';
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

// This interface represents the data structure in Firestore and in the context's state.
// `paymentScreenshot` itself is not stored; only its filename is.
export interface RegistrationEntry extends Omit<RegistrationFormValues, 'paymentScreenshot' | 'agreeToTerms'> {
  id: string;
  submittedAt: Date; 
  paymentScreenshotFilename?: string | null; // Filename of the uploaded screenshot
  agreeToTerms: boolean; // Explicitly include agreeToTerms as it's part of the form
}

interface RegistrationContextType {
  registrations: RegistrationEntry[];
  addRegistration: (data: RegistrationFormValues) => Promise<void>; // Expects transformed data
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

  useEffect(() => {
    setLoadingRegistrations(true);
    console.log("RegistrationProvider: Setting up Firestore listener...");
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
          paymentScreenshotFilename: data.paymentScreenshotFilename, // This comes from Firestore
          agreeToTerms: data.agreeToTerms === true, // Ensure boolean
          submittedAt: submittedAtDate,
        } as RegistrationEntry); // Cast to ensure all fields are present
      });
      setRegistrations(fetchedRegistrations);
      setLoadingRegistrations(false);
      console.log("Registrations fetched from Firestore:", JSON.stringify(fetchedRegistrations, null, 2));
    }, (error) => {
      console.error("Error fetching registrations from Firestore: ", error);
      toast({
        title: "Error Fetching Registrations",
        description: "Could not load registration data from the database.",
        variant: "destructive",
      });
      setLoadingRegistrations(false);
    });

    return () => {
      console.log("RegistrationProvider: Unsubscribing Firestore listener.");
      unsubscribe();
    }
  }, [toast]);


  const addRegistration = useCallback(async (data: RegistrationFormValues) => {
    console.log("RegistrationContext: addRegistration called with data:", data);
    // `data.paymentScreenshot` is `File | null` here due to Zod transform in the form.
    
    const newEntryForFirestore = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      registrationType: data.registrationType,
      numberOfFamilyMembers: data.registrationType === 'family' ? data.numberOfFamilyMembers : undefined,
      address: data.address,
      expectations: data.expectations,
      paymentScreenshotFilename: data.paymentScreenshot ? data.paymentScreenshot.name : null, // Correctly access .name if File
      agreeToTerms: data.agreeToTerms,
      submittedAt: serverTimestamp(),
    };
    console.log("RegistrationContext: Prepared data for Firestore:", newEntryForFirestore);

    try {
      const docRef = await addDoc(collection(db, "registrations"), newEntryForFirestore);
      console.log("Document written to Firestore with ID: ", docRef.id);
      // onSnapshot will update local state, so no manual push here.
    } catch (e) {
      console.error("Error adding document to Firestore in addRegistration:", e);
      toast({
        title: "Registration Failed",
        description: `Could not save your registration. ${(e as Error).message || "Please try again."}`,
        variant: "destructive",
      });
      throw e; // Re-throw to be caught by the form's onSubmit
    }
  }, [toast]);

  const updateRegistration = useCallback(async (id: string, dataToUpdate: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => {
    console.log(`RegistrationContext: updateRegistration called for ID ${id} with data:`, dataToUpdate);
    const regDocRef = doc(db, "registrations", id);
    try {
      const processedDataToUpdate = { ...dataToUpdate };
      if (processedDataToUpdate.registrationType !== 'family' && 'numberOfFamilyMembers' in processedDataToUpdate) {
        processedDataToUpdate.numberOfFamilyMembers = undefined;
      }
      // Note: paymentScreenshotFilename would need to be handled separately if file updates were allowed via edit.
      // For now, we assume the form only updates non-file fields from RegistrationEntry.
      
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
    console.log("Current registrations in context (client-side, synced from Firestore):", JSON.stringify(registrations, null, 2));
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
