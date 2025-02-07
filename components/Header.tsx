'use client';
import { useCounter } from '@/lib/context/CounterContext';
import React from 'react';

export default function Header() {
  const { status } = useCounter();
  return (
    <div>
      <h1 className="text-4xl font-medium tracking-wide">Work timer</h1>
      <div className="text-2xl tracking-wide">{status}</div>
    </div>
  );
}
