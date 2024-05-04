import React from 'react';

function SongItem({ song, onDownload }) {
    // Check if song exists before accessing its properties
    if (!song) {
        return null; // If song doesn't exist, return null (or any other fallback UI)
    }

    return (
        <div className='flex flex-row justify-between bg-gray-100 rounded-lg overflow-hidden relative hover:scale-[1.04] transition-all duration-150 transform-gpu'>
            <div className="flex flex-row items-center gap-4 p-2 overflow-hidden w-full">
                <ul className="w-full flex flex-col">
                    <li className="cursor-pointer bg-gray-200 p-2 rounded-lg h-max">
                        <div className="flex flex-row gap-2 items-center">
                            {song.image && song.image[2] && (
                                <img src={song.image[2].url} className="rounded-lg h-12 w-12" />
                            )}
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    {song.explicitContent ? <span className='text-xs bg-green-500 text-white h-4 w-4 rounded flex justify-center items-center'>E</span> : ""}
                                    <p className="font-semibold text-base flex-1 overflow-hidden truncate max-w-40 sm:max-w-full " dangerouslySetInnerHTML={{ __html: song.name }} />
                                </div>
                                <p className="text-sm " dangerouslySetInnerHTML={{ __html: song.artists.primary[0].name }} />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* <button className='w-[25%] bg-black' onClick={() => onDownload(song)}>Download</button> */}

            {/* <button className='bg-stone-600 w-8 h-8 absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-lg' onClick={() => onDownload(song)}>
                <i className="ri-play-line"></i>
            </button> */}
        </div>
    );
}

export default SongItem;
