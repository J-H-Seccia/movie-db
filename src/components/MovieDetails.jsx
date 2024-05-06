import React from 'react';

function MovieDetails({ movieData }) {
    return (
        <div className="movie-details">
            {movieData && (
                <>
                    <h2>{movieData.original_title}</h2>
                    <div className="poster">
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.original_title} />
                    </div>
                    <div className="release-date">Release Date: {movieData.release_date}</div><br></br>
                    <div className="vote-average">Vote Average: {movieData.vote_average}</div><br />
                    <div className="overview">Overview: {movieData.overview}</div>
                </>
            )}
        </div>
    );
}

export default MovieDetails;
