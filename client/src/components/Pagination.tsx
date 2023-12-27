import { useEffect, useState } from 'react';

import ITouristItem from '../types/ITouristItem';
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
  const [currentItems, setCurrentItems] = useState<ITouristItem[]>([]);

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

  useEffect(() => {
    // re-render
    setCurrentPage(curPage);
    const indexOfLastItem = curPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
  }, [items, curPage]);

  return (
    <div className="flex flex-col">
      <TouristList items={currentItems} />
      <div className={`flex join my-8 mx-auto ${pageCount <= 1 ? 'hidden' : ''}`}>
        <button
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => {
            goto_previous();
          }}
        >
          «
        </button>
        <button
          className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => {
            setCurrentPage(1);
            onHandlePageChange && onHandlePageChange(1);
          }}
        >
          首页
        </button>
        <button className="join-item btn">{currentPage}</button>
        <button
          className={`join-item btn ${currentPage === pageCount ? 'btn-disabled' : ''}`}
          onClick={() => {
            setCurrentPage(pageCount);
            onHandlePageChange && onHandlePageChange(pageCount);
          }}
        >
          尾页
        </button>
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
