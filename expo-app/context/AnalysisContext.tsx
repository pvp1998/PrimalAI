import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AnalysisResult {
  id: string;
  title: string;
  date: string;
  score: number;
  skill: string;
}

interface AnalysisContextType {
  history: AnalysisResult[];
  addAnalysis: (analysis: AnalysisResult) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

const initialHistory: AnalysisResult[] = [
  {
    id: '1',
    title: 'Muscle Up Analysis',
    date: 'Today, 10:23 AM',
    score: 82,
    skill: 'Muscle Up',
  },
  {
    id: '2',
    title: 'Handstand Hold',
    date: 'Yesterday, 4:15 PM',
    score: 65,
    skill: 'Handstand',
  },
  {
    id: '3',
    title: 'Front Lever Attempt',
    date: 'Mon, 12 Nov',
    score: 45,
    skill: 'Front Lever',
  },
];

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<AnalysisResult[]>(initialHistory);

  const addAnalysis = (analysis: AnalysisResult) => {
    setHistory((prev) => [analysis, ...prev]);
  };

  return (
    <AnalysisContext.Provider value={{ history, addAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
