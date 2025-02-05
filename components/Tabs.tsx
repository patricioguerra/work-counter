'use client';
import React, { useState } from 'react';
import Counter from './counter/Counter';
import { useCounter } from '@/context/CounterContext';
import { CounterStatus } from '@/types';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('tabone');
  const { status } = useCounter();
  return (
    <div className="cs-tabs w-full text-lg">
      <input
        className="radiotab hidden"
        name="tabs"
        type="radio"
        id="tabone"
        checked={activeTab === 'tabone'}
        onChange={() => setActiveTab('tabone')}
      />
      <label className="label cursor-pointer" htmlFor="tabone">
        Timer
      </label>
      {activeTab === 'tabone' && (
        <div className="panel" tabIndex={1}>
          <Counter />
        </div>
      )}

      <input
        className="radiotab hidden"
        name="tabs"
        type="radio"
        id="tabtwo"
        disabled={status === CounterStatus.RUNNING}
        checked={activeTab === 'tabtwo'}
        onChange={() => setActiveTab('tabtwo')}
      />
      <label
        className={`${status === CounterStatus.RUNNING ? '!cursor-default !text-[#292c21]' : 'cursor-pointer'} label`}
        style={status === CounterStatus.RUNNING ? { textShadow: '1px 1px #75806f' } : {}}
        htmlFor="tabtwo"
      >
        History
      </label>
      {activeTab === 'tabtwo' && (
        <div className="panel" tabIndex={2}>
          <h2>Tab Two Content</h2>
          <p>Tab content...</p>
        </div>
      )}
    </div>
  );
}
