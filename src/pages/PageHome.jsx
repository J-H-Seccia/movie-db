import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL } from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movieDetails, selectMovieDetails] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");

    // Page Title
    useEffect(() => {
        document.title = `Home | ${appTitle}`;
    }, []);

    useEffect(() => {
        // Fetch movies based on the selected category
        const fetchMovies = async () => {
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
        };
        fetchMovies();
    }, [selectedCategory]);

    const handleChangeCategory = (category) => {
        setSelectedCategory(category);
    };

    const fetchSingleMovie = async (id) => {
        const api = `${endPointSearch}${id}?api_key=${apiKey}`;
        const response = await fetch(api);
        const data = await response.json();

        // Display movie details
        selectMovieDetails({
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            vote_average: data.vote_average,
            genres: data.genres.map(genre => genre.name).join(", "),
        });
    };

    const handleGetMovie = (id) => {
        fetchSingleMovie(id);
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
                    <img 
                    key={movie.id} 
                    src={`${imageBaseURL}w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className={`${selectedMovie === movie.id ? "selected" : ""} cursor-pointer`}
                    onClick={() => handleGetMovie(movie.id)} 
                    />
                ))}
            </div>


            <div className="movie-details">
                <h2>Movie Details</h2>
                <p>Title: {movieDetails.title}</p>
                <p>Overview: {movieDetails.overview}</p>
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Rating: {movieDetails.vote_average}</p>
                <p>Genres: {movieDetails.genres}</p>
            </div>
        </>
    );
}

export default PageHome;
