import { useState } from 'react';

import { ITouristItem } from '../types/ITouristItem';
import TouristList from './TouristList';

export default function Pagination({
  items,
  onHandlePageChange,
  curPage = 1,
  pageSize = 20
}: {
  items: ITouristItem[];
  onHandlePageChange?: (page: number) => void;
  curPage?: number;
  pageSize?: number;
}) {
  const [currentPage, setCurrentPage] = useState(curPage);
  const pageCount = Math.ceil(items.length / pageSize);

  function goto_previous() {
    const page = Math.max(currentPage - 1, 1);
    setCurrentPage(page);
    onHandlePageChange && onHandlePageChange(page);
  }

  function goto_next() {
    const page = Math.min(currentPage + 1, pageCount);
    setCurrentPage(page);
    onHandlePageChange && onHandlePageChange(page);
  }

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 my-4 mx-8 lg:mx-48">
        <TouristList items={currentItems} />
      </div>
      <div className={`flex join my-8 mx-auto ${pageCount <= 1 ? 'hidden' : ''}`}>
        <button
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => {
            goto_previous();
          }}
        >
          «
        </button>
        <button className="join-item btn">{currentPage}</button>
        <button
          className={`join-item btn ${currentPage === pageCount ? 'btn-disabled' : ''}`}
          onClick={() => {
            goto_next();
          }}
        >
          »
        </button>
      </div>
    </div>
  );
}
