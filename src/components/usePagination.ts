import { useState } from "react";

export const usePagination = (totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setOffset((newPage - 1) * limit);
  };

  return { currentPage, totalPages, offset, limit, handlePageChange };
};
