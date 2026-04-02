import { useState } from "react";

interface usePaginationProps<T> {
  data: T[];
  pageSize: number;
}

export function usePagination<T>({ data, pageSize }: usePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startIdx = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    handlePrev,
    handleNext,
    startIdx,
    endIdx,
    canPrev: currentPage > 1,
    canNext: currentPage < totalPages,
  };
}
