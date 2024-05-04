import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SongItem from './Components/SongItem';
import SearchInput from './Components/SearchInput';
import Pagination from './Components/Pagination';
import Loader from './Components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';


function MusicDownloader() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Initialize useLocation hook

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== '' && currentPage !== 0) {
      handleSearch();
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500); // Adjust the delay time as needed (e.g., 500ms)

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://saavn.dev/api/search/songs?query=${searchQuery}&page=${currentPage}`
      );
      const jsonData = await response.json();
      setSearchResults(jsonData.data.results);
      setTotalPages(jsonData.data.totalPages);
      setLoading(false);

      // Programmatically change route after setting search results
      navigate(`?query=${searchQuery}`);
    } catch (error) {
      toast.error('Failed to fetch data!');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDownload = async (song) => {
    try {
      setDownloading(true);
      const response = await fetch(song.downloadUrl[2].url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${song.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(song.name + ' is downloaded!');
      setDownloading(false);
    } catch (error) {
      toast.error('Failed to download!');
      console.error('Error downloading:', error);
      setDownloading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Toaster position='top-center' toastOptions={{ style: { fontSize: '12px' } }} />

      <section>
        <div className="w-full mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-white">
          <div className="w-full fixed top-0 left-1/2 tranform -translate-x-1/2 mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-white z-[999]">
            {/* <div className="flex flex-row items-center gap-2 mb-2">
            <i className="ri-music-2-line text-xl font-bold bg-green-400 w-8 h-8 flex items-center justify-center rounded text-white"></i>
            </div> */}
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
          {loading && <Loader />}
          <div className='flex flex-col gap-4 text-balck z-0 mt-20 mb-8'>
            {downloading && <Loader />}
            {searchQuery.trim() === '' ? (
              <p>Please enter a search query</p>
            ) : searchResults.length > 0 ? (
              <>
                <p>Result for: <span className='text-green-400 font-semibold'>{searchQuery}</span></p>
                {searchResults.map((song) => (
                  <Link key={song.id} to={`/song/${song.id}`}>
                    <motion.div
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0, duration: 0.5 }}
                    >
                      <SongItem song={song} onDownload={handleDownload} />
                    </motion.div>
                  </Link>
                ))}
              </>
            ) : (
              <p>No songs found for "{searchQuery}"</p>
            )}
          </div>
          {searchResults.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          )}
        </div>

      </section>
    </>
  );
}

export default MusicDownloader;
