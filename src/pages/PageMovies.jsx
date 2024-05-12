import { useEffect, useState } from "react";
import { appTitle, apiKey, listOfGenres, movieGenreBaseURL, movieGenreBaseURLAfterAPI, imageBaseURL } from "../globals/globalVariables";
// import { Link } from "react-router-dom";
// import { FavButton } from "../components/FavButton";
import MovieCardGrid from '../components/MovieCardGrid';

function PageMovies() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(35); // Default to comedy genre
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = `Browse Movies by Genre | ${appTitle}`;
    }, []);

    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${listOfGenres}?api_key=${apiKey}`);
                const data = await response.json();
                if (data.genres && data.genres.length > 0) {
                    setGenre(data.genres);
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        fetchGenre();
    }, []);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${movieGenreBaseURL}?api_key=${apiKey}${movieGenreBaseURLAfterAPI}${selectedGenre}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    setMovies(data.results);
                } else {
                    setError("No movies found for the selected genre.");
                }
            } catch (error) {
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [selectedGenre]);

    const handleChangeGenre = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div>
            <div className="movie-container">
                <h1 className="text-3xl font-bold text-center">Browse Movies by Genre</h1>
                <div className="flex justify-center gap-4">
                    <select
                        onChange={(e) => handleChangeGenre(e.target.value)}
                        value={selectedGenre}
                        className="p-2 rounded-md border border-gray-300"
                    >
                        {genre.map((genre) => (
                            <option value={genre.id} key={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {movies.map((movie) => (
                        <MovieCardGrid key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PageMovies;
