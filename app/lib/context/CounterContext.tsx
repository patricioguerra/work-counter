'use client';
import { CounterStatus } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

type CounterContextType = {
  status: CounterStatus;
  startCounter: () => void;
  stopCounter: () => void;
  resetCounter: () => void;
  saveCounter: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export default function CounterProvider({ children }: Props) {
  const [status, setStatus] = useState<CounterStatus>(CounterStatus.NOT_STARTED);

  const startCounter = () => setStatus(CounterStatus.RUNNING);
  const stopCounter = () => setStatus(CounterStatus.STOPPED);
  const resetCounter = () => setStatus(CounterStatus.NOT_STARTED);
  const saveCounter = () => setStatus(CounterStatus.SAVED);

  return (
    <CounterContext.Provider
      value={{ status, startCounter, stopCounter, resetCounter, saveCounter }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter unexpected use');
  }
  return context;
};
