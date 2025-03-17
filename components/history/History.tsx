import { createClient } from '@/app/utils/supabase/client';
import { HistoryType } from '@/types';
import React, { useEffect, useState } from 'react';
import HistoryPagination from './HistoryPagination';

type Props = {};

export default function History({}: Props) {
  const [history, setHistory] = useState<HistoryType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCopy = (history: string) => {
    const formattedTimes = history.split('/').join('\t');
    navigator.clipboard.writeText(formattedTimes);
  };

  useEffect(() => {
    const getData = async () => {
      const supabase = createClient();
      const { data: history, error } = await supabase
        .from('history')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      setHistory(history);
    };
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col justify-center pt-10">
      <div>
        {currentItems.map((item) => (
          <div key={item.date}>
            <div className="flex flex-row justify-between gap-x-2">
              <p className="flex-1 whitespace-nowrap">{item.date}</p>
              <p className="truncate">{item.history.split('/').join(' | ')}</p>
              <button
                className="cs-btn cursor-pointer hover:underline"
                onClick={() => handleCopy(item.history)}
              >
                Copy
              </button>
            </div>
            <hr className="cs-hr flex" />
          </div>
        ))}
      </div>
      <HistoryPagination
        history={history}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
