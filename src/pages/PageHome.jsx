import React, { useState, useEffect } from "react";
import { appTitle, apiKey, endPointPlayingNow, endPointSearch, imageBaseURL } from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [movieDetails, selectMovieDetails] = useState({});
    // const [category, setSelectedCategory] = useState("");

    // Page Title
    useEffect(() => {
        document.title = `Home | ${appTitle}`;
    }, []);

    useEffect(() => {
        // Fetch movies playing now
        const fetchMovies = async () => {

        const response = await fetch(`${endPointPlayingNow}?api_key=${apiKey}`);
        const data = await response.json();
        if (data.results.length > 0) {
            setMovies(data.results);
            setSelectedMovie((data.results[0].id));
        }

        };
        fetchMovies();
    }, []);

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

            {/* <div className="movie-tabs">
                <ul>
                    <li
                        key={category}
                        className={category === selectedCategory ? "active" : ""}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </li>
                </ul>
            </div> */}


            <form onSubmit={handleGetMovie}>
                <label htmlFor="select-movie">Select Movie</label>
                <select name="selectMovie" id="selectMovie" value={selectedMovie} onChange={handleChangeMovie} size="5">
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
