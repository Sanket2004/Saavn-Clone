import React from 'react';

function SongItem({ song, onDownload }) {
    // Check if song exists before accessing its properties
    if (!song) {
        return null; // If song doesn't exist, return null (or any other fallback UI)
    }

    return (
        <div className='flex flex-row justify-between bg-gray-100 rounded-lg overflow-hidden relative'>
            <div className="flex flex-row items-center gap-4 p-2 overflow-hidden w-full">
                {/* Check if image exists before accessing its properties */}
                {song.image && song.image[2] && (
                    <img src={song.image[2].url} className='w-16 h-16 bg-gray-400 rounded-lg' />
                )}
                <div className="flex-flex-col w-full">
                    <p className='whitespace-nowrap font-bold' dangerouslySetInnerHTML={{ __html: song.name }} />
                    {/* Safely access artist's name */}
                    <p className='whitespace-nowrap text-sm' dangerouslySetInnerHTML={{ __html: song.artists.primary[0]?.name || 'Unknown Artist' }} />
                    <p className='whitespace-nowrap px-2 text-white bg-sky-400 w-max rounded-full text-xs' dangerouslySetInnerHTML={{ __html: song.language }} />
                </div>
            </div>
            {/* <button className='w-[25%] bg-black' onClick={() => onDownload(song)}>Download</button> */}

            {/* <button className='bg-stone-600 w-8 h-8 absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-lg' onClick={() => onDownload(song)}>
                <i className="ri-play-line"></i>
            </button> */}
        </div>
    );
}

export default SongItem;
