import React from 'react';

type Props = { times: string[] };

export default function CounterHistory({ times }: Props) {
  const handleCopy = () => {
    const formattedTimes = times.join('\t');
    navigator.clipboard.writeText(formattedTimes);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-y-2 pt-3">
      <span>Today's history:</span>
      <button className="ml-auto cursor-pointer hover:underline" onClick={handleCopy}>
        copy
      </button>
      <div className="col-span-2 flex flex-row space-x-4">
        {times.map((time, index) => (
          <div key={time + '-' + index}>
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
