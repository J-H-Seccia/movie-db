import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointPopular, endPointUpcoming, endPointTopRated, endPointSearch, imageBaseURL } from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [movieDetails, selectMovieDetails] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");

    // Page Title
    useEffect(() => {
        document.title = `Home | ${appTitle}`;
    }, []);

    useEffect(() => {
        // Fetch movies playing now
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
            let data = await response.json();
            if (data.results.length > 0) {
                setMovies(data.results);
                setSelectedMovie((data.results[0].id));
                console.log(endpoint);
            }

        };
        fetchMovies();
    }, [selectedCategory]);

    const fetchSingleMovie = async () => {

        const api = `${endPointSearch}${selectedMovie}?api_key=${apiKey}`;
        const response = await fetch(api);

        let data = await response.json();
        
        // display movie img
        const movieData = {
            src: `${imageBaseURL}w500${data.poster_path}`,
            alt: data.title,
        };
        setMovieImage(movieData);

        // display movie details
        selectMovieDetails({
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            vote_average: data.vote_average,
            genres: data.genres.map(genre => genre.name).join(", "),
        });
        
    };

    const handleGetMovie = async (e) => {
        e.preventDefault();
        console.log(selectedMovie);
        fetchSingleMovie();
    };
    

    const handleChangeMovie = (e) => {
        setSelectedMovie(e.target.value);
        console.log(selectedMovie)
    };

    return (
        <>
            <h1 className="text-3xl font-bold underline">Home Page</h1>

            <div className="category-tabs">
                <button
                    className={selectedCategory === "Now Playing" ? "active" : ""}
                    onClick={() => setSelectedCategory("Now Playing")}
                >
                    Now Playing
                </button>
                <button
                    className={selectedCategory === "Popular" ? "active" : ""}
                    onClick={() => setSelectedCategory("Popular")}
                >
                    Popular
                </button>
                <button
                    className={selectedCategory === "Top Rated" ? "active" : ""}
                    onClick={() => setSelectedCategory("Top Rated")}
                >
                    Top Rated
                </button>
                <button
                    className={selectedCategory === "Upcoming" ? "active" : ""}
                    onClick={() => setSelectedCategory("Upcoming")}
                >
                    Upcoming
                </button>
            </div>

            <form onSubmit={handleGetMovie}>
                <label htmlFor="select-movie">Select Movie</label>
                <select name="selectMovie" 
                        id="selectMovie" 
                        value={selectedMovie} 
                        onChange={handleChangeMovie} size="5">
                            
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>

                <div className="submit-group">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {movieImage ? "Get Another Movie" : "Get Movie"}
                    </button>
                </div>
            </form>

            <div className="movie-image">
                {movieImage && <img src={movieImage.src} alt={movieImage.alt} />}
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
