import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL } from "../globals/globalVariables";
import MovieDetails from '../components/MovieDetails';
import { Link } from 'react-router-dom';

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
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
                if (data.results.length > 0) {
                    setMovies(data.results);
                    setSelectedMovie(data.results[0].id);
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
                <button
                    className={selectedCategory === "Now Playing" ? "active" : ""}
                    onClick={() => handleChangeCategory("Now Playing")}
                >
                    Now Playing
                </button>
                <button
                    className={selectedCategory === "Popular" ? "active" : ""}
                    onClick={() => handleChangeCategory("Popular")}
                >
                    Popular
                </button>
                <button
                    className={selectedCategory === "Top Rated" ? "active" : ""}
                    onClick={() => handleChangeCategory("Top Rated")}
                >
                    Top Rated
                </button>
                <button
                    className={selectedCategory === "Upcoming" ? "active" : ""}
                    onClick={() => handleChangeCategory("Upcoming")}
                >
                    Upcoming
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {movies.map(movie => (
                    <div key={movie.id} className="movie">
                        <img
                            src={`${imageBaseURL}w500${movie.poster_path}`}
                            alt={movie.title}
                            className={`${selectedMovie === movie.id ? "selected" : ""} cursor-pointer`}
                            onClick={() => setSelectedMovie(movie)}
                        />
                        {/* Include MovieDetails component */}
                        <MovieDetails movie={movie} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default PageHome;
