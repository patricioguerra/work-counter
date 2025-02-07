'use client';

import { useCounter } from '@/lib/context/CounterContext';
import React, { useState, useEffect, useRef } from 'react';
import CounterHistory from './CounterHistory';

export default function Counter() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const { startCounter, stopCounter, resetCounter } = useCounter();

  useEffect(() => {
    if (isRunning) {
      // If counter is active, init counter
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      // If isn't active and interval exists, stop interval
      clearInterval(intervalRef.current);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSaveTime = () => {
    const date = new Date();
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    setTimes((prevTimes) => [...prevTimes, formattedTime]);
  };

  const handleStart = () => {
    setIsRunning(true);
    handleSaveTime();
    startCounter();
  };
  const handleStop = () => {
    setIsRunning(false);
    handleSaveTime();
    stopCounter();
  };
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setTimes([]);
    resetCounter();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 md:p-6">
      <h2 className="text-3xl font-bold tracking-wider">{formatTime(seconds)}</h2>

      <div className="space-x-4">
        <button onClick={handleStart} disabled={isRunning} className="cs-btn">
          Start
        </button>

        <button onClick={handleStop} disabled={!isRunning} className="cs-btn">
          Stop
        </button>

        <button onClick={handleReset} className="cs-btn" disabled={seconds === 0}>
          Reset
        </button>
      </div>
      <hr className="cs-hr w-full" />
      <CounterHistory times={times} />
    </div>
  );
}
