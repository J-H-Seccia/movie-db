import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointSearch, endPointMovieCredits } from "../globals/globalVariables";
import { useParams } from 'react-router-dom';

function PageSingle() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videoTrailers, setVideoTrailers] = useState([]);

    // Fetch movie details using the ID from the URL
    useEffect(() => {
        const fetchSingleMovie = async () => {
            setLoading(true);
            try {
                const api = `${endPointSearch}${id}?api_key=${apiKey}`;
                const response = await fetch(api);
                const data = await response.json();

                // Fetch movie credits
                const creditsResponse = await fetch(`${endPointMovieCredits}${id}/credits?api_key=${apiKey}`);
                const creditsData = await creditsResponse.json();

                const castWithImages = await Promise.all(creditsData.cast.map(async credit => {
                    // Fetch image URL for each cast member
                    const imageUrl = await fetchActorImageUrl(credit.id);
                    return {
                        name: credit.name,
                        image: imageUrl,
                    };
                }));

                // Display movie details
                setMovieDetails({
                    title: data.title,
                    overview: data.overview,
                    release_date: data.release_date,
                    vote_average: data.vote_average,
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "",
                    cast: castWithImages,
                });

                await fetchVideoTrailers();

            } catch (error) {
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleMovie();
    }, [id]);

    const constructVideoUrl = (site, key) => {
        if (site === 'YouTube') {
            return `https://www.youtube.com/watch?v=${key}`;
        } else if (site === 'Vimeo') {
            return `https://vimeo.com/${key}`;
        } else {
            // Handle other video hosting sites or unknown sites
            return null;
        }
    };

    const fetchVideoTrailers = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer YOUR_TMDB_API_KEY',
                }
            };
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
            const data = await response.json();

            // Filter out videos with type 'Trailer'
            const trailerVideos = data.results.filter(video => video.type === 'Trailer');

            setVideoTrailers(trailerVideos);
        } catch (error) {
            console.error("Failed to fetch video trailers:", error);
        }
    };


    useEffect(() => {
        document.title = `Single Info | ${appTitle}`;
    }, []);

    // Function to fetch actor image URL from TMDB API
    const fetchActorImageUrl = async (personId) => {
        try {
            // Fetch person details from TMDB API
            const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);
            const data = await response.json();

            // Extract profile image URL from the response
            return `https://image.tmdb.org/t/p/w500${data.profile_path}`;
        } catch (error) {
            console.error("Failed to fetch actor image:", error);
            return null;
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold underline">Single Info</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="movie-details">
                    <h2>Movie Details</h2>
                    <p>Title: {movieDetails.title}</p>
                    <p>Overview: {movieDetails.overview}</p>
                    <p>Release Date: {movieDetails.release_date}</p>
                    <p>Rating: {movieDetails.vote_average}</p>
                    <p>Genres: {movieDetails.genres}</p>

                    {videoTrailers.length > 0 && (
                        <div className="video-trailers">
                        <h3 className="text-xl font-bold">Video Trailers</h3>
                        <ul>
                            {videoTrailers.map(trailer => (
                                <li key={trailer.id}>
                                    <a href={constructVideoUrl(trailer.site, trailer.key)} target="_blank" rel="noopener noreferrer">{trailer.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}

                    {movieDetails.cast && movieDetails.cast.length > 0 && (
                        <div className="cast-images">
                            <h3 className="text-xl font-bold">Cast</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {movieDetails.cast.slice(0, 6).map(actor => (
                                    <div key={actor.name} className="flex flex-col items-center">
                                        <img
                                            src={actor.image}
                                            alt={actor.name}
                                            className="w-24 h-24 w-16 rounded mb-2"
                                        />
                                        <p className="text-center">{actor.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default PageSingle;
