import { useEffect, useState } from "react";
import { appTitle, apiKey, listOfGenres, movieGenreBaseURL, movieGenreBaseURLAfterAPI } from "../globals/globalVariables";
import MovieCardGrid from '../components/MovieCardGrid';
import { useSelector } from "react-redux";

function PageMovies() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    // default movie genre is action
    const [selectedGenre, setSelectedGenre] = useState(28);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const favs = useSelector((state) => {
        return state.favs.items;
    });

    useEffect(() => {
        document.title = `Browse Movies by Genre | ${appTitle}`;
    }, []);

    // fetch genre list using api key – each genre has an associated id and name
    // if no errors, set genre from the fetched data
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

    // fetching movies by genre using selected genre id
    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            setLoading(true);
            try {
                // this is how you build the url for fetching movies by genre: https://api.themoviedb.org/3/discover/movie?api_key=69bba2f5467e7c956ecaaa7af1cc21a6&with_genres=28
                // where 28 is the id for action movies
                const response = await fetch(`${movieGenreBaseURL}?api_key=${apiKey}${movieGenreBaseURLAfterAPI}${selectedGenre}`);

                const data = await response.json();

                // if there are results, set movies from the fetched data
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

        // fetch movies by genre only if a genre is selected – hence the selectedGenre in dependency array
        fetchMoviesByGenre();
    }, [selectedGenre]);

    // a simple function to handle genre change
    const handleChangeGenre = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div>
            {loading && <div className="text-white text-center">Loading...</div>}
            {error && <div className="text-white text-center">{error}</div>}
            {!loading && !error && (
                            <div className="movie-container">
                            <div className="outer-flex flex justify-center m-6">
                                <div className="inner-flex">
                                    <h1 className="text-3xl font-bold text-center text-white p-4 border-4 border-double rounded-2xl uppercase">
                                        Browse Movies by Genre
                                    </h1>
                                </div>
                            </div>
                           
                            <div className="flex justify-center">
                                <select
                                    onChange={(e) => handleChangeGenre(e.target.value)}
                                    value={selectedGenre}
                                    className="p-2 rounded-md border-2 border-primary bg-copy text-white"
                                >
                                    {genre.map((genre) => (
                                        <option value={genre.id} key={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
            
                           <MovieCardGrid movies={movies} favs={favs} />
                        </div>
            )}

        </div>
    );
}

export default PageMovies;
