
'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode }
  from 'react';
import type { RegistrationFormValues } from '@/components/sections/registration-form-section'; // Assuming this type is exported

export interface RegistrationEntry extends RegistrationFormValues {
  id: string;
  submittedAt: Date;
  paymentScreenshotFilename?: string | null; // Store filename or indicator
}

interface RegistrationContextType {
  registrations: RegistrationEntry[];
  addRegistration: (data: RegistrationFormValues) => void;
  updateRegistration: (id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => void;
  deleteRegistration: (id: string) => void;
  getRegistrationById: (id: string) => RegistrationEntry | undefined;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);

  const addRegistration = useCallback((data: RegistrationFormValues) => {
    const newEntry: RegistrationEntry = {
      ...data,
      id: generateId(),
      submittedAt: new Date(),
      paymentScreenshotFilename: data.paymentScreenshot instanceof FileList && data.paymentScreenshot.length > 0
        ? data.paymentScreenshot[0].name
        : null,
      // Ensure numberOfFamilyMembers is stored appropriately
      numberOfFamilyMembers: data.registrationType === 'family' ? data.numberOfFamilyMembers : undefined,
    };
    setRegistrations(prev => [...prev, newEntry]);
  }, []);

  const updateRegistration = useCallback((id: string, data: Partial<Omit<RegistrationEntry, 'id' | 'submittedAt'>>) => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, ...data, submittedAt: reg.submittedAt } : reg)) // Keep original submission date
    );
  }, []);

  const deleteRegistration = useCallback((id: string) => {
    setRegistrations(prev => prev.filter(reg => reg.id !== id));
  }, []);

  const getRegistrationById = useCallback((id: string) => {
    return registrations.find(reg => reg.id === id);
  }, [registrations]);

  // Log current registrations for debugging (client-side only)
  useEffect(() => {
    // console.log("Current registrations (client-side):", registrations);
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

