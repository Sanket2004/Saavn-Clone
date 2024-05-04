import React, { useEffect } from 'react';

function Loader() {
  useEffect(() => {
    // Add class to body to disable scrolling
    document.body.classList.add('overflow-hidden');
    return () => {
      // Clean up function to remove class when component unmounts
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-50 z-[999]">
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className="animate-ping">
          <svg className='h-14 w-14' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20 4.00001C20 3.70348 19.8684 3.42225 19.6407 3.23226C19.4131 3.04226 19.1129 2.96309 18.8211 3.01614L7.82111 5.01614C7.34562 5.10259 7 5.51672 7 6.00001V10V16.1707C6.68722 16.0602 6.35064 16 6 16C4.34315 16 3 17.3432 3 19C3 20.6569 4.34315 22 6 22C7.65685 22 9 20.6569 9 19V10.8346L18 9.19822V14.1707C17.6872 14.0602 17.3506 14 17 14C15.3431 14 14 15.3432 14 17C14 18.6569 15.3431 20 17 20C18.6569 20 20 18.6569 20 17V8.00001V4.00001ZM18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17ZM7 19C7 18.4477 6.55228 18 6 18C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20C6.55228 20 7 19.5523 7 19ZM18 7.16543L9 8.8018V6.83458L18 5.19822V7.16543Z" fill="#000000"></path> </g></svg>
        </div>
      </div>
    </div>
  );
}

export default Loader;
