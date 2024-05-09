import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, imageBaseURL } from "../globals/globalVariables";
import { Link } from 'react-router-dom';

function PageHome() {
    const [movies, setMovies] = useState([]);
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
                        <Link key={movie.id} to={`/single/${movie.id}`}>
                            <div className="thumbnail-container relative">
                                <img 
                                    src={`${imageBaseURL}w500${movie.poster_path}`} 
                                    alt={movie.title} 
                                    className="cursor-pointer"
                                />
                                <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                                    <p className="text-sm">{movie.release_date}</p>
                                    <p className="text-sm">{movie.overview ? movie.overview.slice(0, 100) + "..." : "Overview not available"}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


            )}
        </>
    );
}

export default PageHome;
