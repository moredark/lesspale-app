import React, { useState, useEffect } from "react";
import { range } from "lodash";
import classNames from "classnames";

interface Props {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [startIndex, setStartIndex] = useState(0);
  const [numButtons, setNumButtons] = useState(5);

  useEffect(() => {
    if (currentPage <= 3) {
      setStartIndex(0);
      setNumButtons(5);
    } else if (currentPage >= totalPages - 2) {
      setStartIndex(totalPages - 5);
      setNumButtons(5);
    } else {
      setStartIndex(currentPage - 3);
      setNumButtons(5);
    }
  }, [currentPage, totalPages]);

  const pages = range(startIndex + 1, startIndex + numButtons + 1);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav className="flex justify-center">
      <ul className="flex">
        {pages.map((page: number) => {
          const firstItemIndex = (page - 1) * itemsPerPage;
          //   const lastItemIndex = firstItemIndex + itemsPerPage - 1;
          if (firstItemIndex < totalItems) {
            return (
              <li key={page}>
                <button
                  className={classNames(
                    "px-3 py-1 rounded-md mx-1",
                    currentPage === page ? "bg-slate-500 text-gray-200" : "bg-gray-200 text-gray-700"
                  )}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
