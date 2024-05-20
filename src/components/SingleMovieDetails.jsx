import React from 'react';
import {imageBaseURL } from "../globals/globalVariables"

function MovieDetails({ backdropPath, children }) {
    const backgroundStyle = {
        backgroundImage: `url(${imageBaseURL}w1280${backdropPath})`,
        opacity: 0.3,
        backdropFilter: 'blur(10px)'
    };

    return (
        <div className="movie-details mx-auto pt-2 relative lg:max-w-5xl">
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg" style={backgroundStyle}></div>
            {children}
        </div>
    );
}

export default MovieDetails;
