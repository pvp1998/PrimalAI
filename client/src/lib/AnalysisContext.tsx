import React, { createContext, useContext, useState, ReactNode } from 'react';
import thumb1 from "@assets/generated_images/calisthenics_athlete_doing_a_muscle_up_outdoors.png";
import thumb2 from "@assets/generated_images/person_doing_a_handstand_on_yoga_mat.png";
import thumb3 from "@assets/generated_images/athlete_holding_a_front_lever_on_rings.png";

export interface AnalysisResult {
  id: string;
  title: string;
  date: string; // simplified for mockup
  score: number;
  thumbnail: string;
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
    thumbnail: thumb1,
    skill: 'Muscle Up'
  },
  {
    id: '2',
    title: 'Handstand Hold',
    date: 'Yesterday, 4:15 PM',
    score: 65,
    thumbnail: thumb2,
    skill: 'Handstand'
  },
  {
    id: '3',
    title: 'Front Lever Attempt',
    date: 'Mon, 12 Nov',
    score: 45,
    thumbnail: thumb3,
    skill: 'Front Lever'
  }
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
