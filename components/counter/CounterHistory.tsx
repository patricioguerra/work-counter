import { useCounter } from '@/lib/context/CounterContext';
import { CounterStatus } from '@/types';
import React from 'react';

type Props = { times: string[] };

export default function CounterHistory({ times }: Props) {
  const { status } = useCounter();
  const handleCopy = () => {
    const formattedTimes = times.join('\t');
    navigator.clipboard.writeText(formattedTimes);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-y-2 pt-3">
      <span>Today's history:</span>
      <div className="ml-auto flex gap-x-2">
        <button className="cs-btn cursor-pointer hover:underline" onClick={handleCopy}>
          Copy
        </button>
        <button
          className="cs-btn cursor-pointer hover:underline"
          onClick={handleCopy}
          disabled={status !== CounterStatus.STOPPED}
        >
          Save
        </button>
      </div>
      <div className="col-span-2 flex min-h-10 flex-row space-x-4">
        {times.map((time, index) => (
          <div key={time + '-' + index}>
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
