import React from 'react';

function LoadingScreen() {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-90">
            <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
    );
}

export default LoadingScreen;