import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiKey, endPointSearch, imageBaseURL } from '../globals/globalVariables';

function PageSingle() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${endPointSearch}${id}?api_key=${apiKey}`);
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <div>
            {/* Display movie details */}
            <h2>{movieDetails.title}</h2>
            <img src={`${imageBaseURL}w500${movieDetails.poster_path}`} alt={movieDetails.title} />
            <p>{movieDetails.overview}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Rating: {movieDetails.vote_average}</p>
            {/* Add more details as needed */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default PageSingle;
