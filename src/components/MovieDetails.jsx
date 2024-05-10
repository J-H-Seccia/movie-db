import React from 'react';
import { Link } from 'react-router-dom';

function MovieDetails({ movie }) {
    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Genres: {movie.genres}</p>
            {/* More Info button */}
            <Link to={`/movie/${movie.id}`} className="more-info-button">More Info</Link>
        </div>
    );
}

export default MovieDetails;
