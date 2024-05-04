import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lyrics from './Components/Lyrics';
import Player from './Components/Player';
import Loader from './Components/Loader';
import toast, { Toaster } from 'react-hot-toast';

function MusicDetailSPage() {
    // Extracting song ID from the URL
    const location = useLocation();
    const pathname = location.pathname;
    const songId = pathname.split('/').pop(); // Get the last segment of the pathname

    // State to store the song details
    const [song, setSong] = useState(null);
    const [quality, setQuality] = useState('320kbps'); // Default quality
    const [downloading, setDownloading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [previousSongId, setPreviousSongId] = useState(null); // State to store the previous song ID
    const navigate = useNavigate();

    // Fetch song details when the component mounts or when songId changes
    useEffect(() => {
        fetch(`https://saavn.dev/api/songs/${songId}`)
            .then(response => response.json())
            .then(data => setSong(data.data[0])) // Assuming the song details are in the first element of the data array
            .catch(error => console.error('Error:', error));
    }, [songId]);

    // Fetch suggestions when the component mounts or when songId changes
    useEffect(() => {
        fetch(`https://saavn.dev/api/songs/${songId}/suggestions`)
            .then(response => response.json())
            .then(data => setSuggestions(data.data))
            .catch(error => console.error('Error fetching suggestions:', error));
    }, [songId]);

    // Function to get the download URL for the selected quality
    const getDownloadUrl = (quality) => {
        const qualityUrl = song.downloadUrl.find(item => item.quality === quality);
        return qualityUrl ? qualityUrl.url : '';
    }

    const [showLyrics, setShowLyrics] = useState(false);

    // Function to toggle visibility of lyrics
    const toggleLyricsVisibility = () => {
        // Invert the state by passing the current value of showLyrics to the setter function
        setShowLyrics(showLyrics => !showLyrics);
    }

    const handleDownload = async () => {
        try {
            setDownloading(true);
            const response = await fetch(getDownloadUrl(quality));
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${song.name}.mp3`; // Provide a default name for the downloaded file
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setDownloading(false);
            toast.success(song.name + "is downloaded");
        } catch (error) {
            toast.error('Failed to download !')
            console.error('Error downloading:', error);
            setDownloading(false);
        }
    };

    // Function to handle playing a suggested song
    const handlePlaySuggestion = (suggestion) => {
        setPreviousSongId(songId); // Store the current song ID as the previous song ID
        setSong(suggestion);
        navigate(`/song/${suggestion.id}`); // Change the URL to the ID of the suggestion song
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
    }

    const playNextSuggestion = () => {
        // Filter out the previous song from the suggestions
        const filteredSuggestions = suggestions.filter(s => s.id !== previousSongId);
        // If there are suggestions remaining after filtering
        if (filteredSuggestions.length > 0) {
            // Select a random suggestion from the filtered list
            const randomIndex = Math.floor(Math.random() * filteredSuggestions.length);
            const nextSuggestion = filteredSuggestions[randomIndex];
            // Play the selected suggestion
            handlePlaySuggestion(nextSuggestion);
        }
    };

    // Function to play the previous song
    const playPreviousSong = () => {
        // Navigate to the previous song if available
        if (previousSongId) {
            navigate(`/song/${previousSongId}`);
        }
    };

    const handleCopyUrl = () => {
        const currentUrl = window.location.href;
        // Copy current page URL to clipboard
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                // URL copied successfully
                toast.success("URL copied to clipboard");
                console.log('URL copied to clipboard:', currentUrl);
                // You can add further logic here such as showing a success message to the user
            })
            .catch(error => {
                // Error occurred while copying URL
                toast.error('Error copying URL to clipboard');
                console.error('Error copying URL to clipboard:', error);
                // You can add further error handling logic here
            });
    };

    // Render the song details and suggestions
    return (
        <>
            <Toaster position='top-center' toastOptions={{ style: { fontSize: '12px' } }} />
            <div className=''>
                {song ? (
                    <header>
                        <div className="w-full fixed bottom-0 left-1/2 tranform -translate-x-1/2 mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 bg-gray-100 z-[999] rounded-t-xl">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <div className="w-full text-left sm:text-left flex flex-row gap-4 items-center justify-between md:justify-start">
                                    <div className='flex flex-row gap-4 flex-1 sm:max-w-80'>
                                        <div className="h-14 w-14 flex-0">
                                            <img
                                                src={song.image[2].url}
                                                className="h-full w-full rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center sm:max-w-64 flex-1">
                                            <marquee className=" text-2xl sm:text-xl md:text-2xl font-bold text-gray-900 lg:text-2xl" dangerouslySetInnerHTML={{ __html: song.name }} />
                                            <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: song.artists.primary[0].name }} />
                                        </div>
                                    </div>
                                    <button onClick={toggleLyricsVisibility} className='flex flex-0 justify-center items-center bg-sky-400 h-12 w-12 rounded-lg text-white'><i className="ri-music-2-line"></i></button>
                                </div>
                                <div className="max-w-md w-full flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                    <Player
                                        audioSource={getDownloadUrl(quality)}
                                        audioName={song.name}
                                        onEnded={playNextSuggestion} // Call playNextSuggestion when the current track ends
                                        onPrevious={playPreviousSong} // Pass the playPreviousSong function as a prop
                                        onNext={playNextSuggestion} // Pass the playNextSuggestion function as a prop
                                    />
                                </div>
                            </div>
                        </div>
                    </header>
                ) : (
                    <Loader />
                )}

                {/* Suggestions */}
                {/* Render the suggestions only if suggestions array is not empty */}
                {Array.isArray(suggestions) && suggestions.length > 0 && (
                    <>
                        {showLyrics ?
                            <div className="relative w-full min-h-screen ">
                                <Lyrics id={song.id} />
                            </div>
                            :
                            <section className="">
                                <div className="w-full mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-white mb-56">
                                    <div className="flex flex-row justify-between items-center">
                                        <button onClick={() => navigate(-1)} className='text-sm h-12'><i className="ri-arrow-left-s-line"></i> Back</button>
                                        <button onClick={handleCopyUrl} className='text-sm h-12'><i class="ri-share-line"></i> Share</button>
                                    </div>
                                    <h2 className="text-xl mb-4 font-bold pl-2">You may also like</h2>
                                    <div className="bg-gray-100 p-4 rounded">
                                        <ul className="flex flex-col gap-2 grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2">
                                            {suggestions.map((suggestion, index) => (
                                                <li key={index} onClick={() => handlePlaySuggestion(suggestion)} className="cursor-pointer bg-gray-200 p-2 rounded-lg h-max">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <img src={suggestion.image[2].url} className="rounded-lg h-12 w-12" />
                                                        <div className="flex flex-col">
                                                            <div className="flex flex-row gap-2 items-center">
                                                                <p className="font-semibold text-base flex-1" dangerouslySetInnerHTML={{ __html: suggestion.name }} />
                                                                {suggestion.explicitContent ? <span className='text-xs bg-sky-400 text-white h-4 w-4 rounded flex justify-center items-center'>E</span> : ""}
                                                            </div>
                                                            <p className="text-sm " dangerouslySetInnerHTML={{ __html: suggestion.artists.primary[0].name }} />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        }
                    </>

                )}
            </div>
        </>
    );
}

export default MusicDetailSPage;

