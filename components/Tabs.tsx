'use client';
import React, { useState } from 'react';
import Counter from './counter/Counter';
import { useCounter } from '@/app/lib/context/CounterContext';
import { CounterStatus } from '@/types';
import History from './history/History';

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
        <div className="panel min-h-[310px]" tabIndex={1}>
          <Counter />
        </div>
      )}

      <input
        className="radiotab hidden"
        name="tabs"
        type="radio"
        id="tabtwo"
        disabled={status !== CounterStatus.NOT_STARTED}
        checked={activeTab === 'tabtwo'}
        onChange={() => setActiveTab('tabtwo')}
      />
      <label
        className={`${status !== CounterStatus.NOT_STARTED ? '!cursor-default !text-[#292c21]' : 'cursor-pointer'} label`}
        style={status !== CounterStatus.NOT_STARTED ? { textShadow: '1px 1px #75806f' } : {}}
        htmlFor="tabtwo"
      >
        History
      </label>
      {activeTab === 'tabtwo' && (
        <div className="panel min-h-[310px]" tabIndex={2}>
          <History />
        </div>
      )}
    </div>
  );
}
