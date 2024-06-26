import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

    const navigate = useNavigate();

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <h1 className="uppercase tracking-widest text-gray-500">404 | Not Found</h1>
            <button
                onClick={() => navigate('/')}
                className="mt-4 cursor-pointer w-full h-10 flex justify-center items-center inline-block rounded border border-green-600 bg-green-600 text-sm text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
            >
                Back To Home Page
            </button>
        </div>
    )
}

export default ErrorPage
