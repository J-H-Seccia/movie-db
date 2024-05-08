import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL, endPointMovieCredits } from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movieDetails, setMovieDetails] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("Now Playing");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Page Title
    useEffect(() => {
        document.title = `Home | ${appTitle}`;
    }, []);

    useEffect(() => {
        // Fetch movies based on the selected category
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let endpoint;
                switch(selectedCategory) {
                    case "Now Playing":
                        endpoint = endPointPlayingNow;
                        break;
                    case "Popular":
                        endpoint = endPointPopular;
                        break;
                    case "Top Rated":
                        endpoint = endPointTopRated;
                        break;
                    case "Upcoming":
                        endpoint = endPointUpcoming;
                        break;
                    default:
                        endpoint = endPointPlayingNow;
                }

                const response = await fetch(`${endpoint}?api_key=${apiKey}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    setMovies(data.results);
                    setSelectedMovie(data.results[0].id);
                } else {
                    setError("No movies found for the selected category.");
                }
            } catch (error) {
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [selectedCategory]);

    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    };

    const fetchSingleMovie = async (id) => {
        try {
            const api = `${endPointSearch}${id}?api_key=${apiKey}`;
            const response = await fetch(api);
            const data = await response.json();
    
            // Fetch movie credits
            const creditsResponse = await fetch(`${endPointMovieCredits}${id}/credits?api_key=${apiKey}`);
            const creditsData = await creditsResponse.json();
    
            const castWithImages = [];
            for (const credit of creditsData.cast) {
                // Fetch image URL for each cast member
                const imageUrl = await fetchActorImageUrl(credit.id);
                castWithImages.push({
                    name: credit.name,
                    image: imageUrl,
                });
            }

            // Display movie details
            setMovieDetails({
                title: data.title,
                overview: data.overview,
                release_date: data.release_date,
                vote_average: data.vote_average,
                genres: data.genres ? data.genres.map(genre => genre.name).join(", ") : "",
                credits: creditsData.cast ? creditsData.cast.map(credit => credit.name).join(", ") : "",
                cast: castWithImages,
            });
        } catch (error) {
            setError("Failed to fetch movie details. Please try again later.");
        }
    };
    // Function to fetch actor image URL from TMDB API
    const fetchActorImageUrl = async (personId) => {
        try {
            // Fetch person details from TMDB API
            const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`);
            const data = await response.json();

            // Extract profile image URL from the response
            const imageUrl = `https://image.tmdb.org/t/p/w500${data.profile_path}`;
            return imageUrl;
        } catch (error) {
            console.error("Failed to fetch actor image:", error);
            return null;
        }
    };
    

    const handleGetMovie = (id) => {
        fetchSingleMovie(id);
    };

    return (
        <>
            <h1 className="text-3xl font-bold underline">Home Page</h1>

            <div className="category-tabs">
                {["Now Playing", "Popular", "Top Rated", "Upcoming"].map(category => (
                    <button
                        key={category}
                        className={selectedCategory === category ? "active" : ""}
                        onClick={() => handleChangeCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {movies.map(movie => (
                        <img 
                            key={movie.id} 
                            src={`${imageBaseURL}w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className={`${selectedMovie === movie.id ? "selected" : ""} cursor-pointer`}
                            onClick={() => handleGetMovie(movie.id)} 
                        />
                    ))}
                </div>
            )}

            <div className="movie-details">
                <h2>Movie Details</h2>
                <p>Title: {movieDetails.title}</p>
                <p>Overview: {movieDetails.overview}</p>
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Rating: {movieDetails.vote_average}</p>
                <p>Genres: {movieDetails.genres}</p>
                <p>Cast: {movieDetails.credits}</p>
                {movieDetails.cast && movieDetails.cast.length > 0 && (
                    <div className="cast-images">
                        <h3 className="text-xl font-bold">Cast</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {movieDetails.cast.map(actor => (
                                <div key={actor.name} className="flex flex-col items-center">
                                    <img 
                                        src={actor.image} 
                                        alt={actor.name} 
                                        className="w-24 h-24 w-16 rounded mb-2" // Adjust image size here
                                    />
                                    <p className="text-center">{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PageHome;
