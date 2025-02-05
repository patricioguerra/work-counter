import React from 'react';

type Props = { times: string[] };

export default function CounterHistory({ times }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-y-2 pt-3">
      Today's history:
      <table className="table-auto">
        <tbody>
          <tr>
            <td> </td>
            {times.map((time, index) => (
              <td key={time + '-' + index} className="border-1 inline-block pr-2">
                <p>{time}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
