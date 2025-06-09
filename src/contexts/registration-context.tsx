
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode }
  from 'react';
import type { RegistrationFormValues } from '@/components/forms/specific-registration-form';
import { db } from '@/lib/firebase'; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';


export interface RegistrationEntry extends RegistrationFormValues {
  id: string; // Firestore document ID will be used here when fetching
  submittedAt: Date | firebase.firestore.Timestamp; // Allow both for local state and Firestore
  paymentScreenshotFilename?: string | null;
}

interface RegistrationContextType {
  registrations: RegistrationEntry[];
  addRegistration: (data: RegistrationFormValues) => Promise<void>; // Make async
  updateRegistration: (id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => void;
  deleteRegistration: (id: string) => void;
  getRegistrationById: (id: string) => RegistrationEntry | undefined;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Helper to generate unique IDs for local state fallback if needed, though Firestore provides IDs
const generateLocalId = () => Math.random().toString(36).substr(2, 9);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);
  const { toast } = useToast();

  const addRegistration = useCallback(async (data: RegistrationFormValues) => {
    const newEntryForFirestore = {
      ...data,
      // Remove paymentScreenshot FileList before saving to Firestore
      paymentScreenshot: undefined,
      paymentScreenshotFilename: data.paymentScreenshot instanceof FileList && data.paymentScreenshot.length > 0
        ? data.paymentScreenshot[0].name
        : data.paymentScreenshot instanceof File // Handle single file case if input changes
        ? (data.paymentScreenshot as File).name
        : null,
      numberOfFamilyMembers: data.registrationType === 'family' ? data.numberOfFamilyMembers : undefined,
      submittedAt: serverTimestamp(), // Use Firestore server timestamp
    };

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "registrations"), newEntryForFirestore);
      console.log("Document written to Firestore with ID: ", docRef.id);

      // Add to local state for immediate UI update (will be replaced by Firestore listener later)
      // For local state, we'll use a client-side date and the Firestore ID
      const newEntryForLocalState: RegistrationEntry = {
        ...data,
        id: docRef.id, // Use Firestore document ID
        submittedAt: new Date(), // Use local date for now for local state
        paymentScreenshotFilename: newEntryForFirestore.paymentScreenshotFilename,
        numberOfFamilyMembers: newEntryForFirestore.numberOfFamilyMembers,
      };
      setRegistrations(prev => [...prev, newEntryForLocalState]);
      
      // Toast is handled in the form itself after this function resolves
    } catch (e) {
      console.error("Error adding document to Firestore: ", e);
      toast({
        title: "Registration Failed",
        description: "Could not save your registration to the database. Please try again.",
        variant: "destructive",
      });
      throw e; // Re-throw error so the form can catch it
    }
  }, [toast]);

  const updateRegistration = useCallback((id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => {
    // TODO: Implement Firestore update in Chunk 5
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, ...data, submittedAt: reg.submittedAt } : reg))
    );
    console.log("Update called for local state (Firestore update pending):", id, data);
  }, []);

  const deleteRegistration = useCallback((id: string) => {
    // TODO: Implement Firestore delete in Chunk 5
    setRegistrations(prev => prev.filter(reg => reg.id !== id));
    console.log("Delete called for local state (Firestore delete pending):", id);
  }, []);

  const getRegistrationById = useCallback((id: string) => {
    return registrations.find(reg => reg.id === id);
  }, [registrations]);

  useEffect(() => {
    // This log shows the client-side state. It will be replaced by Firestore data later.
    console.log("Current registrations in context (client-side state):", JSON.stringify(registrations, null, 2));
  }, [registrations]);


  const value = {
    registrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
    getRegistrationById,
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
