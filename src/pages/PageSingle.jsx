import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointSearch, endPointMovieCredits,imageBaseURL } from "../globals/globalVariables";
import { useParams } from 'react-router-dom';
import ActorFallback from "../components/FallBackProfile";


function truncateOverview(overview, wordLimit) {
    if (!overview) {
        return "Details Not Provided";
    } else {
        const words = overview.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        } else {
            return overview;
        }
    }
}

function PageSingle() {
    // Get the movie ID from the URL path
    const { id } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videoTrailers, setVideoTrailers] = useState([]);

    //Setting page title
    useEffect(() => {
        document.title = `Single Info | ${appTitle}`;
    }, []);

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
                    overview: truncateOverview(data.overview),
                    release_date: data.release_date,
                    vote_average: data.vote_average,
                    genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "",
                    cast: castWithImages,
                    posterPath: data.poster_path,
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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWJiYTJmNTQ2N2U3Yzk1NmVjYWFhN2FmMWNjMjFhNiIsInN1YiI6IjY2MzUyN2U0OTlkNWMzMDEyNjU3NzhiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._QXgq2rIB6fX_fni3NVUlSbASV-S6jFomm42-d2T52c',
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

    // Function to fetch actor image URL from TMDB API
    const fetchActorImageUrl = async (personId) => {
        try {
            // Fetch person details from TMDB API
            const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);
            const data = await response.json();

            // Extract profile image URL from the response
            return data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : null;
        } catch (error) {
            console.error("Failed to fetch actor image:", error);
            return null;
        }
    };

    return (
        <div className="bg-customBackground text-foreground">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold ml-10 mr-10 mt-6 mb-8 text-center no-underline">{movieDetails.title}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="movie-details mx-10">
                    <img src={`${imageBaseURL}w1280${movieDetails.posterPath}`} alt={movieDetails.title} style={{ width: '100%', maxWidth: '100%', height: 'auto' }} />
                    {/* <h2>Movie Details</h2> */}
                    {/* <h2>Title: {movieDetails.title}</h2> */}
                    <p className="mt-4"> {truncateOverview(movieDetails.overview, 25)}</p>
                    <p className="mt-4">Release Date: {movieDetails.release_date}</p>
                    <p className="mt-4">Rating: {movieDetails.vote_average.toFixed(1)}</p>
                    <p className="mt-4">Genres: {movieDetails.genres}</p>

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
                                        {actor.image ? (
                                            <img
                                                src={actor.image}
                                                alt={actor.name}
                                                className="w-24 h-30 object-cover rounded mb-2"
                                            />
                                        ) : (
                                            <ActorFallback />
                                        )}
                                        <p className="text-center">{actor.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PageSingle;
