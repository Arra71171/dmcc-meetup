
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode }
  from 'react';
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
  Timestamp, // Import Timestamp
  updateDoc
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export interface RegistrationEntry extends Omit<RegistrationFormValues, 'paymentScreenshot'> {
  id: string;
  submittedAt: Date; // Ensure this is always Date in the context's state
  paymentScreenshotFilename?: string | null;
  paymentScreenshot?: File | FileList | null | undefined; // Keep for type consistency if needed by form, but not stored directly
}

interface RegistrationContextType {
  registrations: RegistrationEntry[];
  addRegistration: (data: RegistrationFormValues) => Promise<void>;
  updateRegistration: (id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt' | 'paymentScreenshot'>>) => Promise<void>;
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
    const q = query(collection(db, "registrations"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedRegistrations: RegistrationEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure submittedAt is a Date object
        let submittedAtDate: Date;
        if (data.submittedAt instanceof Timestamp) {
          submittedAtDate = data.submittedAt.toDate();
        } else if (data.submittedAt && typeof data.submittedAt.seconds === 'number') {
          // Handle cases where it might be a plain object from serverTimestamp() before conversion
          submittedAtDate = new Timestamp(data.submittedAt.seconds, data.submittedAt.nanoseconds).toDate();
        } else if (data.submittedAt instanceof Date) {
          submittedAtDate = data.submittedAt;
        }
        else {
          submittedAtDate = new Date(); // Fallback, though ideally submittedAt should always exist
        }

        fetchedRegistrations.push({
          ...data,
          id: doc.id,
          // Cast data to appropriate types from Firestore
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          registrationType: data.registrationType || 'others',
          // numberOfFamilyMembers will be undefined if not 'family'
          numberOfFamilyMembers: data.numberOfFamilyMembers,
          address: data.address,
          expectations: data.expectations,
          paymentScreenshotFilename: data.paymentScreenshotFilename,
          agreeToTerms: data.agreeToTerms || false,
          submittedAt: submittedAtDate,
        } as RegistrationEntry);
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

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);


  const addRegistration = useCallback(async (data: RegistrationFormValues) => {
    // Prepare data for Firestore
    const newEntryForFirestore: Omit<RegistrationEntry, 'id' | 'submittedAt' | 'paymentScreenshot' | 'agreeToTerms'> & { submittedAt: any, paymentScreenshotFilename?: string | null, agreeToTerms: boolean } = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      registrationType: data.registrationType,
      numberOfFamilyMembers: data.registrationType === 'family' ? data.numberOfFamilyMembers : undefined,
      address: data.address,
      expectations: data.expectations,
      paymentScreenshotFilename: data.paymentScreenshot instanceof FileList && data.paymentScreenshot.length > 0
        ? data.paymentScreenshot[0].name
        : data.paymentScreenshot instanceof File
        ? (data.paymentScreenshot as File).name
        : null,
      agreeToTerms: data.agreeToTerms,
      submittedAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "registrations"), newEntryForFirestore);
      console.log("Document written to Firestore with ID: ", docRef.id);
      // No need to manually update local state, onSnapshot will handle it.
    } catch (e) {
      console.error("Error adding document to Firestore: ", e);
      toast({
        title: "Registration Failed",
        description: "Could not save your registration to the database. Please try again.",
        variant: "destructive",
      });
      throw e;
    }
  }, [toast]);

  const updateRegistration = useCallback(async (id: string, dataToUpdate: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt' | 'paymentScreenshot'>>) => {
    const regDocRef = doc(db, "registrations", id);
    try {
      // Ensure numberOfFamilyMembers is handled correctly:
      // If it's part of dataToUpdate and is an empty string or undefined,
      // and the type is not 'family', we might want to remove it.
      // Or, if type is 'family' and it's empty, it might be an issue.
      // For now, we pass dataToUpdate as is. The form validation should handle required fields.
      // If registrationType is changed away from 'family', numberOfFamilyMembers might need to be explicitly removed or set to null.
      // The current form logic in AdminDashboardPage handles setting numberOfFamilyMembers to undefined if not 'family'.

      const processedDataToUpdate = { ...dataToUpdate };
      if (processedDataToUpdate.registrationType !== 'family' && 'numberOfFamilyMembers' in processedDataToUpdate) {
        // If type is not family, ensure numberOfFamilyMembers is not sent or is explicitly null/undefined
        // Firestore update with `undefined` will remove the field if it exists.
        processedDataToUpdate.numberOfFamilyMembers = undefined;
      }


      await updateDoc(regDocRef, processedDataToUpdate);
      toast({
        title: "Registration Updated",
        description: "The registration details have been successfully updated.",
        variant: "default",
      });
      // onSnapshot will update local state
    } catch (error) {
      console.error("Error updating registration in Firestore: ", error);
      toast({
        title: "Update Failed",
        description: "Could not update the registration in the database.",
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
      // onSnapshot listener will automatically update the local state.
    } catch (error) {
      console.error("Error deleting registration from Firestore: ", error);
      toast({
        title: "Deletion Failed",
        description: "Could not delete the registration from the database.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const getRegistrationById = useCallback((id: string) => {
    return registrations.find(reg => reg.id === id);
  }, [registrations]);

  useEffect(() => {
    // Using JSON.stringify with a replacer to handle potential circular structures or large objects if any
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
