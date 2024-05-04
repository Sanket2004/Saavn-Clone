import React from 'react';

function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }) {
  const handlePrevPage = () => {
    onPrevPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    onNextPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-8">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`mr-2 text-black w-8 h-8 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <span className='text-black text-sm'>Page {currentPage}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`ml-2 text-black w-8 h-8 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}

export default Pagination;
