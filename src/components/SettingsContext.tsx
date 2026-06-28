'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  phone: string;
  email: string;
  loading: boolean;
  refreshSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  phone: '+1 (555) 123-4567',
  email: 'info@pulvergloballogistics.com',
  loading: true,
  refreshSettings: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('info@pulvergloballogistics.com');
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        if (data.data.phone) setPhone(data.data.phone);
        if (data.data.email) setEmail(data.data.email);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ phone, email, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);