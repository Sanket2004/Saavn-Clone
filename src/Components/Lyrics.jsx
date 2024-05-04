import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';

function Lyrics({ id }) {
    const [lyrics, setLyrics] = useState(null); // State to store the lyrics data
    const [copy, setCopy] = useState(null); // State to store the copy data
    const [isLoading, setIsLoading] = useState(true); // State to indicate loading status

    useEffect(() => {
        // Fetch the lyrics data when the component mounts
        fetch(`https://saavn.dev/api/songs/${id}/lyrics`)
            .then(response => {
                if (response.ok) {
                    // If lyrics are available, parse the JSON response
                    return response.json();
                } else {
                    // If lyrics are not available, set lyrics state to indicate it
                    toast.error('Lyrics not available !');
                    return Promise.reject('Lyrics not available !');
                }
            })
            .then(data => {
                // Replace <br> tags with newline characters
                const formattedLyrics = data.data.lyrics.replace(/<br>/g, '\n');
                // Set the lyrics state to the formatted lyrics
                setCopy(data.data.copyright);
                setLyrics(formattedLyrics);
            })
            .catch(error => {
                toast.error('Error fetching lyrics');
                console.error('Error fetching lyrics:', error);
                // Handle any errors here
            })
            .finally(() => {
                // Set isLoading to false when fetching is completed (whether successful or not)
                setIsLoading(false);
            });
    }, [id]); // Dependency array ensures useEffect runs only when 'id' changes

    return (
        <>
            <Toaster position='top-center' toastOptions={{ style: { fontSize: '12px' } }} />
            <div className='w-full z-50 text-black text-center'>
                {isLoading ? (
                    // If loading is in progress, display a loading message
                    <Loader />
                ) : lyrics ? (
                    // If lyrics are available, display them with line breaks
                    <>
                        <p style={{ whiteSpace: 'pre-wrap' }} className='text-center pt-28 pb-12 px-4'>{lyrics}</p>
                        <p className='text-center text-xs pb-80' dangerouslySetInnerHTML={{ __html: copy }} />
                    </>
                ) : (
                    // If lyrics are not available, display a message
                    <p className='text-center pt-28 pb-12 px-4'>{"Lyrics not available :("}</p>
                )}
            </div>
        </>

    );
}

export default Lyrics;
