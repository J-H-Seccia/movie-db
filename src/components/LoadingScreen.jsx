import React from 'react';

function LoadingScreen() {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-bg-pattern">
            <div className="text-white text-2xl font-bold">Loading movies...we should be done soon</div>
        </div>
    );
}

export default LoadingScreen;