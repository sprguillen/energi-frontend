import React from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from '../interfaces';

const Pagination: React.FC<PaginationProps> = ({ pageCount, onClick }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      onPageChange={onClick}
      containerClassName="flex justify-center space-x-2"
      pageClassName="rounded-md"
      pageLinkClassName="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
      previousLinkClassName="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
      nextLinkClassName="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
      activeLinkClassName="border-2 border-green-500 text-slate-500"
    />
  )
}

export default Pagination;
