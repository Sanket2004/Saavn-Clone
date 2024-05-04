import React, { useState, useRef, useEffect } from "react";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

function CustomAudioPlayer({ audioSource, audioName, onEnded, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // When audio source changes, reset player state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsMuted(false);
    // Autoplay the audio when source changes
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((error) => {
        toast.error("Autoplay failed");
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    }
  }, [audioSource]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
  }, [audioRef.current]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(audioSource);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${audioName}`; // Provide a default name for the downloaded file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success(audioName + " is Downloaded !")
      setDownloading(false);
    } catch (error) {
      toast.error("Failed to download !")
      console.error('Error downloading:', error);
      setDownloading(false);
    }
  };

  return (
    <>
      {/* <Toaster position='top-center' toastOptions={{ style: { fontSize: '12px' } }} /> */}

      <div className="custom-audio-player flex flex-col py-4 rounded-lg gap-2.5 text-white rounded-lg w-full">
        <audio
          key={audioSource} // Key prop to remount the audio element when audioSource changes
          ref={audioRef}
          src={audioSource}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            onEnded(); // Call the onEnded function provided by the parent
          }}
        />
        <div className="flex justify-center items-center mb-4 justify-evenly">
          {downloading ?
            <div className="animate-bounce text-black">
              <button className=" h-12 w-12 text-black rounded-lg ">
                <i className="ri-download-line text-xl"></i>
              </button>
            </div> :
            <button onClick={handleDownload} className=" h-12 w-12 text-black rounded-lg ">
              <i className="ri-download-line text-xl"></i>
            </button>
          }
          <button onClick={onPrevious} className="bg-green-200 h-10 w-10 text-black rounded-lg ">
            <i className="ri-skip-back-line text-xl"></i>
          </button>
          <button onClick={togglePlayPause} className="bg-green-500 h-12 w-12 text-white rounded-lg">
            {isPlaying ? <i className="ri-pause-line text-xl"></i> : <i className="ri-play-line text-xl"></i>}
          </button>
          <button onClick={onNext} className="bg-green-200 h-10 w-10 text-black rounded-lg">
            <i className="ri-skip-forward-line text-xl"></i>
          </button>
          <button onClick={toggleMute} className=" h-12 w-12 text-black rounded-lg">
            {isMuted ?
              <i className="ri-volume-mute-line text-xl"></i>
              :
              <i className="ri-volume-up-line text-xl"></i>
            }
          </button>
        </div>
        <input
          className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer"
          type="range"
          value={currentTime}
          max={duration || 0} // Set max to duration if available, otherwise 0
          onChange={handleSeek}
        />
        <div className="flex flex-row justify-between items-center text-sm text-black">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </>
  );
}

export default CustomAudioPlayer;
