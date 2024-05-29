import React from 'react';
import { imageBaseURL } from "../globals/globalVariables"

function SingleMovieDetails({ backdropPath, children }) {
    const backgroundStyle = {
        backgroundImage: `url(${imageBaseURL}w1280${backdropPath})`,
        opacity: 0.3,
        backdropFilter: 'blur(10px)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    };

    return (
        <div className="movie-details bg-black mx-auto pt-2 pb-5 relative lg:max-w-5xl">
            {/* Background image */}
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg" style={backgroundStyle}></div>
            {/* Content */}
            {children}
        </div>
    );
}

export default SingleMovieDetails;
