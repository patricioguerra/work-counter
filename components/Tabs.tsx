'use client';
import React, { useState } from 'react';
import Counter from './counter/Counter';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('tabone');

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
        checked={activeTab === 'tabtwo'}
        onChange={() => setActiveTab('tabtwo')}
      />
      <label className="label cursor-pointer" htmlFor="tabtwo">
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
