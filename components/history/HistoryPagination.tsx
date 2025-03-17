import { HistoryType } from '@/types';
import React from 'react';

type Props = {
  history: HistoryType[];
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
};

export default function HistoryPagination({
  history,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}: Props) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        className="cs-btn mx-1"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {`<`}
      </button>
      <span className="mx-2">Page {currentPage}</span>
      <button
        className="cs-btn mx-1"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(history.length / itemsPerPage)}
      >
        {`>`}
      </button>
    </div>
  );
}
