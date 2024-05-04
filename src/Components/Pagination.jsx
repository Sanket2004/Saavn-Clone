import React from 'react'

function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-8">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`mr-2 text-black bg-sky-400 w-8 h-8 rounded-lg text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <span className='text-black'>Page {currentPage}</span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`ml-2 text-black bg-sky-400 w-8 h-8 rounded-lg text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}

export default Pagination
