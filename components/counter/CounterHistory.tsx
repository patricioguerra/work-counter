import { useCounter } from '@/app/lib/context/CounterContext';
import { createClient } from '@/app/utils/supabase/client';
import { CounterStatus } from '@/types';

type Props = { times: string[] };

export default function CounterHistory({ times }: Props) {
  const { status, saveCounter } = useCounter();
  const handleCopy = () => {
    const formattedTimes = times.join('\t');
    navigator.clipboard.writeText(formattedTimes);
  };

  const handleSave = async () => {
    const supabase = createClient();
    const { error } = await supabase.from('history').upsert(
      {
        history: times.join('/'),
        date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
      { onConflict: 'date' },
    );
    saveCounter();
    if (error) throw error;
  };

  return (
    <div className="grid w-full grid-cols-2 gap-y-2 pt-3">
      <span>Today&apos;s history:</span>
      <div className="ml-auto flex gap-x-2">
        <button className="cs-btn cursor-pointer hover:underline" onClick={handleCopy}>
          Copy
        </button>
        <button
          className="cs-btn cursor-pointer hover:underline"
          onClick={handleSave}
          disabled={status !== CounterStatus.STOPPED}
        >
          {status === CounterStatus.SAVED ? 'Saved' : 'Save'}
        </button>
      </div>
      <div className="col-span-2 flex min-h-10 flex-wrap space-x-4">
        {times.map((time, index) => (
          <div key={time + '-' + index}>
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
