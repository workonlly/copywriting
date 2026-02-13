'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface College {
  id: string;
  college: string;
  keyword: string;
}

type CollegeContextType = {
  college: College;
  setCollege: (college: College) => void;
};

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

const defaultCollege: College = {
  id: "70573",
  college: "National Institute of Technology, Hamirpur",
  keyword: "NIT Hamirpur"
};

export const CollegeProvider = ({ children }: { children: ReactNode }) => {
  const [college, setCollege] = useState<College>(defaultCollege);
  return (
    <CollegeContext.Provider value={{ college, setCollege }}>
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) throw new Error('useCollege must be used within a CollegeProvider');
  return context;
};
