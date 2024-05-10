import React from 'react';
import { Link } from 'react-router-dom';
import FavButton from './FavButton';

function MovieDetails({ movie }) {
    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Genres: {movie.genres}</p>
            <FavButton movie={movie} />
            {/* More Info button */}
            <Link to={`/movie/${movie.id}`} className="more-info-button">More Info</Link>
        </div>
    );
}

export default MovieDetails;
